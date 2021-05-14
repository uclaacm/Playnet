import React, { useContext, useState } from 'react';
import { GameContext } from '..';
import { clamp } from '../../../../../utils';
import { debugQuality } from '../gameCalculationsUtil';
import { A3_GAME_STATE, VARIABLES } from '../GameConstants';
import { CHANCE_OF_SUBSTANTIAL_REVIEW, WEIGHT_CONSTANT } from '../GameConstantsToMessWith';
import { TimeAllocations } from '../typings';

import PopUp from './Popup';
import Review from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[], timeAllocation: TimeAllocations,
  variableSelection: VARIABLES[], num: number): { numStars: number, variable?: VARIABLES }[] => {
  const convertToStars = (): { numStars: number, variable?: VARIABLES } => {
    const randomIndex = Math.floor(Math.random() * 3);
    const raw = Math.abs(featureWeights[randomIndex] - targetWeights[randomIndex]) / WEIGHT_CONSTANT * 3 *
      (1 - debugQuality(timeAllocation.build, timeAllocation.debug));

    const variable = (Math.random() < CHANCE_OF_SUBSTANTIAL_REVIEW) ? variableSelection[randomIndex] : undefined;

    return { numStars: clamp(1, Math.floor(raw), 5).num, variable: variable };
  };
  return Array(num).fill(0).map(() => convertToStars());
};

function ABTestingReport(): JSX.Element {
  const { 
    setState, variableSelection, featureWeights, targetWeights, timeAllocation, daysLeft, getABTestingGraph 
  } = useContext(GameContext);
  const [popup, setPopup] = useState(false);

  return <>
    {popup && <PopUp close={() => setPopup(false)} />}
    <div id='top-bar-align-right'>
      <div className='inline'>
        <div id='top-bar-clock' />
        <div className='vertically-centered'>Days Left: {daysLeft}</div>
      </div>
    </div>
    <h3>A/B Testing: Report</h3>
    <div className='inline'>
      <div className='half'>
        Reviews
        {generateReviews(featureWeights, targetWeights, timeAllocation, variableSelection, 2)
          .map(({ numStars, variable }, i) =>
            <Review key={i} stars={numStars} variable={variable} />)}
      </div>
      <div className='half'>
        {getABTestingGraph()}
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" disabled={daysLeft <= 0} onClick={() => setState(A3_GAME_STATE.PriorityWeighing)}>Go back to variables</button>
      <button className="playnet-button" onClick={() => setPopup(true)}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;