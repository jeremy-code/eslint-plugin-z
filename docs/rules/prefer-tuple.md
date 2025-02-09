# prefer-tuple

Enforce usage of `z.tuple([Schema])` instead of `z.array(Schema).length(1)` in
Zod schemas.

## Rule Details

This rule enforces usage of `z.tuple([Schema])` instead of
`z.array(Schema).length(1)` in Zod schemas.

For one, you will have better type inference in TypeScript.

```ts
import { z } from "zod";

const Schema = z.array(z.string()).length(1);
type Schema = z.infer<typeof Schema>; // string[]

const Schema = z.tuple([z.string()]);
type Schema = z.infer<typeof Schema>; // [string]

const Schema = z.array(z.string()).nonempty().length(1);
type Schema = z.infer<typeof Schema>; // [string, ...string[]]
```

Furthermore, `z.tuple([Schema])` is more readable and concise, and likely a
better representation of your data.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.array(z.string()).length(1);
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.tuple([z.string()]);
```

## Options

This rule has no options.

## When Not To Use It

If you need any of the array methods (e.g. `.nonempty()`, `.min()`, `.max()`,
`.length()`, `.element()`), you may want to ignore this rule.

```js
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/prefer-tuple": "off",
    },
  },
];
```

## Further Reading

- [Zod Documentation - Tuples](https://zod.dev/?id=tuples)
- [Zod Documentation - Arrays](https://zod.dev/?id=arrays)
- [Source code](../../src/rules/prefer-tuple.ts)
- [Test cases](../../src/rules/prefer-tuple.test.ts)
