import * as vscode from 'vscode';

// This extension is eavily based on the VSCode extension-API examples (decorator sample).
export function activate(context: vscode.ExtensionContext) {

	console.log("CodeSeparator registered");

	let timeout: NodeJS.Timer | undefined = undefined;
	let activeEditor = vscode.window.activeTextEditor;

	// Get some of the settings.
	const cnf_color = (String)(vscode.workspace.getConfiguration("CodeSeparator").get("color"));
	const cnf_style = (String)(vscode.workspace.getConfiguration("CodeSeparator").get("style"));
	const cnf_width = (String)(vscode.workspace.getConfiguration("CodeSeparator").get("thickness"));
	const cnf_position = (String)(vscode.workspace.getConfiguration("CodeSeparator").get("position"));
	const trigger_mappings = constructMap();

	// Define the decorator size, color, position, etc...
	const separatorDecorator = vscode.window.createTextEditorDecorationType({

		isWholeLine: true,
		borderStyle: cnf_style,
		borderWidth: cnf_position === "top" ? (cnf_width + "px 0 0 0") : ("0 0" + cnf_width + "px 0"),
		borderColor: cnf_color,
		opacity: "0%"
	});

	// Function to update and draw the decorators.
	function updateDecorations() {

		// Check if editor is ok.
		if(!activeEditor) {
			
			return;
		}

		// Get the trigger pattern for the currently selected editor language.
		const trg = findLangTrigger();

		if(trg === "") {

			return;
		}

		const regex = new RegExp(trg, "g");
		const text = activeEditor.document.getText();
		const separators: vscode.DecorationOptions[] = [];

		let start_pos;
		let match;

		while((match = regex.exec(text))) { // Iterate on all matches.

			start_pos = activeEditor.document.positionAt(match.index);

			if(match[0].length === trg.length) {

				// Position isn't really necessary because the decoration is across the whole text line.
				// VSCode wants it non-empty though.
				separators.push({range: new vscode.Range(start_pos, start_pos)});
			}
		}

		// Tell VSCode to render the decorators.
		activeEditor.setDecorations(separatorDecorator, separators);
	}

	// This function gets the trigger pattern for the currently active editor language.
	// If something went wrong, return empty string "", else the string will be well-defined.
	function findLangTrigger(): string {

		let trigger: string | undefined;
		let language = vscode.window.activeTextEditor?.document.languageId;

		if(language === null || language === undefined || language === "") {

			vscode.window.showWarningMessage(

				"CodeSeparator: The current editor language is unknown, deactivating."
			);

			return("");
		}

		trigger = trigger_mappings.get(language);

		if(trigger === undefined) {

			vscode.window.showWarningMessage(

				"CodeSeparator: No mapping was found for the " + language +
				" language, but you can add it in the settings. deactivating."
			);

			return("");
		}

		return(trigger);
	}

	// This function builds the hash map that contains the language <-> trigger mappings.
	function constructMap(): Map<string, string> {

		// Used to cast unknown to an array of these objects.
		interface obj {

			language: string,
			trigger: string
		}

		// Get the list from the settings.
		const triggers = vscode.workspace.getConfiguration("CodeSeparator").get("triggers") as Array<obj>;
		let trigger_map = new Map<string, string>();

		// Transform the list into a map.
		triggers.forEach((elem) => {

			console.log("dbg " + elem.trigger);
			trigger_map.set(elem.language, elem.trigger);
		});

		return(trigger_map);
	}

	// Periodic timeout.
	function triggerUpdateDecorations(throttle = false) {

		if(timeout) {

			clearTimeout(timeout);
			timeout = undefined;
		}

		if(throttle) {

			timeout = setTimeout(updateDecorations, 500);
		}

		else {

			updateDecorations();
		}
	}

	if(activeEditor) {

		triggerUpdateDecorations();
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {

		activeEditor = editor;

		if(editor) {

			triggerUpdateDecorations();
		}

	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(event => {

		if(activeEditor && event.document === activeEditor.document) {

			triggerUpdateDecorations(true);
		}

	}, null, context.subscriptions);
}