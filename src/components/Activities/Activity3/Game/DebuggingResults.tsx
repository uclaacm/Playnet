import React, { useContext } from 'react';
import { GameContext } from '.';
import { getDebugErrors, getDebugNumErrors, getRecommendationQuality } from './gameCalculationsUtil';

const timeAllocation = [1, 1, 1]; // TODO: CHANGE
const reduceDaysLeft = (_num: number) => undefined; // TODO: CHANGE
const daysLeft = 24; // TODO: CHANGE
function DebuggingResults(): JSX.Element {
  const { featureWeights, goNextState } = useContext(GameContext);

  const numErrors = getDebugNumErrors(timeAllocation[0], timeAllocation[1]);
  const errors = getDebugErrors(numErrors);
  const debugQuality = getRecommendationQuality(featureWeights);
  const buttons: { [key: string]: { buttonText: string, onClick: () => void } } = {
    'Reduce errors': {
      buttonText: 'Debug (-1 day)',
      onClick: () => reduceDaysLeft(1),
    },
    'Go back and improve recommendations': {
      buttonText: 'Change Priorities (-3 day)',
      onClick: () => reduceDaysLeft(3),
    },
    'No change': {
      buttonText: 'Continue to A/B Testing',
      onClick: goNextState,
    },
  };
  return <>
    <div id='top-bar-align-right'>
      <div className='inline'>
        <div id='top-bar-clock' />
        <div className='vertically-centered'>Days Left: {daysLeft}</div>
      </div>
    </div>
    <div className='grid'>
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
        Recommendations: {debugQuality}
          </div>
        </div>
      </div>
      <div className='half'>
        <div className='vertical-grid'>
          {
            Object.entries(buttons).map(([name, { buttonText, onClick }]) =>
              <div className='button-group' key={name}>
                {name}
                <br />
                <button className='smaller playnet-button' onClick={onClick}>
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