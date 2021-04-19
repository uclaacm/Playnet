import { Gaussian } from 'ts-gaussian';
import { DAY_VALUE_FOR_BUILD, DAY_VALUE_PERCENT_FOR_DEBUG, DEBUG_ERROR_OPTIONS,
  EXP_CONSTANT, MAX_NUM_ERRORS, MIN_ALLOCATION, NUMBER_TO_QUALITY_MAP, QUALITY_DEFAULT_KEY,
  VARIABLE_WEIGHTS_STD } from './GameConstantsToMessWith';

export function generateVariableTargetWeights(): [number, number, number] {
  const NUMBER_TARGETS = 3;
  const percentageToAllocate = 100 - 3 * MIN_ALLOCATION;
  const allocation1 = 2 * Math.random() * percentageToAllocate / NUMBER_TARGETS;
  const allocation2 = Math.random() * (percentageToAllocate - allocation1);
  const allocation3 = percentageToAllocate - allocation1 - allocation2;

  return [allocation1 + MIN_ALLOCATION, allocation2 + MIN_ALLOCATION, allocation3 + MIN_ALLOCATION];
}

export function getDebugNumErrors(
  daysBuilding: number,
  daysDebugging: number,
): number {
  // find some point value regarding how much the kid developped their product with BUILD and DEBUG
  const t = daysBuilding * DAY_VALUE_FOR_BUILD * (1 + daysDebugging * DAY_VALUE_PERCENT_FOR_DEBUG);
  // Use negative exponential to see how many bugs they have. [0, 1] * MAX_NUM_ERRORS
  // e^-x has been chosen because it ranges from [1 - 0]
  const numErrors = Math.floor(MAX_NUM_ERRORS * Math.exp(-1 * EXP_CONSTANT * t));
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
 * this is calculated from how far the weights are from the expected & a normal distribution
 * @param featureWeights
 * @param expectedWeights
 * @returns
 */
export function getRecommendationQuality(
  featureWeights: number[], // [0, 100]
  expectedWeights: number[], // [0, 100]
): string {
  const distribution = new Gaussian(0, VARIABLE_WEIGHTS_STD ** 2); // normal distribution

  // value between 0-3 about how accurate the recommendation was
  const distResults = expectedWeights.reduce((prev, weight, i) => prev +
    distribution.cdf(featureWeights[i] - weight), 0);

  const numericQuality = 2 * distResults * Math.random();

  // get the name mapping related with how accurate the recommendation was
  // (eg: good / poor)
  const qualityKey = Object.keys(NUMBER_TO_QUALITY_MAP).find(
    (key) => {const bracket = key.split(',').map(Number);  return numericQuality > bracket[0] && numericQuality < bracket[1];},
  ) ?? QUALITY_DEFAULT_KEY;
  const castingKey = qualityKey as keyof typeof NUMBER_TO_QUALITY_MAP;
  return NUMBER_TO_QUALITY_MAP[castingKey];
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

