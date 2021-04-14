import React, { useEffect, useState } from 'react';
import GameSlide from '../../Activity1/Game2/components/GameSlide';
import { A3_GAME_STATE } from './GameConstants';

export const GameContext = React.createContext({
  gameState: A3_GAME_STATE.PriorityExplanation,
  setGameState: (state: A3_GAME_STATE): void => undefined,
  next: (): void => undefined,
})

function Game(): JSX.Element {
  const [state, setState] = useState<A3_GAME_STATE>(A3_GAME_STATE.PriorityExplanation);
  const [statesToSkip, setStatesToSkip] = useState(new Set()); // check this out

  useEffect(() => {
    // onMount, get state from storage
    // setup statesToSKip from storage
  }, [])

  const next = (): void => {
    // stupidly setGameState(next)
  }
  useEffect(() => {
    // add statesToSkip to storage
  }, [statesToSkip]);

  useEffect(() => {
    // check that state in statesToSkip
    // if state not in statesToSkip, go on to next
    // if state = one time only, add to statesToSkip

    // add state to storage
  }, [state]);


  const getGameElement = (): JSX.Element => {
    switch (state) {
      case A3_GAME_STATE.PriorityExplanation:
        return <></>;
      case A3_GAME_STATE.PriorityChoices:
        return <></>;
      case A3_GAME_STATE.PriorityWeighing:
        return <></>;
      case A3_GAME_STATE.TimeAllocation:
        return <></>;
      case A3_GAME_STATE.DebuggingResults:
        return <></>;
      case A3_GAME_STATE.ABTestingExplanation:
        return <></>;
      case A3_GAME_STATE.ABTestingReport:
        return <></>;
      case A3_GAME_STATE.FinalReport:
        return <></>;
    }
  }

  return <GameContext.Provider value={{ gameState: state, setGameState: setState, next: next }}>
    {
      getGameElement()
    }
  </GameContext.Provider>
}