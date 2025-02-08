# eslint-plugin-z

[npm-package]: https://www.npmjs.com/package/eslint-plugin-z
[license-badge]: https://img.shields.io/github/license/jeremy-code/eslint-plugin-z
[npm-version-badge]: https://img.shields.io/npm/v/eslint-plugin-z
[github-release-badge]: https://img.shields.io/github/v/release/jeremy-code/eslint-plugin-z

[![GitHub Actions](../../actions/workflows/ci.yml/badge.svg)](../../actions/workflows/ci.yml)
[![License][license-badge]](LICENSE)
[![NPM version][npm-version-badge]][NPM package]
[![GitHub release][github-release-badge]](../../actions/workflows/ci.yml)

> [!CAUTION]
> This project is in the early stages of development. Please report any issues you encounter.

An [ESLint](https://eslint.org/) plugin for linting [zod](https://zod.dev/) schemas.

## Installation

```
npm install eslint-plugin-z --save-dev
```

## Configuration

```js
import pluginZ from "eslint-plugin-z";

export default [pluginZ.configs.recommended];
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
| [prefer-nullish](./docs/rules/prefer-nullish.md) | Enforce usage of `z.nullish()` instead of `z.null().optional()` or `z.optional().null()`. | ✅ | 💡 | 🔧 |  |
| [prefer-tuple](./docs/rules/prefer-tuple.md) | Enforce usage of `z.tuple([z.schema()])` instead of `z.schema().array().length(1)` | ✅ | 💡 |  |  |

<!-- prettier-ignore-end -->

## License

This project is licensed under the [MIT license](LICENSE).
