import React from 'react';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';
import './styles/Feedback.scss';

function Feedback(): JSX.Element {
  return (
    <Base section={HeaderSections.FEEDBACK}>
      <div id={'feedback-container'}>
        <h2>Feedback</h2>
        <p>
          So that’s a very simple overview as to how Youtube works!
          <br/>
          If you liked the problems in that space, maybe you’d like computer science :)
          <br/>
          <br/>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfpCmyRZ7Ilrg263iYYiXLaM8UWX7iK9aSuVl0_u8mguvxgiA/viewform?usp=sf_link"
            className='game-intro-button' target='_blank' rel='noreferrer'>
            Got any feedback? We’d love to improve!
          </a>
        </p>
      </div>
    </Base>
  );
}

export default Feedback;