import React from 'react';

import { TextBubbleStyles } from '../../shared/PlaynetConstants';

import '../../styles/TextBubble.scss';

interface TextBubbleProps {
  text?: string;
  contentSvg?: string; // if broken change back to any
  textBubbleStyle: TextBubbleStyles,
}
function TextBubble(props: TextBubbleProps): JSX.Element {
  return (
    <div id={props.textBubbleStyle} className="text-bubble">
      <span className="bubble-contents">
        {(props.contentSvg !== undefined)
          && (
            <div className="centered">
              <img src={props.contentSvg} />
            </div>
          )}
        {(props.text !== undefined) && <div className="centered">{props.text}</div>}
      </span>
    </div>
  );
}

export default TextBubble;
