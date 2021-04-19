import React from 'react';

// Session Storage
export const SESSION_SKIP_STATES = 'statesToSkip';
export const SESSION_CURRENT_STATE = 'gamestate';
export const SESSION_VARIABLES = 'variables';

// Variable Allocations
export const MIN_ALLOCATION = 7;


// GAME STATES
export enum A3_GAME_STATE {
  EmptyState = '',
  PriorityExplanation  = 'PriorityExplanation',
  PriorityChoices  = 'PriorityChoices',
  PriorityWeighing  = 'PriorityWeighing',
  TimeAllocation  = 'TimeAllocation',
  DebuggingResults  = 'DebuggingResults',
  ABTestingExplanation  = 'ABTestingExplanation',
  ABTestingReport  = 'ABTestingReport',
  FinalReport  = 'FinalReport',
}

const STATE_ORDERING_LIST = [
  A3_GAME_STATE.EmptyState,
  A3_GAME_STATE.PriorityExplanation,
  A3_GAME_STATE.PriorityChoices,
  A3_GAME_STATE.PriorityWeighing,
  A3_GAME_STATE.TimeAllocation,
  A3_GAME_STATE.DebuggingResults,
  A3_GAME_STATE.ABTestingExplanation,
  A3_GAME_STATE.ABTestingReport,
  A3_GAME_STATE.FinalReport,
];

export const ONE_TIME_STATES = [A3_GAME_STATE.PriorityExplanation, A3_GAME_STATE.ABTestingExplanation];

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
    <>bleb</>,
  ],
  [VARIABLES.SAME_CONTENT]: [
    <>mlem</>,
  ],
  [VARIABLES.POPULAR]: [
    <>pop</>,
  ],
  [VARIABLES.SAME_CREATOR]: [
    <>sameee</>,
  ],
  [VARIABLES.SUBSCRIBED]: [
    <>subs</>,
  ],
};