import React, { useContext, useState } from 'react';
import { GameContext } from '..';
import { clamp } from '../../../../../utils';
import { debugQuality, getABTestingControlGraph, getABTestingProductGraph } from '../gameCalculationsUtil';
import { A3_GAME_STATE, VARIABLES } from '../GameConstants';
import { WEIGHT_CONSTANT } from '../GameConstantsToMessWith';
import { TimeAllocations } from '../typings';

import Graph from './Graph';
import PopUp from './Popup';
import Review from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[], timeAllocation: TimeAllocations,
  variableSelection: VARIABLES[], num: number): { numStars: number, variable?: VARIABLES }[] => {
  const convertToStars = (): { numStars: number, variable: VARIABLES } => {
    const randomIndex = Math.floor(Math.random() * 3);
    const raw = Math.abs(featureWeights[randomIndex] - targetWeights[randomIndex]) / WEIGHT_CONSTANT * 3 *
      (1 - debugQuality(timeAllocation.build, timeAllocation.debug));

    const variable = variableSelection[randomIndex];

    return { numStars: clamp(1, Math.floor(raw), 5).num, variable: variable };
  };
  return Array(num).fill(0).map(() => convertToStars());
};

function ABTestingReport(): JSX.Element {
  const { setState, variableSelection, featureWeights, targetWeights, timeAllocation, daysLeft } =
    useContext(GameContext);
  const [popup, setPopup] = useState(false);

  const { xyMap, dxyMap } = getABTestingControlGraph(timeAllocation.abTest);
  const { xyMap: beta_xyMap } = getABTestingProductGraph(targetWeights, featureWeights, xyMap, dxyMap, timeAllocation);

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
        {timeAllocation.abTest != 0 ?
          <Graph xyMap={xyMap} beta_xyMap={beta_xyMap} width={400} height={300} offset={10} /> :
          'There is no graph available as you didn\'t allot any time for A/B testing!'}
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" disabled={daysLeft <= 0} onClick={() => setState(A3_GAME_STATE.PriorityWeighing)}>Go back to variables</button>
      <button className="playnet-button" onClick={() => setPopup(true)}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;