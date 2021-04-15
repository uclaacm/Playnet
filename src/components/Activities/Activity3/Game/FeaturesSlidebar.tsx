import React, { useRef, useState } from 'react';
import { VARIABLES } from './GameWrapperConstants';
import '../../../styles/Activity3Game.scss';
import ScalingSlide from '../../../shared/ScalingSlide';

interface FeatureSlidebarProps {
  choices: VARIABLES[]
}

function FeatureSlidebar(props: FeatureSlidebarProps): JSX.Element {
  const slidebarWidthPx = 900;
  const sliderWidthPx = 56;
  const slidebarWidthMarginWidthPx = 1000;
  const slidebarMarginPx = (slidebarWidthMarginWidthPx - slidebarWidthPx) / 2;

  const [weight1, setWeight1] = useState(33);
  const [weight2, setWeight2] = useState(66);
  const prevX = useRef<number>(0);
  const isDragging = useRef(false);

  const handleInputWeight = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value.trim() === '' ? 0 : parseInt(e.currentTarget.value);
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
  }

  const scrollValue = (index: number) => (e: React.WheelEvent) => {
    let adjustment = 0;
    if (e.deltaY < 0) { //scrolling down
      adjustment = -1;
    } else if (e.deltaY > 0){ //scrolling up
      adjustment = 1;
    }
    switch (index) {
      case 1:
        adjustWeights1(weight1 + adjustment);
        break;
      case 2:
        adjustWeights2(weight2-weight1+adjustment);
        break;
      case 3:
        adjustWeights3(100-weight2 + adjustment);
    }
  }

  const adjustWeights1 = (val: number) => {
    if (val < 0 || val > 100) return;
    setWeight1(val);
    if (val > weight2) {
      setWeight2(val);
    }
  }

  const adjustWeights2 = (val: number) => {
    if (val < 0 || val > 100) return;
    let upperBound = val + weight1;
    if (upperBound > 100) {
      setWeight1(weight1 - (upperBound - 100));
      upperBound = 100;
    }
    setWeight2(upperBound);
  }

  const adjustWeights3 = (val: number) => {
    if (val < 0 || val > 100) return;
    const newWeight2 = 100 - val;
    setWeight2(newWeight2);
    if (newWeight2 < weight1) {
      setWeight1(newWeight2);
    }
  }

  const mouseDownSlider1 = (e: React.MouseEvent<HTMLInputElement>) => {
    prevX.current = e.pageX;
    console.log("start x: "+e.pageX);
    isDragging.current = true;
  }

  const trackMouse = (e: React.MouseEvent<HTMLElement>) => {
    if (isDragging.current){
      console.log("x: "+e.pageX);
      const diff: number = e.pageX - prevX.current;
      prevX.current = e.pageX;
      adjustWeights1(diff /sliderWidthPx *100 + weight1);
    }
  }

  const mouseUpSlider1 = (e: React.MouseEvent<HTMLElement>) => {
    console.log("end x: "+e.pageX);
    isDragging.current = false;
  }
  return (
    <>
      <p>
        Now that we&apos;ve decided which priorities to use, are any of these priorities more important than the others?
      </p>
      <p>
        Adjust the slider so that the most important variables take up the most space.
      </p>
      <div className='slider-input-container'>
        <div className='input-option'>
          <p>{props.choices[0]}</p>
          <input className='slider-input'
            type='text'
            value={weight1}
            onWheel={scrollValue(1)}
            onChange={handleInputWeight(1)}
          />
        </div>
        <div className='input-option'>
          <p>{props.choices[1]}</p>
          <input className='slider-input'
            value={(weight2-weight1)}
            onChange={handleInputWeight(2)}
            onWheel={scrollValue(2)}
          />
        </div>
        <div className='input-option'>
          <p>{props.choices[2]}</p>
          <input className='slider-input'
            value={(100-weight2)}
            onWheel={scrollValue(3)}
            onChange={handleInputWeight(3)}
          />
        </div>
      </div>
      <ScalingSlide widthPx={slidebarWidthMarginWidthPx} heightPx={113}>
        <>
          <div className='feature-slidebar'>
          </div>
          <div className='slider' id='slider1'
            onMouseDown={mouseDownSlider1}
            onMouseMove={trackMouse}
            onMouseUp={mouseUpSlider1}
            style={{ marginLeft: (weight1 / 100 * slidebarWidthPx) + slidebarMarginPx - sliderWidthPx / 2 + 'px' }}
          />
          <div className='slider' id='slider2'
            style={{ marginLeft: (weight2) / 100 * slidebarWidthPx + slidebarMarginPx - sliderWidthPx / 2 + 'px' }}
          />
        </>
      </ScalingSlide>
    </>
  );
}

export default FeatureSlidebar;