import React, { useContext } from 'react';
import { GameContext } from '..';
import { getABTestingControlGraph, getABTestingProductGraph } from '../gameCalculationsUtil';
import { A3_GAME_STATE } from '../GameConstants';

import Graph from './Graph';
import PopUp from './Popup';
import Review from './Review';

function ABTestingReport(): JSX.Element {
  const { setState, featureWeights, targetWeights, timeAllocation, daysLeft } = useContext(GameContext);

  const {xyMap, dxyMap} = getABTestingControlGraph(timeAllocation.abTest);
  const {xyMap: beta_xyMap} = getABTestingProductGraph(targetWeights, featureWeights, xyMap, dxyMap, timeAllocation);

  const generateReviews = (featureWeights: number[], targetWeights: number[]): number[] => {
    const offBy = targetWeights.reduce((acc: number, value: number, index: number) => {
      return acc + Math.abs(featureWeights[index] - value);
    }, 0);
    const convertToStars = () => Math.floor((100 - offBy + (Math.random() * 20 - 10)) / 20) + 1;
    return [
      convertToStars(),
      convertToStars(),
    ];
  }

  const handleSubmit = () => {
    const popup = document.getElementById('popup');
    popup && (popup.style.visibility = 'visible');
  }

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
        Reviews
        {
          generateReviews(featureWeights, targetWeights).map((stars) => <Review stars={stars} />)
        }
      </div>
      <div className='half'>
        <Graph xyMap={xyMap} beta_xyMap={beta_xyMap}/>
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" onClick={() => setState(A3_GAME_STATE.PriorityChoices)}>Go back to variables</button>
      <button className="playnet-button" onClick={handleSubmit}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;