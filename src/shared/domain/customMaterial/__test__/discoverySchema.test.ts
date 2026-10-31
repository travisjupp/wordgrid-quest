import { jest } from '@jest/globals';
import util from 'node:util';
import nodeConsole from 'console';
import { style } from '@utils/styles';
import { prettifyError } from 'zod';

import { discoveryTermObjectSchema } from '../discoverySchema';
import { MATERIAL_INPUT_LIMITS } from '@features/material/constants/materialConfig';
jest.unmock('@theme/themeConfig');
util.inspect.defaultOptions.depth = null; // show full objects

describe(style.wrap('bolditalic', 'Discovery Term Object\n'), () => {
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

  it('Should FAIL Zod validation if Discovery Term (dt) is missing', () => {
    const failingPayload = { dt: '', def: 'Largest mammal on Earth' };
    const result = discoveryTermObjectSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError) {
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    }
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'too_small',
        path: ['dt'],
        minimum: MATERIAL_INPUT_LIMITS.discoveryTerm.minLength,
      },
    ]);
  });

  it(`Should FAIL Zod validation: long Discovery Term (> ${MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength} chars) `, () => {
    const longDiscoveryTerm = 'a'.repeat(
      MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength + 1,
    );
    const failingPayload = {
      dt: longDiscoveryTerm,
      def: 'Largest Mammal on Earth',
    };
    const result = discoveryTermObjectSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError) {
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    }
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'too_big',
        path: ['dt'],
        maximum: MATERIAL_INPUT_LIMITS.discoveryTerm.maxLength,
      },
    ]);
  });

  it('Should FAIL Zod validation if Definition Text (def) is missing', () => {
    const failingPayload = { dt: 'Whale', def: '' };
    const result = discoveryTermObjectSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError) {
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    }
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'too_small',
        path: ['def'],
        minimum: MATERIAL_INPUT_LIMITS.definitionText.minLength,
      },
    ]);
  });

  it(`Should FAIL Zod validation: long Definition Text (> ${MATERIAL_INPUT_LIMITS.definitionText.maxLength} chars) `, () => {
    const longDefinitionText = 'a'.repeat(
      MATERIAL_INPUT_LIMITS.definitionText.maxLength + 1,
    );
    const failingPayload = {
      dt: 'Whale',
      def: longDefinitionText,
    };
    const result = discoveryTermObjectSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError) {
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    }
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'too_big',
        path: ['def'],
        maximum: MATERIAL_INPUT_LIMITS.definitionText.maxLength,
      },
    ]);
  });

  it(`Should FAIL Zod validation: unknown key found `, () => {
    const failingPayload = {
      dt: 'Whale',
      def: 'Largest mammal on Earth',
      unknown: 'unknown',
    };
    const result = discoveryTermObjectSchema.safeParse(failingPayload);
    const { error: ZodError } = result;
    if (ZodError) {
      console.log(
        style.wrap('italic', 'cyan', ` ZodError: ${prettifyError(ZodError)}`),
      );
    }
    expect(result.success).toBe(false);
    expect(result?.error?.issues).toMatchObject([
      {
        code: 'unrecognized_keys',
        path: [],
      },
    ]);
  });

  it('Should PASS Zod validation with properly formatted payload', () => {
    const passingPayload = { dt: 'Whale', def: 'Largest mammal on Earth' };
    const result = discoveryTermObjectSchema.safeParse(passingPayload);
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
