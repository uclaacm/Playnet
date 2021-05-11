import React from 'react';

// Session Storage
export const SESSION_SKIP_STATES = 'statesToSkip';
export const SESSION_CURRENT_STATE = 'gamestate';
export const SESSION_VARIABLES = 'variables';
export const SESSION_TIMES = 'times';
export const SESSION_TARGET_WEIGHTS = 'weights';
export const SESSION_FEATURE_WEIGHTS = 'featureWeights';

// GAME STATES
export enum A3_GAME_STATE {
  EmptyState = '',
  GameIntroSlide2 = 'GameIntroSlide2',
  PriorityExplanation  = 'PriorityExplanation',
  PriorityChoices  = 'PriorityChoices',
  PriorityWeighing  = 'PriorityWeighing',
  TimeAllocationExplanation  = 'TimeAllocationExplanation',
  TimeAllocation  = 'TimeAllocation',
  DebuggingResults  = 'DebuggingResults',
  ABTestingExplanation  = 'ABTestingExplanation',
  ABTestingReport  = 'ABTestingReport',
  FinalReport  = 'FinalReport',
}

export const STATE_ORDERING_LIST = [
  A3_GAME_STATE.EmptyState,
  A3_GAME_STATE.GameIntroSlide2,
  A3_GAME_STATE.PriorityExplanation,
  A3_GAME_STATE.PriorityChoices,
  A3_GAME_STATE.PriorityWeighing,
  A3_GAME_STATE.TimeAllocationExplanation,
  A3_GAME_STATE.TimeAllocation,
  A3_GAME_STATE.DebuggingResults,
  A3_GAME_STATE.ABTestingExplanation,
  A3_GAME_STATE.ABTestingReport,
  A3_GAME_STATE.FinalReport,
];

export const ONE_TIME_STATES = [A3_GAME_STATE.PriorityExplanation, A3_GAME_STATE.TimeAllocationExplanation,
  A3_GAME_STATE.ABTestingExplanation];

/**
 * recursively get next state
 * if state is in ONE_TIME_STATES, then also try to add in the next state
 *
 * @param index - index of state to getNextStates of
 * @returns - gets array of next possible states
 * eg: getNextStates(PriorityChoices) = [PriorityWeighing]
 *     getNextStates(EmptyState) = [PriorityExplanation, PriorityChoices]
 */
function getNextStates(index: number): A3_GAME_STATE[] {
  const array: A3_GAME_STATE[] = [];
  if (index < STATE_ORDERING_LIST.length - 1) {
    const nextElement = STATE_ORDERING_LIST[index + 1];
    array.push(nextElement);
    if (ONE_TIME_STATES.includes(nextElement)) {
      array.push(...getNextStates(index + 1));
    }
  }
  return array;
}

export const NEXT_STATE_MAP = STATE_ORDERING_LIST.reduce((ret, state, index) => {
  return {...ret, [state]: getNextStates(index)};
}, {}) as {[key in A3_GAME_STATE]: A3_GAME_STATE[]};

// GAME VARIABLES
export const NUM_VARIABLES_SELECTED = 3;
export enum VARIABLES {
  CREDIBLE = 'Credible',
  RECENT_UPLOAD = 'Recent Upload',
  SAME_CONTENT = 'Same Content',
  POPULAR = 'Popular',
  SAME_CREATOR = 'Same Creator',
  SUBSCRIBED = 'Subscribed',
}

export const VARIABLE_CONTENT: Record<VARIABLES, JSX.Element[]> = {
  [VARIABLES.CREDIBLE]: [
    <>Credibility refers to whether you can trust something. To decide if something is credible,
    ask: Do I think what they’re saying is true?</>,
    <>Why is this important? We want to make sure that people aren’t believing false information
    they found online. Plus, they might get angry at you for letting them get tricked!</>,
  ],
  [VARIABLES.RECENT_UPLOAD]: [
    <>Recently uploaded videos are the ones that just got posted to YouTube.</>,
    <>When we think about what videos to recommend, do you think that older videos or newer videos would be better?</>,
  ],
  [VARIABLES.SAME_CONTENT]: [
    <>Or, do you think that users don’t really care about who makes the videos?</>,
    <>Maybe users would want to see more videos about the same topic, but they don’t mind who the creator is.</>,
  ],
  [VARIABLES.POPULAR]: [
    <>Popular videos are the ones that get the most likes.</>,
    <>If a lot of people like a certain video, we can predict that it would be a good recommendation
      since new users would probably like it as well.</>,
  ],
  [VARIABLES.SAME_CREATOR]: [
    <>Videos made by the same creator usually have similar topics or styles.</>,
    <>When a user is done watching a video, maybe they’d like to see more videos made by the same person!</>,
  ],
  [VARIABLES.SUBSCRIBED]: [
    <>If you’re asking whether users would get bored seeing the same videos all the time, you might be right!</>,
    <>Maybe users should be in control of what they get recommended.
      Should we give users videos from people they already follow?</>,
  ],
};

// Time Allocation Info
export const STARTING_DAYS = 56;
export const LOW_DAY_THRESHOLD = 14;
export const HIGH_DAY_THRESHOLD = 21;
export const DEFAULT_TIME_ALLOCATION = {build: 0, debug: 0, abTest: 0};
