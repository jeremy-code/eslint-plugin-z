import { defineConfig } from "tsup";

export default defineConfig((overrideOptions) => ({
  name: "eslint-plugin-z",
  entry: ["src/index.ts"],
  target: "node18",
  format: ["esm", "cjs"],
  dts: true,
  external: ["@typescript-eslint/utils"],
  /**
   * Guarantee that `name`, `version` from {@link file://./package.json} are
   * inlined in the bundle rather than imported.
   */
  noExternal: [/^\.\.\/package\.json$/],
  clean: true,
  cjsInterop: true,
  ...overrideOptions,
}));
