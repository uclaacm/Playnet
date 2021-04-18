import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/Activity3Game.scss';
import { GameContext } from '.';

interface FeatureSlidebarProps {
  initialFeatureWeights: number[],
  setFeatureWeights: (featureWeights: number[]) => void,
}

function FeatureSlidebar(props: FeatureSlidebarProps): JSX.Element {
  const { goNextState, variableSelection } = useContext(GameContext);
  const { initialFeatureWeights, setFeatureWeights } = props;
  const [weights, setWeights] = useState(initialFeatureWeights);

  useEffect(() => {
    setFeatureWeights(weights);
  }, [weights]);

  const handleInputWeight = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const valString: string = e.currentTarget.value.replace('%', '').trim();
    const val: number = valString === '' ? 0 : parseInt(valString);
    switch (index) {
      case 0:
        adjustWeights1(val);
        break;
      case 1:
        adjustWeights2(val);
        break;
      case 2:
        adjustWeights3(val);
    }
  };

  const handleScroll = (index: number) => (e: React.WheelEvent) => {
    let adjustment = 0;
    if (e.deltaY < 0) { //scrolling down
      adjustment = -1;
    } else if (e.deltaY > 0) { //scrolling up
      adjustment = 1;
    }
    switch (index) {
      case 0:
        adjustWeights1(weights[0] + adjustment);
        break;
      case 1:
        adjustWeights2(weights[1] + adjustment);
        break;
      case 2:
        adjustWeights3(100 - weights[0] - weights[1] + adjustment);
    }
  };

    // adjusts weights given 1st weight's percentage
  const adjustWeight1 = (val: number) => {
    if (val < 0 || val > 100) return;
    const newWeight2 = Math.max(weights[0] + weights[1] - val, 0);
    setWeights([val, newWeight2, 100 - val - newWeight2]);
  };

  const adjustWeights2 = (val: number) => {//val is percent that weight2 takes, not net position
    if (val > 100) return;
    const upperBound = val + weights[0];
    let newWeight1 = weights[0];
    if (upperBound > 100) {
      newWeight1 -= (upperBound - 100);
    } else if (val < 0) {
      newWeight1 = Math.max(weights[0] + val, 0);
      setWeights([newWeight1, 0, 100 - newWeight1]);
      return;
    }
    setWeights([newWeight1, val, 100 - newWeight1 - val]);
  };

  const adjustWeights3 = (val: number) => {//val is percent that weight3 takes, not net position
    if (val < 0 || val > 100) return;
    let newWeight2 = 100 - val - weights[0];
    let newWeight1 = weights[0];
    if (newWeight2 < 0) {
      newWeight1 += newWeight2;
      newWeight2 = 0;
    }
    setWeights([newWeight1, newWeight2, val]);
  };

  return (
    <>
      <p>
        Now that we&apos;ve decided which priorities to use, are any of these priorities more important than the others?
      </p>
      <p>
        Adjust the slider so that the most important variables take up the most space.
      </p>
      <div className='slider-text-input-container'>
        {variableSelection.map((variable, index) => {
          return (
            <div className='input-option' key={variable+'-'+index}>
              <div className='input-text-display-container'>
                <div className='variable-image' id={variable.toLowerCase().replace(' ', '-')} />
                <div className='feature-text'>{variable}</div>
              </div>
              <input className='slider-input'
                type='text'
                value={weights[index] + '%'}
                onWheel={scrollValue(index)}
                onChange={handleInputWeight(index)}
              />
            </div>);
        })
        }
      </div>

      <div className='input-slider-container'>
        <div className='slider-background-color'
          style={{
            '--sec1-percent': weights[0] + '%',
            '--sec2-percent': weights[0] + weights[1] + '%',
          }}
        />
        <input type="range" className="input-slidebar" min="0" max="100" value={weights[0]}
          onChange={(e) => adjustWeights1(parseInt(e.currentTarget.value))} />
        <input type="range" className="input-slidebar" min="0" max="100" value={weights[0] + weights[1]}
          onChange={(e) => adjustWeights2(parseInt(e.currentTarget.value) - weights[0])} />
      </div>
      <button className='playnet-button' onClick={goNextState}
        style={{ width: '40%' }} >Continue</button>
    </>
  );
}

export default FeatureSlidebar;
