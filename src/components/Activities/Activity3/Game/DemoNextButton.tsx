import React, { useContext } from 'react';
import { GameContext } from '.';
import { A3_GAME_STATE } from './GameConstants';

function DemoNextButton() : JSX.Element {
  const {setState, goNextState} = useContext(GameContext);
  return <>
    <br/>
    <button onClick={()=>goNextState && goNextState()} >next</button>
    <br/>
    <button onClick={()=>setState && setState(A3_GAME_STATE.PriorityExplanation)} >go back to start</button></>;
}

export default DemoNextButton;