import eslint from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import pluginImportX, { createNodeResolver } from "eslint-plugin-import-x";
import pluginJest from "eslint-plugin-jest";
import globals from "globals";
import { defaults } from "jest-config";
import tseslint from "typescript-eslint";

// [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
const TEST_FILE_GLOBS = defaults.testMatch;

export default defineConfig(
  /**
   * Set global ignore patterns for build artifacts
   *
   * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores}
   */
  globalIgnores(["dist/"]),
  /**
   * Add `name` property to "recommended" ESLint config, which doesn't exist for compatibility
   *
   * @see {@link https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js#L11}
   */
  { name: "@eslint/js/recommended", ...eslint.configs.recommended },
  tseslint["configs"].recommendedTypeChecked,
  comments.recommended,
  pluginImportX["flatConfigs"].recommended,
  pluginImportX["flatConfigs"].typescript,
  eslintPlugin.configs["flat/recommended"],
  {
    linterOptions: {
      reportUnusedInlineConfigs: "error",
    },
    languageOptions: {
      parserOptions: {
        /**
         * Automatically load `tsconfig.json` files for typed linting rules
         *
         * @see {@link https://typescript-eslint.io/packages/parser/#projectservice}
         */
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    rules: {
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md}
       */
      "import-x/newline-after-import": ["error", { considerComments: true }],
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md}
       */
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "import-x/namespace": ["error", { allowComputed: true }],
    },
    settings: {
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/pull/192}
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/issues/40#issuecomment-2381444266}
       */
      "import/resolver-next": [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
    },
  },
  {
    files: TEST_FILE_GLOBS,
    extends: [
      pluginJest.configs["flat/recommended"],
      eslintPlugin.configs["flat/tests-recommended"],
      {
        rules: {
          /**
           * @see {@link https://github.com/jest-community/eslint-plugin-jest/blob/HEAD/docs/rules/prefer-importing-jest-globals.md}
           */
          "jest/prefer-importing-jest-globals": "error",
        },
      },
    ],
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    ...tseslint["configs"].disableTypeChecked,
  },
);
