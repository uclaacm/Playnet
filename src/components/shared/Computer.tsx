import React from 'react';
import BlankComputer from '../../assets/blank-computer.svg';

import '../styles/Computer.scss';

interface ComputerProps {
  children: JSX.Element;
}

export default function Computer(props: ComputerProps): JSX.Element {
  const {children} = props;
  return (
    <div id='blank-computer'>
      <img id='blank-computer-img' src={BlankComputer} />
      <div id='blank-computer-text'>
        <div id='blank-computer-title-text'> More Information</div>
        {children}
      </div>
    </div>
  );
}