import React, { useState } from 'react';

interface SlideBoxProps {
  handleClick ?: () => void;
  imgSrc ?: string;
}

function SlideBox(props: SlideBoxProps): JSX.Element {
  const handleHover = () => {
    console.log('hover');
  };

  const handleStopHover = () => {
    console.log('stop hover');
  };

  return (
    <div
      onClick={()=>props.handleClick && props.handleClick()}
      onMouseOver={handleHover}
      onMouseLeave={handleStopHover}
    >
      <div
        style={{borderColor: 'black'}}
        className={'choice-container'}
      >
        <img src={props.imgSrc ? props.imgSrc : 'error: missing image'}/>
      </div>
    </div>
  );
}

export default SlideBox;