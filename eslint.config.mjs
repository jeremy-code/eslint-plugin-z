import eslint from "@eslint/js";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import importX from "eslint-plugin-import-x";
import pluginJest from "eslint-plugin-jest";
import globals from "globals";
import { defaults } from "jest-config";
import tseslint from "typescript-eslint";

// [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]
const TEST_FILE_GLOBS = defaults.testMatch;

export default tseslint.config(
  { ignores: ["dist"] },
  /**
   * Add `name` property to "recommended" ESLint config, which doesn't exist for compatibility
   *
   * @see {@link https://github.com/eslint/eslint/blob/main/packages/js/src/configs/eslint-recommended.js#L11}
   */
  { name: "@eslint/js/recommended", ...eslint.configs.recommended },
  tseslint["configs"].recommendedTypeChecked,
  comments.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
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
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
      ],
    },
  },
  {
    name: "jest/recommended",
    files: TEST_FILE_GLOBS,
    ...pluginJest.configs["flat/recommended"],
  },
  {
    files: TEST_FILE_GLOBS,
    ...eslintPlugin.configs["flat/tests-recommended"],
  },
  {
    files: TEST_FILE_GLOBS,
    rules: {
      // https://github.com/jest-community/eslint-plugin-jest/blob/HEAD/docs/rules/prefer-importing-jest-globals.md
      "jest/prefer-importing-jest-globals": "error",
    },
  },
  {
    files: ["**/*.{js,cjs,jsx,mjs}"],
    ...tseslint["configs"].disableTypeChecked,
  },
);
