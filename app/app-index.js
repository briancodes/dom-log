import { DomLog } from '../lib/index';

// These are all defaults except applyBackgroundAll
DomLog.setElementId('app')
  .applyBackgroundAll()
  .scrollIntoView(true)
  .setFontSizeCss('0.9em')
  .setLogToConsole(true);

DomLog.log('😉');
const a = [null, 2, 3, 4, undefined, -Infinity];
const b = a.map(x => x * 10);
const c = b.map(x => '' + x);

DomLog.log(a);
DomLog.log(b);

DomLog.log(b)
  .log(c)
  .sideBySide(2);

DomLog.log(a)
  .log(b)
  .log(c)
  .sideBySide(3);
