/* eslint-disable */
export function viewportToPixels(value: string) {
  var parts = value.match(/([0-9\.]+)(vh|vw)/)
  if(!parts)
    throw 'bad input, give 10vh or 93vw or something';
  var q = Number(parts[1])
  var side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]]
  return side * (q / 100)
}