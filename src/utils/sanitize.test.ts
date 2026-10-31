/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { sanitizeDiscoveryTerm, activePolicyDesc } from '@utils/sanitize';
/*****************************************************
 * UPDATE THE ACTIVE POLICY DESC ON CHANGE^  (^-ᆺ -^) 
 *****************************************************/
import util from 'node:util';
util.inspect.defaultOptions.depth = null; // show full objects
// util.inspect.defaultOptions.depth = 0; // show truncated objects
// util.inspect.defaultOptions.compact = true; // dont break objects to new lines
// util.inspect.defaultOptions.compact = false; // break objects to new lines

// IMPORT FROM LOCAL UTILITY, NOT THE LIBRARY
// import { fireEvent, render, screen } from '@utils/test-utils';

// import { logItems } from '@utils/logger'; // Log NumericKeyObjectRecord
import nodeConsole from 'console';
jest.unmock('@theme/themeConfig');
import { style } from '@utils/styles';
// const { dim, green, hr, reset } = style;

// suppress jests tracing console logs
import console from 'console';
import { DiscoveryTermObjectOutput } from '@shared/domain/customMaterial/discoverySchema';

const currentSecurityPolicy = `${style.wrap('bolditalic', 'underline', 'Active Policy:')} ${style.wrap('blackbg', 'yellow', activePolicyDesc)}\n`;

describe(style.wrap('bolditalic', 'XSS Sanitization\n'), () => {
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
    // Clear timers and switch back to real time to prevent leakages
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    const TEST_AFTER = [
      '\n',
      style.color(99),
      style.hr.double,
      style.reset,
      '\n',
    ].join('');

    process.stdout.write(TEST_AFTER);
  });

  describe(currentSecurityPolicy, () => {
    it('Should strip script tags completely', () => {
      const dirtyDTO: DiscoveryTermObjectOutput = {
        dt: 'Catfish',
        def: '<script>Z̸͉͔̙̽̿͘a̴̪̟̼͊͝l̴͍̪͇̈́̾͝g̸̢̪͚̿̈́͐o̵̢͍͓͘̚̕</script>Cat face-- but slender fish body',
      };
      const result = sanitizeDiscoveryTerm(dirtyDTO.def);
      expect(result).toBe('Cat face-- but slender fish body');
    });

    it('Should scrub React style template braces', () => {
      const dirtyDTO: DiscoveryTermObjectOutput = {
        dt: 'Catfish',
        def: '{{ process.env.ℬ𝒜𝒟_𝒱𝒜ℛ }}Cat face-- but slender fish body',
      };
      const result = sanitizeDiscoveryTerm(dirtyDTO.def);
      expect(result).toBe('Cat face-- but slender fish body');
    });

    it('Should strip markup tags E.g., <b> and <i>', () => {
      const dirtyDTO: DiscoveryTermObjectOutput = {
        dt: 'Catfish',
        def: '<button aria-label="𝖉𝖊𝖆𝖙𝖍">Cat <i>face</i>-- but\
 <u>slender</u> fish <i>body</i></button>',
      };
      const result = sanitizeDiscoveryTerm(dirtyDTO.def, {
        ALLOWED_TAGS: [],
      });
      expect(result).toBe('Cat face-- but slender fish body');
    });
  });
});
