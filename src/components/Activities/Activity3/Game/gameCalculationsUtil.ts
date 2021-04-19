import {MIN_ALLOCATION} from './GameConstants';

const DAYS_BUILDING = 10; // (counts for 1.5x debugging?) number
const DAYS_DEBUGGING = 5; // percentage

export function generateVariableTargets() : [number, number, number]{
  const NUMBER_TARGETS = 3;
  const percentageToAllocate = 100 - 3 * MIN_ALLOCATION;
  const allocation1 = 2 * Math.random() * percentageToAllocate / NUMBER_TARGETS;
  const allocation2 = Math.random() * (percentageToAllocate - allocation1);
  const allocation3 = percentageToAllocate - allocation1 - allocation2;

  return [allocation1 + MIN_ALLOCATION, allocation2 + MIN_ALLOCATION, allocation3 + MIN_ALLOCATION];
}

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

