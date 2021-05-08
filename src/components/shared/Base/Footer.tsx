import React from 'react';

import '../../styles/Footer.scss';

import CLLogo from '../../../assets/logos/creative_labs.svg';
import TLALogo from '../../../assets/logos/teach_la.svg';

function Footer(): JSX.Element {
  return (
    <div id="footer">
      <h3>
        Made with ❤️ by
        <a href="https://creativelabsucla.com" target="_blank" rel="noopener noreferrer"><img id="cl-logo" src={CLLogo} /></a>
        {' '}
        +
        <a href="https://teachla.uclaacm.com" target="_blank" rel="noopener noreferrer">
          {' '}
          <img id="tla-logo" src={TLALogo} />
        </a>
      </h3>
      <p id="disclaimer">
        Not sponsored by or affiliated with Youtube or its subsidiaries.
      </p>
    </div>
  );
}

export default Footer;
