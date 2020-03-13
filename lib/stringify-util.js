const valueReplacer = (key, value) => {
  if (value === undefined) {
    return `__${undefined}__`;
  }
  if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
    return `__${value}__`;
  }
  return value;
};

const replaceTempValues = (str = '') =>
  str
    .replace(/"__undefined__"/g, 'undefined')
    .replace(/"__NaN__"/g, 'NaN')
    .replace(/"__Infinity__"/g, 'Infinity')
    .replace(/"__-Infinity__"/g, '-Infinity');

const compose = (...fns) => val => fns.reduceRight((arg, fn) => fn(arg), val);

const stringify = compose(replaceTempValues, val =>
  JSON.stringify(val, valueReplacer, 2)
);
/**
 * JSON.stringify which also supports:
 * undefined, NaN, Infinity, -Infinity
 *
 * @see https://2ality.com/2015/08/es6-map-json.html
 * */
export const stringifyUtil = val => {
  if (typeof val === 'function') {
    const fstr = val.toString();
    return fstr.slice(fstr.indexOf('{') + 1, -1).trim();
  }
  if (typeof val === 'string') {
    return val;
  }
  if (val instanceof Map || val instanceof Set) {
    return stringify(Array.from(val));
  }
  return stringify(val);
};
