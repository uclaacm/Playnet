import React from 'react';
import { VARIABLE_POSITIONING } from './GameConstants';
import VariableCard from './VariableCard';

function GameWrapper(): JSX.Element {
  return <>
  First, let’s decide what to prioritize, or what we care about most.
    <div id='variables-wrapper'>
      {
        VARIABLE_POSITIONING.map(rowElements =>
          rowElements.map(variable =>
            <VariableCard id={variable} key={variable} />,
          ),
        )
      }
    </div>
  </>;
}
export default GameWrapper;