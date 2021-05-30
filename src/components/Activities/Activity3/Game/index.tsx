import React, { useContext, useEffect, useRef, useState } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import { useStateCallback } from '../../../shared/hooks';
import ABTestingExplanation from './ABTestingExplanation';
import ABTestingReport from './ABTestingReport';
import Graph from './ABTestingReport/Graph';
import DebuggingResults from './DebuggingResults';
import FinalReport from './FinalReport';
import { generateVariableTargetWeights, getABTestingControlGraph, getABTestingProductGraph } from './gameCalculationsUtil';
import {
  A3_GAME_STATE, STATE_ORDERING_LIST, NEXT_STATE_MAP, ONE_TIME_STATES,
  SESSION_CURRENT_STATE, SESSION_SKIP_STATES, SESSION_VARIABLES, SESSION_TIMES, VARIABLES,
  STARTING_DAYS, SESSION_TARGET_WEIGHTS, SESSION_FEATURE_WEIGHTS, DEFAULT_TIME_ALLOCATION, DEFAULT_WEIGHTS,
  GAME_START_POINT, DEFAULT_AB_TEST_GRAPH,
} from './GameConstants';
import { GameIntroSlide2 } from './GameIntroSlides';
import PriorityChoices from './PriorityChoices';
import PriorityExplanation from './PriorityExplanation';
import PriorityWeighing from './PriorityWeighing';
import TimeAllocation from './TimeAllocation';
import { TimeAllocations } from './typings';

interface IGameContext {
  setState: (state: A3_GAME_STATE) => void,
  goNextState: () => void,
  startNewGame: () => void,
  variableSelection: VARIABLES[],
  featureWeights: number[],
  targetWeights: number[],
  timeAllocation: TimeAllocations, // BUILD, ABTEST
  setTimeAllocation: (allocations: TimeAllocations) => void,
  daysLeft: number,
  setDaysLeft: (state: number) => void,
  getABTestingGraph: () => JSX.Element,
}
export const GameContext = React.createContext<IGameContext>({
  setState: (_state: A3_GAME_STATE) => undefined,
  goNextState: () => undefined,
  startNewGame: () => undefined,
  variableSelection: [],
  featureWeights: [],
  targetWeights: [],
  timeAllocation: DEFAULT_TIME_ALLOCATION,
  setTimeAllocation: (_allocations: TimeAllocations) => undefined,
  daysLeft: 0,
  setDaysLeft: (_state: number) => undefined,
  getABTestingGraph: function getABTestingGraph(_isNew?: boolean) { return <></>; },
});

function Game(): JSX.Element {
  const { next } = useContext(CarouselContext);
  const [state, setState] = useState<A3_GAME_STATE>(A3_GAME_STATE.EmptyState);
  const [statesToSkip, setStatesToSkip] = useStateCallback<A3_GAME_STATE[]>([]);
  const [variableSelection, setVariableSelection] = useState<VARIABLES[]>([]);
  const [featureWeights, setFeatureWeights] = useState(DEFAULT_WEIGHTS);
  const [targetWeights, setTargetWeights] = useState<number[]>(DEFAULT_WEIGHTS);
  const [timeAllocation, setTimeAllocation] = useState<TimeAllocations>(DEFAULT_TIME_ALLOCATION);
  const [daysLeft, setDaysLeft] = useState<number>(STARTING_DAYS);
  const ABTestingGraph = useRef<JSX.Element | undefined>(undefined);

  const storage = window.sessionStorage;

  useEffect(() => {
    // onMount, get state + skipStates from storage
    const storedSkipStates = storage.getItem(SESSION_SKIP_STATES);
    const storedState = storage.getItem(SESSION_CURRENT_STATE);
    const storedVariables = storage.getItem(SESSION_VARIABLES);
    const storedTasks = storage.getItem(SESSION_TIMES);
    const storedFeatureWeights = storage.getItem(SESSION_FEATURE_WEIGHTS);
    const storedTargetWeights = storage.getItem(SESSION_TARGET_WEIGHTS);

    // setup statesToSkip from storage
    const tempSkipStates = storedSkipStates?.split(',').map(element => element as A3_GAME_STATE);
    const curSkipStates = tempSkipStates ?? [A3_GAME_STATE.EmptyState];
    setStatesToSkip(curSkipStates, () => {
      // setup state after setting up statesToSkip
      const curState = (storedState) ? (storedState as A3_GAME_STATE) : STATE_ORDERING_LIST[1];
      setState(curState);
    });

    // setup variableSelection from storage
    const tempVariables = storedVariables?.split(',').map(element => element as VARIABLES);
    const curVariables = tempVariables ?? [];
    setVariableSelection(curVariables);

    // setup tasksSelection from storage
    const tempTasks: TimeAllocations = storedTasks ? JSON.parse(storedTasks) : timeAllocation;

    setTimeAllocation(tempTasks);

    // setup featureWeights from storage
    const weights = storedFeatureWeights?.split(',').map(element => parseInt(element));
    const curWeights = weights ?? DEFAULT_WEIGHTS;
    setFeatureWeights(curWeights);

    // setup targetWeights from storage
    const tWeights = storedTargetWeights?.split(',').map(element => parseInt(element));
    const curTWeights = tWeights ?? DEFAULT_WEIGHTS;
    setTargetWeights(curTWeights);

    return () => {
      // storage.removeItem(SESSION_SKIP_STATES);
      storage.removeItem(SESSION_CURRENT_STATE);
      storage.removeItem(SESSION_VARIABLES);
      storage.removeItem(SESSION_TIMES);
      storage.removeItem(SESSION_TARGET_WEIGHTS);
      storage.removeItem(SESSION_FEATURE_WEIGHTS);
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

  const goIntroSlide = () => {
    setState(STATE_ORDERING_LIST[1]);
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
    storage.setItem(SESSION_TIMES, JSON.stringify(timeAllocation));
  }, [timeAllocation]);

  useEffect(() => {
    // add feature weights to storage
    storage.setItem(SESSION_FEATURE_WEIGHTS, featureWeights.join(','));
  }, [featureWeights]);

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
    // remove past game info
    storage.removeItem(SESSION_CURRENT_STATE);
    storage.removeItem(SESSION_VARIABLES);
    storage.removeItem(SESSION_TIMES);
    storage.removeItem(SESSION_TARGET_WEIGHTS);
    storage.removeItem(SESSION_FEATURE_WEIGHTS);

    // generate new targets
    const tempTargetWeights = generateVariableTargetWeights();
    storage.setItem(SESSION_TARGET_WEIGHTS, tempTargetWeights.join(','));
    setTargetWeights(tempTargetWeights);

    // reset daysLeft to maximum
    setDaysLeft(STARTING_DAYS);
    setVariableSelection([]);
    setFeatureWeights(DEFAULT_WEIGHTS);
    setTimeAllocation(DEFAULT_TIME_ALLOCATION);
    ABTestingGraph.current = undefined;

    //reset skip states in case user wants to replay tutorial
    const storedSkipStates = storage.getItem(SESSION_SKIP_STATES);
    const tempSkipStates = storedSkipStates?.split(',').map(element => element as A3_GAME_STATE);
    const curSkipStates = tempSkipStates ?? [A3_GAME_STATE.EmptyState];
    setStatesToSkip(curSkipStates, () => {
      // setup state after setting up statesToSkip
      const curState = STATE_ORDERING_LIST[GAME_START_POINT];
      setState(curState);
    });
  };

  const getABTestingGraph = (isNew?: boolean) => {
    let graph = ABTestingGraph.current;
    if (timeAllocation.abTest === 0) {
      graph = undefined;
    } else if (!graph || isNew) {
      const { xyMap, dxyMap } = getABTestingControlGraph(timeAllocation.abTest);
      const { xyMap: beta_xyMap } = getABTestingProductGraph(
        targetWeights, featureWeights,
        xyMap, dxyMap, timeAllocation,
      );
      graph = <Graph xyMap={xyMap} beta_xyMap={beta_xyMap} />;
    }
    ABTestingGraph.current = graph;
    return graph ?? DEFAULT_AB_TEST_GRAPH;
  };

  const GAME_ELEMENTS: { [key in A3_GAME_STATE]: JSX.Element } = {
    [A3_GAME_STATE.GameIntroSlide2]: <GameIntroSlide2 startNewGame={startNewGame} />,
    [A3_GAME_STATE.PriorityExplanation]: <PriorityExplanation />,
    [A3_GAME_STATE.PriorityChoices]:
      <PriorityChoices setVariableSelection={setVariableSelection} initialVariables={variableSelection} />,
    [A3_GAME_STATE.PriorityWeighing]:
      <PriorityWeighing initialFeatureWeights={featureWeights} setFeatureWeights={setFeatureWeights} />,
    [A3_GAME_STATE.TimeAllocationExplanation]:
      <TimeAllocation initialTimes={timeAllocation} isTutorial={true} />,
    [A3_GAME_STATE.TimeAllocation]:
      <TimeAllocation initialTimes={timeAllocation} isTutorial={false} />,
    [A3_GAME_STATE.DebuggingResults]: <DebuggingResults />,
    [A3_GAME_STATE.ABTestingExplanation]: <ABTestingExplanation />,
    [A3_GAME_STATE.ABTestingReport]: <ABTestingReport />,
    [A3_GAME_STATE.FinalReport]: <FinalReport goIntroSlide={goIntroSlide} />,
    [A3_GAME_STATE.EmptyState]: <></>, // this should never be reached
  };

  return <GameContext.Provider value={{
    setState, goNextState, startNewGame,
    variableSelection,
    featureWeights,
    targetWeights,
    timeAllocation, setTimeAllocation,
    daysLeft, setDaysLeft,
    getABTestingGraph,
  }}>
    {GAME_ELEMENTS[state]}
  </GameContext.Provider>;
}

export default Game;
