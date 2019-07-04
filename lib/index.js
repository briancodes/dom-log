import { stringifyUtil } from './stringify-util';

let _logToConsole = false;
let _consoleElementId = 'app';
let _scrollIntoView = true;

// Class names (user can target these with !important)
const ITEM_CLASS = 'dom-log__item';
const FLEX_ITEM_CLASS = 'dom-log__flex-item';
const FLEX_CONTAINER_CLASS = 'dom-log__flex-container';

// Styles
const BACKGROUND_COLOR = '#212020';
const BORDER_COLOR = '#cececec4';
const PRE_STYLE = {
  color: '#40c64c',
  fontSize: ' 0.9em',
  overflowX: 'auto',
  margin: '0',
  padding: '0.5em',
  borderBottom: `0.5px solid ${BORDER_COLOR}`
};
const FLEX_CONTAINER_STYLE = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  borderBottom: `0.5px solid ${BORDER_COLOR}`
};
// The width is applied dynamically
const FLEX_ITEM_STYLE = {
  borderBottom: 'none',
  borderLeft: `0.5px solid ${BORDER_COLOR}`,
  paddingLeft: '5px',
  flex: 'auto'
};

const applyCss = (element, cssObject = {}) => {
  Object.entries(cssObject).forEach(([key, value]) => {
    element.style[key] = value;
  });
};

/** output stringified objects and functions to the DOM */
const log = (...args) => {
  try {
    // HMR may require retrieval of loggingElement each time (StackBlitz)
    const loggingElement = document.getElementById(_consoleElementId);
    loggingElement.style.backgroundColor = BACKGROUND_COLOR;

    const pre = loggingElement.appendChild(document.createElement('pre'));
    pre.classList.add(ITEM_CLASS);
    applyCss(pre, PRE_STYLE);

    pre.textContent = args.map(val => stringifyUtil(val)).join('\n');
    if (_scrollIntoView) pre.scrollIntoView({ behavior: 'smooth' });
  } catch (e) {
    console.warn('Trying to log to:', JSON.stringify(_consoleElementId), e);
  }

  if (_logToConsole) console.log(...args);

  return domLog;
};

/** Move the last number of logged outputs side by side */
const sideBySide = (num = 2) => {
  const appElement = document.getElementById(_consoleElementId);
  if (!appElement)
    return console.warn('No element:', _consoleElementId), domLog;
  if (num <= 0) return console.log('Number must be > 0'), domLog;

  const lastElements = Array.from(appElement.children || [])
    .slice(-num)
    .map(elem => {
      const width = (100 * 0.8) / (num || 1) + '%';
      applyCss(elem, { ...PRE_STYLE, ...FLEX_ITEM_STYLE, ...{ width } });
      elem.classList.add(FLEX_ITEM_CLASS);
      return elem;
    });

  const div = appElement.appendChild(document.createElement('div'));
  div.classList.add(FLEX_CONTAINER_CLASS);
  div.append(...lastElements);
  applyCss(div, FLEX_CONTAINER_STYLE);

  return domLog;
};

/** clear the current logging */
const clear = () => {
  const consoleElement = document.getElementById(_consoleElementId);
  while (consoleElement && consoleElement.firstChild) {
    consoleElement.firstChild.remove(); // IE not supported 😥
  }
  console.clear();
  return domLog;
};

/** log with console.log */
const setLogToConsole = (value = true) => {
  _logToConsole = value;
  return domLog;
};

/** id of the DOM element to attach logs */
const setElementId = (id = _consoleElementId) => {
  _consoleElementId = id;
  return domLog;
};

/**
 * Apply background color to HTML element
 */
const applyBackgroundAll = () => {
  document.documentElement.style.backgroundColor = BACKGROUND_COLOR;
  return domLog;
};

/** Set the css font size e.g. 0.9em */
const setFontSizeCss = (value = '0.9em') => {
  PRE_STYLE.fontSize = value;
  return domLog;
};

/** Scrolls the logged item into view e.g. scrolls with logging */
const scrollIntoView = (value = true) => {
  _scrollIntoView = value;
  return domLog;
};

// Export
export const domLog = {
  log,
  sideBySide,
  clear,
  setElementId,
  setLogToConsole,
  applyBackgroundAll,
  setFontSizeCss,
  scrollIntoView
};
