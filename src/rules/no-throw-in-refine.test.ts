import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./no-throw-in-refine";

const ruleTester = new RuleTester();

ruleTester.run("no-throw-in-refine", rule, {
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
      errors: [{ messageId: "noThrowInRefine" }],
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
      errors: [{ messageId: "noThrowInRefine" }],
    },
  ],
});
