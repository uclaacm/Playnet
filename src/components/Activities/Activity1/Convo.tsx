import React, { useState, useEffect } from 'react';

import '../../styles/Activity1.scss';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import TextBubble from './TextBubble';

interface Phrase {
  text?: string,
  image?: any,
  isText: boolean,
  timeOnScreen: number,
}

interface ConvoProps {
  // phrases: Phrase[],
  phrases: string[],
  textBubbleStyle: TextBubbleStyles,
  timeBtwnPhrases: number,
  waitTimeBeforeStart?: number,
}

function Convo(props: ConvoProps): JSX.Element {  //to replay convo, set i to 0
  const [i, setI] = useState(0);
  const [offsetYet, setOffSetYet] = useState(false);
  // let offsetYet: boolean = false;
  const DisplaySpeechBubbles = () => {
    if (props.waitTimeBeforeStart !== undefined && !offsetYet) {
      return <div key={'blank'} className='hidden'>
          <TextBubble key={i} text={''} textBubbleStyle={TextBubbleStyles.NONE} />
        </div>;
    }
    return <div className='fade' style={{ animationDuration: 2 / 3 * props.timeBtwnPhrases / 1000 + 's' }}>
      {(props.phrases[i].indexOf('.svg') === -1) ?
        <TextBubble key={i} text={props.phrases[i]} textBubbleStyle={props.textBubbleStyle} /> :
        <TextBubble key={i} contentSvg={props.phrases[i]} textBubbleStyle={props.textBubbleStyle} />
      }
    </div>;
  };

  useEffect(() => {
    if (props.waitTimeBeforeStart !== undefined && !offsetYet) {
      setTimeout(() => setOffSetYet(true), props.waitTimeBeforeStart);
    } else if (i < props.phrases.length - 1) {
      setTimeout(() => setI(i + 1), props.timeBtwnPhrases);
    }
  });

  return (
    <div>
      <DisplaySpeechBubbles />
    </div>
  );
}

export default Convo;