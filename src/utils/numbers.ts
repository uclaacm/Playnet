/**
 * Given a number and its min and max range, return either the number or the edges of the range.
 *
 * @returns [num: result, dNum: difference]
 * @var result: the clamped value
 * @var difference: the difference between the clamped value and the input num
 */
export function clamp(min: number, input: number, max: number) : {
  num: number,
  dNum: number,
} {
  const value = Math.max(Math.min(input, max), min);
  return { num: value, dNum: value - input };
}

/**
 * Given an object with number values, return the sum of all of it's children
 * @param arr input object with string key and number value
 * @returns sum of all elements
 */
export function objectSum(arr: {[key: string]: number}) : number {
  return Object.values(arr).reduce((prev, curr) => prev + curr, 0);
}
