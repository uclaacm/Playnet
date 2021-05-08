// External Constants
export const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfpCmyRZ7Ilrg263iYYiXLaM8UWX7iK9aSuVl0_u8mguvxgiA/viewform?usp=sf_link';

export const DEFAULT_CONFIGS = {
  VOICEOVER_MUTED: true,
  GAME_SOUNDS_MUTED: false,
  AUTOPLAY: false,
};
export enum HeaderSections {
  INTRO = 'intro',
  ACTIVITIES = 'activities',
  FEEDBACK = 'feedback',
  DAY_OF_CODE = 'day_of_code',
}

export const TAB_INFO: { [key in HeaderSections]: { link: string, text: string } } = {
  [HeaderSections.INTRO]: {
    link: '/',
    text: 'Intro',
  },
  [HeaderSections.ACTIVITIES]: {
    link: '/activities',
    text: 'Activities',
  },
  [HeaderSections.FEEDBACK]: {
    link: '/feedback',
    text: 'Feedback',
  },
  [HeaderSections.DAY_OF_CODE]: {
    link: '/day-of-code',
    text: 'Day of Code',
  },
};

// Internal Constants
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
  LIGHT_BLUE = '#0094FF',
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

export const VideoInfo: Record<VideoChoices, { url: string, rocket_word: string }> = {
  [VideoChoices.CHILL_GIRL]: {
    url: 'https://www.youtube.com/embed/-FlxM_0S2lA',
    rocket_word: 'Lofi',
  },
  [VideoChoices.BABY_SHARK]: {
    url: 'https://www.youtube.com/embed/XqZsoesa55w',
    rocket_word: 'Shark',
  },
  [VideoChoices.NETHER_PORTAL]: {
    url: 'https://www.youtube.com/embed/h27ugp3gzWI',
    rocket_word: 'Minecraft',
  },
  [VideoChoices.NONE_CHOSEN]: { // default to lofi beats
    url: 'https://www.youtube.com/embed/-FlxM_0S2lA',
    rocket_word: 'Lofi',
  },
};

// ACTIVITY1
export const Activity1Game1Values = {
  MAX_HAPPINESS: 100,
  CORRECT_PTS: 20,
  INCORRECT_PTS: -10,
  THRESHOLD_TO_HELP_PER_GAME: 8,
};
