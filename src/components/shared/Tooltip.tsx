import React from 'react';

import '../styles/TimeBar.scss';
import '../styles/tooltip.scss';

export interface TooltipProps {
  text: string;
  child: JSX.Element,
}

function Tooltip(props: TooltipProps): JSX.Element {
  return (
    <div className={"tooltip"}>
      {props.child}
      <span className={"tooltiptext"}>{props.text}</span>
    </div>
  );
}

export default Tooltip;