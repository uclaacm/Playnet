import React, { useState, useContext, useEffect} from 'react';
import { GameContext } from '.';

import Clock from '../../../../assets/activity3/game/Clock-big.svg';
import Graph from '../../../../assets/activity3/game/Graph.svg';
import Hammer from '../../../../assets/activity3/game/Hammer.svg';

import { LOW_DAY_THRESHOLD, HIGH_DAY_THRESHOLD } from './GameConstants';
import NumberSelection from './NumberSelection';
import { TimeAllocations } from './typings';

interface TimeAllocationProps {
  initialTimes: TimeAllocations,
  isTutorial: boolean,
}

export const DISPLAY_OPTIONS = [
  { src: Hammer, text: 'Build' },
  { src: Graph, text: 'A/B Test' },
];

function TimeAllocation(props: TimeAllocationProps): JSX.Element {
  const TUTORIAL_END = 3;
  const {daysLeft, setDaysLeft, goNextState, setTimeAllocation} = useContext(GameContext);
  const {isTutorial, initialTimes } = props;
  const [daysAllocation, setDaysAllocation] = useState<TimeAllocations>(initialTimes);
  const [tutorialStage, setTutorialStage] = useState(0);
  const TUTORIAL_STEPS = [
    {
      topText: 'We first have to build the feature by writing code.',
      bottomText: 'If we don’t spend enough time writing code, the feature won’t work and may have a lot of bugs (errors).',
      textPos: 'time-tutorial-right',
      focusId: 0,
    },
    {
      topText: 'Then, we make sure that our code doesn’t make weird things happen, or have bugs.',
      bottomText: 'It may take a bit more time to make sure that everything works as it should!',
      textPos: 'time-tutorial-right',
      focusId: 0,
    },
    {
      topText: 'Finally, we AB test to see how effective our changes were! We test some users on our new feature, and see how the users react to it compared with the other users!',
      bottomText: 'This could be a bit random, and what the beta testers like may not represent what most people actually like!',
      textPos: 'time-tutorial-left',
      focusId: 1,
    },
  ];

  useEffect(() => {
    setTutorialStage(isTutorial ? 0 : TUTORIAL_END);
  }, [isTutorial]);

  const handleGoNext = () => {
    // update the new task distribution
    setTimeAllocation(daysAllocation);

    // update the number of remaining days
    setDaysLeft(daysLeft ? (daysLeft - sumDaysUsed()) : 0);
    goNextState();
  };

  const sumDaysUsed = () : number => {
    return Object.values(daysAllocation).reduce((acc : number, cur : number) => acc + cur);
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

  const isShowWarning = () : boolean => {
    const daysUsed = sumDaysUsed();
    return (daysUsed < LOW_DAY_THRESHOLD || daysUsed > HIGH_DAY_THRESHOLD);
  };

  const advanceTutorial = () => {
    if (tutorialStage === TUTORIAL_END - 1) goNextState(); // skip to the actual timeAllocation slide
    setTutorialStage(tutorialStage+1);
  };

  return <div id={'time-container'} className={isTutorial ? 'enable-blur' : ''}>
    {
      isTutorial && <div id={'time-tutorial-overlay'} className={`${TUTORIAL_STEPS[tutorialStage].textPos} disable-blur`}>
        <div id={'time-tutorial-bubble'}
          className={'disable-blur'}>
          <p>
            {TUTORIAL_STEPS[tutorialStage].topText}
            <br/> <br/>
            {TUTORIAL_STEPS[tutorialStage].bottomText}
          </p>
          <button className='playnet-button' style={{zIndex: 50}} onClick={advanceTutorial}>Continue</button>
        </div>
      </div>
    }
    <div>
      Choose how much time to spend on each part of your project.
      <br/>
      (We recommend {LOW_DAY_THRESHOLD} - {HIGH_DAY_THRESHOLD} days total!)
    </div>
    <div id={'options-grid'} className={'disable-blur'}>
      {Object.entries(daysAllocation).map(([key, curAlloc], index : number) => {
        const usableDays = daysLeft ? (daysLeft - sumDaysUsed() + curAlloc) : 0;
        return (
          <div key={key}
            className={`option-container 
            ${isTutorial && (TUTORIAL_STEPS[tutorialStage].focusId === index ? 'disable-blur highlight-border' : 'enable-blur')}`}>
            <div key={DISPLAY_OPTIONS[index].text}
              className={'centered-box'}>
              <img src={DISPLAY_OPTIONS[index].src} />
              {DISPLAY_OPTIONS[index].text}
            </div>
            <div className={'centered-box'}>
              <NumberSelection daysLeft={usableDays} itemType={key} daysAllocation={daysAllocation}
                setDaysAllocation={setDaysAllocation} showWarning={isShowWarning()}/> days
            </div>
          </div>
        );
      })}
    </div>
    <div className={'centered-box'}>
      <img src={Clock}/>
      Days left: {daysLeft ? (daysLeft - sumDaysUsed()) : 0}
    </div>
    {!isTutorial && getDisplayWarning()}
    <button className='playnet-button' disabled={sumDaysUsed() === 0 && daysLeft != 0} style={{ width: '50%' }} onClick={handleGoNext}>Continue</button>
  </div>;
}
export default TimeAllocation;
