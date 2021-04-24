import React, { useContext, useState } from 'react';
import { GameContext } from '..';
import { clamp } from '../../../../../utils';
import { accuracyOfWeights, getABTestingControlGraph, getABTestingProductGraph, overallQuality } from '../gameCalculationsUtil';
import { A3_GAME_STATE } from '../GameConstants';
import { TimeAllocations } from '../typings';

import Graph from './Graph';
import PopUp from './Popup';
import Review from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[], timeAllocation: TimeAllocations, num: number): number[] => {
  const convertToStars = () => {
    const accuracyOfWeights = overallQuality(featureWeights, targetWeights, timeAllocation) + 2 * Math.random() - 1;
    return clamp(1, Math.floor(accuracyOfWeights), 5).num;
  };
  return Array(num).fill(0).map(() => convertToStars());
};

function ABTestingReport(): JSX.Element {
  const { setState, featureWeights, targetWeights, timeAllocation, daysLeft } = useContext(GameContext);
  const [popup, setPopup] = useState(false);

  const {xyMap, dxyMap} = getABTestingControlGraph(timeAllocation.abTest);
  const {xyMap: beta_xyMap} = getABTestingProductGraph(targetWeights, featureWeights, xyMap, dxyMap, timeAllocation);

  return <>
    {popup && <PopUp close={() => setPopup(false)}/>}
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
        {generateReviews(featureWeights, targetWeights, timeAllocation, 2).map((stars, i) =>
          <Review key={i} stars={stars}/>)}
      </div>
      <div className='half'>
        {timeAllocation.abTest != 0 ?
          <Graph xyMap={xyMap} beta_xyMap={beta_xyMap} width={400} height={300} offset={10}/> :
          'There is no graph available as you didn&apos;t allot any time for A/B testing!'}
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" disabled={daysLeft === 0} onClick={() => setState(A3_GAME_STATE.PriorityChoices)}>Go back to variables</button>
      <button className="playnet-button" onClick={() => setPopup(true)}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;