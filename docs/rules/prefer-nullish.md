# prefer-nullish

Enforce usage of `.nullish()` convenience method instead of chaining
`.nullable().optional()` or `optional().nullable()` in Zod schemas.

## Rule Details

This rule enforces usage of `.nullish()` convenience method instead of chaining
`.nullable().optional()` or `optional().nullable()` in Zod schemas.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.string().nullable().optional();
const Schema = z.string().optional().nullable();
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.string().nullish();
const Schema = z.optional(z.nullable(z.string()));
```

## Options

This rule has no options.

## When Not To Use It

If you don't use the `Schema.nullable()` or `Schema.optional()` convenience
methods and instead use `z.optional(Schema)` or `z.nullable(Schema)`, you can
disable this rule.

```jsonc
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/prefer-nullish": "off"
    }
  }
]
```

## Further Reading

- [Zod Documentation - `.nullish`](https://zod.dev/?id=nullish)
- [Zod Documentation - `.optional`](https://zod.dev/?id=optional)
- [Zod Documentation - `.nullable`](https://zod.dev/?id=nullable)
- [Source code](../../src/rules/prefer-nullish.ts)
- [Test cases](../../src/rules/prefer-nullish.test.ts)
