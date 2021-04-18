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
  const [weight1, setWeight1] = useState(featureWeights[0]);
  const [weight2, setWeight2] = useState(featureWeights[1]);

  useEffect(() => {
    const newWeights = [weight1, weight2 - weight1, 100 - weight2];
    setFeatureWeights(newWeights);
  }, [weight1, weight2]);

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

  const handleNetWeight2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val: number = e.currentTarget.value.trim() === '' ? 0 : parseInt(e.currentTarget.value);
    adjustWeights2(val - weight1);
  };

  const scrollValue = (index: number) => (e: React.WheelEvent) => {
    let adjustment = 0;
    if (e.deltaY < 0) { //scrolling down
      adjustment = -1;
    } else if (e.deltaY > 0) { //scrolling up
      adjustment = 1;
    }
    switch (index) {
      case 1:
        adjustWeights1(weight1 + adjustment);
        break;
      case 2:
        adjustWeights2(weight2 + adjustment);
        break;
      case 3:
        adjustWeights3(100 - weight2 - weight1 + adjustment);
    }
  };

  const adjustWeights1 = (val: number) => {
    if (val < 0 || val > 100) return;
    const newWeight2 = Math.max(weight2 + weight1 - val, 0);
    setWeight1(val);
    setWeight2(newWeight2);
  };

  const adjustWeights2 = (val: number) => {//val is percent that weight2 takes, not net position
    if (val > 100) return;
    const upperBound = val + weight1;
    if (upperBound > 100) {
      const newWeight1 = weight1 - (upperBound - 100);
      setWeight1(newWeight1);
    } else if (val < 0) {
      const newWeight1 = Math.max(weight1 + val, 0);
      setWeight2(0);
      setWeight1(newWeight1);
      return;
    }
    setWeight2(val);
  };

  const adjustWeights3 = (val: number) => {//val is percent that weight3 takes, not net position
    if (val < 0 || val > 100) return;
    let newWeight2 = 100 - val - weight1;
    if (newWeight2 < 0) {
      const newWeight1 = weight1 + newWeight2;
      newWeight2 = 0;
      setWeight1(newWeight1);
    }
    setWeight2(newWeight2);
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
 {
          variableSelection.map((variable, index) => {
            return <div className='input-option'>
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
          </div>;
          })
        }
      </div>

      <div className='input-slider-container'>
        <div className='slider-background-color'
          style={{
            '--sec1-percent': weight1 + '%',
            '--sec2-percent': weight1 + weight2 + '%',
          }}
        />
        <input type="range" className="input-slidebar" min="0" max="100" value={weight1} onChange={handleInputWeight(1)} />
        <input type="range" className="input-slidebar" min="0" max="100" value={weight1 + weight2} onChange={handleNetWeight2} />
      </div>
      <button className='playnet-button' onClick={goNextState}
        style={{ width: '40%' }} >Continue</button>
    </>
  );
}

export default FeatureSlidebar;
