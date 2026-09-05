// ANSI styles
// usage: import and run `style.test()` for samples, see styles.test for console log examples
//
// someFile.js
// import {style} from 'styles.js';
// style.test();

const style = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  italic: '\x1b[3m',
  bolditalic: '\x1b[3m\x1b[1m',
  underline: '\x1b[4m',
  dblUnderline: '\x1b[21m',
  dim: '\x1b[2m',
  invert: '\x1b[7m',
  black: '\x1b[30m',
  blackbg: '\x1b[40m',
  red: '\x1b[31m',
  redbg: '\x1b[41m',
  orange: '\x1b[38;5;208m',
  green: '\x1b[32m',
  greenbg: '\x1b[42m',
  yellow: '\x1b[33m',
  yellowbg: '\x1b[43m',
  blue: '\x1b[34m',
  bluebg: '\x1b[44m',
  purple: '\x1b[35m',
  purplebg: '\x1b[45m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  cyanbg: '\x1b[46m',
  white: '\x1b[37m',
  whitebg: '\x1b[47m',
  primaryFont: '\x1b[10m',
  strike: '\x1b[9m',
  h1: (text) => {
    return `${style.bold}${style.red}${text}${style.reset}`;
  },
  h2: (text) => {
    return `${style.bold}${style.purple}${text}${style.reset}`;
  },
  h3: (text) => {
    return `${style.bold}${style.orange}${text}${style.reset}`;
  },
  h4: (text) => {
    return `${style.bold}${style.blue}${text}${style.reset}`;
  },
  h5: (text) => {
    return `${style.underline}${style.green}${text}${style.reset}`;
  },
  h6: (text) => {
    return `${style.underline}${style.magenta}${text}${style.reset}`;
  },
  chain: (...styles) => {
    let chainedStyles = '';
    for (const styleName of styles) {
      chainedStyles += style[styleName];
    }
    return chainedStyles;
  },
  wrap: (...styles) => {
    let chainedStyles = '';
    for (const styleName of styles) {
      const isEscSeq = JSON.stringify(styleName).slice(0,6) === '"\\u001';
      if (isEscSeq) {
        chainedStyles += styleName;
      }
      // Last item is not style key
      if (styles.indexOf(styleName) === styles.length -1) {
        chainedStyles += styleName;
      } else {
        if (!isEscSeq) {
          // Add style keys
          chainedStyles += style[styleName];
        }
      }
    }
    chainedStyles += style.reset;
    return chainedStyles;
  },
  list: (...listItems) => {
    let list = '';
    for (const item of listItems) {
      list += `\n ☞  ${item}`;
    }
    return list;
  },
  todo: (...listItems) => {
    let list = '';
    for (const item of listItems) {
      if (item[0] === '+') {
        list += '\n - [ ] '+item.slice(1);
      }
      if (item[0] === '-') {
        list += '\n - [x] '+item.slice(1);
      }
      if (item[0] === '~') {
        list += '\n - [~] '+style.strike+item.slice(1)+style.reset;
      }
      if (item[0] === '!') {
        if (item[1] === '+') {
          list += '\n - [ ] '+style.bold+item.slice(2)+style.reset;
        }
        if (item[1] === '-') {
          list += '\n - [x] '+style.bold+item.slice(2)+style.reset;
        }
        if (item[1] !== '+' && item[1] !== '-') {
          list += '\n - [ ] '+style.bold+item.slice(1)+style.reset;
        }
      }
    }
    return list;
  },
  hr: {
    double: `${'═'.repeat(process.env.COLUMNS - 10 || 80)}`,
    single: `${'─'.repeat(process.env.COLUMNS - 10 || 80)}`,
    short: `${'─'.repeat(30)}`
  },
  color(r,g,b) {
    return g === undefined ? `\x1b[38;5;${r}m` : `\x1b[38;2;${r};${g};${b}m`;
  },
  bgColor(r,g,b) {
    return g === undefined ? `\x1b[48;5;${r}m` : `\x1b[48;2;${r};${g};${b}m`;
  },
  test: () => {
    console.log(
      style.color(255,0,255)+'Styled with Custom RGB Color'+style.reset+
      style.color(39)+'Some Styled Text'+style.reset+'\n'+
      style.bgColor(18)+style.orange+'Some Background Styled Text'+style.reset+
      style.redbg+style.black+style.bold+'Some Background Styled Text'+style.reset+'\n'+
      '\x1b[33m'+'Some Styled Text'+'\x1b[0m'+'\n'+
      style.hr.double,
      style.wrap('red', style.hr.single),
      style.wrap(style.color(255,0,255), style.hr.single),
      style.wrap('\x1b[33m', style.hr.single)+'\n'+
      style.wrap('italic', 'Make me ITALIC (reset included for `style.wrap()`)')+'\n'+
      style.wrap('black', 'redbg', 'bold', 'strike', 'Make me RED BACKGROUND STRIKED')+
      style.chain('red', 'bold')+ 'Make me RED BOLD'+ style.reset+'\n'+
      style.dim+ 'Make me DIM'+ style.reset+'\n'+
      style.list('Make me a LIST ITEM','Make me a LIST ITEM')+ style.reset+
      style.list(`Make me a ${style.italic}INLINE STYLED${style.reset} LIST ITEM`,`Make me a LIST ITEM`)+ style.reset+
      style.todo('+Make me a TODO LIST ITEM','-Make me a DONE LIST ITEM','~Make me a STRIKED LIST ITEM','!Make me a IMPORTANT TODO LIST ITEM', '!+Make me a IMPORTANT TODO LIST ITEM', '!-Make me a IMPORTANT DONE LIST ITEM')+ style.reset
    );
  },
  help: () => {
    console.log(`
@tjupp ANSI styles
usage: import help and test for demo
*************************************************
// someFileIwantToStyleConsoleLogsIn.js

import {style} from 'styles.js';
style.test();
style.help();
console.log(style.bold, 'Bold ME!', style.reset);
*************************************************
Wrap in console logs 
E.g., console.log(style.bold, 'Bold ME!', style.reset);

SAMPLES (run \`styles.test()\` to view styled in console)

      style.color(255,0,255)+'Styled with Custom RGB Color'+style.reset+
      style.color(39)+'Some Styled Text'+style.reset+'\\n'+
      style.bgColor(18)+style.orange+'Some Background Styled Text'+style.reset+
      style.redbg+style.black+style.bold+'Some Background Styled Text'+style.reset+'\\n'+
      '\\x1b[33m'+'Some Styled Text'+'\\x1b[0m'+'\\n'+

      style.hr.double,
      style.wrap('red', style.hr.single),
      style.wrap(style.color(255,0,255), style.hr.single),
      style.wrap('\\x1b[33m', style.hr.single)+'\\n',

      style.wrap('italic', 'Make me ITALIC (reset included for \`style.wrap()\`)')+'\\n'+
      style.wrap('black', 'redbg', 'bold', 'strike', 'Make me RED BACKGROUND STRIKED')+

      style.chain('red', 'bold')+ 'Make me RED BOLD'+ style.reset+'\\n'+
      style.dim+ 'Make me DIM'+ style.reset+'\\n'+
      style.list('Make me a LIST ITEM','Make me a LIST ITEM')+ style.reset+
      style.list(\`Make me a \${style.italic}INLINE STYLED\${style.reset} LIST ITEM\`,\`Make me a LIST ITEM\`)+ style.reset+
      style.todo('+Make me a TODO LIST ITEM',
                 '-Make me a DONE LIST ITEM',
                 '~Make me a STRIKED LIST ITEM',
                 '!Make me a IMPORTANT TODO LIST ITEM',
                 '!+Make me a IMPORTANT TODO LIST ITEM',
                 '!-Make me a IMPORTANT DONE LIST ITEM')+ style.reset
`);
  }
}

export { style }
// @tjupp

