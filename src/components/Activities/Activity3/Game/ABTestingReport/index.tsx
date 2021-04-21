import React, { useContext } from 'react';
import { GameContext } from '..';
import { getABTestingControlGraph, getABTestingProductGraph } from '../gameCalculationsUtil';
import { A3_GAME_STATE } from '../GameConstants';

import Graph from './Graph';
import PopUp from './Popup';
import Review from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[], num: number): number[] => {
  const offBy = targetWeights.reduce((acc: number, value: number, index: number) => {
    return acc + Math.abs(featureWeights[index] - value);
  }, 0);
  const convertToStars = () => Math.floor((100 - offBy + (Math.random() * 20 - 10)) / 20) + 1;
  return Array(num).fill(0).map(() => convertToStars());
};

function ABTestingReport(): JSX.Element {
  const { setState, featureWeights, targetWeights, timeAllocation, daysLeft } = useContext(GameContext);

  const {xyMap, dxyMap} = getABTestingControlGraph(timeAllocation.abTest);
  const {xyMap: beta_xyMap} = getABTestingProductGraph(targetWeights, featureWeights, xyMap, dxyMap, timeAllocation);

  const handleSubmit = () => {
    const popup = document.getElementById('popup');
    popup && (popup.style.visibility = 'visible');
  };

  return <>
    <PopUp />
    <div id='top-bar-align-right'>
      <div className='inline'>
        <div id='top-bar-clock' />
        <div className='vertically-centered'>Days Left: {daysLeft}</div>
      </div>
    </div>
    <h3>A/B Testing: Report</h3>
    <div className='inline'>
      <div className='half'>
        <div style={{height: '100%'}}>
        Reviews
          {generateReviews(featureWeights, targetWeights, 2).map((stars, i) =>
            <Review key={i} stars={stars}/>)}
        </div>
      </div>
      <div className='half'>
        <Graph xyMap={xyMap} beta_xyMap={beta_xyMap} width={400} height={300} offset={10}/>
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" onClick={() => setState(A3_GAME_STATE.PriorityChoices)}>Go back to variables</button>
      <button className="playnet-button" onClick={handleSubmit}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;