import { defaults } from "jest-config";
import { createDefaultPreset, type JestConfigWithTsJest } from "ts-jest";

const jestConfig = {
  ...createDefaultPreset(),
  injectGlobals: false,
  reporters: [["github-actions", { silent: false }], "summary"],
  roots: ["<rootDir>/src/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    "<rootDir>/dist/",
  ],
} satisfies JestConfigWithTsJest;

export default jestConfig;
