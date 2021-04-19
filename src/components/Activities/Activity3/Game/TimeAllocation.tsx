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

  const [tutorialStage, setTutorialStage] = useState(0);
  const TUTORIAL_END = 3;

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

    // skip tutorial if already allocated tasks
    if (sumDaysUsed() !== 0) setTutorialStage(TUTORIAL_END);

    // reset daysLeft to maximum
    setDaysLeft(STARTING_DAYS);
  }, []);

  const handleGoNext = () => {
    // update the new task distribution
    setTimeAllocation(daysAllocation);

    // update the number of remaining days
    setDaysLeft(daysLeft ? (daysLeft - sumDaysUsed()) : 0);
    goNextState();
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

  const displayTutorialText = () => {
    if (tutorialStage === 0) {
      return (
        <p>
          We first have to build the feature by writing code.
          <br/> <br/>
          If we don’t spend enough time writing code, the feature won’t work and may have a lot of bugs (errors).
        </p>
      );
    } else if (tutorialStage === 1) {
      return (
        <p>
          Then, we make sure that our code doesn’t make weird things happen, or have bugs.
          <br/> <br/>
          It may take a bit more time to make sure that everything works as it should!
        </p>
      );
    }

    return (
      <p>
        Finally, we AB test to see how effective our changes were! We  test some users  on our new feature, 
        and see how the users react to it compared with the other users!
        <br/><br/>
        This could be a bit random, and what the beta testers like may not represent what most people actually like!
      </p>
    );
  };

  return <div id={'time-container'}>
    <div id={'time-overlay'} style={{display: `${tutorialStage === TUTORIAL_END && 'none'}`}}/>
    <div id={'time-tutorial-bubble'}
      style={{
        display: `${(tutorialStage === 0) ? '' : 'none'}`,
        alignSelf: 'flex-start',
      }}>
      {displayTutorialText()}
      <button className='playnet-button' style={{zIndex: 50}} onClick={() => {setTutorialStage(tutorialStage+1);}}>Continue</button>
    </div>
    <div id={'time-tutorial-bubble'}
      style={{
        display: `${(tutorialStage === 1) ? '' : 'none'}`,
      }}>
      {displayTutorialText()}
      <button className='playnet-button' style={{zIndex: 50}} onClick={() => {setTutorialStage(tutorialStage+1);}}>Continue</button>
    </div>
    <div id={'time-tutorial-bubble'}
      style={{
        display: `${(tutorialStage === 2) ? '' : 'none'}`,
        alignSelf: 'flex-end',
      }}>
      {displayTutorialText()}
      <button className='playnet-button' style={{zIndex: 50}} onClick={() => {setTutorialStage(tutorialStage+1);}}>Continue</button>
    </div>
    Choose how much time to spend on each part of your project.
    <br/>
    (We recommend {LOW_DAY_THRESHOLD} - {HIGH_DAY_THRESHOLD} days total!)
    <div id={'options-grid'} className={'disableBlur'}>
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
    <button className='playnet-button' style={{ width: '50%' }} onClick={handleGoNext}>Continue</button>
  </div>;
}
export default TimeAllocation;
