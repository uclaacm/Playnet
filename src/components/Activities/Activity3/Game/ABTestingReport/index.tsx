import React, { useContext, useState } from 'react';
import { GameContext } from '..';
import { clamp, objectSum, randomVariance } from '../../../../../utils';
import { accuracyOfSingleWeight, debugQuality } from '../gameCalculationsUtil';
import { A3_GAME_STATE, DEFAULT_TIME_ALLOCATION, VARIABLES } from '../GameConstants';
import { CHANCE_OF_BUG_REVIEW, NUM_ABTEST_DAYS_PER_REVIEW, STAR_RANDOM_VARIANCE } from '../GameConstantsToMessWith';
import { TimeAllocations } from '../typings';

import PopUp from './Popup';
import Review, { ReviewProps, VariableReview, weightDifference } from './Review';

export const generateReviews = (featureWeights: number[], targetWeights: number[],
  variableSelection: VARIABLES[], timeAllocation: TimeAllocations, num: number): ReviewProps[] => {
  const generateVariableReview = (): { stars: number, variableReview: VariableReview } => {
    const randomIndex = Math.floor(Math.random() * 3);
    const raw = accuracyOfSingleWeight(featureWeights[randomIndex], targetWeights[randomIndex])
      + randomVariance(STAR_RANDOM_VARIANCE);

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
    qualityOfDebug += randomVariance(STAR_RANDOM_VARIANCE);
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
  const goBackButtonEnabled = daysLeft >= objectSum(DEFAULT_TIME_ALLOCATION);

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
        <h4 style={{ margin: '4px' }}>Reviews</h4>
        {timeAllocation.abTest > 0 ?
          <div style={{ overflowY: 'scroll', maxHeight: '40vh' }}>
            {generateReviews(featureWeights, targetWeights, variableSelection, timeAllocation,
              Math.ceil(timeAllocation.abTest / NUM_ABTEST_DAYS_PER_REVIEW))
              .map((props, i) =>
                <Review key={i} {...props} />)
            }
          </div>
          : <>You didn&apos;t allocate any days for AB Testing, so you have no reviews.</>}
      </div>
      <div className='half'>
        <h4 style={{ margin: '4px' }}>Graph</h4>
        {getABTestingGraph()}
      </div>
    </div>
    <div>
      <button className={goBackButtonEnabled ? 'playnet-button playnet-btn-blue' : 'playnet-button'}
        onClick={() => setPopup(true)}>
        Submit final product
      </button>
      {
        goBackButtonEnabled &&
        <button className="playnet-button" onClick={retry}>
          Go back to variables (14 days needed)
        </button>
      }
    </div>
  </>;
}
export default ABTestingReport;