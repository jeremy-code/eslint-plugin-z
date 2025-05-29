/**
 * An ESLint plugin for linting Zod schemas.
 *
 * @packageDocumentation
 */

import { recommended } from "./configs/recommended";
import { PLUGIN_NAME, PLUGIN_NAMESPACE, PLUGIN_VERSION } from "./constants";
import { rules } from "./rules";
import { PluginSettings } from "./utils/getPluginSettings";

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    z?: Partial<PluginSettings>;
  }
}

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
        get [PLUGIN_NAMESPACE](): typeof plugin {
          return plugin;
        },
      },
    },
    recommendedLegacy: {
      ...recommended,
      extends: ["plugin:z/recommended"],
    },
  },
};

const { configs } = plugin;

export { plugin, configs, plugin as default };
