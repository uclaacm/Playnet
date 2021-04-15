import React, { useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import { useStateCallback } from '../../../shared/hooks';
import DemoNextButton from './DemoNextButton';
import { A3_GAME_STATE, NEXT_STATE_MAP, ONE_TIME_STATES, SESSION_CURRENT_STATE, SESSION_SKIP_STATES } from './GameConstants';
import PriorityChoices from './PriorityChoices';

export const GameContext = React.createContext({
  setState: (_state: A3_GAME_STATE): void => undefined,
  goNextState: (): void => undefined,
});

function Game(): JSX.Element {
  const { next } = useContext(CarouselContext);
  const [state, setState] = useState<A3_GAME_STATE>(A3_GAME_STATE.EmptyState);
  const [statesToSkip, setStatesToSkip] = useStateCallback<A3_GAME_STATE[]>([]);
  const storage = window.sessionStorage;

  useEffect(() => {
    // onMount, get state + skipStates from storage
    const storedSkipStates = storage.getItem(SESSION_SKIP_STATES);
    const storedState = storage.getItem(SESSION_CURRENT_STATE);

    // setup statesToSkip from storage
    const tempSkipStates = storedSkipStates?.split(',').map(element => element as A3_GAME_STATE);
    const curSkipStates = tempSkipStates ?? [A3_GAME_STATE.EmptyState];
    setStatesToSkip(curSkipStates, () => {
      // setup state after setting up statesToSkip
      const curState = (storedState) ? (storedState as A3_GAME_STATE) : A3_GAME_STATE.PriorityExplanation;
      setState(curState);
    });

    return () => storage.removeItem(SESSION_CURRENT_STATE);
  }, []);

  const goNextState = (): void => {
    // go next state + skipping states that should be skipped
    const nextPossibleStates = NEXT_STATE_MAP.get(state);
    const nextState = nextPossibleStates?.find(element => !statesToSkip.includes(element));
    if (!nextState) {
      next();
      return;
    }
    setState(nextState);
  };

  useEffect(() => {
    // add statesToSkip to storage
    storage.setItem(SESSION_SKIP_STATES, statesToSkip.join(','));
  }, [statesToSkip]);

  useEffect(() => {
    // if state in statesToSkip, go to next
    if (statesToSkip.includes(state)) {
      goNextState();
      return;
    }

    // if state = one time only, add to statesToSkip
    if (ONE_TIME_STATES.includes(state)) {
      setStatesToSkip([...statesToSkip, state]);
    }

    // add state to storage
    storage.setItem(SESSION_CURRENT_STATE, state.toString());
  }, [state]);

  const getGameElement = (): JSX.Element => {
    switch (state) {
      case A3_GAME_STATE.PriorityExplanation:
        return <>skip1<DemoNextButton /></>;
      case A3_GAME_STATE.PriorityChoices:
        return <><PriorityChoices/><DemoNextButton /></>;
      case A3_GAME_STATE.PriorityWeighing:
        return <>2<DemoNextButton /></>;
      case A3_GAME_STATE.TimeAllocation:
        return <>3<DemoNextButton /></>;
      case A3_GAME_STATE.DebuggingResults:
        return <>4<DemoNextButton /></>;
      case A3_GAME_STATE.ABTestingExplanation:
        return <>skip5<DemoNextButton /></>;
      case A3_GAME_STATE.ABTestingReport:
        return <>5<DemoNextButton /></>;
      case A3_GAME_STATE.FinalReport:
        return <>6<DemoNextButton /></>;
      default:
        return <>:(</>; // should never reach this
    }
  };

  return <GameContext.Provider value={{ setState: setState, goNextState: goNextState }}>
    {
      getGameElement()
    }
  </GameContext.Provider>;
}

export default Game;