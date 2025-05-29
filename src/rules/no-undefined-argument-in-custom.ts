import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { isUndefinedIdentifier } from "../utils/ast/isUndefinedIdentifier";
import { createRule } from "../utils/createRule";
import { isBetween } from "../utils/helpers/isBetween";
import { isZodNamespace } from "../utils/isZodNamespace";

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          isZodNamespace(node.callee.object, context) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "custom",
          })(node.callee.property)
        ) {
          if (
            node.arguments.length === 0 ||
            (isBetween(node.arguments.length, [1, 2]) &&
              isUndefinedIdentifier(node.arguments[0]))
          ) {
            return context.report({
              node,
              messageId: "noUndefinedArgumentInCustom",
            });
          }
        }
      },
    };
  },
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Suggest using z.any() instead of z.custom() with no arguments",
      recommended: true,
    },
    fixable: "code",
    schema: [],
    messages: {
      noUndefinedArgumentInCustom:
        "Use z.any() instead of z.custom() with no arguments.",
    },
  },
  name: "no-undefined-argument-in-custom",
  defaultOptions: [],
});
