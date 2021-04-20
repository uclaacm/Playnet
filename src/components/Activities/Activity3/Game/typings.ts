export type Point = {
  x: number,
  y: number,
}

export type TimeAllocationKey = keyof TimeAllocations;
export type TimeAllocations = {
  build: number,
  debug: number,
  abTest: number,
}