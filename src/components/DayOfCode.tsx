import React from 'react';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';
import './styles/Feedback.scss';

function DayOfCode(): JSX.Element {
  const link_to_checklist = 'http://links.uclaacm.com/dayofcodepassport';
  return (
    <Base section={HeaderSections.DAY_OF_CODE}>
      <div id={'feedback-container'}>
        <p>
          The code for this event is:
          <h1><i>C O D I N G</i></h1>
          <a href={link_to_checklist} className='playnet-button' id='feedback-link'  target='_blank' rel='noreferrer'>Add it to your passport!</a>
          <br />
          <br />
          <a href={link_to_checklist} style={{textDecoration: 'underline'}} target='_blank' rel='noreferrer'>{link_to_checklist}</a>!
          <br/>
        </p>
      </div>
    </Base>
  );
}

export default DayOfCode;
