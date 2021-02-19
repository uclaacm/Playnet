import React from 'react';

import LargeTextBubbleSvg from '../../../assets/activity1/text_bubbles/large_text_bubble.svg';
import MediumTextBubbleSvg from '../../../assets/activity1/text_bubbles/medium_text_bubble.svg';
import SmallLeftTextBubbleSvg from '../../../assets/activity1/text_bubbles/small_left_text_bubble.svg';
import SmallRightTextBubbleSvg from '../../../assets/activity1/text_bubbles/small_right_text_bubble.svg';
import ExtraLargeTextBubbleSvg from '../../../assets/activity1/text_bubbles/xl_text_bubble.svg';

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
    <div className='text-bubble'>
      {/* <img src = {} /> */}
      {(props.textBubbleStyle === TextBubbleStyles.EXTRA_LARGE) ? <img src={ExtraLargeTextBubbleSvg} />: <span></span>}
      {(props.textBubbleStyle === TextBubbleStyles.LARGE) ? <img src={LargeTextBubbleSvg} />: <span></span>}
      {(props.textBubbleStyle === TextBubbleStyles.MEDIUM) ? <img src={MediumTextBubbleSvg} />: <span></span>}
      {(props.textBubbleStyle === TextBubbleStyles.SMALL_LEFT) ? <img src={SmallLeftTextBubbleSvg} />: <span></span>}
      {(props.textBubbleStyle === TextBubbleStyles.SMALL_RIGHT) ? <img src={SmallRightTextBubbleSvg} />: <span></span>}

      {(props.contentSvg !== undefined) ? <img src={props.contentSvg} className='centered'/>: <span></span>}
      {(props.text !== undefined) ? <span className='centered'>{props.text}</span> : <span></span>}
    </div>
  );
}

export default TextBubble;