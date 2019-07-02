import { domLog } from '../lib/index';

const APP_ID = 'target';
const MULTI_NEWLINE_SPACE = /[\r\n ]+/gm;

const appElement = () => {
  return document.getElementById(APP_ID);
};

describe('dom-log', () => {
  const scrollIntoViewSpy = jest.fn();

  beforeAll(() => {
    domLog.setElementId(APP_ID);
    Element.prototype.scrollIntoView = scrollIntoViewSpy;
  });

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="${APP_ID}">
      </div>
    `;
    scrollIntoViewSpy.mockReset();
  });

  it('should be an object with functions', () => {
    expect(domLog).toBeTruthy();
    expect(typeof domLog).toEqual('object');
    expect(typeof domLog.log).toEqual('function');
  });

  it('log() - should log to the DOM', () => {
    domLog.log('a');
    expect(appElement().textContent.trim()).toEqual('a');
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });

  it('sideBySide() - should log 2 elements side by side', () => {
    domLog.log('a');
    domLog.log('b');
    domLog.sideBySide(2);
    const div = appElement().lastElementChild;
    expect(div.children.length).toEqual(2);
    expect(div.children.item(0).textContent.trim()).toEqual('a');
    expect(div.children.item(1).textContent.trim()).toEqual('b');
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(2);
  });

  it('clear() - should clear the DOM element', () => {
    domLog.log('a');
    expect(appElement().children.length).toEqual(1);
    domLog.clear();
    expect(appElement().children.length).toEqual(0);
  });

  it('should display stringified array with: undefined, NaN, Infinity ', () => {
    const arr = [undefined, NaN, Infinity, -Infinity];
    domLog.log(arr);
    const result = appElement().textContent.replace(MULTI_NEWLINE_SPACE, '');

    expect(result).toEqual('[undefined,NaN,Infinity,-Infinity]');
  });

  it('should display stringified object with: undefined, NaN, Infinity ', () => {
    const obj = { a: undefined, b: NaN, c: Infinity, d: -Infinity };
    domLog.log(obj);
    const result = appElement().textContent.replace(MULTI_NEWLINE_SPACE, '');

    expect(result).toEqual(
      '{"a":undefined,"b":NaN,"c":Infinity,"d":-Infinity}'
    );
  });
});
