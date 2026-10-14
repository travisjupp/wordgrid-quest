import assert from 'node:assert/strict';
import { jest } from '@jest/globals';
import util from 'node:util';
util.inspect.defaultOptions.depth = null; // show full objects

import nodeConsole from 'console';
jest.unmock('@theme/themeConfig');
import { style } from '@utils/styles';

// suppress jests tracing console logs
import console from 'console';
import { materialSchema } from '@features/material/validators/materialSchema';
import { prettifyError, treeifyError, flattenError } from 'zod';
import { MATERIAL_INPUT_LIMITS } from '@features/material/constants/materialConfig';

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

  it(`Should FAIL Zod validation: long category name (>${MATERIAL_INPUT_LIMITS.category.maxLength} chars)`, () => {
    const longCatName = 'a'.repeat(
      MATERIAL_INPUT_LIMITS.category.maxLength + 1,
    );
    const customCategoryAsFailingPayload = {
      category: longCatName,
      discoveryTerms: [
        { dt: 'Whale', def: 'Largest mammal on Earth' },
        { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      ],
    };

    const result = materialSchema.safeParse(customCategoryAsFailingPayload);
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
        code: 'too_big',
        path: ['category'],
        maximum: MATERIAL_INPUT_LIMITS.category.maxLength,
      },
    ]);
  });

  it('Should FAIL Zod validation: discoveryTerms is empty', () => {
    const customCategoryAsFailingPayload = {
      category: 'Mammals',
      discoveryTerms: [],
    };
    const result = materialSchema.safeParse(customCategoryAsFailingPayload);
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
        code: 'too_small',
        path: ['discoveryTerms'],
        minimum: 1,
      },
    ]);
  });

  it(`Should FAIL Zod validation: long Discovery Term (>${MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength} chars)`, () => {
    const longDiscoveryTerm = 'a'.repeat(
      MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength + 1,
    );
    const customCategoryAsFailingPayload = {
      category: 'Mammals',
      discoveryTerms: [{ dt: longDiscoveryTerm, def: 'Largest mammal on Earth' }],
    };
    const result = materialSchema.safeParse(customCategoryAsFailingPayload);
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
        code: 'too_big',
        path: ['discoveryTerms', 0, 'dt'],
        maximum: MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength,
      },
    ]);
  });

  it(`Should FAIL Zod validation: long Definition Text (>${MATERIAL_INPUT_LIMITS.definitionText.maxLength} chars)`, () => {
    const longDefinitionText = 'a'.repeat(
      MATERIAL_INPUT_LIMITS.definitionText.maxLength + 1,
    );
    const customCategoryAsFailingPayload = {
      category: 'Mammals',
      discoveryTerms: [{ dt: 'Whale', def: longDefinitionText }],
    };
    const result = materialSchema.safeParse(customCategoryAsFailingPayload);
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
        code: 'too_big',
        path: ['discoveryTerms', 0, 'def'],
        maximum: MATERIAL_INPUT_LIMITS.definitionText.maxLength,
      },
    ]);
  });

  it('Should PASS Zod validation with properly formatted payload', () => {
    const customCategoryAsPassingPayload = {
      category: 'Mammals',
      discoveryTerms: [
        { dt: 'Whale', def: 'Largest mammal on Earth' },
        { dt: 'Shrew', def: 'Smallest mammal on Earth' },
        { dt: 'Cheetah', def: 'Fastest mammal on Earth' },
      ],
    };
    const result = materialSchema.safeParse(customCategoryAsPassingPayload);
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
