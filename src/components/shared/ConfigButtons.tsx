import React from 'react';

import '../styles/TimeBar.scss';

export interface TimeBarProps {
  timeInSec: number;
}

function TimeBar(props: TimeBarProps): JSX.Element {
  const style = { "--time": props.timeInSec + "s",  "animation-timing-function": "linear"} as React.CSSProperties;
  return (
    <div className="timebar">
      <div className="time" style={style}></div>
    </div>
  );
}

export default TimeBar;