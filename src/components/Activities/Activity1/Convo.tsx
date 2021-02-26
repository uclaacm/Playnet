import React, { useState, useEffect } from 'react';

import '../../styles/Activity1.scss';
import { TextBubbleStyles } from '../../shared/PlaynetConstants';
import TextBubble from './TextBubble';

interface ConvoProps {
  phrases: string[],
  textBubbleStyle: TextBubbleStyles,
  delayTime: number,
  offset?: number,
}

function Convo(props: ConvoProps): JSX.Element {  //to replay convo, set i to 0
  const [i, setI] = useState(0);

  const displaySpeechBubbles = (text: string) => {
    if (props.phrases[i] === text) {
      if (i === 0 && props.offset !== undefined && props.phrases[i] === ''){
        return <div key={'blank'} className='hidden'>
          <TextBubble key={i} text={''} textBubbleStyle={props.textBubbleStyle}/>
        </div>;
      }

      return <div className='fade' style={{animationDuration: 2/3*props.delayTime/1000+'s'}}>
        {(props.phrases[i].indexOf('.svg') === -1) ?
          <TextBubble key={i} text={props.phrases[i]} textBubbleStyle={props.textBubbleStyle}/> :
          <TextBubble key={i} contentSvg={props.phrases[i]} textBubbleStyle={props.textBubbleStyle}/>
        }
      </div>;
    }
    return <div key={text}></div>;
  };

  useEffect(() => {
    if (i === 0 && props.offset !== undefined && props.phrases[i] === '')
    {
      setTimeout(() => setI(i + 1), props.offset);
    } else if (i < props.phrases.length-1) {
      setTimeout(() => setI(i + 1), props.delayTime);
    }
  });

  return (
    <div>
      {props.phrases.map(displaySpeechBubbles)}
      {/* <Anime delay={anime.stagger(100)}
         scale={[.1, .9]}>
        <div className="blue">Hello</div>
        <div className="green"> World</div>
        <div className="red">!!!</div>
      </Anime>  */}
    </div>
  );
}

export default Convo;