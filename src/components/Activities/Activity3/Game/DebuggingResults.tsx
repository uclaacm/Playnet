import React from 'react';

const next = () => undefined;

function DebuggingResults(): JSX.Element {
  const reduceDaysLeft = (num: number) => undefined;
  const numErrors = 24;
  const errors = ['Image failed to load', 'File not found'];
  const debugQuality = 'poor';
  const buttons: { [key: string]: { buttonText: string, onClick: () => void } } = {
    'Reduce errors': {
      buttonText: 'Debug (-1 day)',
      onClick: () => reduceDaysLeft(1),
    },
    'Improve recommendations': {
      buttonText: 'Change priorities (-3 day)',
      onClick: () => reduceDaysLeft(3),
    },
    'No change': {
      buttonText: 'Continue to A/B Testing',
      onClick: () => next(),
    },
  };
  return <div className='grid'>
    <div className='half'>
      <div className='debugScreen'>
        <div className='debugText'>
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
          Object.entries(buttons).map(([name, { buttonText, onClick }]) => <div className='button-group'>
            {name}
            <br />
            <button className='smaller playnet-button' onClick={onClick}>
              {buttonText}
            </button>
          </div>)
        }
      </div>
    </div>
  </div>;
}
export default DebuggingResults;