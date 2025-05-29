import { RuleTester } from "@typescript-eslint/rule-tester";
import dedent from "dedent";

import rule from "./no-undefined-argument-in-custom";

const ruleTester = new RuleTester();

ruleTester.run("no-undefined-argument-in-custom", rule, {
  valid: [
    dedent`
      import { z } from "zod";

      const Schema = z.custom(() => true);
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.custom((data) => data !== undefined);
    `,
    dedent`
      import { z } from "zod";

      const Schema = z.any();
    `,
  ],
  invalid: [
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.custom();
      `,
      errors: [{ messageId: "noUndefinedArgumentInCustom" }],
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.custom(undefined);
      `,
      errors: [{ messageId: "noUndefinedArgumentInCustom" }],
    },
    {
      code: dedent`
        import { z } from "zod";

        const Schema = z.custom(undefined, "params");
      `,
      errors: [{ messageId: "noUndefinedArgumentInCustom" }],
    },
  ],
});
