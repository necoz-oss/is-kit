import { ApiReferencePager } from '@/components/api-reference/pager';
import { CodeBlock } from '@/components/code/code-block';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Stack } from '@/components/ui/stack';
import { API_REFERENCE_PATHS, createApiMetadata } from '@/lib/api-metadata';

export const metadata = createApiMetadata(API_REFERENCE_PATHS.mapOf);

const sampleEvaluation = `import { mapOf, isString, isNumber } from 'is-kit';

// Entries are evaluated in iteration order. For each entry, the key guard
// runs before the value guard, and a failing key skips its value guard.
let keyCalls = 0;
let valueCalls = 0;
const countingKey = (value: unknown): value is string => {
  keyCalls += 1;
  return isString(value);
};
const countingValue = (value: unknown): value is number => {
  valueCalls += 1;
  return isNumber(value);
};

const isScores = mapOf(countingKey, countingValue);
isScores(
  new Map<string | number, number>([
    ['math', 98],
    [42, 91], // key fails — its value guard is skipped
    ['english', 91], // never evaluated: checking stopped at the first failure
  ]),
); // false
keyCalls; // 2
valueCalls; // 1`;

const sample = `import { mapOf, isString, isNumber } from 'is-kit';

const isScoreMap = mapOf(isString, isNumber);
isScoreMap(new Map([['math', 98], ['english', 91]])); // true
isScoreMap(new Map([['math', '98']])); // false`;

export default function MapOfPage() {
  return (
    <Stack variant='main' className='container mx-auto px-4 py-10' gap='xl'>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h1'>mapOf</Heading>
          <Paragraph>
            Guard for maps where every key and value must satisfy their guards.
          </Paragraph>
        </Stack>
        <CodeBlock code={sample} language='ts' />
      </Stack>

      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>Evaluation order</Heading>
          <Paragraph>
            Entries are evaluated in iteration order. For each entry, the key
            guard runs before the value guard, and a failing key skips the value
            guard for that entry. Evaluation stops after the first failing key
            or value, so later entries are not evaluated.
          </Paragraph>
        </Stack>
        <CodeBlock code={sampleEvaluation} language='ts' />
      </Stack>

      <ApiReferencePager currentHref={API_REFERENCE_PATHS.mapOf} />
    </Stack>
  );
}
