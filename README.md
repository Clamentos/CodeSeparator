# CodeSeparator

This extremely simple extension can be used to improve readability of your code by placing separator lines in any point you want.

## Features

Typing triple forward-slash `///`, `<!---->`, `##`, `---` or other special comment sequences (depending on the language), will trigger CodeSeparator which will draw a horizontal line across the text area.

![Preview](https://github.com/Clamentos/CodeSeparator/blob/main/resources/preview.gif)

## Requirements

No external dependency is needed for running this extension.

## Extension Settings

CodeSeparator provides the following settings to customize the appearence of the separator lines:

* `CodeSeparator.color`: Sets the color of the line (in hex).
* `CodeSeparator.style`: Sets the style of the line. Choose between: `solid`, `dotted` or `dashed`.
* `CodeSeparator.thickness`: Sets the thickness of the line in pixels.
* `CodeSeparator.position`: Sets the position of the separator, either at the top or at the bottom.
* `CodeSeparator.showInRuler`: Sets the visibility of the separators in the overview ruler (right-side scrollbar).
* `CodeSeparator.triggers`: Set the trigger patterns for each individual language via a simple JSON. The format is the following:

    ```
    [
        {
            "language": "string",
            "trigger": "string"
        },
        ...
    ]
    ```
Reloading the window might be necessary after changing the settings.

## Known Issues

None so far. If you encounter one, don't hesitate to open an issue on the GitHub repo.

## Release Notes

None.

### Version 1.0.1

1. Fixed the warning message re-appearing every time on languages with no mappings. Now it will only show once.
2. Added the ability to set the visibility of the separators in the overview ruler (right-side scrollbar).
3. Added some new language mappings.

**Enjoy!**