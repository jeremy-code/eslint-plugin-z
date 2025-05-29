import type { TSESTree } from "@typescript-eslint/utils";
import { AST_NODE_TYPES, ASTUtils } from "@typescript-eslint/utils";

/**
 * While this is not technically correct since `undefined` is not a reserved
 * word and thus, can be used as an {@link TSESTree.Identifier} outside of the
 * global scope, that would be, to put it mildly, bizarre.
 */
export const isUndefinedIdentifier = (node: TSESTree.Node | null | undefined) =>
  ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
    name: "undefined",
  })(node);
