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
}

function Convo(props: ConvoProps): JSX.Element { // to replay convo, set i to 0 and offsetYet to false
  const [i, setI] = useState(0);

  const DisplaySpeechBubbles = () => {
    const bubbleStyle = (props.phrases[i].textBubbleStyle !== undefined)
      ? props.phrases[i].textBubbleStyle : props.textBubbleStyle;

    return (
      <div className="fade" style={{ animationDuration: `${2 / 3 * props.timeBtwnPhrases / 1000}s` }}>
        {(props.phrases[i].isText)
          ? <TextBubble key={i} text={props.phrases[i].text} textBubbleStyle={bubbleStyle} />
          : <TextBubble key={i} contentSvg={props.phrases[i].image} textBubbleStyle={bubbleStyle} />}
      </div>
    );
  };

  useEffect(() => {
    if (i < props.phrases.length - 1) {
      const phraseDisplayTime = (props.phrases[i].timeOnScreen !== undefined)
        ? props.phrases[i].timeOnScreen : props.timeBtwnPhrases;

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
