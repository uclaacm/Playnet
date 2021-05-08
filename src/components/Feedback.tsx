import React from 'react';

import Base from './shared/Base';
import { HeaderSections, FEEDBACK_FORM_URL } from './shared/PlaynetConstants';
import './styles/Feedback.scss';

function Feedback(): JSX.Element {
  return (
    <Base section={HeaderSections.FEEDBACK}>
      <div id="feedback-container">
        <h2>Feedback</h2>
        <p>
          So that’s a very simple overview as to how Youtube works!
          <br />
          If you liked the problems in that space, maybe you’d like computer science :)
          <br />
          <br />
          <button className="playnet-button">
            <a href={FEEDBACK_FORM_URL} target="_blank" rel="noreferrer">Got any feedback? We’d love to improve!</a>
          </button>
        </p>
      </div>
    </Base>
  );
}

export default Feedback;
