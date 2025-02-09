---
"eslint-plugin-z": patch
---

# chore: add `prefer-enum` rule, add plugin namespace, refactor utils

This release adds a new rule, `prefer-enum`, which enforces the usage of `z.enum(["a", "b", "c"])` instead of `z.union([z.literal("a"), z.literal("b"), z.literal("c")])` in Zod schemas.
