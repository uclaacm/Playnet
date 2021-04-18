import React, { useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import { useStateCallback } from '../../../shared/hooks';
import DebuggingResults from './DebuggingResults';
import DemoNextButton from './DemoNextButton';
import FeaturesSlidebar from './FeaturesSlidebar';
import { A3_GAME_STATE, NEXT_STATE_MAP, ONE_TIME_STATES, SESSION_CURRENT_STATE, SESSION_SKIP_STATES, SESSION_VARIABLES, VARIABLES } from './GameConstants';
import PriorityChoices from './PriorityChoices';


interface IGameContext {
  setState: (state: A3_GAME_STATE) => void,
  goNextState: () => void,
  variableSelection: VARIABLES[],
  featureWeights: number[],
}
export const GameContext = React.createContext<Partial<IGameContext>>({});

function Game(): JSX.Element {
  const { next } = useContext(CarouselContext);
  const [state, setState] = useState<A3_GAME_STATE>(A3_GAME_STATE.EmptyState);
  const [statesToSkip, setStatesToSkip] = useStateCallback<A3_GAME_STATE[]>([]);
  const [variableSelection, setVariableSelection] = useState<VARIABLES[]>([]);
  const [featureWeights, setFeatureWeights] = useState([33, 33, 34]);
  const storage = window.sessionStorage;

  useEffect(() => {
    // onMount, get state + skipStates from storage
    const storedSkipStates = storage.getItem(SESSION_SKIP_STATES);
    const storedState = storage.getItem(SESSION_CURRENT_STATE);
    const storedVariables = storage.getItem(SESSION_VARIABLES);

    // setup statesToSkip from storage
    const tempSkipStates = storedSkipStates?.split(',').map(element => element as A3_GAME_STATE);
    const curSkipStates = tempSkipStates ?? [A3_GAME_STATE.EmptyState];
    setStatesToSkip(curSkipStates, () => {
      // setup state after setting up statesToSkip
      const curState = (storedState) ? (storedState as A3_GAME_STATE) : A3_GAME_STATE.PriorityExplanation;
      setState(curState);
    });

    // setup variableSelection from storage
    const tempVariables = storedVariables?.split(',').map(element => element as VARIABLES);
    const curVariables = tempVariables ?? [];
    setVariableSelection(curVariables);
    return () => {
      storage.removeItem(SESSION_CURRENT_STATE);
      storage.removeItem(SESSION_VARIABLES);
    };
  }, []);

  const goNextState = (): void => {
    // go next state + skipping states that should be skipped
    const nextPossibleStates = NEXT_STATE_MAP[state];
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
    // add variableSelection to storage
    storage.setItem(SESSION_VARIABLES, variableSelection.join(','));
  }, [variableSelection]);

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

  const GAME_ELEMENTS: { [key in A3_GAME_STATE]: JSX.Element } = {
    [A3_GAME_STATE.PriorityExplanation]: <>skip1<DemoNextButton /></>,
    [A3_GAME_STATE.PriorityChoices]:
      <PriorityChoices setVariableSelection={setVariableSelection} initialVariables={variableSelection} />,
    [A3_GAME_STATE.PriorityWeighing]:
      <FeaturesSlidebar initialFeatureWeights={featureWeights} setFeatureWeights={setFeatureWeights} />,
    [A3_GAME_STATE.TimeAllocation]: <>3<DemoNextButton /></>,
    [A3_GAME_STATE.DebuggingResults]: <><DebuggingResults/><DemoNextButton /></>,
    [A3_GAME_STATE.ABTestingExplanation]: <>skip5<DemoNextButton /></>,
    [A3_GAME_STATE.ABTestingReport]: <>5<DemoNextButton /></>,
    [A3_GAME_STATE.FinalReport]: <>6<DemoNextButton /></>,
    [A3_GAME_STATE.EmptyState]: <></>, // this should never be reached
  };

  return <GameContext.Provider value={{
    setState: setState, goNextState: goNextState,
    variableSelection: variableSelection,
    featureWeights: featureWeights,
  }}>
    {GAME_ELEMENTS[state]}
  </GameContext.Provider>;
}

export default Game;
