import type { TSESLint } from "@typescript-eslint/utils";

import noDuplicateEnumValues from "./no-duplicate-enum-values";
import noThrowInRefine from "./no-throw-in-refine";
import preferEnum from "./prefer-enum";
import preferNonempty from "./prefer-nonempty";
import preferNullish from "./prefer-nullish";
import preferTuple from "./prefer-tuple";
import type { ZPluginDocs } from "../utils/createRule";

export const rules = {
  // problems
  "no-duplicate-enum-values": noDuplicateEnumValues,
  "no-throw-in-refine": noThrowInRefine,

  // suggestions
  "prefer-enum": preferEnum,
  "prefer-nonempty": preferNonempty,
  "prefer-nullish": preferNullish,
  "prefer-tuple": preferTuple,
} satisfies Record<string, TSESLint.RuleModule<string, [], ZPluginDocs>>;

export type Rule = keyof typeof rules;
