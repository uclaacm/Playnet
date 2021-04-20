import React, { useContext } from 'react';
import { GameContext } from '.';
import { getDebugErrors, getDebugNumErrors, getRecommendationQuality } from './gameCalculationsUtil';
import { A3_GAME_STATE } from './GameConstants';

function DebuggingResults(): JSX.Element {
  const { setState, goNextState, featureWeights, targetWeights, timeAllocation,
    setTimeAllocation, daysLeft, setDaysLeft } = useContext(GameContext);

  const numErrors = getDebugNumErrors(timeAllocation.build, timeAllocation.debug);
  const errors = getDebugErrors(numErrors);
  const debugQuality = getRecommendationQuality(featureWeights, targetWeights);

  const debugADay = () => {
    if (daysLeft > 0) {
      setDaysLeft(daysLeft - 1);

      // increment debug by one
      const newAllocation = {...timeAllocation};
      newAllocation.debug++;
      setTimeAllocation(newAllocation);
    }
  };

  const improveRecs = () => {
    if (daysLeft >= 3) {
      setDaysLeft(daysLeft - 3);
      setState(A3_GAME_STATE.PriorityExplanation);
    }
  };

  const buttons: { [key: string]: { buttonText: string, onClick: () => void, dayCost: number } } = {
    'Reduce errors': {
      buttonText: 'Debug (-1 day)',
      onClick: debugADay,
      dayCost: 1,
    },
    'Go back and improve recommendations': {
      buttonText: 'Change Priorities (-3 day)',
      onClick: improveRecs,
      dayCost: 3,
    },
    'No change': {
      buttonText: 'Continue to A/B Testing',
      onClick: goNextState,
      dayCost: 0,
    },
  };
  return <>
    <div id='top-bar-align-right'>
      <div className='inline'>
        <div id='top-bar-clock' />
        <div className='vertically-centered'>Days Left: {daysLeft}</div>
      </div>
    </div>
    <div className='inline'>
      <div className='half' style={{ height: '100%' }}>
        <div className='debug-screen'>
          <div className='debug-text'>
            Debugging Report
            <br />
        ---
            <br />
            {numErrors} errors detected:
            <br />
            {
              errors.map((element) => <>{element}<br /></>)
            }
        ---
            <br />
        Recommendation Quality: {debugQuality}
          </div>
        </div>
      </div>
      <div className='half'>
        <div className='vertical-grid'>
          {
            Object.entries(buttons).map(([name, { buttonText, onClick, dayCost }]) =>
              <div className='button-group' key={name}>
                {name}
                <br />
                <button className='smaller playnet-button' onClick={onClick} disabled={dayCost > daysLeft}>
                  {buttonText}
                </button>
              </div>)
          }
        </div>
      </div>
    </div>
  </>;
}
export default DebuggingResults;