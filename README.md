# DomLog

`npm install @bcodes/dom-log`

## Log stringified objects to the DOM

 This little library stringifies model objects and appends them to the main `app` element

 ```typescript
 // Supports method chaining and grouped output
 DomLog
  .log(a)
  .log(b)
  .log(c)
  .log(d)
  .sideBySide(4);
  ```

 Particularly useful for [StackBlitz](https://stackblitz.com/) and [CodeSandbox](https://codesandbox.io) projects

---

Continuous trips to the `console` were getting me down 😢

<p align="center">
  <img alt="console.log" height="200px" src="https://user-images.githubusercontent.com/15702512/60741364-ffdf1e80-9f60-11e9-9ab3-3d677528fd8b.png">
</p>

The data displays in readable form, and happiness returns 👍

<p align="center">
  <img alt="DomLog" src="https://user-images.githubusercontent.com/15702512/60740553-19cb3200-9f5e-11e9-8523-89182890226b.png">
</p>

---

## API

```typescript
   /**
   * Outputs JSON.stringified objects to the DOM 
   * Value replacer preserves NaN, undefined, Infinity, -Infinity
   *
   * @param {*} args
   */
  log: (...args: any[]) => DomLog;

  /**
   * Move the last number of logged outputs side by side
   *
   * @param {number} [num=2]
   */
  sideBySide: (num?: number) => DomLog;

  /**
   * Clear the current logging
   */ 
  clear: () => DomLog;

  /**
   * Log with console.log also
   *
   * @param {boolean} [value=true]
   */
  setLogToConsole: (value?: boolean) => DomLog;

  /**
   * Set the id of the DOM element to attach logs
   *
   * @param {string} [id='app']
   */
  setElementId: (id?: string) => DomLog;

  /** 
   * Apply default background color to HTML element 
   */
  applyBackgroundAll: () => DomLog;

  /**
   * Set the css font size e.g. 0.9em
   *
   * @param {string} [value='0.9em']
   */
  setFontSizeCss: (value?: string) => DomLog;

  /**
   * Scrolls the logged item into view
   *
   * @param {boolean} [value=true]
   */
  scrollIntoView: (value?: boolean) => DomLog;
  ```
