export function getDebugNumErrors(
  _daysBuilding: number,
  _daysDebugging: number,
) : number{
  return 24;
}

export function getDebugErrors(
  _numErrors: number,
) : string [] {
  return ['Image failed to load', 'File not found'];
}

export function getRecommendationQuality(
  _numErrors: number,
  _featureWeights: number[],
) : string {
  return 'poor';
}

/**
 *
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getControlGraphForABTesting(
  _numABTestingDays: number,
): [number, number][] {
  return [];
}

/**
 *
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getBetaGraphForABTesting(
  _expectedVariableValues: number[],
  _actualVariableValues: number[],
  _controlGraph: [number, number][],
  _timeAllocations: [number, number, number],
): [number, number][] {
  return [];
}

