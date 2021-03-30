// External Constants
export const FEEDBACK_FORM_URL  =
  'https://docs.google.com/forms/d/e/1FAIpQLSfpCmyRZ7Ilrg263iYYiXLaM8UWX7iK9aSuVl0_u8mguvxgiA/viewform?usp=sf_link';

// Internal Constants
export enum HeaderSections {
  INTRO = 'intro',
  ACTIVITIES = 'activities',
  FEEDBACK = 'feedback',
}

export enum TextBubbleStyles {
  EXTRA_LARGE = 'x-large',
  LARGE = 'large',
  SMALL_LEFT = 'small-left',
  SMALL_RIGHT = 'small-right',
  MEDIUM = 'medium',
  NONE = 'none',
}

export enum PlaynetColors {
  BLACK = 'black',
  HOVER_GREEN = '#1CC64B',
  INCORRECT_RED = '#FF0000',
}

export enum AnswerChoiceBoxStyles {
  LARGE_PERCENT_BASED = 'choice-container',
  SMALL_PX_BASED = 'px-choice-container',
}

export enum AnswerDisplayStyles {
  WHITE_BACKGROUND = 'white-background',
  NO_BACKGROUND = '',
  RED_BORDER = 'red-outline black-text',
  GREEN_BORDER = 'green-outline black-text',
  ANSWER_SPOT = 'gray-background gray-text'
}

// Section Specific Constants
// INTRO
export enum VideoChoices {
  CHILL_GIRL = 'chill_girl',
  BABY_SHARK = 'baby_shark',
  NETHER_PORTAL = 'nether_portal',
  NONE_CHOSEN = 'none_chosen', // no video has been chosen yet
}

export const VideoLinks : Record<VideoChoices, string> = {
  chill_girl: 'https://www.youtube.com/embed/-FlxM_0S2lA',
  baby_shark: 'https://www.youtube.com/embed/XqZsoesa55w',
  nether_portal: 'https://www.youtube.com/embed/h27ugp3gzWI',
  none_chosen: 'https://www.youtube.com/embed/-FlxM_0S2lA', // default to lofi beats
};

// ACTIVITY1
export const Activity1Game1Values = {
  MAX_HAPPINESS: 100,
  CORRECT_PTS: 20,
  INCORRECT_PTS: 10,
};