import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { isExpression } from "../utils/ast/isExpression";
import { isUndefinedIdentifier } from "../utils/ast/isUndefinedIdentifier";
import { createRule } from "../utils/createRule";
import { isBetween } from "../utils/helpers/isBetween";
import { isCustomErrorParams } from "../utils/isCustomErrorParams";

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "refine",
          })(node.callee.property) &&
          isBetween(node.arguments.length, [1, 2]) &&
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

          throwStatements.forEach((throwStatement) => {
            context.report({
              node: throwStatement,
              messageId: "noThrowInRefine",
            });
          });
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
      noThrowInRefine: "Do not throw errors in a refine method.",
    },
  },
  name: "no-throw-in-refine",
  defaultOptions: [],
});
