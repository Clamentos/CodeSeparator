import * as vscode from 'vscode';
import { ExtensionState, SeparatorType, TriggerMapping } from './types';
import {

    getDefaultExcluded,
    getDefaultHideInRuler,
    getDefaultSeparatorType,
    getDefaultTimeoutAmount,
    getDefaultTriggers

} from './defaults';

///
/** @returns A map that associates separator name <-> separator object. */
export function getSeparatorMappings(): Map<string, vscode.TextEditorDecorationType> {

    // Fetch from the extension settings or defaults.
    let seps = getSettings().get<SeparatorType[]>("separatorTypes") ?? [getDefaultSeparatorType()];
    let hideInRuler = getSettings().get<boolean>("hideInRuler") ?? getDefaultHideInRuler();

    // Construct the map.
    const separatorsMap = new Map<string, vscode.TextEditorDecorationType>();
    let width: string;

    seps.forEach((elem) => {

        width = elem.onBottom ? ("0 0 " + elem.thickness + "px 0") : (elem.thickness + "px 0 0 0");

        if(hideInRuler === false && elem.drawInRuler) {

            separatorsMap.set(elem.name, vscode.window.createTextEditorDecorationType({

                isWholeLine: true,
                borderStyle: elem.style,
                borderWidth: width,
                borderColor: elem.color,
                opacity: "0%",
                overviewRulerColor: elem.color,
		        overviewRulerLane: 7
            }));
        }

        else {

            separatorsMap.set(elem.name, vscode.window.createTextEditorDecorationType({

                isWholeLine: true,
                borderStyle: elem.style,
                borderWidth: width,
                borderColor: elem.color,
                opacity: "0%"
            }));
        }
    });

    return(separatorsMap);
}

///
/** @returns A map that associates language <-> trigger pattern. */
export function getTriggerMappings(): Map<string, string> {

    let cfg = getSettings().get<TriggerMapping[]>("triggers") ?? getDefaultTriggers();

    // Construct the map.
    const triggerMap = new Map<string, string>();

    cfg.forEach((elem) => {

        elem.languages.forEach((lang) => {

            triggerMap.set(lang, elem.trigger);
        });
    });

    return(triggerMap);
}

///
/** @returns A set of all excluded languages. */
export function getExcludedLanguages(): Set<string> {

    const cfg = getSettings().get<string[]>("excluded") ?? getDefaultExcluded();
    const langs = new Set<string>();

    cfg.forEach((elem) => {

        langs.add(elem);
    });

    return(langs);
}

///
/** @returns The timeout. */
export function getTimeoutAmount(): number {

    return(getSettings().get<number>("timeout") ?? getDefaultTimeoutAmount());
}

///
/**
 * Triggers the drawing function immediately or after a timeout.
 * @param millis The timeout in milliseconds.
 * @param state The state object of the extension.
*/
export function triggerUpdateDecorations(millis: number, state: ExtensionState) {

    if(state.timeout !== undefined) {

        clearTimeout(state.timeout);
        state.timeout = undefined;
    }

    state.timeout = setTimeout(() => { updateDecorations(state); }, millis);
}

///
/**
 * Draws the separators on the currently focused text editor.
 * @param state The state object of the extension.
*/
function updateDecorations(state: ExtensionState) {

    // Check if editor is ok.
    if(!state.currentTextEditor) {

        return;
    }

    // Get the trigger pattern for the currently selected editor language.
    findLangTrigger(state);

    if(state.trigger === undefined) {
        
        return;
    }

    // Set the internal variables.
    const regex = new RegExp(state.trigger, "g");
    const text = state.currentTextEditor.document.getText();
    const separators = new Map<string, vscode.DecorationOptions[]>();
    let match;

    for(let key of state.separatorMappings.keys()) {

        separators.set(key, new Array<vscode.DecorationOptions>);
    }

    // Iterate on all matches and build the decorator array.
    while((match = regex.exec(text))) {

        if(match[0].length === state.trigger.length) {

            // Get the position of the line.
            const startPos = state.currentTextEditor.document.positionAt(match.index);

            // Extract the separator name.
            const line = state.currentTextEditor.document.lineAt(startPos);
            const name = line.text.substring(line.firstNonWhitespaceCharacterIndex + state.trigger.length);

            // Add a new start-end region for the appropriate decorator type.
            separators.get(name)?.push({range: new vscode.Range(startPos, startPos)});
        }
    }

    // Tell VSCode to render the decorators. One for each type.
    separators.forEach((value: vscode.DecorationOptions[], key: string) => {

        state.currentTextEditor!.setDecorations(state.separatorMappings.get(key)!, value);
    });
}

///
/**
 * Gets the trigger pattern for the currently active editor language.
 * @param state The state object of the extension.
 */
function findLangTrigger(state: ExtensionState) {

    if(state.trigger !== undefined) {

        return;
    }

    // Get the current editor language.
	let language = vscode.window.activeTextEditor?.document.languageId;

	if(language === undefined || "") {

		if(state.unknownLangAckd === false) {

			vscode.window.showWarningMessage(

				"CodeSeparator: The current editor language is unknown, deactivating..."
			);

			state.unknownLangAckd = true;
		}

        state.trigger = undefined;
	}

    else {

        // The extension should do nothing on languages that don't allow comments...
        if(!state.excludedLanguages.has(language)) {

            state.trigger = state.triggerMappings.get(language);

            if(state.trigger === undefined) {

                if(state.noMappingAckd === false) {

                    vscode.window.showWarningMessage(

                        "CodeSeparator: No mapping was found for the " + language +
                        " language, but you can add it in the settings. Deactivating..."
                    );

                    state.noMappingAckd = true;
                }
            }
        }

        else {

            state.trigger = undefined;
        }
    }
}

///
/** @returns The workspace configuration object from vscode of this extension. */
function getSettings(): vscode.WorkspaceConfiguration {

    return(vscode.workspace.getConfiguration("CodeSeparator"));
}

///