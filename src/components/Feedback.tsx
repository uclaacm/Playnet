import React from 'react';

import './styles/App.scss';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Feedback(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.feedback}>
        <h1>Feedback</h1>
      </Base>
    </div>
  );
}

export default Feedback;