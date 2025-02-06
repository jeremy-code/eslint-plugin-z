import { AST_NODE_TYPES, TSESLint, ASTUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils/createRule";
import { isImportClause } from "../utils/isImportClause";

export default createRule({
  create(context) {
    return {
      CallExpression(node) {
        if (
          ASTUtils.isNodeOfType(AST_NODE_TYPES.MemberExpression)(node.callee) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "z",
          })(node.callee.object) &&
          ASTUtils.isNodeOfTypeWithConditions(AST_NODE_TYPES.Identifier, {
            name: "enum",
          })(node.callee.property)
        ) {
          const variable = ASTUtils.findVariable(
            context.sourceCode.getScope(node.callee),
            "z",
          );

          const variableDefinition = variable?.defs[0];

          if (
            variableDefinition?.type ===
              TSESLint.Scope.DefinitionType.ImportBinding &&
            isImportClause(variableDefinition.node)
          ) {
            if (variableDefinition.node.parent.source?.value === "zod") {
              if (
                ASTUtils.isNodeOfType(AST_NODE_TYPES.ArrayExpression)(
                  node.arguments[0],
                )
              ) {
                const enumValues = new Set();

                for (const element of node.arguments[0].elements) {
                  if (
                    element === null ||
                    !ASTUtils.isNodeOfType(AST_NODE_TYPES.Literal)(element)
                  ) {
                    return;
                  }

                  if (enumValues.has(element.value)) {
                    context.report({
                      node: element,
                      messageId: "duplicateValue",
                      data: { value: element.value },
                    });
                  } else {
                    enumValues.add(element.value);
                  }
                }
              }
            }
          }
        }
      },
    };
  },
  meta: {
    type: "problem",
    docs: {
      description: "Disallow duplicate enum member values",
      recommended: true,
      requiresTypeChecking: false,
    },
    hasSuggestions: false,
    messages: {
      duplicateValue: "Duplicate enum member value {{value}}.",
    },
    fixable: "code",
    schema: [],
  },
  name: "no-duplicate-enum-values",
  defaultOptions: [],
});
