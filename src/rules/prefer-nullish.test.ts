import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./prefer-nullish";

const ruleTester = new RuleTester();

ruleTester.run("prefer-nullish", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const Schema = z.string().nullish();
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.string().nullable().transform((v) => v === null ? undefined: v).optional();
    `,
    /**
     * z.nullish() is not a function.
     */
    dedent`
      import { z } from "zod";

      const Schema = z.nullable(z.optional(z.string()));
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.optional(z.string()).nullable();;
    `,
    "optional().nullable();",
    /**
     * The following test case is not handled by the rule. There's no easy way
     * to verify that `schema` is a Zod schema. While in this case schema is
     * declared in the same scope (which would be uncommon in a real codebase),
     * if it was imported, it would require tracking the source of the import.
     */
    dedent`
      import { z } from "zod";

      const Schema = z.string();
      const Schema2 = Schema.nullable().optional();
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string().nullable().optional();
      `,
      errors: [{ messageId: "useNullish" }],
      output: dedent`
        import { z } from "zod";

        const Schema = z.string().nullish();
      `,
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string().optional().nullable();
      `,
      errors: [{ messageId: "useNullish" }],
      output: dedent`
        import { z } from "zod";

        const Schema = z.string().nullish();
      `,
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string().optional().nullable().transform((v) => v === null ? undefined: v);
      `,
      errors: [{ messageId: "useNullish" }],
      output: dedent`
        import { z } from "zod";

        const Schema = z.string().nullish().transform((v) => v === null ? undefined: v);
      `,
    },
  ],
});
