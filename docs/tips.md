# Tips

Here is a collection of tips for using Zod effectively, which may or may not be
implemented as rules now or in the future.

## Use tuples over arrays for small sizes

For slightly better type inference, use `z.tuple()` instead of `z.array()` at
small sizes.

```js
// Instead of
const Schema = z.array(z.string()).length(1);
type Schema = z.infer<typeof Schema>; // => string[]
const Schema = z.array(z.string()).min(2); // => string[]

// Try
const Schema = z.tuple([z.string()]);
type Schema = z.infer<typeof Schema>; // => [string]
const Schema = z.tuple([z.string(), z.string()]).rest(z.string());
type Schema = z.infer<typeof Schema>; // => [string, string, ...string[]]
```

## Use `z.output` in `ZodEffects`

When using a `ZodEffects` schema with `transform`, `refine`, etc., you should
use `z.output` to explicitly get the output type, which is the same as
`z.infer`.

```js
// Instead of

const Schema = z.string().transform((v) => v.split());
type Schema = z.infer<typeof Schema>; // => string[]

// Try

const Schema = z.string().transform((v) => v.split());
// If you also need the input type
// type SchemaInput = z.input<typeof Schema>; // => string
type SchemaOutput = z.output<typeof Schema>; // => string[]
```

## Explicitly define unknown object keys behavior

The default behavior of Zod is to strip unknown keys from object. To explicitly
define the behavior, use `strip`, `strict`, `catchall`, or `passthrough`.

```js
// Instead of
const Schema = z.object({});

// Try
const Schema = z.object({}).strip(); // Default behavior
const Schema = z.object({}).strict();
const Schema = z.object({}).catchall(z.string());
const Schema = z.object({}).passthrough();
```

## Convenience methods

```js
const Schema = z.intersection(a, b);
const Schema = a.and(b);

const Schema = z.union(a, b);
const Schema = a.or(b);

const Schema = z.nullable(z.string());
const Schema = z.string().nullable();

const Schema = z.optional(z.string());
const Schema = z.string().optional();

const Schema = z.array(z.string());
const Schema = z.string().array();

const Schema = z.promise(z.string());
const Schema = z.string().promise();

const Schema = z.object({ name: z.string() }).extend({ age: z.number() }.shape);
const Schema = z.object({ name: z.string() }).merge({ age: z.number() });
```

# Use `z.function()` when parsing schemas in functions

```js
const Input = z.number();
const Output = z.object({ name: z.string() });

// Instead of
const getUser = (id: number) => {
  const user = fetchUser(Input.parse(id));
  return Output.parse(user);
}

// Try
const getUser = z.function().args(Input).returns(Output).implement(fetchUser);
```

## Coerce

```js
z.coerce.string();
z.preprocess((val) => String(val), z.string());

z.coerce.number();
z.preprocess((val) => Number(val), z.number());

z.coerce.boolean();
z.preprocess((val) => Boolean(val), z.boolean());

z.coerce.bigint();
z.preprocess((val) => BigInt(val), z.bigint());

z.coerce.date();
z.preprocess((val) => new Date(val), z.date());
```

# Merge discriminators

For slightly faster evaluation, if you are merging multiple discriminated unions
with the same discriminator key, you can merge the options directly.

```js
const A = z.discriminatedUnion("type", {
  A: z.object({ type: z.literal("A"), a: z.string() }),
});
const B = z.discriminatedUnion("type", {
  B: z.object({ type: z.literal("B"), b: z.string() }),
});

// Instead of
const AB = z.union([A, B]);

// Try
const AB = z.discriminatedUnion("type", [...A.options, ...B.options]);
```

## Use `.keyof` to parse object keys

If you need to parse object keys, you can use `.keyof` to get the keys of the
object as an enum schema.

Note this only works as expected if the object schema is strictly defined.

Also, you probably don't want to do this if you have already parsed/validated
the object, or you'll incur an unnecessary performance cost.

```js
const Schema = z.object({
  type: z.literal("A"),
  name: z.string(),
});

Schema.keyof().parse(
  Object.keys({
    type: "A",
    name: "Alice",
  }),
);
```

## Use a consistent naming convention

In general, the standard naming convention for Zod schemas is to simply use
PascalCase.

```js
const Name = z.string();
export type Name = z.infer<typeof Schema>;
```

Sometimes, you may want to differentiate between the schema constant and the
type, such as when TypeScript cannot infer the type (e.g. recursive types).

```js
const nameSchema = z.string();
export type Name = z.infer<typeof nameSchema>;
```

## Avoid numerical keys in object or record schemas

In general, it is best to avoid numerical keys in object or record schemas, as
they can lead to unexpected behavior. Either use strings or use `z.map()`
(`z.array(z.tuple([key, value]))` if you don't have access to Map objects).

```js
const Schema = z.record(z.number(), z.string());
type Schema = z.infer<typeof Schema>; // Record<number, string>
Schema.parse({
  1: "abc", // 'Expected number, received string'
});

const Schema = z.object({ 0: z.string() });
type Schema = z.infer<typeof Schema>; // { 0: string }

Schema.keyof().options // => ["0"]
```
