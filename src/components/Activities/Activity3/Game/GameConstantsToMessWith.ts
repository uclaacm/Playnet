// Variable Allocations
export const MIN_ALLOCATION = 7;

// DEBUG CONSTANTS
export const MAX_NUM_ERRORS = 10;

export const DAY_VALUE_FOR_BUILD = 5; // t in an e^-t function, the higher, the less bugs
// in decimal
export const DAY_VALUE_PERCENT_FOR_DEBUG = .20; // the effectiveness of debug scales off of build
export const EXP_CONSTANT = .1; // the smaller, the more bugs
export const DEBUG_ERROR_OPTIONS = [
  'Image failed to load', 'File not found', 'Unexpected any.', 'Expected linebreaks to be \'LF\' but found \'CRLF\'',
  '\',\' expected.', 'Cannot find name \'numbe\'.', '\'expectedWeights\' is declared but its value is never read.',
  'All destructured elements are unused.', 'Maximum allowed is 120', 'ReferenceError: MAX_NUM_ERRORS is not defined',
  'Warning: Function components cannot be given refs.', 'net::ERR_ABORTED 403 (Forbidden)'
];

export const VARIABLE_WEIGHTS_STD = 10;
export const NUMBER_TO_QUALITY_MAP : {string: value}= {  
  '2,3': 'great',
  '1,2': 'okay',
  '0,1': 'poor', // keep a zero value, everything else can be modified
};
export const QUALITY_DEFAULT_KEY = '0,1';