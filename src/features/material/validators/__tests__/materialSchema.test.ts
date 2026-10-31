import { jest } from '@jest/globals';
import util from 'node:util';
import nodeConsole from 'console';
import { style } from '@utils/styles';

// suppress jests tracing console logs
import { customMaterialReconciliationSchema as materialSchema } from '@features/material/validators/materialSchema';
import { prettifyError } from 'zod';
import { MATERIAL_INPUT_LIMITS } from '@features/material/constants/materialConfig';
jest.unmock('@theme/themeConfig');
util.inspect.defaultOptions.depth = null; // show full objects

describe(style.wrap('bolditalic', 'Material Schema\n'), () => {
  beforeEach(() => {
    jest.useFakeTimers();
    global.console = nodeConsole; // Less noise
    // prettier-ignore
    const TEST_BEFORE = [
      '\n',
      style.color(255, 0, 255),
      '▷ ',
      style.reset,
      style.color(39),
      expect.getState().currentTestName,
      style.reset,
      '\n',
    ].join('');

    process.stdout.write(TEST_BEFORE);
  });

  afterEach(() => {
    const TEST_AFTER = [
      '\n',
      style.color(99),
      style.hr.double,
      style.reset,
      '\n',
    ].join('');

    process.stdout.write(TEST_AFTER);
  });

  it('Should FAIL Zod validation: `items` record is empty', () => {
    const failingPayload = {
      category: 'Mammals',
      items: {},
    };
    const result = materialSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError) {
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    }
    // Fail if validation accidentally succeeds
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'custom',
        path: ['items'],
      },
    ]);
  });

  it('Should FAIL Zod validation: category is empty', () => {
    const failingPayload = {
      category: '',
      items: {
        0: { dt: 'Whale', def: 'Largest mammal on Earth' },
        1: { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        2: { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      },
    };
    const result = materialSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError)
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'too_small',
        path: ['category'],
        minimum: MATERIAL_INPUT_LIMITS.category.minLength,
      },
    ]);
  });

  it(`Should FAIL Zod validation: long category name (> ${MATERIAL_INPUT_LIMITS.category.maxLength})`, () => {
    const longCategory = 'a'.repeat(
      MATERIAL_INPUT_LIMITS.category.maxLength + 1,
    );
    const failingPayload = {
      category: longCategory,
      items: {
        0: { dt: 'Whale', def: 'Largest mammal on Earth' },
        1: { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        2: { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      },
    };
    const result = materialSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError)
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'too_big',
        path: ['category'],
        maximum: MATERIAL_INPUT_LIMITS.category.maxLength,
      },
    ]);
  });

  it('Should sort `items` records', () => {
    const payload = {
      category: 'Mammals',
      items: {
        2: { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
        0: { dt: 'Whale', def: 'Largest mammal on Earth' },
        1: { dt: 'Shrew', def: 'Smallest mammal on Earth' },
      },
    };
    const result = materialSchema.safeParse(payload);
    const { error: ZodError } = result;
    if (ZodError)
      console.log(
        style.wrap(
          'italic',
          'red',
          ` ZodError :( -> ${prettifyError(ZodError)}`,
        ),
      );
    expect(result?.data).toMatchObject({
      category: 'Mammals',
      discoveryTerms: [
        { dt: 'Whale', def: 'Largest mammal on Earth' },
        { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      ],
    });
  });

  it('Should transform `items` record to `discoveryTerms` array', () => {
    const payload = {
      category: 'Mammals',
      items: {
        0: { dt: 'Whale', def: 'Largest mammal on Earth' },
        1: { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        2: { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      },
    };
    const result = materialSchema.safeParse(payload);
    const { error: ZodError } = result;
    if (ZodError)
      console.log(
        style.wrap(
          'italic',
          'red',
          ` ZodError :( -> ${prettifyError(ZodError)}`,
        ),
      );
    expect(result?.data).toMatchObject({
      category: 'Mammals',
      discoveryTerms: [
        { dt: 'Whale', def: 'Largest mammal on Earth' },
        { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      ],
    });
  });

  it('Should PASS Zod validation with properly formatted payload', () => {
    const passingPayload = {
      category: 'Mammals',
      items: {
        0: { dt: 'Whale', def: 'Largest mammal on Earth' },
        1: { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        2: { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      },
    };
    const result = materialSchema.safeParse(passingPayload);
    const { error: ZodError } = result;
    if (ZodError)
      console.log(
        style.wrap(
          'italic',
          'red',
          ` ZodError :( -> ${prettifyError(ZodError)}`,
        ),
      );
    expect(result.success).toBe(true);
  });
});
