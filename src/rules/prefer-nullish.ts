import { TSESTree } from "@typescript-eslint/utils";

import { createRule } from "./utils/createRule";
import { getNodeChain } from "./utils/getNodeChain";

export default createRule({
  create(context) {
    return {
      ":matches(CallExpression[callee.object.callee.property.name='nullable'][callee.property.name='optional'], CallExpression[callee.object.callee.property.name='optional'][callee.property.name='nullable'])"(
        node: TSESTree.CallExpression,
      ) {
        const chain = getNodeChain(node);
        if (!chain || chain.length < 2) return;

        let sequence: [TSESTree.Identifier, TSESTree.Identifier] | undefined;

        for (let i = 0; i < chain.length - 1; i++) {
          const [current, next] = [chain[i], chain[i + 1]];
          if (
            (current?.name === "nullable" && next?.name === "optional") ||
            (current?.name === "optional" && next?.name === "nullable")
          ) {
            sequence = [current, next];
            break;
          }
        }

        if (!sequence) return;

        return context.report({
          node,
          messageId: "useNullish",
          fix: (fixer) =>
            fixer.replaceTextRange(
              [sequence[0].range[0], sequence[1].range[1]],
              "nullish",
            ),
        });
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
