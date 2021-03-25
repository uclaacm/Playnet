import React from 'react';

interface ProgressBarProps {
  percentComplete: number;
}

function ProgressBar(props: ProgressBarProps): JSX.Element {
  const percentComplete = Math.max(Math.min(props.percentComplete, 100), 0);

  const containerStyles ={
    height: 20,
    width: '100%',
    backgroundColor: '#D3D3D3',
    borderRadius: 50,
    margin: 20,
  };

  const filledStyles ={
    height: 20,
    width: `${percentComplete}%`,
    backgroundColor: '#DF3A1F',
    borderRadius: 'inherit',
    transition: 'width 0.5s ease-in-out',
  };

  return (
    <div style={containerStyles}>
      <div style={filledStyles} />
    </div>
  );
}

export default ProgressBar;
