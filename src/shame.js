/*
 * DELETE THIS FILE. EVERYTHING NEEDS TO FIND A HOME.
 */
import {getFromId} from 'plotly.js/src/plots/cartesian/axis_ids';
import nestedProperty from 'plotly.js/src/lib/nested_property';

// Temporary fix for:
// https://github.com/plotly/react-chart-editor/issues/103
// We should be able to remove this once the plotly.react method has
// been integrated into react-plotly.js and released:
// https://github.com/plotly/react-plotly.js/issues/2
export const maybeClearAxisTypes = (graphDiv, traceIndexes, update) => {
  if (!Array.isArray(graphDiv._fullData)) {
    return;
  }
  let hasSrc = false;
  for (const key in update) {
    if (key.substr(key.length - 3) === 'src') {
      hasSrc = true;
    }
  }
  if (hasSrc) {
    clearAxisTypes(graphDiv, traceIndexes);
  }
};

const axLetters = ['x', 'y', 'z'];
function clearAxisTypes(gd, traces) {
  for (let i = 0; i < traces.length; i++) {
    const trace = gd._fullData[i];
    for (let j = 0; j < 3; j++) {
      const type = axLetters[j];
      const ax = getFromId(gd, trace[type + 'axis'] || type);

      // Do not clear log type.
      // Log type is never an auto result so must have been intentional.
      // We are also skipping clearing 3D which could cause bugs with 3D.
      if (ax && ax.type !== 'log') {
        const axAttr = ax._name;
        const typeAttr = axAttr + '.type';
        nestedProperty(gd.layout, typeAttr).set(null);
      }
    }
  }
}
