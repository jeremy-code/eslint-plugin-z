# no-undefined-argument-in-custom

This rule checks if the `refine` method of a Zod schema has an undefined argument.

## Rule Details

If the validator function argument is omitted or `undefined`, the rule will report an error. The validator function should have at least one argument.

If there is no argument, the schema will always pass validation, which is likely
not the intended behavior. If it is, then use the `z.any()` schema instead to
explicitly show your intent. This is what the actual behavior would be since
`z.custom` is itself a wrapper of `z.any()` and `.superRefine`.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const Schema = z.custom();
const Schema = z.custom(undefined);
const Schema = z.custom(undefined, "params");
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const Schema = z.custom((data) => {
  return true;
});
const Schema = z.any();
```

## When Not To Use It

```mjs
// eslint.config.mjs

export default [
  // ...
  {
    rules: {
      "z/no-undefined-argument-in-custom": "off",
    },
  },
];
```

## Further Reading

- [Zod Documentation - refine](https://zod.dev/?id=refine)
- [Source code](../../src/rules/no-throw-in-refine.ts)
- [Test cases](../../src/rules/no-throw-in-refine.test.ts)
