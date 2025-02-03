import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./no-throw-refine";

const ruleTester = new RuleTester();

ruleTester.run("no-throw-refine", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const Schema = z.string().refine(() => true)
    `,
    dedent`
      import z from "zod";

      const Schema = z.string().refine(() => true)
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string().refine(() => {
          throw new Error("test")
        })
      `,
      errors: [{ messageId: "noThrowRefine" }],
    },
    {
      code: dedent`
        import z from "zod";

        const Schema = z.string().refine(() => {
          throw new Error("test")
        }, {
          message: "test",
          path: ["test"],
        })
      `,
      errors: [{ messageId: "noThrowRefine" }],
    },
  ],
});
