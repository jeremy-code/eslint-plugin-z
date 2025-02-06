import type { TSESLint } from "@typescript-eslint/utils";

import { recommended } from "./configs/recommended";
import { PLUGIN_NAME, PLUGIN_VERSION } from "./constants";
import { rules } from "./rules";

declare module "@typescript-eslint/utils/ts-eslint" {
  export interface SharedConfigurationSettings {
    z?: {
      /** @default "z" */
      zodNamespace?: string;
      /** @default "zod" */
      zodImportSource?: string;
    };
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
        get z(): TSESLint.FlatConfig.Plugin {
          return plugin;
        },
      },
    },
  },
} satisfies TSESLint.FlatConfig.Plugin;

const { configs } = plugin;

export { plugin, configs, plugin as default };
