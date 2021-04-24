import { Gaussian } from 'ts-gaussian';
import { clamp, random } from '../../../../utils';
import {
  DAY_VALUE_FOR_BUILD, DAY_VALUE_PERCENT_FOR_DEBUG, DEBUG_ERROR_OPTIONS,
  EXP_CONSTANT, MAX_GRAPH_START, MAX_NUM_ERRORS, MIN_EXPECTED_ALLOCATION,
  MIN_GRAPH_START, MULTIPLE_FOR_CHANGE_OF_AB_GRAPH, NUMBER_TO_QUALITY_MAP,
  QUALITY_DEFAULT_KEY, RANDOM_BETA_TEST_CHANGE, SINGLE_CONTROL_CHANGE_MAX,
  STABILITY_OF_FINAL,
  WEIGHT_CONSTANT,
} from './GameConstantsToMessWith';
import { Point, TimeAllocations } from './typings';

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
 * Given the input weights and expected weights, return some number between [1 - 5] representing how
 * accurate the input weights are.
 * 5 is highest quality, and 1 is lowest
 *
 * this is calculated by how far the weights are from the expected
 * @param featureWeights
 * @param expectedWeights
 * @returns number ranging from 1-5 (5 is highest quality)
 */
export function accuracyOfWeights(
  featureWeights: number[],
  expectedWeights: number[],
): number {
  // value between 1-5 about how accurate the recommendation was
  const raw = 5 - (expectedWeights.reduce((prev, weight, i) => prev +
    Math.abs(featureWeights[i] - weight), 0) / 100 * WEIGHT_CONSTANT) + 1;
  return  clamp(1, raw, 5).num;
}

/**
 * find some point value regarding how developed the product (with BUILD and DEBUG info)
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
 * Given expected + actual weights and time allocations, return a number between [1 - 5]
 * The larger the number, the higher the quality!
 * @param featureWeights
 * @param expectedWeights
 * @param timeAllocations
 */
export function overallQuality(
  featureWeights: number[],
  expectedWeights: number[],
  timeAllocations: TimeAllocations,
): number {
  const weightAccuracy = accuracyOfWeights(featureWeights, expectedWeights);
  // debug's accuracy is such that 0 is highest quality, and ranges from 0 - 1
  // as such, we get 1 - debugQuality so that 1 can be the highest quality!
  const debugAccuracy = 1 - debugQuality(timeAllocations.build, timeAllocations.debug);
  return weightAccuracy * debugAccuracy;
}

// SPECIFICS
/**
 * Given number of building days and number of debugging days, return the number of errors
 */
export function getDebugNumErrors(
  daysBuilding: number,
  daysDebugging: number,
): number {
  const t = debugQuality(daysBuilding, daysDebugging);
  const numErrors = Math.floor(MAX_NUM_ERRORS * t);
  return numErrors;
}

/**
 * Given a number of errors we want, this returns a list of debug errors (length numErrors)
 * @param numErrors length of array to find
 * @returns array of random errors
 */
export function getDebugErrors(
  numErrors: number,
): string[] {
  const errors = [];
  for (let i = 0; i < numErrors; i++) {
    errors.push(random(DEBUG_ERROR_OPTIONS));
  }
  return errors;
}

/**
 * Given the expected and actual weights, find a string that represents how close the given weights
 * are from the expected
 * @param featureWeights given weights
 * @param expectedWeights expected weights (this is the standard)
 * @returns a string representing the quality of the given product (from the given weights)
 */
export function getRecommendationQuality(
  featureWeights: number[], // [0, 100]
  expectedWeights: number[], // [0, 100]
): string {
  const accuracyWithExpected = accuracyOfWeights(featureWeights, expectedWeights);

  // get the name mapping related with how accurate the recommendation was
  // (eg: good / poor
  const qualityKey = Object.keys(NUMBER_TO_QUALITY_MAP).find(
    (key) => { const bracket = key.split(',').map(Number); return accuracyWithExpected >= bracket[0] && accuracyWithExpected < bracket[1]; },
  ) ?? QUALITY_DEFAULT_KEY;
  const castingKey = qualityKey as keyof typeof NUMBER_TO_QUALITY_MAP;
  return NUMBER_TO_QUALITY_MAP[castingKey];
}

/**
 * Given the number of points we want and max change between every two points,
 * return a list of points to graph for the control group!
 *
 * The points are random and build off of the last point.
 * @returns numABTestingDays points between x: [0, 100], y: [0, 100] to graph
 */
export function getControlGraph(
  numPoints: number,
  maxChange: number,
): { xyMap: Point[]; dxyMap: Point[]; } {
  const dX = 100 / numPoints; // x distance in between 2 points
  const xyMapping: Point[] = [];
  const dxyMapping: Point[] = [];

  // start at some random point between [MIN_GRAPH_START, MAX_GRAPH_START]
  let lastX = 0;
  let lastY = MIN_GRAPH_START + (MAX_GRAPH_START - MIN_GRAPH_START) * Math.random();
  let tempDy, dY;
  xyMapping.push({
    x: lastX,
    y: lastY,
  });

  // add numABTestingDays # of points!
  for (let i = 0; i < numPoints; i++) {
    lastX += dX;

    // find a random change in Y between [-maxChange / 2, maxChange / 2]
    tempDy = maxChange * Math.random() - (maxChange / 2);
    const temp = clamp(0, lastY + tempDy, 100);
    lastY = temp.num;
    dY = temp.dNum + tempDy;

    // add x&y to map + add dx&dy to map
    xyMapping.push({
      x: lastX,
      y: lastY,
    });
    dxyMapping.push({
      x: dX,
      y: dY,
    });
  }
  return { xyMap: xyMapping, dxyMap: dxyMapping };
}

/**
 * Given the number of days we are AB testing, return a list of points to graph for the beta version!
 *
 * This takes in all game information, in addition to the control list of points + max change between each
 * control point.
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getBetaGraph(
  featureWeights: number[],
  expectedWeights: number[],
  controlGraph: Point[],
  dControlGraph: Point[],
  timeAllocations: TimeAllocations,
  maxChange: number,
): { xyMap: Point[]; dxyMap: Point[]; } {
  // initialize and add in first control point, so that beta graph starts at same spot
  const xyMapping: Point[] = [];
  const dxyMapping: Point[] = [];
  let rand, tempDy, tempDyWithControl, dY;

  let lastX = controlGraph[0].x;
  let lastY = controlGraph[0].y;
  xyMapping.push({
    x: lastX,
    y: lastY,
  });

  // find out how well the person made their product
  const quality = overallQuality(featureWeights, expectedWeights, timeAllocations);

  // add numABTestingDays # of points!
  dControlGraph.forEach(({x: controlDx, y: controlDy}) => {
    // find a random change in y based on the quality of the product + control's dy
    rand = Math.random() * maxChange - (maxChange / 2);
    tempDy = MULTIPLE_FOR_CHANGE_OF_AB_GRAPH * (quality - 2.5) + rand;
    tempDyWithControl = tempDy + controlDy;

    const temp = clamp(0, lastY + tempDyWithControl, 100);
    lastY = temp.num;
    dY = temp.dNum + tempDyWithControl;

    lastX += controlDx;

    // add x&y to map + add dx&dy to map
    xyMapping.push({
      x: lastX,
      y: lastY,
    });
    dxyMapping.push({
      x: controlDx,
      y: dY,
    });
  });
  return { xyMap: xyMapping, dxyMap: dxyMapping };
}

/**
 * Given the number of days we are AB testing, return a list of points to graph for the control group!
 * @returns num points between x: [0, 100], y: [0, 100] to graph
 */
export function getABTestingControlGraph(
  numABTestingDays: number,
): { xyMap: Point[]; dxyMap: Point[]; } {
  return getControlGraph(numABTestingDays, SINGLE_CONTROL_CHANGE_MAX);
}

/**
 * Given the number of points to plot, return a list of points to graph for the control group!
 * @returns num points between x: [0, 100], y: [0, 100] to graph
 */
export function getFinalControlGraph(
  numPoints: number,
): { xyMap: Point[]; dxyMap: Point[]; } {
  return getControlGraph(numPoints, SINGLE_CONTROL_CHANGE_MAX / STABILITY_OF_FINAL);
}

/**
 * Return a list of points to graph for the beta version!
 *
 * This takes in all game information, in addition to the control list of points + chnage between each
 * control point.
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getABTestingProductGraph(
  featureWeights: number[],
  expectedWeights: number[],
  controlGraph: Point[],
  dControlGraph: Point[],
  timeAllocations: TimeAllocations,
): { xyMap: Point[]; dxyMap: Point[]; } {
  return getBetaGraph(
    featureWeights,
    expectedWeights,
    controlGraph,
    dControlGraph,
    timeAllocations,
    RANDOM_BETA_TEST_CHANGE);
}

/**
 * Return a list of points to graph for the final product.
 *
 * This takes in all game information, in addition to the control list of points + chnage between each
 * control point.
 * @returns points between x: [0, 100], y: [0, 100] to graph
 */
export function getFinalProductGraph(
  featureWeights: number[],
  expectedWeights: number[],
  controlGraph: Point[],
  dControlGraph: Point[],
  timeAllocations: TimeAllocations,
): { xyMap: Point[]; dxyMap: Point[]; } {
  return getBetaGraph(
    featureWeights,
    expectedWeights,
    controlGraph,
    dControlGraph,
    timeAllocations,
    RANDOM_BETA_TEST_CHANGE / STABILITY_OF_FINAL);
}

/**
 * Given the control's final result (point) and the product's final result (point),
 * return a number of stars correspondingly to the quality of the product.
 * @returns number between [1 - 5] where 1 is worst quality
 */
export function numFinalStars(
  finalX: number,
  finalBetaX: number,
): number {
  const num = Math.floor((finalBetaX - finalX) / 20 + 2.5) ;
  let numStars = clamp(1, num, 5).num;
  return (finalBetaX > 95) ? 5 : numStars;
}