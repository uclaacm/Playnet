import React from 'react';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Feedback(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.FEEDBACK}>
        <h1>Feedback</h1>
      </Base>
    </div>
  );
}

export default Feedback;