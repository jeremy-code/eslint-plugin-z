import type { TSESLint } from "@typescript-eslint/utils";

import type { rules } from "../rules";

const recommendedRules = {
  // problems
  "z/no-duplicate-enum-values": "error",

  // suggestions
  "z/prefer-nullish": "warn",
  "z/prefer-tuple": "warn",
} satisfies Record<`z/${keyof typeof rules}`, TSESLint.SharedConfig.RuleEntry>;

export const recommended = {
  name: "eslint-plugin-z/recommended",
  rules: recommendedRules,
} satisfies TSESLint.FlatConfig.Config;
