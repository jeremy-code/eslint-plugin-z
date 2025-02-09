import { TSESTree, AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

export const isStringLiteral = (node: TSESTree.Node | null | undefined) =>
  ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal)(node) &&
  typeof node.value === "string";
