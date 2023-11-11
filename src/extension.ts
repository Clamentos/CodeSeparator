///
import * as vscode from 'vscode';
import { ExtensionState } from './types';
import {
	
	getSeparatorMappings,
	getTimeoutAmount,
	getTriggerMappings,
	getExcludedLanguages,
	triggerUpdateDecorations

} from './functions';

///
/**
 * The main extension function.
 * 
 * This extension is heavily based on the VSCode extension-API examples (decorator sample).
 * @param context The context provided by vscode.
*/
export function activate(context: vscode.ExtensionContext) {

	// Initialize the state.
	const state: ExtensionState = {

		timeout: undefined,
		currentTextEditor: vscode.window.activeTextEditor,
		trigger: undefined,
		separatorMappings: getSeparatorMappings(),
		triggerMappings: getTriggerMappings(),
		excludedLanguages: getExcludedLanguages(),
		noMappingAckd: false,
		unknownLangAckd: false
	};

	const millis = getTimeoutAmount();

	// If the editor is ready -> draw.
	// Only done once when the editor & extension starts.
	if(state.currentTextEditor !== undefined) {

		triggerUpdateDecorations(0, state);
	}

	// If the user focused an editor -> draw.
	vscode.window.onDidChangeActiveTextEditor(editor => {

		state.currentTextEditor = editor;

		if(editor) {

			state.trigger = undefined;
			triggerUpdateDecorations(0, state);
		}

	}, null, context.subscriptions);

	// If the user wrote something -> draw.
	vscode.workspace.onDidChangeTextDocument(event => {

		if(state.currentTextEditor && event.document === state.currentTextEditor.document) {

			state.trigger = undefined;
			triggerUpdateDecorations(millis, state);
		}

	}, null, context.subscriptions);
}

///