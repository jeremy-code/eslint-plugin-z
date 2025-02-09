# eslint-plugin-z

<!-- Link references -->

[github-actions]: https://www.github.com/jeremy-code/eslint-plugin-z/actions/workflows/ci.yml
[github-release]: https://github.com/jeremy-code/eslint-plugin-z/releases
[npm-package]: https://www.npmjs.com/package/eslint-plugin-z
[github-actions-badge]: https://www.github.com/jeremy-code/eslint-plugin-z/actions/workflows/ci.yml/badge.svg
[license-badge]: https://img.shields.io/github/license/jeremy-code/eslint-plugin-z
[npm-version-badge]: https://img.shields.io/npm/v/eslint-plugin-z
[github-release-badge]: https://img.shields.io/github/v/release/jeremy-code/eslint-plugin-z

[![GitHub Actions][github-actions-badge]][github-actions]
[![License][license-badge]](LICENSE)
[![NPM version][npm-version-badge]][npm-package]
[![GitHub release][github-release-badge]][github-release]

> [!CAUTION]
> This project is in the early stages of development. Please report any issues you encounter.

An [ESLint](https://eslint.org/ "Find and fix problems in your JavaScript code - ESLint") plugin for linting [Zod](https://zod.dev/ "TypeScript-first schema validation with static type inference - Zod") schemas.

## Installation

```shell
npm install eslint-plugin-z --save-dev
```

## Configuration

```js
// eslint.config.mjs
import pluginZ from "eslint-plugin-z";

export default [pluginZ.configs.recommended];
```

```js
// .eslintrc.json
{
  "extends": ["plugin:z/recommendedLegacy"]
}
```

## Rules

- ✅ ️Set in the recommended configuration.
- 🖼️ Layout, ⚠️ problem, 💡 Suggestion
- 🔧 Automatically fixable by the `--fix` CLI option.
- ❌ Deprecated.

<!-- prettier-ignore -->
| Rules | Description | ✅ | Type | 🔧 | ❌ |
|---|---|---|---|---|---|
| [no-duplicate-enum-values](./docs/rules/no-duplicate-enum-values.md) | Disallow duplicate enum member values. | ✅ | ⚠️ |  |  |
| [no-throw-in-refine](./docs/rules/no-throw-in-refine.md) | Ban throwing in refinement function. | ✅ | ⚠️ |  |  |
| [prefer-enum](./docs/rules/prefer-enum.md) | Enforce usage of `z.enum()` instead of `z.union([z.literal(""),...])` | ✅ | 💡 | 🔧 |  |
| [prefer-nullish](./docs/rules/prefer-nullish.md) | Enforce usage of `z.nullish()` instead of `z.null().optional()` or `z.optional().null()`. | ✅ | 💡 | 🔧 |  |
| [prefer-tuple](./docs/rules/prefer-tuple.md) | Enforce usage of `z.tuple([z.schema()])` instead of `z.schema().array().length(1)` | ✅ | 💡 |  |  |

<!-- prettier-ignore-end -->

## License

This project is licensed under the [MIT license](LICENSE).
