import React from 'react';
import { VARIABLES } from './GameConstants';
import VariableCard from './VariableCard';

function PriorityChoices(): JSX.Element {
  return <>
  First, let’s decide what to prioritize, or what we care about most.
    <div id='variables-wrapper'>
      {
        Object.values(VARIABLES).map(variable =>
          <VariableCard id={variable} key={variable} />,
        )
      }
    </div>
  </>;
}
export default PriorityChoices;