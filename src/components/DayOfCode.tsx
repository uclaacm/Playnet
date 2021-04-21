import React from 'react';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';
import './styles/Feedback.scss';

function DayOfCode(): JSX.Element {
  const link_to_checklist = 'http://links.uclaacm.com/dayofcodechecklist';
  return (
    <Base section={HeaderSections.DAY_OF_CODE}>
      <div id={'feedback-container'}>
        <p>
          The code for this event is:
          <h1><i>C O D</i></h1>

          <button className='playnet-button'>
            <a href={link_to_checklist} target='_blank' rel='noreferrer'>Add it to your passport!</a>
          </button>
          <br />
          <br />
          <a href={link_to_checklist} style={{textDecoration: 'underline'}} target='_blank' rel='noreferrer'>http://links.uclaacm.com/dayofcodechecklist</a>!
          <br/>
        </p>
      </div>
    </Base>
  );
}

export default DayOfCode;