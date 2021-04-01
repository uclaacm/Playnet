/**
 * A helper function to create a new array when needing to replace an element.
 *
 * Useful for React State Variables!
 *
 * @param arr The array you want to mutate
 * @param index The index for replace
 * @param value The value to replace into the array
 * @returns If index is valid, returns new mutated array, else returns old array
 */
export const replace = <T> (arr: T[], index: number, value: T): T[] => {
  if (index < 0 || index >= arr.length ) return arr;
  return [...arr.slice(0, index), value, ...arr.slice(index+1)];
};