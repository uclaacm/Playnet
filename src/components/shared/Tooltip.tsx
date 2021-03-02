import React from 'react';

import '../styles/Tooltip.scss';

export interface TooltipProps {
  text: string;
  children: JSX.Element,
}

function Tooltip(props: TooltipProps): JSX.Element {
  return (
    <div className='tooltip'>
      {props.children}
      <span className='tooltiptext'>{props.text}</span>
    </div>
  );
}

export default Tooltip;