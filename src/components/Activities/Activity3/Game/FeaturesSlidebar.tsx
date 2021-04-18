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
        adjustWeight0(val);
        break;
      case 1:
        adjustWeight1(val);
        break;
      case 2:
        adjustWeight2(val);
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
        adjustWeight0(weights[0] + adjustment);
        break;
      case 1:
        adjustWeight1(weights[1] + adjustment);
        break;
      case 2:
        adjustWeight2(100 - weights[0] - weights[1] + adjustment);
    }
  };

  //adjusts weights given index 0's weight percentage
  const adjustWeight0 = (val: number) => {
    if (val < 0 || val > 100) return;
    const newWeight1 = Math.max(weights[0] + weights[1] - val, 0);
    setWeights([val, newWeight1, 100 - val - newWeight1]);
  };

  const adjustWeight1 = (val: number) => {//val is percent that weight2 takes, not net position
    if (val > 100) return;
    const upperBound = val + weights[0];
    let newWeight0 = weights[0];
    if (upperBound > 100) {
      newWeight0 -= (upperBound - 100);
    } else if (val < 0) {
      newWeight0 = Math.max(weights[0] + val, 0);
      setWeights([newWeight0, 0, 100 - newWeight0]);
      return;
    }
    setWeights([newWeight0, val, 100 - newWeight0 - val]);
  };

  const adjustWeight2 = (val: number) => {//val is percent that weight2 takes, not net position
    if (val < 0 || val > 100) return;
    let newWeight1 = 100 - val - weights[0];
    let newWeight0 = weights[0];
    if (newWeight1 < 0) {
      newWeight0 += newWeight1;
      newWeight1 = 0;
    }
    setWeights([newWeight0, newWeight1, val]);
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
            <div className='input-option' key={variable + '-' + index}>
              <div className='input-text-display-container'>
                <div className='variable-image' id={variable.toLowerCase().replace(' ', '-')} />
                <div className='feature-text'>{variable}</div>
              </div>
              <input className='slider-input'
                type='text'
                value={weights[index] + '%'}
                onWheel={handleScroll(index)}
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
          onChange={(e) => adjustWeight0(parseInt(e.currentTarget.value))} />
        <input type="range" className="input-slidebar" min="0" max="100" value={weights[0] + weights[1]}
          onChange={(e) => adjustWeight1(parseInt(e.currentTarget.value) - weights[0])} />
      </div>
      <button className='playnet-button' onClick={goNextState}
        style={{ width: '40%' }} >Continue</button>
    </>
  );
}

export default FeatureSlidebar;
