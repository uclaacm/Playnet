import { Gaussian } from 'ts-gaussian';
import { squeeze } from '../../../../utils';
import {
  DAY_VALUE_FOR_BUILD, DAY_VALUE_PERCENT_FOR_DEBUG, DEBUG_ERROR_OPTIONS,
  EXP_CONSTANT, MAX_GRAPH_START, MAX_NUM_ERRORS, MIN_EXPECTED_ALLOCATION,
  MIN_GRAPH_START, MULTIPLE_FOR_CHANGE_OF_AB_GRAPH, NUMBER_TO_QUALITY_MAP,
  QUALITY_DEFAULT_KEY, SINGLE_AB_CHANGE_MAX, SINGLE_CONTROL_CHANGE_MAX,
  VARIABLE_WEIGHTS_STD,
} from './GameConstantsToMessWith';

export function generateVariableTargetWeights(): [number, number, number] {
  const NUMBER_TARGETS = 3;
  const percentageToAllocate = 100 - 3 * MIN_EXPECTED_ALLOCATION;
  const allocation1 = 2 * Math.random() * percentageToAllocate / NUMBER_TARGETS;
  const allocation2 = Math.random() * (percentageToAllocate - allocation1);
  const allocation3 = percentageToAllocate - allocation1 - allocation2;

  return [allocation1 + MIN_EXPECTED_ALLOCATION, allocation2 + MIN_EXPECTED_ALLOCATION,
    allocation3 + MIN_EXPECTED_ALLOCATION];
}

// EQUATIONS TO POSSIBLY MODIFY
/**
 * this is calculated from how far the weights are from the expected w/ a normal distribution
 * this ranges from [0 - 3]
 */
export function accuracyOfWeights(
  featureWeights: number[], // [0, 100]
  expectedWeights: number[], // [0, 100]
): number {
  const distribution = new Gaussian(0, VARIABLE_WEIGHTS_STD ** 2); // normal distribution

  // value between 0-3 about how accurate the recommendation was
  const distResults = expectedWeights.reduce((prev, weight, i) => prev +
    distribution.cdf(featureWeights[i] - weight), 0);
  return distResults;
}

/**
 * find some point value regarding the product is developed with BUILD and DEBUG
 * @param daysBuilding
 * @param daysDebugging
 * @returns [0 - 1] where 0 is high quality
 */
export function debugQuality(
  daysBuilding: number,
  daysDebugging: number,
): number {
  const t = daysBuilding * DAY_VALUE_FOR_BUILD * (1 + daysDebugging * DAY_VALUE_PERCENT_FOR_DEBUG);
  // Use negative exponential to see how many bugs they have. [0, 1] * MAX_NUM_ERRORS
  // e^-x has been chosen because it ranges from [1 - 0]
  return Math.exp(-1 * EXP_CONSTANT * t);
}
/**
 * ranges from [0 - 1] * [1 - 3] => larger is better
 * @param featureWeights
 * @param expectedWeights
 * @param timeAllocations
 */
export function overallQuality(
  featureWeights: number[],
  expectedWeights: number[],
  timeAllocations: [number, number, number],
): number {
  const weightAccuracy = accuracyOfWeights(featureWeights, expectedWeights);
  const debugAccuracy = 1 - debugQuality(timeAllocations[0], timeAllocations[1]);

  return weightAccuracy * debugAccuracy;
}

// SPECIFICS
export function getDebugNumErrors(
  daysBuilding: number,
  daysDebugging: number,
): number {
  const t = debugQuality(daysBuilding, daysDebugging);
  const numErrors = Math.floor(MAX_NUM_ERRORS * t);
  return numErrors;
}

/**
 * gets a list of debug errors
 * @param numErrors length of array to find
 * @returns array of random errors
 */
export function getDebugErrors(
  numErrors: number,
): string[] {
  const errors = [];
  const len = DEBUG_ERROR_OPTIONS.length;
  for (let i = 0; i < numErrors; i++) {
    errors.push(DEBUG_ERROR_OPTIONS[Math.floor(Math.random() * len)]);
  }
  return errors;
}

/**
 * returns the recommendation quality string.
 * this is based on accuracy of the feature weights with the expected
 */
export function getRecommendationQuality(
  featureWeights: number[], // [0, 100]
  expectedWeights: number[], // [0, 100]
): string {
  const accuracyWithExpected = accuracyOfWeights(featureWeights, expectedWeights);

  const numericQuality = 2 * accuracyWithExpected * Math.random();

  // get the name mapping related with how accurate the recommendation was
  // (eg: good / poor)
  const qualityKey = Object.keys(NUMBER_TO_QUALITY_MAP).find(
    (key) => { const bracket = key.split(',').map(Number); return numericQuality > bracket[0] && numericQuality < bracket[1]; },
  ) ?? QUALITY_DEFAULT_KEY;
  const castingKey = qualityKey as keyof typeof NUMBER_TO_QUALITY_MAP;
  return NUMBER_TO_QUALITY_MAP[castingKey];
}

/**
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getControlGraphForABTesting(
  numABTestingDays: number,
): { xyMap: [number, number][]; dxyMap: [number, number][]; } {
  const changeInX = 100 / numABTestingDays;
  const xyMapping: [number, number][] = [];
  const dxyMapping: [number, number][] = [];
  let lastX = MIN_GRAPH_START + (MAX_GRAPH_START - MIN_GRAPH_START) * Math.random();
  let lastY = 0;
  let change, changeInY;
  xyMapping.push([lastX, lastY]);
  for (let i = 0; i < numABTestingDays; i++) {
    lastX += changeInX;

    change = SINGLE_CONTROL_CHANGE_MAX * Math.random() - (SINGLE_CONTROL_CHANGE_MAX / 2);
    [lastY, changeInY] = squeeze(lastY + change, 0, 100);
    xyMapping.push([lastX, lastY]);
    dxyMapping.push([changeInX, changeInY]);
  }
  return { xyMap: xyMapping, dxyMap: dxyMapping };
}

/**
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getBetaGraphForABTesting(
  featureWeights: number[],
  expectedWeights: number[],
  controlGraph: [number, number][],
  dControlGraph: [number, number][],
  timeAllocations: [number, number, number],
): { xyMap: [number, number][]; dxyMap: [number, number][]; } {
  const xyMapping: [number, number][] = [];
  const dxyMapping: [number, number][] = [];
  let random, changeYFromControl,changeY;

  let lastX = controlGraph[0][0];
  let lastY = controlGraph[0][1];
  xyMapping.push([lastX, lastY]);
  const quality = overallQuality(featureWeights, expectedWeights, timeAllocations);

  dControlGraph.forEach(([dx, dy]) => {
    random = Math.random() * SINGLE_AB_CHANGE_MAX - (SINGLE_AB_CHANGE_MAX / 2);
    changeYFromControl = MULTIPLE_FOR_CHANGE_OF_AB_GRAPH * (quality - 1) + random;
    changeY = changeYFromControl + dy;

    lastX += dx;
    lastY += changeY;

    xyMapping.push([lastX, lastY]);
    dxyMapping.push([dx, changeY]);
  });
  return { xyMap: xyMapping, dxyMap: dxyMapping };
}

