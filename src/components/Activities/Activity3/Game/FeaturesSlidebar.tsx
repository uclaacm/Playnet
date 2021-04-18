import React, { useContext, useEffect, useState } from 'react';
import '../../../styles/Activity3Game.scss';
import { GameContext } from '.';

interface FeatureSlidebarProps {
  featureWeights: number[],
  setFeatureWeights: (featureweights: number[]) => void,
}

function FeatureSlidebar(props: FeatureSlidebarProps): JSX.Element {
  const { goNextState, variableSelection } = useContext(GameContext);
  const { featureWeights, setFeatureWeights } = props;
  const [weight1, setWeight1] = useState(featureWeights[0]);
  const [weight2, setWeight2] = useState(featureWeights[1] + featureWeights[0]);

  useEffect(() => {
    const newWeights = [weight1, weight2 - weight1, 100 - weight2];
    setFeatureWeights(newWeights);
  }, [weight1, weight2]);

  const handleInputWeight = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const valString: string = e.currentTarget.value.replace('%', '').trim();
    const val: number = valString === '' ? 0 : parseInt(valString);
    switch (index) {
      case 1:
        adjustWeights1(val);
        break;
      case 2:
        adjustWeights2(val);
        break;
      case 3:
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
        adjustWeights2(weight2 - weight1 + adjustment);
        break;
      case 3:
        adjustWeights3(100 - weight2 + adjustment);
    }
  };

  const adjustWeights1 = (val: number) => {
    if (val < 0 || val > 100) return;
    setWeight1(val);
    if (val > weight2) {
      setWeight2(val);
    }
  };

  const adjustWeights2 = (val: number) => {//val is percent that weight2 takess, not net position
    if (val > 100) return;
    let upperBound = val + weight1;
    if (upperBound > 100) {
      const newWeight1 = weight1 - (upperBound - 100);
      setWeight1(newWeight1);
      upperBound = 100;
    } else if (val < 0) {
      const newWeight1 = weight1 + val;
      setWeight2(newWeight1);
      setWeight1(newWeight1);
      return;
    }
    setWeight2(upperBound);
  };

  const adjustWeights3 = (val: number) => {
    if (val < 0 || val > 100) return;
    const newWeight2 = 100 - val;
    setWeight2(newWeight2);
    if (newWeight2 < weight1) {
      setWeight1(newWeight2);
    }
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
        <div className='input-option'>
          <div className='input-text-display-container'>
            <div className='variable-image' id={variableSelection[0].toLowerCase().replace(' ', '-')} />
            <div className='feature-text'>{variableSelection[0]}</div>
          </div>
          <input className='slider-input'
            type='text'
            value={weight1 + '%'}
            onWheel={scrollValue(1)}
            onChange={handleInputWeight(1)}
          />
        </div>
        <div className='input-option'>
          <div className='input-text-display-container'>
            <div className='variable-image' id={variableSelection[1].toLowerCase().replace(' ', '-')} />
            <div className='feature-text'>{variableSelection[1]}</div>
          </div>
          <input className='slider-input'
            type='text'
            value={(weight2 - weight1) + '%'}
            onChange={handleInputWeight(2)}
            onWheel={scrollValue(2)}
          />
        </div>
        <div className='input-option'>
          <div className='input-text-display-container'>
            <div className='variable-image' id={variableSelection[2].toLowerCase().replace(' ', '-')} />
            <div className='feature-text'>{variableSelection[2]}</div>
          </div>
          <input className='slider-input'
            type='text'
            value={(100 - weight2) + '%'}
            onWheel={scrollValue(3)}
            onChange={handleInputWeight(3)}
          />
        </div>
      </div>

      <div className='input-slider-container'>
        <div className='slider-background-color'
          style={{
            '--sec1-percent': weight1 + '%',
            '--sec2-percent': weight2 + '%',
          }}
        />
        <input type="range" className="input-slidebar" min="0" max="100" value={weight1} onChange={handleInputWeight(1)} />
        <input type="range" className="input-slidebar" min="0" max="100" value={weight2} onChange={handleNetWeight2} />
      </div>
      <button className='playnet-button' onClick={goNextState}
        style={{ width: '40%' }} >Continue</button>
    </>
  );
}

export default FeatureSlidebar;