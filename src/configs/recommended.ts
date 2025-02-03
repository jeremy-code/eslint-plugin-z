import type { TSESLint } from "@typescript-eslint/utils";

export const recommended = {
  name: "eslint-plugin-z/recommended",
  rules: {
    "z/prefer-nullish": "warn",
  },
} satisfies TSESLint.FlatConfig.Config;
