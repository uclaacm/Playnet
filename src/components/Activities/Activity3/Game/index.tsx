import React, { useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import { useStateCallback } from '../../../shared/hooks';
import ABTestDesc from './ABTestDesc';
import DebuggingResults from './DebuggingResults';
import DemoNextButton from './DemoNextButton';
import FeaturesTutorial from './FeaturesTutorial';
import FeaturesSlidebar from './FeaturesSlidebar';
import { generateVariableTargetWeights } from './gameCalculationsUtil';
import { A3_GAME_STATE, NEXT_STATE_MAP, ONE_TIME_STATES,
  SESSION_CURRENT_STATE, SESSION_SKIP_STATES, SESSION_VARIABLES,
  SESSION_TIMES, VARIABLES, STARTING_DAYS, SESSION_TARGET_WEIGHTS } from './GameConstants';
import PriorityChoices from './PriorityChoices';
import TimeAllocation from './TimeAllocation';

interface IGameContext {
  setState: (state: A3_GAME_STATE) => void,
  goNextState: () => void,
  variableSelection: VARIABLES[],
  featureWeights: number[],
  targetWeights: number[],
  timeAllocation: number[], // BUILD, DEBUG, ABTEST
  setTimeAllocation: (allocations: number[]) => void,
  daysLeft: number,
  setDaysLeft: (state: number) => void,
}
export const GameContext = React.createContext<IGameContext>({
  setState: (_state: A3_GAME_STATE) => undefined,
  goNextState: () => undefined,
  variableSelection: [],
  featureWeights: [],
  targetWeights: [],
  timeAllocation: [],
  setTimeAllocation: (_allocations: number[]) => undefined,
  daysLeft: 0,
  setDaysLeft: (_state: number) => undefined,
});

function Game(): JSX.Element {
  const { next } = useContext(CarouselContext);
  const [state, setState] = useState<A3_GAME_STATE>(A3_GAME_STATE.EmptyState);
  const [statesToSkip, setStatesToSkip] = useStateCallback<A3_GAME_STATE[]>([]);
  const [variableSelection, setVariableSelection] = useState<VARIABLES[]>([]);
  const [featureWeights, setFeatureWeights] = useState([33, 33, 34]);
  const [targetWeights, setTargetWeights] = useState<number[]>([]);
  const [timeAllocation, setTimeAllocation] = useState<number[]>([]);
  const [daysLeft, setDaysLeft] = useState<number>(STARTING_DAYS);
  const storage = window.sessionStorage;

  useEffect(() => {
    // onMount, get state + skipStates from storage
    const storedSkipStates = storage.getItem(SESSION_SKIP_STATES);
    const storedState = storage.getItem(SESSION_CURRENT_STATE);
    const storedVariables = storage.getItem(SESSION_VARIABLES);
    const storedTasks = storage.getItem(SESSION_TIMES);

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

    // setup tasksSelection from storage
    const tempTasks : number[] = storedTasks?.split(',').map((elem) => {
      // elem can be either '' or a number
      return (elem && elem.length > 0) ? parseInt(elem) : 0;
    }) ?? [0,0,0];
    setTimeAllocation(tempTasks);

    startNewGame();

    return () => {
      storage.removeItem(SESSION_SKIP_STATES);
      storage.removeItem(SESSION_CURRENT_STATE);
      storage.removeItem(SESSION_VARIABLES);
      storage.removeItem(SESSION_TIMES);
      storage.removeItem(SESSION_TARGET_WEIGHTS);
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
    // add taskSelection to storage
    storage.setItem(SESSION_TIMES, timeAllocation.join(','));
  }, [timeAllocation]);

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

  const startNewGame = () => {
    const tempTargetWeights = generateVariableTargetWeights();
    storage.setItem(SESSION_TARGET_WEIGHTS, tempTargetWeights.join(','));
    setTargetWeights(tempTargetWeights);
  };

  const GAME_ELEMENTS: { [key in A3_GAME_STATE]: JSX.Element } = {
    [A3_GAME_STATE.PriorityExplanation]: <FeaturesTutorial />,
    [A3_GAME_STATE.PriorityChoices]:
      <PriorityChoices setVariableSelection={setVariableSelection} initialVariables={variableSelection} />,
    [A3_GAME_STATE.PriorityWeighing]:
      <FeaturesSlidebar initialFeatureWeights={featureWeights} setFeatureWeights={setFeatureWeights} />,
    [A3_GAME_STATE.TimeAllocationExplanation]:
      <TimeAllocation initialTimes={timeAllocation} isTutorial={true}/>,
    [A3_GAME_STATE.TimeAllocation]:
      <TimeAllocation initialTimes={timeAllocation} isTutorial={false}/>,
    [A3_GAME_STATE.DebuggingResults]: <DebuggingResults/>,
    [A3_GAME_STATE.ABTestingExplanation]: <><ABTestDesc /></>,
    [A3_GAME_STATE.ABTestingReport]: <>5<DemoNextButton /></>,
    [A3_GAME_STATE.FinalReport]: <>6<DemoNextButton /></>,
    [A3_GAME_STATE.EmptyState]: <></>, // this should never be reached
  };

  return <GameContext.Provider value={{
    setState: setState, goNextState: goNextState,
    variableSelection: variableSelection,
    featureWeights: featureWeights,
    targetWeights: targetWeights,
    timeAllocation: timeAllocation,
    setTimeAllocation: setTimeAllocation,
    daysLeft: daysLeft, setDaysLeft: setDaysLeft,
  }}>
    {GAME_ELEMENTS[state]}
  </GameContext.Provider>;
}

export default Game;
