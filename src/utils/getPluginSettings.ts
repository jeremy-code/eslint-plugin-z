import { TSESLint } from "@typescript-eslint/utils";

// Settings equivalent to reactNamespace ("React"), jsxImportSource from
// tsconfig.json ("react")
export type PluginSettings = {
  /** @default "z" */
  zodNamespace: string;
  /** @default "zod" */
  zodImportSource: string;
};

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
