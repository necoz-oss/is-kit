import { isString, struct, toStandardSchema } from '@/index';

describe('toStandardSchema', () => {
  it('returns the original value when the guard accepts it', () => {
    const value = { name: 'Ada' };
    const schema = toStandardSchema(struct({ name: isString }));
    const result = schema['~standard'].validate(value);

    expect(schema['~standard'].version).toBe(1);
    expect(schema['~standard'].vendor).toBe('is-kit');
    expect(result).toEqual({ value });
    expect('value' in result && result.value).toBe(value);
  });

  it('returns an issue when the guard rejects the input', () => {
    expect(toStandardSchema(isString)['~standard'].validate(42)).toEqual({
      issues: [{ message: 'Invalid value' }]
    });
  });
});
