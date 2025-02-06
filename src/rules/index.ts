import type { TSESLint } from "@typescript-eslint/utils";

import noDuplicateEnumValues from "./no-duplicate-enum-values";
import preferNullish from "./prefer-nullish";
import preferTuple from "./prefer-tuple";
import type { ZPluginDocs } from "../utils/createRule";

export const rules = {
  // problems
  "no-duplicate-enum-values": noDuplicateEnumValues,

  // suggestions
  "prefer-nullish": preferNullish,
  "prefer-tuple": preferTuple,
} satisfies Record<string, TSESLint.RuleModule<string, [], ZPluginDocs>>;
