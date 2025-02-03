import { afterAll, describe, it } from "@jest/globals";
import { RuleTester } from "@typescript-eslint/rule-tester";

Object.assign(RuleTester, {
  afterAll,
  describe,
  describeSkip: describe.skip,
  it,
  itOnly: it.only,
  itSkip: it.skip,
});
