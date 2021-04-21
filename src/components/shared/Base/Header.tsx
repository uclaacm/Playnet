import React from 'react';

import { Link } from 'react-router-dom';
import PlaynetLogo from '../../../assets/logos/playnet.svg';
import { HeaderSections, TAB_INFO } from '../PlaynetConstants';

import '../../styles/Header.scss';

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
        {
          Object.entries(TAB_INFO).map(([section, { link, text }]) =>
            <span key={section}
              className={'navlink' + ((props.section === section) ? ' current' : '')}
            >
              <Link to={link}>{text}</Link>
            </span>,
          )
        }
      </nav>
    </div>
  );
}

export default Header;
