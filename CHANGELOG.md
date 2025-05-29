# eslint-plugin-z

## 0.2.0

### Minor Changes

- [`f0e15fc`](https://github.com/jeremy-code/eslint-plugin-z/commit/f0e15fcd7bf92444ba01adefd8fdbbec5ceefbc0) Thanks [@jeremy-code](https://github.com/jeremy-code)! - add no-undefined-argument-in-custom-rule, constant plugin export, misc. changes to docs

## 0.1.4

### Patch Changes

- [#18](https://github.com/jeremy-code/eslint-plugin-z/pull/18) [`d266bd4`](https://github.com/jeremy-code/eslint-plugin-z/commit/d266bd427df2d6aff4e5d408c5a9cf8719e0e431) Thanks [@jeremy-code](https://github.com/jeremy-code)! - update deps, README.md, add pnpm-workspace.yaml, update eslint.config.mjs

## 0.1.2

### Patch Changes

- [`3099519`](https://github.com/jeremy-code/eslint-plugin-z/commit/309951990c09ddb7aa4d1bbde4f1eb0c8e17f8fc) Thanks [@jeremy-code](https://github.com/jeremy-code)! - # chore: add `prefer-enum` rule, add plugin namespace, refactor utils

  This release adds a new rule, `prefer-enum`, which enforces the usage of `z.enum(["a", "b", "c"])` instead of `z.union([z.literal("a"), z.literal("b"), z.literal("c")])` in Zod schemas.

## 0.1.1

### Patch Changes

- [`f385d65`](https://github.com/jeremy-code/eslint-plugin-z/commit/f385d655b029c88754c5f624740a2dd7976d84f2) Thanks [@jeremy-code](https://github.com/jeremy-code)! - # chore: initial commit

  - initial commit of `eslint-plugin-z` package v0.1.0
  - Add rules `no-duplicate-enum-values`, `no-throw-refine`, `prefer-nullish`, and `prefer-tuple`
  - Add docs for rules in `./docs`
  - Publish package to npm: [eslint-plugin-z](https://www.npmjs.com/package/eslint-plugin-z)
  - Set up CI/CD with GitHub Actions (./.github/workflows/ci.yml, ./.github/workflows/release.yml)
  - Set up misc. configs and files (e.g. Husky, ESLint, Prettier, `lint-staged`, Jest, etc.)
