import { DiscoveryTermObject } from '@custom-types/AppTheme';
import { style } from '../../../Javascript/styles';
type NumericKeyObjectRecord = Record<number, DiscoveryTermObject>;

const logItems = (
  currentKey: number,
  externalItem: any,
  items: NumericKeyObjectRecord,
) => {
  const { dim, bold, purple, reset, cyan, green, bolditalic } = style;
  const currentItem = items[currentKey];
  const formatString = (str: string, MAX_LENGTH: number) => {
    if (!str.length) return '·'.repeat(MAX_LENGTH);
    if (str.length <= MAX_LENGTH) {
      const diff = MAX_LENGTH - str.length;
      return str + ' '.repeat(diff);
    }
    const truncated = str.slice(0, MAX_LENGTH - 3);
    return truncated + '...';
  };
  const dt = formatString(currentItem.dt, 6);
  const def = formatString(currentItem.def, 16);
  const key = formatString(currentKey.toString(), 6);
  const isJest = typeof process !== 'undefined' && process.env.JEST_WORKER_ID;

  if (currentKey === 0) {
    const header = `\n${style.h2('LogItems')}\n`;
    isJest ? process.stdout.write(header) : console.log(header);
  }

  // prettier-ignore
  const message = [
    dim, bold, 'KEY ', reset, key,
    dim, bold, purple, ' DT ', reset, bolditalic, purple, dt, '\t', reset, 
    dim, bold, cyan, ' DEF ', reset, bolditalic, cyan, def, '\t', reset,
  ].join('');

  // Route the output
  isJest ? process.stdout.write(message + '\n') : console.log(message);
};

export { logItems };
