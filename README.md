# CodeSeparator

This extremely simple extension can be used to improve the readability of your code by placing customizable separator lines in any point you want.

## Features

Typing: `///`, `<!---->`, `##`, `---` or other special comment sequences (depending on the language), will trigger the extension which will draw a horizontal line across the text area.

<img src ="https://github.com/Clamentos/CodeSeparator/blob/main/resources/preview.gif?raw=true"/>

## Extension Settings

CodeSeparator provides the following settings:

* `hideInRuler`: Hides the visibility of all separators in the overview ruler on the right.
* `timeout`: Sets the scan wait time (in milliseconds) between edits.
* `triggers`: Sets the trigger pattern for each language via a simple JSON specified in the following format:

    ```json
    [
      {
        "trigger": "///",
        "languages": [
            "c",
            "java",
            "javascript"
        ]
      },
      {
        "trigger": "##",
        "languages": [
            "python",
            "yaml",
        ]
      }
    ]
    ```

* `separatorTypes`: Sets the separator styles via a simple JSON. Writing the separator name after the trigger, will cause CodeSeparator to reder the specific matching separator style:

    ```json
    [
      {
        "name": "",
        "color": "#666666",
        "style": "solid",
        "thickness": 2,
        "onBottom": false,
        "drawInRuler": true
      },
      {
        "name": ".",
        "color": "#888888",
        "style": "dotted",
        "thickness": 2,
        "onBottom": false,
        "drawInRuler": true
      }
    ]
    ```
* `excluded`: Sets the excluded languages via a simple JSON array of strings:

    ```json
    [
      "json"
    ]
    ```
Reloading the window is necessary after changing the settings.

## Building from source

VSCode extensions are `.vsix` files that can be directly installed into the editor. In order to generate such file from the source code, perform the following steps (requires `Node.js` installed):

1. Clone this repository into your local machine.
2. Open the terminal and navigate to the root directory of the previously cloned repository: `CodeSeparator`.
3. Install `vsce` if you don't have it already, with the following command:
```console
npm install -g @vscode/vsce
```
4. Generate the `.vsix` package with the following command:
```console
vsce package
```
5. The package is now ready to be manually installed into VSCode. To do that, please follow the instructions on https://github.com/Clamentos/CodeSeparator/releases

### Version 2.0.0

Heavy remake of the extension:

1. Changed the JSON structure of the triggers in the settings. Now it should be more compact and readable.
2. Added the option to define multiple types of styles. Each style can be called from the text editor by writing the name of the style after the trigger sequence.
3. Added the option to exclude languages.
4. Added more recognized languages.
5. Fixed a bug where writing a trigger sequence outside of comments (such as a string variable) would cause the extension to draw the separator.

**Enjoy!**