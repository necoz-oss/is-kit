import { ApiReferencePager } from '@/components/api-reference/pager';
import { CodeBlock } from '@/components/code/code-block';
import { Heading } from '@/components/ui/heading';
import { Paragraph } from '@/components/ui/paragraph';
import { Stack } from '@/components/ui/stack';
import { API_REFERENCE_PATHS, createApiMetadata } from '@/lib/api-metadata';

export const metadata = createApiMetadata(API_REFERENCE_PATHS.logic);

const sample = `import { and, or, not, predicateToRefine, isString, isNumber } from 'is-kit';

// Prefer logic combinators over hand-written guardA(x) || guardB(x)
// when the result should be reusable as a named guard.
const isId = or(isString, isNumber);
isId('user-1'); // true
isId(123); // true

// Clearer name for the min-length rule
const isLongLiteral = predicateToRefine<string>((value) => value.length > 3);

const isLongString = and(isString, isLongLiteral);
isLongString('abcd'); // true
isLongString('ab');   // false
isLongString(123 as unknown); // false

// Type narrowing example
declare const maybeString: unknown;
if (isLongString(maybeString)) {
  maybeString.toUpperCase(); // narrowed to string
}
not(isString)(123); // true`;

const sampleAndAll = `import { andAll, predicateToRefine, isString } from 'is-kit';

// Chain multiple string checks with andAll
const minLen4 = predicateToRefine<string>((value) => value.length >= 4);
const startsWithA = predicateToRefine<string>((value) => value.startsWith('A'));

const isShortTitle = andAll(isString, minLen4, startsWithA);

isShortTitle('Axel'); // true
isShortTitle('Bob'); // false (does not start with A)
isShortTitle('ABC'); // false (length < 4)`;

const sampleGuardIn = `import { and, equals, guardIn, isNumber, predicateToRefine, struct } from 'is-kit';

// Adapt a guard to a broader domain, then compose extra rules
type Circle = { kind: 'circle'; radius: number };
type Shape =
  | { kind: 'rect'; width: number; height: number }
  | Circle;

const isCircle = struct({
  kind: equals('circle' as const),
  radius: isNumber,
});
// isCircle: Guard<Circle>

// Make it work as a refinement within Shape
const circleInShape = guardIn<Shape>()(isCircle); // Refine<Shape, Circle>

// Add a runtime-only rule (type stays Circle)
const positiveRadius = predicateToRefine<Circle>((circle) => circle.radius > 0);

const validCircle = and(circleInShape, positiveRadius);

const shapeCircleValid: Shape = { kind: 'circle', radius: 10 };
const shapeCircleNegativeRadius: Shape = { kind: 'circle', radius: -1 };
const shapeRect: Shape = { kind: 'rect', width: 8, height: 5 };

validCircle(shapeCircleValid); // true
validCircle(shapeCircleNegativeRadius); // false (radius not positive)
validCircle(shapeRect); // false (not a circle)`;

const sampleOr = `import { or, define, isString, isNumber } from 'is-kit';

// Predicates are evaluated in the order supplied, and evaluation stops
// after the first predicate that passes — later predicates are never run.
const isId = or(isString, isNumber);
isId('user-1'); // true — isNumber is never called
isId(123); // true — isString runs first and fails, then isNumber passes

// When no predicate matches, every predicate is evaluated exactly once.
isId(true); // false — isString and isNumber both run

// An error thrown by an invoked predicate propagates unchanged, and
// later predicates are not evaluated.
const throwing = define<unknown>(() => {
  throw new Error('guard failed');
});
or(throwing, isString)('value'); // throws Error('guard failed')

// or() with no predicates rejects every value.
or()('value'); // false`;

export default function LogicPage() {
  return (
    <Stack variant='main' className='container mx-auto px-4 py-10' gap='xl'>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h1'>logic</Heading>
          <Paragraph>
            Logical combinators to compose guards and refinements in a type-safe
            way.
          </Paragraph>
        </Stack>
        <CodeBlock code={sample} language='ts' />
      </Stack>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>or</Heading>
          <Paragraph>
            Predicates are evaluated in the order supplied, and evaluation stops
            after the first predicate that passes — later predicates are never
            run. When no predicate matches, every predicate is evaluated exactly
            once. An error thrown by an invoked predicate propagates unchanged,
            and <code>or()</code> with no predicates rejects every value.
          </Paragraph>
        </Stack>
        <CodeBlock language='ts' code={sampleOr} />
      </Stack>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>andAll</Heading>
          <Paragraph>
            Chain multiple refinements after a precondition.
          </Paragraph>
        </Stack>
        <CodeBlock language='ts' code={sampleAndAll} />
      </Stack>
      <Stack variant='section' gap='md'>
        <Stack gap='xs'>
          <Heading variant='h2'>guardIn</Heading>
          <Paragraph>
            Adapt a guard to a broader domain and keep composing.
          </Paragraph>
        </Stack>
        <CodeBlock language='ts' code={sampleGuardIn} />
      </Stack>
      <ApiReferencePager currentHref={API_REFERENCE_PATHS.logic} />
    </Stack>
  );
}
