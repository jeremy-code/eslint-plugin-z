import {
  AST_NODE_TYPES,
  ASTUtils,
  TSESLint,
  type TSESTree,
} from "@typescript-eslint/utils";

import { isImportClause } from "./isImportClause";

/**
 * Check if the given node is the `z` object or the `zod` namespace.
 */
export const isZodNamespace = (
  node: TSESTree.Node,
  context: TSESLint.RuleContext<string, never[]>,
): node is TSESTree.Identifier => {
  const zodNamespace = context.settings?.z?.zodNamespace ?? "z";
  const zodImportSource = context.settings?.z?.zodImportSource ?? "zod";

  if (
    // Node is an identifier with the name `z`
    ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
      name: zodNamespace,
    })(node)
  ) {
    const zVariable = ASTUtils.findVariable(
      context.sourceCode.getScope(node),
      node,
    );

    // Check if the `z` variable is an import binding
    // https://eslint.org/docs/latest/extend/scope-manager-interface#node
    const importBindingDefinition = zVariable?.defs.find(
      (def) => def.type === TSESLint.Scope.DefinitionType.ImportBinding,
    );

    if (
      isImportClause(importBindingDefinition?.node) &&
      ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.ImportDeclaration, {
        importKind: "value", // Is not a type import
      })(importBindingDefinition.parent) &&
      importBindingDefinition.parent.source.value === zodImportSource // Imported from the zod package
    ) {
      return true;
    }
  }
  return false;
};
