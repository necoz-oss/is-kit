import { ApiReferencePager } from '@/components/api-reference/pager';
import { CodeBlock } from '@/components/code/code-block';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Stack } from '@/components/ui/stack';
import { API_REFERENCE_PATHS, createApiMetadata } from '@/lib/api-metadata';

export const metadata = createApiMetadata(API_REFERENCE_PATHS.standardSchema);

const sample = `import { isString, toStandardSchema } from 'is-kit';

const schema = toStandardSchema(isString);
const success = schema['~standard'].validate('hello');
// { value: 'hello' }
const failure = schema['~standard'].validate(42);
// { issues: [{ message: 'Invalid value' }] }

type SchemaTypes = NonNullable<typeof schema['~standard']['types']>;
type Input = SchemaTypes['input']; // string
type Output = SchemaTypes['output']; // string`;

const formSample = `import { useForm } from '@tanstack/react-form';
import { isString, struct, toStandardSchema } from 'is-kit';

const isUser = struct({ name: isString });
const userSchema = toStandardSchema(isUser);

function useUserForm() {
  return useForm({
    defaultValues: { name: '' },
    validators: { onChange: userSchema },
    onSubmit: async ({ value }) => console.log(value),
  });
}`;

export default function StandardSchemaPage() {
  return (
    <Stack variant='main' className='container mx-auto px-4 py-10' gap='xl'>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h1'>toStandardSchema</Heading>
          <Paragraph>
            Wrap an existing guard for tools that accept the{' '}
            <a href='https://standardschema.dev/' className='underline'>
              Standard Schema v1 specification
            </a>
            . This common interface lets those tools validate values and infer
            input and output types without knowing about is-kit guards.
          </Paragraph>
        </Stack>
        <CodeBlock code={sample} language='ts' />
        <Paragraph>
          Validation is synchronous and returns the original value on success.
          A false result produces a generic issue without a field path. As with{' '}
          <code>safeParse</code>, exceptions thrown by the guard propagate
          unchanged.
        </Paragraph>
      </Stack>

      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>Use with TanStack Form</Heading>
          <Paragraph>
            Pass the adapter to a Standard Schema validator. The original guard
            remains available for ordinary narrowing, filtering, and composition;
            use the adapter at the interoperability boundary.
          </Paragraph>
        </Stack>
        <CodeBlock code={formSample} language='ts' />
      </Stack>

      <ApiReferencePager currentHref={API_REFERENCE_PATHS.standardSchema} />
    </Stack>
  );
}
