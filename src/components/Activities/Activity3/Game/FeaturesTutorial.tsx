import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '.';
import { VARIABLE_CONTENT, VARIABLES } from './GameConstants';
import InfoCard from './InfoCard';

function FeaturesTutorial(): JSX.Element {
  const { goNextState } = useContext(GameContext);
  const [index, setIndex] = useState(0);
  const descriptions = [
    {
      name: VARIABLES.CREDIBLE,
      col: 2,
      smallCardRow: 1,
      smallCardCol: 1,
    },
    {
      name: VARIABLES.POPULAR,
      col: 2,
      smallCardRow: 2,
      smallCardCol: 1,
    },
    {
      name: VARIABLES.RECENT_UPLOAD,
      col: 1,
      smallCardRow: 1,
      smallCardCol: 2,
    },
    {
      name: VARIABLES.SAME_CREATOR,
      col: 1,
      smallCardRow: 2,
      smallCardCol: 2,
    },
    {
      name: VARIABLES.SAME_CONTENT,
      col: 2,
      smallCardRow: 1,
      smallCardCol: 3,
    },
    {
      name: VARIABLES.SUBSCRIBED,
      col: 2,
      smallCardRow: 2,
      smallCardCol: 3,
    },
  ];

  useEffect(() => {
    if (index >= descriptions.length) {
      goNextState();
    }
  }, [index]);

  return (
    <>
      <p>
        First, let&apos;s decide what to prioritize, or what we care about most.
      </p>
      <div id='variables-wrapper' className='enable-blur tutorial-container'>
        {Object.values(VARIABLES).map((variable, i) => {
          return (
            <div className={'variable-card' + (variable === descriptions[index].name ? ' disable-blur' : '')} key={variable}
              style={{  //note: the order of the descipritions is different from the order of the variable cards
                gridRow: (parseInt(i / 3) + 1),
                gridColumn: (((i) % 3) + 1),
              }}>
              <div className='variable-image' id={variable.toLowerCase().replace(' ', '-')} />
              {variable}
            </div>
          );
        })}
        <InfoCard phrases={VARIABLE_CONTENT[descriptions[index].name]} col={descriptions[index].col}
          key={descriptions[index].name + index} goNextParentState={() => setIndex(index + 1)} />
      </div>
    </>
  );
}
export default FeaturesTutorial;
