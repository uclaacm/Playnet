import React, { useState } from 'react';
import FeatureSlidebar from './FeaturesSlidebar';
import { VARIABLES, VARIABLE_POSITIONING } from './GameWrapperConstants';
import VariableCard from './VariableCard';

function GameWrapper(): JSX.Element {
  const [i, setI] = useState(0);
  const slideLength = 2;
  const slides: JSX.Element[] = [
    <div id='variables-wrapper'>
      {
        VARIABLE_POSITIONING.map(rowElements =>
          rowElements.map(variable =>
            <VariableCard id={variable} key={variable} />,
          ),
        )
      }
    </div>,
    <FeatureSlidebar choices={[VARIABLES.CREDIBLE, VARIABLES.SUBSCRIBED, VARIABLES.SAME_CONTENT]}/>,
  ];

  const continueClick = () => {
    if (i < slideLength) {
      setI(i+1);
    }
  }
  return (
    <>
    {slides[i]}
    <button className='playnet-button' onClick={continueClick}>Continue</button>
    </>
  );
}
export default GameWrapper;