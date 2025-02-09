import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { getNodeChain } from "../utils/ast/getNodeChain";
import { createRule } from "../utils/createRule";
import { isZodNamespace } from "../utils/isZodNamespace";

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        // is of form method1().method2()
        if (
          // .optional() and .nullable() have no arguments as a convenience method
          node.arguments.length === 0 &&
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          ASTUtils.isIdentifier(node.callee.property) &&
          ASTUtils.isNodeOfType(AST_NODE_TYPES.CallExpression)(
            node.callee.object,
          ) &&
          node.callee.object.arguments.length === 0 &&
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(
            node.callee.object.callee,
          ) &&
          ASTUtils.isIdentifier(node.callee.object.callee.property)
        ) {
          // is of form .nullable().optional() or .optional().nullable()
          if (
            (node.callee.property.name === "optional" &&
              node.callee.object.callee.property.name === "nullable") ||
            (node.callee.property.name === "nullable" &&
              node.callee.object.callee.property.name === "optional")
          ) {
            const nodeChain = getNodeChain(node);

            if (
              nodeChain === null ||
              nodeChain[0] === undefined ||
              nodeChain.length <= 3 // Avoid z.optional(z.string()).nullable()
            ) {
              return;
            }

            if (isZodNamespace(nodeChain[0], context)) {
              const [secondLast, last] = nodeChain.slice(-2);

              if (secondLast === undefined || last === undefined) {
                return;
              }

              return context.report({
                node,
                messageId: "useNullish",
                fix: (fixer) =>
                  fixer.replaceTextRange(
                    [secondLast.range[0], last.range[1]],
                    "nullish",
                  ),
              });
            }
          }
        }
      },
    };
  },
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Enforce usage of `z.nullish()` instead of `z.null().optional()` or `z.optional().null()` in Zod schemas.",
      recommended: true,
      requiresTypeChecking: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      useNullish:
        "Use `z.nullish()` instead of `z.null().optional()` or `z.optional().null()`.",
    },
  },
  name: "prefer-nullish",
  defaultOptions: [],
});
