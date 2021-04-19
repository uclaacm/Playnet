export function getDebugNumErrors(
  daysBuilding: number, 
  daysDebugging: number
  ) : number{
    return 24;
}

export function getDebugErrors(
  numErrors: number,
  ) : string [] {
    return ['Image failed to load', 'File not found'];
}

export function getRecommendationQuality(
  numErrors: number,
  featureWeights: number[],
) : string {
  return "poor";
}

/**
 *
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getControlGraphForABTesting(
  numABTestingDays: number,
): [number, number][] {

  return [];
}

/**
 *
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getBetaGraphForABTesting(
  expectedVariableValues: number[],
  actualVariableValues: number[],
  controlGraph: [number, number][],
  timeAllocations: [number, number, number],
): [number, number][] {

  return [];
}

