/**
 * An ESLint plugin for linting Zod schemas.
 *
 * @packageDocumentation
 */

import { TSESLint } from "@typescript-eslint/utils";

import { recommended } from "./configs/recommended";
import { PLUGIN_NAME, PLUGIN_VERSION } from "./constants";
import { rules } from "./rules";
import { PluginSettings } from "./utils/getPluginSettings";

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    z?: Partial<PluginSettings>;
  }
}

// Omit `configs` from Plugin type to avoid index signature conflicts
type Plugin = Omit<TSESLint.FlatConfig.Plugin, "configs"> & {
  configs: {
    recommended: TSESLint.FlatConfig.Config;
    recommendedLegacy: TSESLint.ClassicConfig.Config;
  };
};

const plugin = {
  /**
   * @see {@link https://eslint.org/docs/latest/extend/plugins#meta-data-in-plugins}
   */
  meta: { name: PLUGIN_NAME, version: PLUGIN_VERSION },
  rules,
  configs: {
    recommended: {
      ...recommended,
      plugins: {
        get z(): Plugin {
          return plugin;
        },
      },
    },
    recommendedLegacy: {
      ...recommended,
      plugins: [PLUGIN_NAME],
    },
  },
} satisfies Plugin;

const { configs } = plugin;

export { plugin, configs, plugin as default };
