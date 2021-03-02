import React from 'react';

import '../styles/TimeBar.scss';

export interface TimeBarProps {
  timeInSec: number;
  time?: Date;
}

function TimeBar(props: TimeBarProps): JSX.Element {
  const style = { "animation": "fill-bar-animation " + props.timeInSec + "s 1" };

  return (
    <div key={String(props.time)} className="timebar">
      <div className="time" style={style}/>
    </div>
  );
}

export default TimeBar;