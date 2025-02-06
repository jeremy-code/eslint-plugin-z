import { ASTUtils, TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

export const isImportClause: (
  node: TSESTree.Node | null | undefined,
) => node is TSESTree.ImportClause = ASTUtils.isNodeOfTypes([
  AST_NODE_TYPES.ImportSpecifier,
  AST_NODE_TYPES.ImportDefaultSpecifier,
  AST_NODE_TYPES.ImportNamespaceSpecifier,
]);
