import { domLog } from '../lib/index';

console.log('app-index.js parsed 👌');
console.log('app-index - lib check:', domLog);

domLog.setLogToConsole(true).applyBackgroundAll();

domLog.setElementId('app-id');
domLog.log('😉');
const a = [null, 2, 3, 4, undefined, -Infinity];
const b = a.map(x => x * 10);
const c = b.map(x => '' + x);

domLog.log(a);
domLog.log(b);

domLog
  .log(b)
  .log(c)
  .sideBySide(2);

domLog
  .log(a)
  .log(b)
  .log(c)
  .sideBySide(3);
