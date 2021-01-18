import React from 'react';

import './styles/App.scss';

import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Home(): JSX.Element {
  return (
    <div>
      <Base section={HeaderSections.intro}>
        <h1>Home</h1>
      </Base>
    </div>
  );
}

export default Home;