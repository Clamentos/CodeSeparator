import { SeparatorType, TriggerMapping } from "./types";

///
/**
 * Use when the configuration is broken or missing.
 * @returns An array with the default separator types.
*/
export function getDefaultSeparatorType(): SeparatorType {

    return({

        name: "",
        color: "#666666",
        style: "solid",
        thickness: 2,
        onBottom: false,
        drawInRuler: true
    });
}

///
/**
 * Use when the configuration is broken or missing.
 * @returns The default hide in ruler parameter.
*/
export function getDefaultHideInRuler(): boolean {

    return(false);
}

///
/**
 * Use when the configuration is broken or missing.
 * @returns An array with the default excluded languages.
*/
export function getDefaultExcluded(): string[] {

    return([

        "json"
    ]);
}

///
/**
 * Use when the configuration is broken or missing.
 * @returns The default timeout parameter.
*/
export function getDefaultTimeoutAmount(): number {

    return(250);
}

///
/**
 * Use when the configuration is broken or missing.
 * @returns The default language trigger mappings.
*/
export function getDefaultTriggers(): TriggerMapping[] {

    return([

        {
            trigger: "///",
            languages: [

                "c",
                "cpp",
                "csharp",
                "css",
                "cuda-cpp",
                "fsharp",
                "go",
                "groovy",
                "java",
                "javascript",
                "javascriptreact",
                "jsonc",
                "kotlin",
                "objective-c",
                "objective-cpp",
                "plaintext",
                "php",
                "rust",
                "sass",
                "scala",
                "scss",
                "swift",
                "typescript",
                "typescriptreact",
                "verilog",
                "systemverilog"
            ]
        },
        {
            trigger: ";;;",
            languages: [

                "clojure"
            ]
        },
        {
            trigger: "%%",
            languages: [

                "latex"
            ]
        },
        {
            trigger: "##",
            languages: [

                "dockercompose",
                "dockerfile",
                "java-properties",
                "perl",
                "perl6",
                "python",
                "r",
                "ruby",
                "yaml"
            ]
        },
        {
            trigger: "---",
            languages: [

                "lua",
                "sql",
                "vhdl"
            ]
        },
        {
            trigger: "<!---->",
            languages: [

                "html",
                "markdown",
                "vue",
                "vue-html",
                "xml"
            ]
        }
    ]);
}

///