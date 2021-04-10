// stolen from https://stackoverflow.com/a/34166661 + refactored
const cssToWindowProps: { [key: string]: 'innerHeight'|'innerWidth' }=  {
  vh: 'innerHeight',
  vw: 'innerWidth',
};

/**
 * @param viewportLength string that that describes a viewport length
 *      valid inputs: `###vh` or `###vw`
 * @returns # pixels in viewportLength
 */
export function viewportToPixels(viewportLength: string) : number {
  const parts = viewportLength.match(/([0-9.]+)(vh|vw)/);
  if(!parts)
    throw 'bad input';
  const percentViewPort = Number(parts[1]);
  const viewportPixels = window[cssToWindowProps[String(parts[2])]];

  return viewportPixels * (percentViewPort / 100);
}

/**
 * strips length units from string and returns a number
 * @param length valid inputs: `###px`, `###vh`, ...
 * @returns the number `###` without the units
 */
export function stripUnits(length: string) : number {
  const firstNonNumIndex = length.search(/[A-Za-z]/);
  const number = (firstNonNumIndex > 0 && firstNonNumIndex < length.length) ?
    length.substring(0, firstNonNumIndex) : length;
  return parseFloat(number);
}