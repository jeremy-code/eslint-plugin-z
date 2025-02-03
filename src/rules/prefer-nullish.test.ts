import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./prefer-nullish";

const ruleTester = new RuleTester();

ruleTester.run("prefer-nullish", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const schema = z.string().nullish();
    `,
    dedent`
      import { z } from "zod";

      const schema = z.string().nullable().transform((v) => v === null ? undefined: v).optional();
    `,
    dedent`
      import { z } from "zod";

      const schema = z.nullable(z.optional(z.string()));
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const schema = z.string().nullable().optional();
      `,
      errors: [{ messageId: "useNullish" }],
      output: dedent`
        import { z } from "zod";

        const schema = z.string().nullish();
      `,
    },
    {
      code: dedent`
        import { z } from "zod";

        const schema = z.string().optional().nullable();
      `,
      errors: [{ messageId: "useNullish" }],
      output: dedent`
        import { z } from "zod";

        const schema = z.string().nullish();
      `,
    },
  ],
});
