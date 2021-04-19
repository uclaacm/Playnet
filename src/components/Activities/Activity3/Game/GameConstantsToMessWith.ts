// Variable Allocations
export const MIN_ALLOCATION = 7;

// DEBUG CONSTANTS
export const DAY_VALUE_FOR_BUILD = 5; // t in an e^-t function, the higher, the less bugs
// in decimal
export const DAY_VALUE_PERCENT_FOR_DEBUG = .20; // the effectiveness of debug scales off of build
export const EXP_CONSTANT = .1; // the smaller, the more bugs
export const DEBUG_ERROR_OPTIONS = [
  'Image failed to load', 'File not found', 'Unexpected any.', 'Expected linebreaks to be \'LF\' but found \'CRLF\'',
  '\',\' expected.', 'Cannot find name \'numbe\'.', '\'expectedWeights\' is declared but its value is never read.',
  'All destructured elements are unused.', 'Maximum allowed is 120'
];

export const VARIABLE_WEIGHTS_STD = 10;
export const NUMBER_TO_QUALITY_MAP = { // input number floored to closest
  2: 'great',
  1: 'okay',
  0: 'poor', // keep a zero value, everything else can be modified
};