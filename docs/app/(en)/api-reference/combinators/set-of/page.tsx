import { ApiReferencePager } from '@/components/api-reference/pager';
import { CodeBlock } from '@/components/code/code-block';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Stack } from '@/components/ui/stack';
import { API_REFERENCE_PATHS, createApiMetadata } from '@/lib/api-metadata';

export const metadata = createApiMetadata(API_REFERENCE_PATHS.setOf);

const sample = `import { setOf, isString } from 'is-kit';

const isStringSet = setOf(isString);
isStringSet(new Set(['a', 'b'])); // true
isStringSet(new Set(['a', 1])); // false`;

const sampleEvaluation = `import { setOf, isString } from 'is-kit';

// Values are checked in Set iteration order, and checking stops at the
// first value that fails the guard — later values are never evaluated.
const isStringSet = setOf(isString);
isStringSet(new Set(['a', 1, 'b'])); // false — 'b' is never checked

// An empty set passes because there is nothing to check.
isStringSet(new Set()); // true`;

export default function SetOfPage() {
  return (
    <Stack variant='main' className='container mx-auto px-4 py-10' gap='xl'>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h1'>setOf</Heading>
          <Paragraph>
            Guard for sets where every value must satisfy the provided guard.
          </Paragraph>
        </Stack>
        <CodeBlock code={sample} language='ts' />
      </Stack>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>Evaluation order and short-circuiting</Heading>
          <Paragraph>
            Values are evaluated in Set iteration order, and evaluation stops
            after the first value that fails the guard — later values are not
            evaluated. An empty set passes because there is nothing to check.
          </Paragraph>
        </Stack>
        <CodeBlock code={sampleEvaluation} language='ts' />
      </Stack>
      <ApiReferencePager currentHref={API_REFERENCE_PATHS.setOf} />
    </Stack>
  );
}
