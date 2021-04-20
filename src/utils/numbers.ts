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
}{
  const value = Math.max(Math.min(input, max), min);
  return {num: value, dNum: value - input};
} 