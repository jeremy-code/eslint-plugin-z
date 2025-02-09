# prefer-enum

Enforce using `z.enum([...])` instead of `z.union([])` made up of `z.literal()`
strings.

## Rule Details

This rule enforces the usage of `z.enum([...])` instead of `z.union([])` made up
of `z.literal()` strings. In addition to having more convenience methods (e.g.
`exclude`, `extract`, etc.), it is also more readable and idiomatic.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.union([z.literal("foo"), z.literal("bar")]);
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.enum(["foo", "bar"]);
```

## Options

This rule has no options.

## When Not To Use It

If you feel `z.literal()` more accurately describes your schema, you can disable
this rule.

```js
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/prefer-enum": "off",
    },
  },
];
```

## Further Reading

- [Zod Documentation - `Zod enums`](https://zod.dev/?id=zod-enums)
- [Zod Documentation - `Unions`](https://zod.dev/?id=unions)
- [Zod Documentation - `Literals`](https://zod.dev/?id=literals)
- [Source code](../../src/rules/prefer-enum.ts)
- [Test cases](../../src/rules/prefer-enum.test.ts)
