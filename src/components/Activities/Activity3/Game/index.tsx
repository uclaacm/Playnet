import React, { useContext, useEffect, useState } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import { useStateCallback } from '../../../shared/hooks';
import DemoNextButton from './DemoNextButton';
import { A3_GAME_STATE, NEXT_STATE_MAP, ONE_TIME_STATES,
  SESSION_CURRENT_STATE, SESSION_SKIP_STATES, SESSION_VARIABLES,
  SESSION_TASKS, VARIABLES } from './GameConstants';
import PriorityChoices from './PriorityChoices';
import TimeAllocation from './TimeAllocation';

interface IGameContext {
  setState: (state: A3_GAME_STATE) => void,
  goNextState: () => void,
  variableSelection: VARIABLES[],
  taskSelection: number[],
  daysLeft: number,
  setDaysLeft: (state: number) => void,
}
export const GameContext = React.createContext<Partial<IGameContext>>({});

function Game(): JSX.Element {
  const { next } = useContext(CarouselContext);
  const [state, setState] = useState<A3_GAME_STATE>(A3_GAME_STATE.EmptyState);
  const [statesToSkip, setStatesToSkip] = useStateCallback<A3_GAME_STATE[]>([]);
  const [daysLeft, setDaysLeft] = useState<number>(30);
  const [variableSelection, setVariableSelection] = useState<VARIABLES[]>([]);
  const [taskSelection, setTaskSelection] = useState<number[]>([]);
  const storage = window.sessionStorage;

  useEffect(() => {
    // onMount, get state + skipStates from storage
    const storedSkipStates = storage.getItem(SESSION_SKIP_STATES);
    const storedState = storage.getItem(SESSION_CURRENT_STATE);
    const storedVariables = storage.getItem(SESSION_VARIABLES);
    const storedTasks = storage.getItem(SESSION_TASKS);

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
    const tempTasks : number[] = storedTasks ?
      storedTasks.split(',').map((elem) => {
        // elem can be either '' or a number
        return (elem && elem.length > 0) ? parseInt(elem) : 0;
      })
      : [0,0,0];
    setTaskSelection(tempTasks);

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
    // add taskSelection to storage
    storage.setItem(SESSION_TASKS, taskSelection.join(','));
  }, [taskSelection]);

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
    [A3_GAME_STATE.PriorityWeighing]: <>2<DemoNextButton /></>,
    [A3_GAME_STATE.TimeAllocation]:
      <TimeAllocation setTaskSelection={setTaskSelection} initialTasks={taskSelection}/>,
    [A3_GAME_STATE.DebuggingResults]: <>4<DemoNextButton /></>,
    [A3_GAME_STATE.ABTestingExplanation]: <>skip5<DemoNextButton /></>,
    [A3_GAME_STATE.ABTestingReport]: <>5<DemoNextButton /></>,
    [A3_GAME_STATE.FinalReport]: <>6<DemoNextButton /></>,
    [A3_GAME_STATE.EmptyState]: <></>, // this should never be reached
  };

  return <GameContext.Provider value={{
    setState: setState, goNextState: goNextState,
    variableSelection: variableSelection,
    taskSelection: taskSelection,
    daysLeft: daysLeft, setDaysLeft: setDaysLeft,
  }}>
    {GAME_ELEMENTS[state]}
  </GameContext.Provider>;
}

export default Game;