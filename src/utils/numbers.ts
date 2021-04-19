/**
 * @returns squeezed result + change in num
 */
export function squeeze(num: number, min: number, max: number) : [number, number]{
  const value = Math.max(Math.min(num, min), max);
  return [value, value - num];
}