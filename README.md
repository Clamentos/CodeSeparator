# CodeSeparator

This extremely simple extension can be used to improve readability of your code by placing separator lines in any point you want.

## Features

Typing triple forward-slash `///`, `<!---->`, `##`, `---` or other special comment sequences (depending on the language), will trigger CodeSeparator which will draw a horizontal line across the text area.

gif goes here...

## Requirements

No external dependency is needed for running this extension.

## Extension Settings

CodeSeparator provides the following settings to customize the appearence of the separator lines:

* `CodeSeparator.color`: Sets the color of the line (in hex).
* `CodeSeparator.style`: Sets the style of the line. Choose between: `solid`, `dotted` or `dashed`.
* `CodeSeparator.thickness`: Sets the thickness of the line in pixels.
* `CodeSeparator.position`: Sets the position of the separator, either at the top or at the bottom.
* `CodeSeparator.triggers`: Set the trigger patterns for each individual language via a simple JSON. The format is the following:

    ```
    [
        {
            "language": "string",
            "trigger": "string"
        },
        ...
    ]
Reloading the window might be necessary after changing the settings.

## Known Issues

None so far. If you encounter one, don't hesitate to open an issue on the GitHub repo.

## Release Notes

None.

### Version 1.0.0

Initial release of CodeSeparator.

**Enjoy!**