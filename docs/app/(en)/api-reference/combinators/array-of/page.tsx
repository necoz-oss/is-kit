import { ApiReferencePager } from '@/components/api-reference/pager';
import { CodeBlock } from '@/components/code/code-block';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Stack } from '@/components/ui/stack';
import { API_REFERENCE_PATHS, createApiMetadata } from '@/lib/api-metadata';

export const metadata = createApiMetadata(API_REFERENCE_PATHS.arrayOf);

const sample = `import { arrayOf, nonEmptyArrayOf, isString } from 'is-kit';

const isStringArray = arrayOf(isString);
isStringArray(['a', 'b']); // true
isStringArray(['a', 1]); // false

const isNonEmptyStringArray = nonEmptyArrayOf(isString);
isNonEmptyStringArray([]); // false
isNonEmptyStringArray(['a']); // true`;

const sampleEvaluation = `import {
  arrayOf,
  nonEmptyArrayOf,
  isString,
  isUndefined,
  oneOf
} from 'is-kit';

// Elements are checked in index order, and checking stops at the first failure.
const isStringArray = arrayOf(isString);
isStringArray(['a', 1, 'b']); // false — 'b' is never checked

// Sparse holes are read as 'undefined'.
const sparse = ['a', , 'c'];
isStringArray(sparse); // false — the hole reads as 'undefined'

const isStringOrUndefinedArray = arrayOf(oneOf(isString, isUndefined));
isStringOrUndefinedArray(sparse); // true — the guard accepts 'undefined'

// An empty array passes 'arrayOf' but fails 'nonEmptyArrayOf'.
isStringArray([]); // true
nonEmptyArrayOf(isString)([]); // false`;

export default function ArrayOfPage() {
  return (
    <Stack variant='main' className='container mx-auto px-4 py-10' gap='xl'>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h1'>arrayOf</Heading>
          <Paragraph>
            Guard for homogeneous arrays with an element guard. Use{' '}
            <code>nonEmptyArrayOf(...)</code> when empty arrays should fail.
          </Paragraph>
        </Stack>
        <CodeBlock code={sample} language='ts' />
      </Stack>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>Evaluation order and sparse arrays</Heading>
          <Paragraph>
            Elements are checked in index order, and checking stops after the
            first element that fails the guard — later elements are never
            evaluated. Sparse holes are read as <code>undefined</code>, so a
            sparse array only passes when the element guard accepts{' '}
            <code>undefined</code>. An empty array passes <code>arrayOf</code>{' '}
            because there is nothing to check; use <code>nonEmptyArrayOf</code>{' '}
            when an empty array should fail.
          </Paragraph>
        </Stack>
        <CodeBlock code={sampleEvaluation} language='ts' />
      </Stack>
      <ApiReferencePager currentHref={API_REFERENCE_PATHS.arrayOf} />
    </Stack>
  );
}
