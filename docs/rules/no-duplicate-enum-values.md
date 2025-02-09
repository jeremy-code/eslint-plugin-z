# no-duplicate-enum-values

This rule checks for duplicate values in Zod enums. In runtime, Zod will _NOT_
throw an error if there are duplicate values in an enum schema.

However, there will be unexpected behavior such as:

```js
import { z } from "zod";

const Schema = z.enum(["a", "a", "a"]);

Schema.enum; // => { a: 'a' }
Schema.options; // => ['a', 'a', 'a']
Schema.extract(["a"]).options; // => ['a']
Schema.exclude(["a"]).options; // => []
```

## Rule Details

This rule checks all literal array values in enum schema (e.g. `z.enum([...])`).
It will not check variables or expressions.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.enum(["a", "a", "a"]);
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.enum(["a", "b", "c"]);
```

## Options

This rule has no options.

## When Not To Use It

If you don't use Zod enums or use `.options` or `.enum` properties, you can
disable this rule.

```js
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/no-duplicate-enum-values": "off",
    },
  },
];
```

## Further Reading

- [Zod Documentation - Zod enums](https://zod.dev/?id=zod-enums)
- [Source code](../../src/rules/no-duplicate-enum-values.ts)
- [Test cases](../../src/rules/no-duplicate-enum-values.test.ts)
