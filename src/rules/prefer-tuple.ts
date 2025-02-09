import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { getNodeChain } from "../utils/ast/getNodeChain";
import { createRule } from "../utils/createRule";
import { isBetween } from "../utils/helpers/isBetween";
import { isZodNamespace } from "../utils/isZodNamespace";

const ARRAY_METHODS = ["min", "max", "length", "nonempty"];

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "length",
          })(node.callee.property) &&
          isBetween(node.arguments.length, [1, 2]) && // z.array().length() has 1 or 2 arguments
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Literal, {
            value: 1, // z.array().length(1)
          })(node.arguments[0])
        ) {
          const nodeChain = getNodeChain(node);
          const rootNode = nodeChain?.at(0);

          if (
            nodeChain &&
            nodeChain.length >= 2 &&
            rootNode !== undefined &&
            isZodNamespace(rootNode, context)
          ) {
            if (
              ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
                name: "array",
              })(nodeChain.at(-2))
            ) {
              return context.report({
                node,
                messageId: "useTuple",
              });
            }

            const arrayIndex = nodeChain.findLastIndex(
              (node) => node.name === "array",
            );

            // .array() is not in chain
            if (arrayIndex === -1) {
              return;
            }

            // Possibly, a chain of array methods, such as z.array().nonempty().min(1).max(1).length(1)
            if (
              nodeChain
                .slice(arrayIndex + 1)
                .every((node) => ARRAY_METHODS.includes(node.name))
            ) {
              return context.report({
                node,
                messageId: "useTuple",
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
        "Enforce usage of `z.tuple([z.schema()])` instead of `z.schema().array().length(1)` in Zod schemas.",
      recommended: true,
      requiresTypeChecking: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      useTuple:
        "Use `z.tuple([z.schema()])` instead of `z.schema().array().length(1)`.",
    },
  },
  name: "prefer-tuple",
  defaultOptions: [],
});
