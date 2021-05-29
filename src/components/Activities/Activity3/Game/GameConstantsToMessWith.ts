/** GRAPH CONSTANTS */
export const MIN_GRAPH_START = 45;
export const MAX_GRAPH_START = 70;
export const SINGLE_CONTROL_CHANGE_MAX = 10;
export const RANDOM_BETA_TEST_CHANGE = 10;
export const MULTIPLE_FOR_CHANGE_OF_AB_GRAPH = 2;
export const STABILITY_OF_FINAL = 3; // how many times more stable the final is than the control
export const FINAL_NUM_POINTS = 20;

/** RATING  CONSTANTS */
export const WEIGHT_CONSTANT = 10; // the higher, the better the ratings

/** Variable Allocation CONSTANTS */
export const MIN_EXPECTED_ALLOCATION = 7;

/** DEBUG CONSTANTS */
export const MAX_NUM_ERRORS = 10;
export const DEBUG_DAY_VARIANCE = 3;
export const DEBUG_EXP_CONSTANT = .1; // the smaller, the more bugs
export const DEBUG_ERROR_OPTIONS = [
  'Image failed to load', 'File not found', 'Unexpected any.', 'Expected linebreaks to be \'LF\' but found \'CRLF\'',
  '\',\' expected.', 'Cannot find name \'numbe\'.', '\'expectedWeights\' is declared but its value is never read.',
  'All destructured elements are unused.', 'Maximum allowed is 120', 'ReferenceError: MAX_NUM_ERRORS is not defined',
  'Warning: Function components cannot be given refs.', 'net::ERR_ABORTED 403 (Forbidden)', 'React version not specified',
];

export const NUMBER_TO_QUALITY_MAP = {
  '4,5': 'great',
  '3,4': 'decent',
  '2,3': 'not great',
  '1,2': 'poor', // keep a zero value, everything else can be modified
};
export const QUALITY_DEFAULT_KEY = '1,2';

/** Review Constants */
export const CHANCE_OF_BUG_REVIEW = .3;
export const STAR_RANDOM_VARIANCE = 1;
export const NUM_ABTEST_DAYS_PER_REVIEW = 3;

/**
 * Percent when text no longer fits inside final report bar. Note, this is not a pixel value and
 * may not work well for different sized screens
 */
export const PERCENT_THRESHOLD = {
  VARIABLES: 10,
  DAYS: 16,
};
