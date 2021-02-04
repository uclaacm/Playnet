import React from 'react';

import '../../styles/Footer.scss';

import CLLogo from '../../../assets/logos/creative_labs.svg';
import TLALogo from '../../../assets/logos/teach_la.svg';

function Footer(): JSX.Element {
  return (
    <div id={'footer'}>
      <h2>Made with ❤️ by <img src={CLLogo} /> + <img src={TLALogo} /> acm.teachLA!</h2>
      <p id={'disclaimer'}>
        Not sponsored by or affiliated with Youtube or its subsidiaries.
      </p>
    </div>
  );
}

export default Footer;
