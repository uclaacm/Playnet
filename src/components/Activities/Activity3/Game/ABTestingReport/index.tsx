import React, { useContext, useState } from 'react';
import { GameContext } from '..';
import { clamp } from '../../../../../utils';
import { accuracyOfSingleWeight } from '../gameCalculationsUtil';
import { A3_GAME_STATE, VARIABLES } from '../GameConstants';

import PopUp from './Popup';
import Review, { VariableReview, weightDifference } from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[], 
  variableSelection: VARIABLES[], num: number): { numStars: number, variableReview: VariableReview }[] => {
  const convertToStars = (): { numStars: number, variableReview: VariableReview } => {
    const randomIndex = Math.floor(Math.random() * 3);
    const raw = accuracyOfSingleWeight(featureWeights[randomIndex], targetWeights[randomIndex]) 
      + Math.random() - .5;
    
    // since ratings are out of 3
    const variableScore = raw * 3 / 5;
    console.log(variableSelection[randomIndex])

    const variableReview : VariableReview = {
      variable: variableSelection[randomIndex],
      rating:  clamp(1, Math.floor(Math.abs(variableScore)), 3).num,
      weightDifference: (variableScore > 0) ? weightDifference.high : weightDifference.low,
    }

    return { numStars: clamp(1, Math.floor(Math.abs(raw)), 5).num, variableReview: variableReview };
  };
  return Array(num).fill(0).map(() => convertToStars());
};

function ABTestingReport(): JSX.Element {
  const {
    setState, variableSelection, featureWeights, targetWeights, daysLeft, getABTestingGraph,
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
        {generateReviews(featureWeights, targetWeights, variableSelection, 2)
          .map(({ numStars, variableReview }, i) =>
            <Review key={i} stars={numStars} variableReview={variableReview} />)}
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