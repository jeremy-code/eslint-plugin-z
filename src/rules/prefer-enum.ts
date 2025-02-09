import {
  AST_NODE_TYPES,
  ASTUtils,
  TSESTree,
  type TSESLint,
} from "@typescript-eslint/utils";

import { isStringLiteral } from "../utils/ast/isStringLiteral";
import { createRule } from "../utils/createRule";
import { isBetween } from "../utils/helpers/isBetween";
import { isZodNamespace } from "../utils/isZodNamespace";

const isNodeZodStringLiteral = (
  node: TSESTree.Node | null | undefined,
  context: TSESLint.RuleContext<string, never[]>,
): node is TSESTree.CallExpression => {
  return (
    ASTUtils.isNodeOfType(AST_NODE_TYPES.CallExpression)(node) &&
    ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
    isZodNamespace(node.callee.object, context) &&
    ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
      name: "literal",
    })(node.callee.property) &&
    isBetween(node.arguments.length, [1, 2]) &&
    isStringLiteral(node.arguments[0])
  );
};

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "union",
          })(node.callee.property) &&
          isBetween(node.arguments.length, [1, 2]) &&
          ASTUtils.isNodeOfType(AST_NODE_TYPES.ArrayExpression)(
            node.arguments[0],
          ) &&
          node.arguments[0].elements.length > 0 &&
          node.arguments[0].elements.every((element) =>
            isNodeZodStringLiteral(element, context),
          )
        ) {
          const enumValues = node.arguments[0].elements
            .map(
              (element) => (element.arguments[0] as TSESTree.StringLiteral).raw,
            )
            .join(", ");

          context.report({
            node,
            messageId: "preferEnum",
            fix(fixer) {
              return fixer.replaceText(node, `z.enum([${enumValues}])`);
            },
          });
        }
      },
    };
  },
  meta: {
    type: "suggestion",
    docs: {
      description: "Suggest using z.enum instead of z.union with z.literal",
      recommended: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      preferEnum: "Use z.enum instead of z.union with z.literal.",
    },
  },
  name: "prefer-enum",
  defaultOptions: [],
});
