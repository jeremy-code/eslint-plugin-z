import type { TSESLint } from "@typescript-eslint/utils";

export const recommended = {
  name: "eslint-plugin-z/recommended",
  rules: {
    "z/no-duplicate-enum-values": "error",
    "z/prefer-nullish": "warn",
  },
} satisfies TSESLint.FlatConfig.Config;
