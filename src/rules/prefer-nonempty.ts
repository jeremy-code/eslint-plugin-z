import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

import { getNodeChain } from "../utils/ast/getNodeChain";
import { createRule } from "../utils/createRule";
import { isBetween } from "../utils/helpers/isBetween";
import { isZodNamespace } from "../utils/isZodNamespace";

const ARRAY_METHODS = [
  "min",
  "max",
  "length",
  // "nonempty" // if .nonempty() is already used, there's no need to replace .min(1) with it
];

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        const nodeCallee = node.callee;
        const minArgument = node?.arguments?.at(0);

        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(nodeCallee) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "min",
          })(nodeCallee.property) &&
          isBetween(node.arguments.length, [1, 2]) && // z.array().min() has 1 or 2 arguments
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Literal, {
            value: 1, // z.array().length(1)
          })(minArgument)
        ) {
          const nodeChain = getNodeChain(node);
          const rootNode = nodeChain?.at(0);

          if (
            nodeChain !== null &&
            nodeChain?.length >= 2 &&
            rootNode !== undefined &&
            isZodNamespace(rootNode, context)
          ) {
            const arrayIndex = nodeChain.findIndex(
              ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
                name: "array",
              }),
            );
            // Find the index of the first `.min()` after `.array()`
            const minIndex =
              nodeChain.slice(arrayIndex).findIndex(
                ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
                  name: "min",
                }),
              ) + arrayIndex;

            if (arrayIndex === -1 || minIndex === -1) {
              return;
            }

            if (
              nodeChain
                .slice(arrayIndex + 1, minIndex)
                .every((node) => ARRAY_METHODS.includes(node.name))
            ) {
              return context.report({
                node,
                messageId: "useNonempty",
                fix: (fixer) => {
                  // Replace z.array().min(1) with z.array().nonempty()
                  return [
                    fixer.replaceText(nodeCallee.property, "nonempty"), // min -> nonempty
                    fixer.remove(minArgument), // nonempty(1) -> nonempty()
                  ];
                },
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
        "Enforce usage of `z.schema.array().nonempty()` instead of `z.schema().array().min(1)` in Zod schemas.",
      recommended: true,
      requiresTypeChecking: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      useNonempty:
        "Use `z.schema.array().nonempty()` instead of `z.schema().array().min(1)`.",
    },
  },
  name: "prefer-nonempty",
  defaultOptions: [],
});
