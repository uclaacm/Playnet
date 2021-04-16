import React from 'react';
import { VARIABLE_POSITIONING } from './GameWrapperConstants';
import VariableCard from './VariableCard';

function GameWrapper(): JSX.Element {
  return <div id='variables-wrapper'>
    {
      VARIABLE_POSITIONING.map(rowElements =>
        rowElements.map(variable =>
          <VariableCard id={variable} key={variable} />,
        ),
      )
    }
  </div>;
}
export default GameWrapper;