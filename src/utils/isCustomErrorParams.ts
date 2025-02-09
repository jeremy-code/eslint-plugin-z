import {
  AST_NODE_TYPES,
  ASTUtils,
  type TSESTree,
} from "@typescript-eslint/utils";

import { isUndefinedIdentifier } from "./ast/isUndefinedIdentifier";

/**
 *  type CustomErrorParams = {
 *    path?: (string | number)[] | undefined;
 *    message?: string | undefined;
 *    params?: {
 *      [k: string]: any;
 *    } | undefined;
 */

/**
 * Check if the node is a {@link zod#CustomErrorParams} object.
 */
export const isCustomErrorParams = (
  node: TSESTree.Node | null | undefined,
): node is TSESTree.ObjectExpression | TSESTree.Identifier => {
  if (isUndefinedIdentifier(node)) {
    return true;
  }

  if (
    !ASTUtils.isNodeOfType(AST_NODE_TYPES.ObjectExpression)(node) ||
    node.properties.length > 3
  ) {
    return false;
  }

  return node.properties.every((property) =>
    isValidCustomErrorParamsProperty(property),
  );
};

const isValidCustomErrorParamsProperty = (
  property: TSESTree.ObjectLiteralElement,
): boolean => {
  // TODO: Check if the element being spread has the correct properties
  if (ASTUtils.isNodeOfType(AST_NODE_TYPES.SpreadElement)(property)) {
    return true;
  }

  if (
    !ASTUtils.isNodeOfType(AST_NODE_TYPES.Property)(property) ||
    !ASTUtils.isIdentifier(property.key)
  ) {
    return false;
  }

  switch (property.key.name) {
    case "path": {
      if (isUndefinedIdentifier(property.value)) {
        return true;
      }
      if (
        !ASTUtils.isNodeOfType(AST_NODE_TYPES.ArrayExpression)(property.value)
      ) {
        return false;
      }
      return property.value.elements.every((element) =>
        ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal)(element),
      );
    }
    case "message":
      return (
        ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal)(property.value) ||
        isUndefinedIdentifier(property.value)
      );
    case "params":
      return (
        ASTUtils.isNodeOfType(AST_NODE_TYPES.ObjectExpression)(
          property.value,
        ) || isUndefinedIdentifier(property.value)
      );
    default:
      return false;
  }
};
