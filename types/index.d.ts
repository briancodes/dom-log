declare interface DomLog {
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
  /** Apply default background color to HTML element */
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
}

export declare const DomLog: DomLog;
