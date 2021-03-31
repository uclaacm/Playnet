import React from 'react';
import BlankComputer from '../../assets/blank-computer.svg';

import '../styles/Computer.scss';

interface ComputerProps {
  text: JSX.Element;
}

export default function Computer(props: ComputerProps): JSX.Element {
  const {text} = props;
  return (
    <div id='blank-computer'>
      <img id='blank-computer-img' src={BlankComputer} />
      <div id='blank-computer-text'>
        <div id='blank-computer-title-text'> More Information</div>
        {text}
      </div>
    </div>
  );
}