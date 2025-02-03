import { AST_NODE_TYPES, type TSESTree } from "@typescript-eslint/utils";

/**
 * Returns an array of identifiers representing the chain of properties or
 * methods accessed.
 *
 * @example
 * ```ts
 * getNodeChain(parse("obj.prop;").body[0].expression);
 * // => [Identifier(obj), Identifier(prop)]
 * ```
 */
export function getNodeChain(
  node: TSESTree.Node,
): TSESTree.Identifier[] | null {
  switch (node.type) {
    case AST_NODE_TYPES.Identifier:
      return [node];
    case AST_NODE_TYPES.MemberExpression: {
      const objectChain = getNodeChain(node.object);
      const propertyChain = getNodeChain(node.property);
      return objectChain && propertyChain ?
          [...objectChain, ...propertyChain]
        : null;
    }
    case AST_NODE_TYPES.CallExpression:
      return getNodeChain(node.callee);
    default:
      return null;
  }
}
