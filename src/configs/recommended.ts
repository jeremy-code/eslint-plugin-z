import type { TSESLint } from "@typescript-eslint/utils";

import { PLUGIN_NAMESPACE } from "../constants";
import type { rules } from "../rules";

const recommendedRules = {
  // problems
  "z/no-duplicate-enum-values": "error",
  "z/no-throw-in-refine": "error",

  // suggestions
  "z/prefer-enum": "warn",
  "z/prefer-nullish": "warn",
  "z/prefer-tuple": "warn",
} satisfies Record<
  `${typeof PLUGIN_NAMESPACE}/${keyof typeof rules}`,
  TSESLint.SharedConfig.RuleEntry
>;

export const recommended = {
  name: "eslint-plugin-z/recommended",
  rules: recommendedRules,
} satisfies TSESLint.FlatConfig.Config;
