declare interface DomLog {
  log: (...args: any[]) => DomLog;
  sideBySide: (num: number) => DomLog;
  clear: () => DomLog;
  setElementId: (id: string) => DomLog;
  setLogToConsole: (value?: boolean) => DomLog;
  applyBackgroundAll: () => DomLog;
  setFontSizeCss: (value: string) => DomLog;
  scrollIntoView: (value: boolean) => DomLog;
}

export declare const domLog: DomLog;
