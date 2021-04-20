import React, { useContext, useState } from 'react';
import { GameContext } from '.';
import { VARIABLE_CONTENT, VARIABLES } from './GameConstants';
import InfoCard from './InfoCard';

function FeaturesTutorial(): JSX.Element {
  const { goNextState } = useContext(GameContext);
  const [index, setIndex] = useState(0);
  const variableIndexToSlideIndex = [0, 2, 4, 1, 3, 5];
  const descriptionNames = [VARIABLES.CREDIBLE, VARIABLES.POPULAR, VARIABLES.RECENT_UPLOAD,
    VARIABLES.SAME_CREATOR, VARIABLES.SAME_CONTENT, VARIABLES.SUBSCRIBED];

  const moveNext = () => {
    if (index < descriptionNames.length - 1) {
      setIndex(index + 1);
    } else {
      goNextState();
    }
  };

  const isMatchingIndex = (variableCardIndex: number) => {
    if (index === variableIndexToSlideIndex[variableCardIndex]) {
      return true;
    }
    return false;
  };

  return (
    <>
      <p>
        First, let&apos;s decide what to prioritize, or what we care about most.
      </p>
      <div id='variables-wrapper' className='enable-blur tutorial-container'>
        {
          Object.values(VARIABLES).map((variable, i) => {
            return (
              <div className={'variable-card' + (isMatchingIndex(i) ? ' disable-blur' : '')} key={variable}
                style={{
                  '--row': (parseInt((i) / 3) + 1),
                  '--col': (((i) % 3) + 1),
                }}>
                <div className='variable-image' id={variable.toLowerCase().replace(' ', '-')} />
                {variable}
              </div>
            );
          })
        }
        <InfoCard phrases={VARIABLE_CONTENT[descriptionNames[index]]} parentIndex={index}
          key={descriptionNames[index][0] + index} goNextParentState={moveNext} />
      </div>
    </>
  );
}
export default FeaturesTutorial;