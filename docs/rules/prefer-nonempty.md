# prefer-nonempty

Enforce usage of `z.array(...).nonempty()` instead of `z.array(...).min(1)`.

## Rule Details

When working with [Zod](https://github.com/colinhacks/zod), it's semantically clearer and more idiomatic to use `.nonempty()` instead of `.min(1)` on arrays. It also has better type inference.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.array(z.string()).min(1);
const Schema = z.number().array().min(1);
const Schema = z.number().array().max(10).min(1);
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.array(z.string()).nonempty();
const Schema = z.array(z.string()).min(2); // allowed, since min(2) ≠ nonempty
const Schema = z.string().array().nonempty();
```

## When Not To Use It

If you prefer using .min(1) for clarity or compatibility reasons over .nonempty() in Zod array schemas, you may choose to disable this rule.

```mjs
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/prefer-nonempty": "off",
    },
  },
];
```

## Further Reading

- [Source code](../../src/rules/prefer-nonempty.ts)
- [Test cases](../../src/rules/prefer-nonempty.test.ts)
