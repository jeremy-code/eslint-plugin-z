import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

/**
 * Returns an array of {@link TSESTree.Identifier} nodes representing the chain
 * of properties or methods accessed in sequence of a root
 * {@link TSESTree.CallExpression} or {@link TSESTree.ChainExpression}.
 *
 * @example
 * ```ts
 * getNodeChain(parse("obj.prop;").body[0].expression);
 * // => [Identifier(obj), Identifier(prop)]
 * ```
 *
 * @remarks
 * If the output is of length 1, then the input node is either the identifier
 * itself or one function call (i.e. CallExpression with `.callee` that is the
 * identifier).
 */
export function getNodeChain(
  node: TSESTree.Node,
): [TSESTree.Identifier, ...TSESTree.Identifier[]] | null {
  switch (node.type) {
    // Base case: Identifier node
    case AST_NODE_TYPES.Identifier:
      return [node];
    case AST_NODE_TYPES.MemberExpression: {
      const objectNodeChain = getNodeChain(node.object);
      const propertyNodeChain = getNodeChain(node.property);

      if (objectNodeChain === null || propertyNodeChain === null) {
        return null;
      }

      return [...objectNodeChain, ...propertyNodeChain];
    }
    // function(...args) => getNodeChain(function)
    case AST_NODE_TYPES.CallExpression:
      return getNodeChain(node.callee);
    // obj?.prop => getNodeChain(obj.prop)
    case AST_NODE_TYPES.ChainExpression:
      return getNodeChain(node.expression);
    default:
      return null;
  }
}
