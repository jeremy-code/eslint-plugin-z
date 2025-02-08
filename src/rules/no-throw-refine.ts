import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils/createRule";
import { isCustomErrorParams } from "../utils/isCustomErrorParams";
import { isExpression } from "../utils/isExpression";
import { isUndefinedIdentifier } from "../utils/isUndefinedIdentifier";

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "refine",
          })(node.callee.property) &&
          node.arguments.length <= 2 &&
          ASTUtils.isFunction(node.arguments[0]) &&
          (isCustomErrorParams(node.arguments[1]) ||
            ASTUtils.isFunction(node.arguments[1]) ||
            isUndefinedIdentifier(node.arguments[1]) ||
            node.arguments.length === 1)
        ) {
          // Unless this proposal is accepted, throw expressions do not exist
          // https://github.com/tc39/proposal-throw-expressions
          if (isExpression(node.arguments[0].body)) {
            return;
          }

          const throwStatements = node.arguments[0].body.body.filter(
            (statement) =>
              ASTUtils.isNodeOfType(AST_NODE_TYPES.ThrowStatement)(statement),
          );

          if (throwStatements.length === 0) {
            return;
          }

          for (const throwStatement of throwStatements) {
            context.report({
              node: throwStatement,
              messageId: "noThrowRefine",
            });
          }
        }
      },
    };
  },
  meta: {
    type: "problem",
    docs: {
      description: "Disallow throwing errors in a refine method",
      recommended: true,
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      noThrowRefine: "Do not throw errors in a refine method.",
    },
  },
  name: "no-throw-refine",
  defaultOptions: [],
});
