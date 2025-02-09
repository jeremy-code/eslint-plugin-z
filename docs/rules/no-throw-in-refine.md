# no-throw-in-refine

This rule checks if a `throw` statement is in a function for a Zod schema
refinement function (`.refine(func)`).

## Rule Details

This rule checks if a `throw` statement is in a function for a Zod schema
refinement. If a `throw` statement is found, the rule will report an error. It
should return false rather than throw.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.string().refine((value) => {
  if (value.length < 5) {
    throw new Error("Value must be at least 5 characters long");
  }
  return true;
});
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.string().refine((value) => {
  if (value.length < 5) {
    return false;
  }
  return true;
});
```

## When Not To Use It

If you do not want to enforce this rule, you can safely disable it.

```js
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/no-throw-in-refine": "off",
    },
  },
];
```

## Further Reading

- [Zod Documentation - refine](https://zod.dev/?id=refine)
- [Source code](../../src/rules/no-throw-in-refine.ts)
- [Test cases](../../src/rules/no-throw-in-refine.test.ts)
