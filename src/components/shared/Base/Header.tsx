import React from 'react';

import '../../styles/Base.scss';

import { Link } from 'react-router-dom';
import { HeaderSections } from '../PlaynetConstants';


export interface HeaderProps {
  section: HeaderSections,
}
function Header(props: HeaderProps): JSX.Element {
  return (
    <div>
      <nav>
        <div
          id="textSpan"
          style={(props.section === HeaderSections.INTRO) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
        >
          <Link to="/">Home</Link>
        </div>
        <div
          id="textSpan"
          style={(props.section === HeaderSections.ACTIVITIES) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
        >
          <Link to="/activities">Activities</Link>
        </div>
        <div
          id="textSpan"
          style={(props.section === HeaderSections.FEEDBACK) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
        >
          <Link to="/feedback">Feedback</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;