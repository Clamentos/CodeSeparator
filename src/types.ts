import * as vscode from 'vscode';

///
/**
 * Type encapsulating the whole state of the extension.
 * @param timeout Used to set a "cooldown" period after the user wrote on the text editor.
 * @param currentTextEditor Currently focused text editor.
 * @param trigger The current trigger pattern.
 * @param separatorMappings The separator name <-> separator mappings.
 * @param triggerMappings The language <-> trigger pattern mappings.
 * @param excludedLanguages The set of excluded languages.
 * @param noMappingAckd User popup acknowledge that the current editor language has no mapping.
 * @param unknownLangAckd User popup acknowledge that the current editor language is unknown by vscode.
*/
export type ExtensionState = {

	timeout: NodeJS.Timer | undefined,
	currentTextEditor: vscode.TextEditor | undefined,
    trigger: string | undefined,
    separatorMappings: Map<string, vscode.TextEditorDecorationType>,
    triggerMappings: Map<string, string>,
    excludedLanguages: Set<string>,
	noMappingAckd: boolean,
	unknownLangAckd: boolean
};

///
/**
 * Separator style properties.
 * @param name The name of the separator.
 * @param color The color of the separator line (in hex).
 * @param style The separator line style.
 * @param thickness The separator line thickness in px.
 * @param onBottom Draw the separator line at the bottom edge of the line, else top.
 * @param drawInRuler Specifies if to show the separator in the ruler too or not.
*/
export type SeparatorType = {

    name: string,
    color: string,
    style: "solid" | "dotted" | "dashed",
    thickness: number,
    onBottom: boolean,
    drawInRuler: boolean
};

///
/**
 * Trigger to languages mapping.
 * @param trigger The trigger pattern.
 * @param languages The languages for that pattern.
*/
export type TriggerMapping = {

    trigger: string,
    languages: string[]
};

///