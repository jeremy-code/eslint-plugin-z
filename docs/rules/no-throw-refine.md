# no-throw-refine

This rule checks if a `throw` statement is in a function for a `zod` schema
refinement.

## Rule Details

This rule checks if a `throw` statement is in a function for a `zod` schema
refinement. If a `throw` statement is found, the rule will report an error. It
should return false rather than throw.

Examples of **incorrect** code for this rule:

```ts
import { z } from "zod";

const schema = z.string().refine((value) => {
  if (value.length < 5) {
    throw new Error("Value must be at least 5 characters long");
  }
  return true;
});
```

Examples of **correct** code for this rule:

```ts
import { z } from "zod";

const schema = z.string().refine((value) => {
  if (value.length < 5) {
    return false;
  }
  return true;
});
```

## When Not To Use It

If you do not want to enforce this rule, you can safely disable it.

## Further Reading

- [Zod Documentation - refine](https://zod.dev/?id=refine)
- [Source code](../../src/rules/no-throw-refine.ts)
- [Test cases](../../src/rules/no-throw-refine.test.ts)
