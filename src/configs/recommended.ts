import type { TSESLint } from "@typescript-eslint/utils";

import { PLUGIN_NAMESPACE } from "../constants";
import type { Rule } from "../rules";

const recommendedRules = {
  // Problems
  "z/no-duplicate-enum-values": "error",
  "z/no-throw-in-refine": "error",

  // Suggestions
  "z/prefer-enum": "warn",
  "z/prefer-nonempty": "warn",
  "z/prefer-nullish": "warn",
  "z/prefer-tuple": "warn",
} satisfies Record<
  `${typeof PLUGIN_NAMESPACE}/${Rule}`,
  TSESLint.SharedConfig.RuleEntry
>;

export const recommended = {
  name: "eslint-plugin-z/recommended",
  rules: recommendedRules,
} satisfies TSESLint.FlatConfig.Config;
