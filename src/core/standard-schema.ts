import type { Guard } from '@/types/core';

// Keep this structural type compatible with Standard Schema v1 without a dependency.
type GuardSchema<T> = {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (
      value: unknown,
      options?:
        | { readonly libraryOptions?: Record<string, unknown> | undefined }
        | undefined
    ) =>
      | { readonly value: T; readonly issues?: undefined }
      | {
          readonly issues: ReadonlyArray<{ readonly message: string }>;
        };
    readonly types?: { readonly input: T; readonly output: T } | undefined;
  };
};

/**
 * Adapts a guard for consumers of Standard Schema v1.
 * @param guard Guard used to validate the input.
 * @returns A synchronous schema that preserves the original value on success.
 * @see https://standardschema.dev/
 */
export function toStandardSchema<T>(guard: Guard<T>): GuardSchema<T> {
  return {
    '~standard': {
      version: 1,
      vendor: 'is-kit',
      validate: (value) =>
        guard(value) ? { value } : { issues: [{ message: 'Invalid value' }] }
    }
  };
}
