import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils/createRule";
import { isZodNamespace } from "../utils/isZodNamespace";

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          isZodNamespace(node.callee.object, context) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "enum",
          })(node.callee.property)
        ) {
          if (
            ASTUtils.isNodeOfType(AST_NODE_TYPES.ArrayExpression)(
              node.arguments[0],
            )
          ) {
            const enumValues = new Set();

            for (const element of node.arguments[0].elements) {
              if (
                element === null ||
                !ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal)(element)
              ) {
                return;
              }

              if (enumValues.has(element.value)) {
                context.report({
                  node: element,
                  messageId: "duplicateValue",
                  data: { value: element.value },
                });
              } else {
                enumValues.add(element.value);
              }
            }
          }
        }
      },
    };
  },
  meta: {
    type: "problem",
    docs: {
      description: "Disallow duplicate enum member values",
      recommended: true,
      requiresTypeChecking: false,
    },
    hasSuggestions: false,
    messages: {
      duplicateValue: "Duplicate enum member value {{value}}.",
    },
    fixable: "code",
    schema: [],
  },
  name: "no-duplicate-enum-values",
  defaultOptions: [],
});
