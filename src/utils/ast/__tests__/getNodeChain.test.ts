import { describe, expect, test } from "@jest/globals";
import {
  parse,
  AST_NODE_TYPES,
  TSESTree,
} from "@typescript-eslint/typescript-estree";
import { ASTUtils } from "@typescript-eslint/utils";

import { getNodeChain } from "../getNodeChain";

const getStatementExpression = (code: string): TSESTree.Expression => {
  const ast = parse(code);
  const [programStatement] = ast.body;

  if (programStatement === undefined) {
    throw new Error("Invalid test input: No statements found.");
  } else if (
    !ASTUtils.isNodeOfType(AST_NODE_TYPES.ExpressionStatement)(programStatement)
  ) {
    throw new Error(
      `Invalid test input: Expected an Expression Statement, got ${programStatement.type}`,
    );
  }

  return programStatement.expression;
};

describe("getNodeChain", () => {
  test("returns an array with a single identifier for an Identifier node", () => {
    const node = getStatementExpression("foo;");
    expect(getNodeChain(node)).toEqual([node]);
  });

  test("returns concatenated identifiers for a MemberExpression", () => {
    const node = getStatementExpression("obj.prop;");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "obj", type: "Identifier" }),
      expect.objectContaining({ name: "prop", type: "Identifier" }),
    ]);
  });

  test("returns identifiers for a nested MemberExpression", () => {
    const node = getStatementExpression("obj.prop1.prop2;");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "obj", type: "Identifier" }),
      expect.objectContaining({ name: "prop1", type: "Identifier" }),
      expect.objectContaining({ name: "prop2", type: "Identifier" }),
    ]);
  });

  test("returns identifiers for a CallExpression", () => {
    const node = getStatementExpression("func();");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "func", type: "Identifier" }),
    ]);
  });

  test("handles a CallExpression on a MemberExpression", () => {
    const node = getStatementExpression("obj.method();");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "obj", type: "Identifier" }),
      expect.objectContaining({ name: "method", type: "Identifier" }),
    ]);
  });

  test("handles a nested CallExpression on a MemberExpression", () => {
    const node = getStatementExpression("obj.method1().method2();");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "obj", type: "Identifier" }),
      expect.objectContaining({ name: "method1", type: "Identifier" }),
      expect.objectContaining({ name: "method2", type: "Identifier" }),
    ]);
  });

  test("handle optional chaining", () => {
    const node = getStatementExpression("obj?.prop;");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "obj", type: "Identifier" }),
      expect.objectContaining({ name: "prop", type: "Identifier" }),
    ]);
  });

  test("handle optional chaining with CallExpression", () => {
    const node = getStatementExpression("obj?.method();");
    expect(getNodeChain(node)).toEqual([
      expect.objectContaining({ name: "obj", type: "Identifier" }),
      expect.objectContaining({ name: "method", type: "Identifier" }),
    ]);
  });

  describe("Unsupported cases", () => {
    test("returns null for unsupported node types", () => {
      const node = getStatementExpression('"string";');
      expect(getNodeChain(node)).toBeNull();
    });

    test("returns null when MemberExpression has non-Identifier property", () => {
      const node = getStatementExpression("obj[0];");
      expect(getNodeChain(node)).toBeNull();
    });
  });
});
