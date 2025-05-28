/** @import { Config } from "prettier" */

/**
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @satisfies {Config}
 */
const prettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "all",
  experimentalTernaries: true,
};

export default prettierConfig;
