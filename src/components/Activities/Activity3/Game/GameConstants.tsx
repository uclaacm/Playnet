import React from 'react';

export enum A3_GAME_STATE {
  PriorityExplanation,
  PriorityChoices,
  PriorityWeighing,
  TimeAllocation,
  DebuggingResults,
  ABTestingExplanation,
  ABTestingReport,
  FinalReport,
};

export const ONE_TIME_STATES = [A3_GAME_STATE.PriorityExplanation, A3_GAME_STATE.ABTestingExplanation];

export enum VARIABLES {
  CREDIBLE = 'Credible',
  RECENT_UPLOAD = 'Recent Upload',
  SAME_CONTENT = 'Same Content',
  POPULAR = 'Popular',
  SAME_CREATOR = 'Same Creator',
  SUBSCRIBED = 'Subscribed',
};

export const VARIABLE_CONTENT : Record<VARIABLES, JSX.Element []> = {
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

export const VARIABLE_POSITIONING : VARIABLES[][] = [
  [VARIABLES.CREDIBLE, VARIABLES.RECENT_UPLOAD, VARIABLES.SAME_CONTENT],
  [VARIABLES.POPULAR, VARIABLES.SAME_CREATOR, VARIABLES.SUBSCRIBED],
];