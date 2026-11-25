import { expectAssignable, expectType } from 'tsd';
import { isString, toStandardSchema } from '@/index';

// =============================================
// describe: toStandardSchema
// =============================================
// it: preserves input and output types for Standard Schema consumers
const schema = toStandardSchema(isString);
type Types = NonNullable<(typeof schema)['~standard']['types']>;
expectType<string>({} as Types['input']);
expectType<string>({} as Types['output']);
schema['~standard'].validate('value', { libraryOptions: {} });

// it: is structurally compatible with the Standard Schema v1 contract
type StandardSchemaV1<Input, Output> = {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (
      value: unknown,
      options?: { readonly libraryOptions?: Record<string, unknown> }
    ) =>
      | { readonly value: Output; readonly issues?: undefined }
      | { readonly issues: ReadonlyArray<{ readonly message: string }> }
      | Promise<
          | { readonly value: Output; readonly issues?: undefined }
          | { readonly issues: ReadonlyArray<{ readonly message: string }> }
        >;
    readonly types?:
      | { readonly input: Input; readonly output: Output }
      | undefined;
  };
};
expectAssignable<StandardSchemaV1<string, string>>(schema);
