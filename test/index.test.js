import { DomLog } from '../lib/index';

const APP_ID = 'target';
const MULTI_NEWLINE_SPACE = /[\r\n ]+/gm;

const appElement = () => {
  return document.getElementById(APP_ID);
};

describe('dom-log', () => {
  const scrollIntoViewSpy = jest.fn();

  beforeAll(() => {
    DomLog.setElementId(APP_ID);
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
    expect(DomLog).toBeTruthy();
    expect(typeof DomLog).toEqual('object');
    expect(typeof DomLog.log).toEqual('function');
  });

  it('log() - should log to the DOM', () => {
    DomLog.log('a');
    expect(appElement().textContent.trim()).toEqual('a');
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(1);
  });

  it('sideBySide() - should log 2 elements side by side and scroll', () => {
    DomLog.log('a');
    DomLog.log('b');
    DomLog.sideBySide(2);
    const div = appElement().lastElementChild;
    expect(div.children.length).toEqual(2);
    expect(div.children.item(0).textContent.trim()).toEqual('a');
    expect(div.children.item(1).textContent.trim()).toEqual('b');
    expect(scrollIntoViewSpy).toHaveBeenCalledTimes(2);
  });

  it('clear() - should clear the DOM element', () => {
    DomLog.log('a');
    expect(appElement().children.length).toEqual(1);
    DomLog.clear();
    expect(appElement().children.length).toEqual(0);
  });

  it('should display stringified array with: undefined, NaN, Infinity', () => {
    const arr = [undefined, NaN, Infinity, -Infinity];
    DomLog.log(arr);
    const result = appElement().textContent.replace(MULTI_NEWLINE_SPACE, '');

    expect(result).toEqual('[undefined,NaN,Infinity,-Infinity]');
  });

  it('should display stringified object with: undefined, NaN, Infinity', () => {
    const obj = { a: undefined, b: NaN, c: Infinity, d: -Infinity };
    DomLog.log(obj);
    const result = appElement().textContent.replace(MULTI_NEWLINE_SPACE, '');

    expect(result).toEqual(
      '{"a":undefined,"b":NaN,"c":Infinity,"d":-Infinity}'
    );
  });

  it('should display stringified Map as array of iterator', () => {
    const objA = { a: 1 };
    const objB = { b: 2 };

    const map = new Map()
      .set('key', 'value')
      .set(objA, 1)
      .set(objB, 2);

    DomLog.log(map);

    const result = appElement().textContent.replace(MULTI_NEWLINE_SPACE, '');

    expect(result).toEqual('[["key","value"],[{"a":1},1],[{"b":2},2]]');
  });

  it('should display stringified Set as array of iterator ', () => {
    const objA = { a: 1 };
    const objB = { b: 2 };

    const set = new Set()
      .add('value')
      .add(objA)
      .add(objB);

    DomLog.log(set);

    const result = appElement().textContent.replace(MULTI_NEWLINE_SPACE, '');

    expect(result).toEqual('["value",{"a":1},{"b":2}]');
  });
});
