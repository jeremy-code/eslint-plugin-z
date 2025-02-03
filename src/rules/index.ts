import type { TSESLint } from "@typescript-eslint/utils";

import preferNullish from "./prefer-nullish";
import type { ZPluginDocs } from "./utils/createRule";

export const rules = {
  "prefer-nullish": preferNullish,
} satisfies Record<string, TSESLint.RuleModule<string, [], ZPluginDocs>>;
