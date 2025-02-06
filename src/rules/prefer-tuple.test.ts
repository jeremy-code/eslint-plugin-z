import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./prefer-tuple";

const ruleTester = new RuleTester();

ruleTester.run("prefer-tuple", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const schema = z.tuple([z.string()]);
    `,
    dedent`
      const arrayLength = [1, 2, 3].length;
    `,
    dedent`
      import { z } from "zod";

      const schema = z.string();
      const schemaArray = schema.array().length(1);
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const schema = z.array(z.string()).length(1);
      `,
      errors: [{ messageId: "useTuple" }],
    },
    {
      code: dedent`
        import { z } from "zod";

        const schema = z.string().array().length(1);
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

        const schema = z.string();
        const schemaArray = z.array(schema).length(1);
      `,
      errors: [{ messageId: "useTuple" }],
    },
    {
      code: dedent`
        import { z } from "zod";

        const schema = z.string().array().nonempty().min(1).max(1).length(1);
      `,
      errors: [{ messageId: "useTuple" }],
    },
  ],
});
