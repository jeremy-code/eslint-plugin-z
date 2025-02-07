import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./prefer-tuple";

const ruleTester = new RuleTester();

ruleTester.run("prefer-tuple", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const Schema = z.tuple([z.string()]);
    `,
    dedent`
      const arrayLength = [1, 2, 3].length;
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.string();
      const SchemaArray = schema.array().length(1);
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.array(z.string()).length(1);
      `,
      errors: [{ messageId: "useTuple" }],
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string().array().length(1);
      `,
      errors: [
        {
          messageId: "useTuple",
        },
      ],
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string();
        const SchemaArray = z.array(schema).length(1);
      `,
      errors: [{ messageId: "useTuple" }],
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.string().array().nonempty().min(1).max(1).length(1);
      `,
      errors: [{ messageId: "useTuple" }],
    },
  ],
});
