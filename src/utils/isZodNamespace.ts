import {
  AST_NODE_TYPES,
  ASTUtils,
  TSESLint,
  type TSESTree,
} from "@typescript-eslint/utils";

import { isImportClause } from "./ast/isImportClause";
import { getPluginSettings } from "./getPluginSettings";

/**
 * Check if the given node is the `z` object or the `zod` namespace.
 */
export const isZodNamespace = (
  node: TSESTree.Node,
  context: TSESLint.RuleContext<string, never[]>,
): node is TSESTree.Identifier => {
  const { zodNamespace, zodImportSource } = getPluginSettings(context.settings);

  // Check if the node is an identifier with name `z` (zodNamespace)
  if (
    !ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
      name: zodNamespace,
    })(node)
  ) {
    return false;
  }

  // Find corresponding variable for the `z` identifier
  const zVariable = ASTUtils.findVariable(
    context.sourceCode.getScope(node),
    node,
  );

  if (
    zVariable === null ||
    zVariable.scope.type !== TSESLint.Scope.ScopeType.module ||
    zVariable.defs.length === 0
  ) {
    return false;
  }

  // Check if the `z` variable is an import binding
  // https://eslint.org/docs/latest/extend/scope-manager-interface#node
  const importBindingDefinition = zVariable.defs.find(
    (def) => def.type === TSESLint.Scope.DefinitionType.ImportBinding,
  );

  return (
    isImportClause(importBindingDefinition?.node) &&
    ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.ImportDeclaration, {
      importKind: "value", // Is not a type import
    })(importBindingDefinition.parent) &&
    ASTUtils.getStringIfConstant(importBindingDefinition.parent.source) ===
      zodImportSource
  );
};
