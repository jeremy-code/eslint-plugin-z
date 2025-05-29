import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./prefer-nonempty";

const ruleTester = new RuleTester();

ruleTester.run("prefer-nonempty", rule, {
  valid: [
    dedent`
      import { z } from "zod";
      const Schema = z.array(z.string()).nonempty();
    `,
    dedent`
      import { z } from "zod";
      const Schema = z.array(z.string()).min(2);
    `,
    dedent`
      import { z } from "zod";
      const Schema = z.string().array().nonempty();
    `,
    dedent`
      import { z } from "zod";
      const Schema = z.number().min(1);
    `,
    dedent`
      import { z } from "zod";
      const Schema = z.array(z.string()).nonempty().min(1);
    `,
    dedent`
      import { z } from "zod";
      const Schema = z.string().z.array().nonempty().min(1);
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";
        const Schema = z.number().array().min(1);
      `,
      errors: [{ messageId: "useNonempty" }],
      output: dedent`
        import { z } from "zod";
        const Schema = z.number().array().nonempty();
      `,
    },
    {
      code: dedent`
        import { z } from "zod";
        const Schema = z.array(z.string()).min(1);
      `,
      errors: [{ messageId: "useNonempty" }],
      output: dedent`
        import { z } from "zod";
        const Schema = z.array(z.string()).nonempty();
      `,
    },
    {
      code: dedent`
        import { z } from "zod";
        const Schema = z.number.array().max(10).min(1);
      `,
      errors: [{ messageId: "useNonempty" }],
      output: dedent`
        import { z } from "zod";
        const Schema = z.number.array().max(10).nonempty();
      `,
    },
  ],
});
