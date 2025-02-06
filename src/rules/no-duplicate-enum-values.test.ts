import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./no-duplicate-enum-values";

const ruleTester = new RuleTester();

ruleTester.run("no-duplicate-enum-values", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      z.enum(["test1", "test2"])
    `,
    dedent`
      import z from "zod";

      z.enum(["test1", "test2"])
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        z.enum(["test1", "test1"])
      `,
      errors: [
        {
          messageId: "duplicateValue",
          data: {
            value: "test1",
          },
        },
      ],
    },
  ],
});
