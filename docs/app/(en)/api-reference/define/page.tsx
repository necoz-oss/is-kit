import { ApiReferencePager } from '@/components/api-reference/pager';
import { CodeBlock } from '@/components/code/code-block';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Stack } from '@/components/ui/stack';
import { API_REFERENCE_PATHS, createApiMetadata } from '@/lib/api-metadata';

export const metadata = createApiMetadata(API_REFERENCE_PATHS.define);

const sample = `import { define, isString } from 'is-kit';

// Prefer generics on define<T> to avoid verbose type predicates
const isNonEmptyString = define<string>(
  (value) => isString(value) && value.length > 0
);

isNonEmptyString('foo'); // true
isNonEmptyString(''); // false`;

const sampleCoercion = `import { define } from 'is-kit';

// The predicate result is coerced to a strict boolean: truthy results
// become true and falsy results become false.
const isTruthy = define<unknown>(() => 'yes' as unknown as boolean);
isTruthy('anything'); // true

const isFalsy = define<unknown>(() => 0 as unknown as boolean);
isFalsy('anything'); // false

// The result is always a boolean, even when the predicate returns a
// non-boolean value.
typeof isTruthy('anything'); // 'boolean'

// The original input is forwarded to the predicate unchanged, and the
// predicate is invoked once per evaluation.
const seen: unknown[] = [];
const isSeen = define<unknown>((value) => {
  seen.push(value);
  return true;
});
isSeen({ count: 1 }); // true — seen is [{ count: 1 }]`;

export default function DefinePage() {
  return (
    <Stack variant='main' className='container mx-auto px-4 py-10' gap='xl'>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h1'>define</Heading>
          <Paragraph>
            Wrap a predicate to brand it as a guard for composition and
            inference stability.
          </Paragraph>
        </Stack>
        <CodeBlock code={sample} language='ts' />
      </Stack>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>Boolean coercion</Heading>
          <Paragraph>
            The predicate result is normalized with boolean coercion (
            <code>!!fn(value)</code>): a truthy result becomes <code>true</code>{' '}
            and a falsy result becomes <code>false</code>, so the guard always
            returns a strict boolean. The original input is forwarded to the
            predicate unchanged, and the predicate is invoked once per
            evaluation. Coercion only normalizes the result — it does not check
            the declared guarded type, so callers are still responsible for its
            correctness. Prefer predicates that return booleans; coercion is a
            safety net, not a reason to return non-boolean values.
          </Paragraph>
        </Stack>
        <CodeBlock code={sampleCoercion} language='ts' />
      </Stack>
      <ApiReferencePager currentHref={API_REFERENCE_PATHS.define} />
    </Stack>
  );
}
