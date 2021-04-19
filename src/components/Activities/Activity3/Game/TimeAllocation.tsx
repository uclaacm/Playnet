import React, { useState, useContext, useEffect} from 'react';
import { GameContext } from '.';

import Clock from '../../../../assets/activity3/game/Clock-big.svg';
import Debug from '../../../../assets/activity3/game/Debug.svg';
import Graph from '../../../../assets/activity3/game/Graph.svg';
import Hammer from '../../../../assets/activity3/game/Hammer.svg';

import { STARTING_DAYS, LOW_DAY_THRESHOLD, HIGH_DAY_THRESHOLD } from './GameConstants';
import NumberSelection from './NumberSelection';

interface TimeAllocationProps {
  setTimeAllocation: (variables: number[]) => void;
  initialTimes: number[];
}

function TimeAllocation(props: TimeAllocationProps): JSX.Element {
  const {daysLeft, setDaysLeft, goNextState} = useContext(GameContext);
  const { initialTimes, setTimeAllocation } = props;
  const [daysAllocation, setDaysAllocation] = useState<number[]>([0,0,0]);

  const DISPLAY_OPTIONS = [
    { src: Hammer, text: 'Build' },
    { src: Debug, text: 'Debug' },
    { src: Graph, text: 'A/B Test' },
  ];

  const displayOptionIcons = () => {
    return DISPLAY_OPTIONS.map((option) => (
      <div key={option.text} className={'centered-box'}>
        <img src={option.src}/>
        {option.text}
      </div>
    ));
  };

  useEffect(() => {
    // reallocate task distribution
    const initAllocation = initialTimes ?? [0,0,0];
    setDaysAllocation(initAllocation);

    // reset daysLeft to maximum
    setDaysLeft && setDaysLeft(STARTING_DAYS);
  }, []);

  const handleGoNext = () => {
    // update the new task distribution
    setTimeAllocation(daysAllocation);

    // update the number of remaining days
    setDaysLeft && setDaysLeft(daysLeft ? (daysLeft - sumDaysUsed()) : 0);
    goNextState && goNextState();
  };

  const sumDaysUsed = () : number => {
    return daysAllocation.reduce((acc : number, cur : number) => acc + cur);
  };

  const getDisplayWarning = (): JSX.Element => {
    const daysUsed = sumDaysUsed();

    if (daysUsed < LOW_DAY_THRESHOLD) {
      return <div className='playnet-red'>
        If you use too little days in this stage, you might <br/> make something that doesn&#39;t work as you expect!
      </div>;
    } else if (daysUsed > HIGH_DAY_THRESHOLD) {
      return <div className='playnet-red'>
        If you use too many days in this stage, you might <br/> not have enough time to make fixes later!
      </div>;
    }
    return <></>;
  };

  // warning color if below or above threshold
  const isShowWarning = () => {
    const daysUsed = sumDaysUsed();
    return (daysUsed < LOW_DAY_THRESHOLD || daysUsed > HIGH_DAY_THRESHOLD);
  };

  return <>
    Choose how much time to spend on each part of your project.
    <br/>
    (We recommend {LOW_DAY_THRESHOLD} - {HIGH_DAY_THRESHOLD} days total!)
    <div id={'options-grid'}>
      {displayOptionIcons()}
      {daysAllocation.map((curAlloc : number, index : number) => {
        const usableDays = daysLeft ? (daysLeft - sumDaysUsed() + curAlloc) : 0;
        return (
          <div key={index} className={'centered-box'}>
            <NumberSelection daysLeft={usableDays} itemType={index}
              daysAllocation={daysAllocation} setDaysAllocation={setDaysAllocation} showWarning={isShowWarning()}/> days
          </div>
        );
      })}
    </div>
    <div className={'centered-box'}>
      <img src={Clock}/>
      Days left: {daysLeft ? (daysLeft - sumDaysUsed()) : 0}
    </div>
    {getDisplayWarning()}
    <button className='playnet-button' onClick={handleGoNext}>Continue</button>
  </>;
}
export default TimeAllocation;
