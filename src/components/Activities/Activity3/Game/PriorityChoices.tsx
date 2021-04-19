import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '.';
import { NUM_VARIABLES_SELECTED, VARIABLES } from './GameConstants';
import VariableCard from './VariableCard';

interface PriorityChoiceProps {
  setVariableSelection: (variables: VARIABLES[]) => void;
  initialVariables: VARIABLES[];
}

function PriorityChoices(props: PriorityChoiceProps): JSX.Element {
  const { setVariableSelection, initialVariables } = props;
  const [localVariables, setLocalVariables] = useState<VARIABLES[]>([]);
  const { goNextState } = useContext(GameContext);

  useEffect(() => {
    setLocalVariables(initialVariables);
  }, []);

  useEffect(() => {
    if (localVariables.length === NUM_VARIABLES_SELECTED) {
      setVariableSelection(localVariables);
    }
  }, [localVariables]);

  const selectVariable = (variable: VARIABLES): boolean => {
    if (localVariables.length >= NUM_VARIABLES_SELECTED || localVariables.includes(variable))
      return false;
    setLocalVariables([...localVariables, variable]);
    return true;
  };

  const deselectVariable = (variable: VARIABLES) => {
    setLocalVariables(localVariables.filter(element => element !== variable));
  };

  return <div className='enableBlur'>
    <summary>
      Now you’ve seen some variables we can consider when deciding what videos to recommend!
      <br />
      Which ones do you think lead to the best recommendations? Choose 3 from the list below.
    </summary>
    <div id='variables-wrapper' className='disableBlur'>
      {
        Object.values(VARIABLES).map(variable =>
          <VariableCard id={variable} key={variable}
            select={() => selectVariable(variable)}
            deselect={() => deselectVariable(variable)}
            initialSelected={initialVariables.includes(variable)} />,
        )
      }
    </div>
    <button className='playnet-button' onClick={goNextState}
      disabled={localVariables.length !== 3} style={{ width: '50%' }}>Continue</button>
  </div>;
}
export default PriorityChoices;