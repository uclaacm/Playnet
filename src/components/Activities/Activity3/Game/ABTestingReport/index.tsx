import React, { useContext, useState } from 'react';
import { GameContext } from '..';
import { clamp, objectSum } from '../../../../../utils';
import { accuracyOfSingleWeight, debugQuality } from '../gameCalculationsUtil';
import { A3_GAME_STATE, DEFAULT_TIME_ALLOCATION, VARIABLES } from '../GameConstants';
import { CHANCE_OF_BUG_REVIEW, STAR_RANDOM_VARIANCE } from '../GameConstantsToMessWith';
import { TimeAllocations } from '../typings';

import PopUp from './Popup';
import Review, { ReviewProps, VariableReview, weightDifference } from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[],
  variableSelection: VARIABLES[], timeAllocation: TimeAllocations, num: number): ReviewProps[] => {
  const generateVariableReview = (): { stars: number, variableReview: VariableReview } => {
    const randomIndex = Math.floor(Math.random() * 3);
    const raw = accuracyOfSingleWeight(featureWeights[randomIndex], targetWeights[randomIndex])
      + STAR_RANDOM_VARIANCE * (Math.random() - .5);

    // since ratings are out of 3
    const variableScore = raw * 3 / 5;

    const variableReview: VariableReview = {
      variable: variableSelection[randomIndex],
      rating: clamp(1, Math.floor(Math.abs(variableScore)), 3).num,
      weightDifference: (variableScore > 0) ? weightDifference.high : weightDifference.low,
    };

    return { stars: clamp(1, Math.round(Math.abs(raw)), 5).num, variableReview: variableReview };
  };

  const generateBugReview = (): { stars: number, isBugReview: boolean } => {
    let qualityOfDebug = (1 - debugQuality(timeAllocation.build)) * 5;
    qualityOfDebug += STAR_RANDOM_VARIANCE * (Math.random() - .5);
    return { stars: clamp(1, Math.round(qualityOfDebug), 5).num, isBugReview: true };
  };

  return Array(num).fill(0).map(() =>
    Math.random() > CHANCE_OF_BUG_REVIEW ? generateVariableReview() : generateBugReview());
};

function ABTestingReport(): JSX.Element {
  const {
    setState, variableSelection, timeAllocation, featureWeights, targetWeights, daysLeft, getABTestingGraph,
    setTimeAllocation,
  } = useContext(GameContext);
  const [popup, setPopup] = useState(false);

  const retry = () => {
    setTimeAllocation(DEFAULT_TIME_ALLOCATION);
    setState(A3_GAME_STATE.PriorityWeighing);
  };

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
        {generateReviews(featureWeights, targetWeights, variableSelection, timeAllocation, 2)
          .map((props, i) =>
            <Review key={i} {...props} />)}
      </div>
      <div className='half'>
        {getABTestingGraph()}
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" disabled={daysLeft < objectSum(DEFAULT_TIME_ALLOCATION)} onClick={retry}>
        Go back to variables (14 days needed)
      </button>
      <button className="playnet-button" onClick={() => setPopup(true)}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;