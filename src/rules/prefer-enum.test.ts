import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./prefer-enum";

const ruleTester = new RuleTester();

ruleTester.run("prefer-enum", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const Schema = z.enum(["a", "b", "c"]);
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.union([z.string(), z.number()]);
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.union([z.literal("a"), z.literal("b"), z.literal("c"), z.literal(1)]);
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);
    `,
    /**
     * This is valid because it is possible `ASchema` is reused elsewhere. While
     * you may argue that it should then be changed to z.union([ASchema,
     * z.enum(["b", "c")]), you may lose some context of what those literals are
     * if you simply change it to an enum.
     */
    dedent`
      import { z } from "zod";

      const ASchema = z.literal("a");
      const Schema = z.union([ASchema, z.literal("b"), z.literal("c")]);
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.union([z.literal("a"), z.literal("b"), z.literal("c")])
      `,
      errors: [{ messageId: "preferEnum" }],
      output: dedent`
        import { z } from "zod";

        const Schema = z.enum(["a", "b", "c"])
      `,
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.union([z.literal("x"), z.literal("y")])
      `,
      errors: [{ messageId: "preferEnum" }],
      output: dedent`
        import { z } from "zod";

        const Schema = z.enum(["x", "y"])
      `,
    },
  ],
});
