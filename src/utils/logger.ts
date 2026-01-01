import { DiscoveryTermObject } from '@custom-types/AppTheme';
import { style } from '../../../Javascript/styles';
type NumericKeyObjectRecord = Record<number, DiscoveryTermObject>;

  const logItems = (externalItem: any, items: NumericKeyObjectRecord) => {
    console.log(style.h2('LogItems'));
    Object.entries(items).map((item) => {
      const key = item[0];
      const dt = item[1].dt
      const def = item[1].def
      const {dim, bold, purple, reset, cyan, green, bolditalic} = style;
      console.log(
        dim, bold, 'key', reset, key, reset,
        dim, bold, purple, 'DT', reset, bolditalic, purple, dt, '\t', reset,
        dim, bold, cyan, 'DEF', reset, bolditalic, cyan, def, '\t', reset,
        dim, green, externalItem, reset
      );
      return item;
    });
  };

export { logItems }
