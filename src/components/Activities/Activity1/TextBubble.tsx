import React from 'react';

import { TextBubbleStyles } from '../../shared/PlaynetConstants';

import '../../styles/TextBubble.scss';

interface TextBubbleProps {
  text?: string;
  contentSvg?: string;   //if broken change back to any
  textBubbleStyle: TextBubbleStyles,
}
function TextBubble(props: TextBubbleProps): JSX.Element {
  // processSvg ()
  return (
    <div id={props.textBubbleStyle} className='text-bubble'>
      {(props.contentSvg !== undefined) ? <img src={props.contentSvg} className='centered'/>: ''}
      {(props.text !== undefined) ? <span className='centered'>{props.text}</span> : ''}
    </div>
  );
}

export default TextBubble;