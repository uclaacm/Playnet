import React from 'react';

import './styles/Home.scss';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Home(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.INTRO}>
        <h1>Home</h1>
      </Base>
    </div>
  );
}

export default Home;