import React from 'react';

import { Link } from 'react-router-dom';
import { HeaderSections } from '../PlaynetConstants';

import '../../styles/Header.scss';

import PlaynetLogo from '../../../assets/logos/playnet.svg';

export interface HeaderProps {
  section: HeaderSections,
}
function Header(props: HeaderProps): JSX.Element {
  return (
    <div id={'header'}>
      <div id={'logo'}>
        <Link to="/"><h1><img src={PlaynetLogo} /> Playnet</h1></Link>
      </div>
      <nav id={'nav'}>
        <span
          className={'navlink' + ((props.section === HeaderSections.INTRO) ? ' current' : '')}
        >
          <Link to="/">Intro</Link>
        </span>
        <span
          className={'navlink' + ((props.section === HeaderSections.ACTIVITIES) ? ' current' : '')}
        >
          <Link to="/activities">Activities</Link>
        </span>
        <span
          className={'navlink' + ((props.section === HeaderSections.FEEDBACK) ? ' current' : '')}
        >
          <Link to="/feedback">Feedback</Link>
        </span>
      </nav>
    </div>
  );
}

export default Header;
