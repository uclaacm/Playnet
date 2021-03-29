import React from 'react';

interface ProgressBarProps {
  percentComplete: number;
}

function ProgressBar(props: ProgressBarProps): JSX.Element {
  const percentComplete = Math.max(Math.min(props.percentComplete, 100), 0);

  return (
    <div className='progress-bar-outer'>
      <div style={{width: `${percentComplete}%`}} className='progress-bar-inner'/>
    </div>
  );
}

export default ProgressBar;
