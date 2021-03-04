import React, { useState, useEffect } from 'react';

import '../../styles/Activity1.scss';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import TextBubble from './TextBubble';

interface Phrase {
  text?: string,
  image?: any,
  textBubbleStyle?: TextBubbleStyles,
  isText: boolean,
  timeOnScreen?: number,
}

interface ConvoProps {
  phrases: Phrase[],
  textBubbleStyle: TextBubbleStyles,
  timeBtwnPhrases: number,
  waitTimeBeforeStart?: number,
}

function Convo(props: ConvoProps): JSX.Element {  //to replay convo, set i to 0 and offsetYet to false
  const [i, setI] = useState(0);
  const [offsetYet, setOffSetYet] = useState(false);

  const DisplaySpeechBubbles = () => {
    if (props.waitTimeBeforeStart !== undefined && !offsetYet) {
      return <div key={'blank'} className='hidden'>
        <TextBubble key={i} text={''} textBubbleStyle={TextBubbleStyles.NONE} />
      </div>;
    }

    const bubbleStyle = (props.phrases[i].textBubbleStyle !== undefined) ?
      props.phrases[i].textBubbleStyle : props.textBubbleStyle;

    return <div className='fade' style={{ animationDuration: 2 / 3 * props.timeBtwnPhrases / 1000 + 's' }}>
      {(props.phrases[i].isText) ?
        <TextBubble key={i} text={props.phrases[i].text} textBubbleStyle={bubbleStyle} /> :
        <TextBubble key={i} contentSvg={props.phrases[i].image} textBubbleStyle={bubbleStyle} />
      }
    </div>;
  };

  useEffect(() => {
    if (props.waitTimeBeforeStart !== undefined && !offsetYet) {
      setTimeout(() => setOffSetYet(true), props.waitTimeBeforeStart);
    } else if (i < props.phrases.length - 1) {
      const phraseDisplayTime = (props.phrases[i].timeOnScreen !== undefined) ?
        props.phrases[i].timeOnScreen : props.timeBtwnPhrases;

      setTimeout(() => setI(i + 1), phraseDisplayTime);
    }
  });

  return (
    <div>
      <DisplaySpeechBubbles />
    </div>
  );
}

export default Convo;
export {
  Phrase,
};
