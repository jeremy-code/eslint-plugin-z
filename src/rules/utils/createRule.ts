import { ESLintUtils } from "@typescript-eslint/utils";

import { PLUGIN_REPOSITORY_URL, PLUGIN_VERSION } from "../../constants";

export interface ZPluginDocs {
  description: string;
  recommended?: boolean;
  requiresTypeChecking?: boolean;
}

export const createRule = ESLintUtils.RuleCreator<ZPluginDocs>(
  (ruleName) =>
    `${PLUGIN_REPOSITORY_URL}/blob/v${PLUGIN_VERSION}/docs/rules/${ruleName}.md`,
);
