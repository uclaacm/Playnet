import React from 'react';

const next = () => undefined;

function DebuggingResults() : JSX.Element {
  const reduceDaysLeft = (num: number) => undefined;
  const numErrors = 24;
  const errors = ["Image failed to load", "File not found"];
  const debugQuality = "poor";
  const buttons : {[key: string]: {buttonText: string, onClick: () => void}}= {
    "Reduce errors": {
      buttonText: "Debug (-1 day)",
      onClick: ()=>reduceDaysLeft(1),
    },
    "Improve recommendations": {
      buttonText: "Change priorities (-3 day)",
      onClick: ()=>reduceDaysLeft(3),
    },
    "No change": {
      buttonText: "Continue to A/B Testing",
      onClick: ()=>next(),
    },
  }
  return <><div className='half' id='debugScreen'>
    Debugging Report
    ---
    {numErrors} errors detected:
    {errors}
    ---
    Recommendations: {debugQuality}
  </div>
  <div className='half'>
    <div className='vertical-grid'>
      {
        Object.entries(buttons).map(([name, {buttonText, onClick}]) => <div>
          {name}
          <button className='playnet-button' onClick={onClick}>
            {buttonText}
          </button>
        </div>)
      }
    </div>
  </div>
  </>;
}
export default DebuggingResults;