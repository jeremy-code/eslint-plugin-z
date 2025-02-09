import { TSESLint } from "@typescript-eslint/utils";

// Settings equivalent to reactNamespace ("React"), jsxImportSource from
// tsconfig.json ("react")
export interface PluginSettings {
  /**
   * Specify the object called from `zod` package that contains all the exported
   * schemas.
   *
   * @defaultValue `"z"`
   */
  zodNamespace: string;
  /**
   * Specify the import source of the `zod` package.
   *
   * @defaultValue `"zod"`
   */
  zodImportSource: string;
}

const DEFAULT_PLUGIN_SETTINGS: PluginSettings = {
  zodNamespace: "z",
  zodImportSource: "zod",
};

export const getPluginSettings = (
  settings: TSESLint.SharedConfigurationSettings,
): PluginSettings =>
  settings.z === undefined ?
    DEFAULT_PLUGIN_SETTINGS
  : { ...DEFAULT_PLUGIN_SETTINGS, ...settings.z };
