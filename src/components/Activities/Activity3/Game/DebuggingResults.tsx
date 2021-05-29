import React, { useContext } from 'react';
import { GameContext } from '.';
import { getDebugErrors, getDebugNumErrors, getRecommendationQuality } from './gameCalculationsUtil';
import { A3_GAME_STATE, DEFAULT_TIME_ALLOCATION } from './GameConstants';

function DebuggingResults(): JSX.Element {
  const { setState, goNextState, featureWeights, targetWeights, timeAllocation,
    setTimeAllocation, daysLeft, setDaysLeft, getABTestingGraph } = useContext(GameContext);

  const numErrors = getDebugNumErrors(timeAllocation.build);
  const errors = getDebugErrors(numErrors);
  const debugQuality = getRecommendationQuality(featureWeights, targetWeights);

  const debugADay = () => {
    if (daysLeft > 0) {
      setDaysLeft(daysLeft - 1);

      // increment build days by one
      const newAllocation = {...timeAllocation, build: timeAllocation.build+1};
      setTimeAllocation(newAllocation);
    }
  };

  const improveRecs = () => {
    setDaysLeft(daysLeft + timeAllocation.abTest);
    setTimeAllocation({...timeAllocation, build: DEFAULT_TIME_ALLOCATION.build});
    setState(A3_GAME_STATE.PriorityWeighing);
  };

  const buttons: { [key: string]: { buttonText: string, onClick: () => void, daysMin: number, className?: string } } = {
    'Reduce errors': {
      buttonText: 'Debug (-1 day)',
      onClick: debugADay,
      daysMin: 1,
    },
    'Go back and improve recommendations': {
      buttonText: 'Rebuild (lose current build days)',
      onClick: improveRecs,
      daysMin: DEFAULT_TIME_ALLOCATION.build,
    },
    'No change': {
      buttonText: 'Continue to A/B Testing',
      onClick: () => {getABTestingGraph(true) && goNextState()},
      daysMin: -10,
      className: 'playnet-btn-blue',
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
            Object.entries(buttons).map(([name, { buttonText, onClick, daysMin, className }]) =>
              <div className='button-group' key={name}>
                {name}
                <br />
                <button className={'smaller playnet-button ' + (className ?? '') } onClick={onClick}
                  disabled={daysMin > daysLeft && daysMin > 0}>
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
