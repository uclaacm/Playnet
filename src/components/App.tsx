import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './styles/App.scss';

import Activities from './Activities';
import DayOfCode from './DayOfCode';
import Feedback from './Feedback';
import Home from './Home';
import { TAB_INFO } from './shared/PlaynetConstants';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <div>
          {/* A <Switch> looks through its children Routes and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path={TAB_INFO.day_of_code.link}>
              <DayOfCode />
            </Route>
            <Route path={TAB_INFO.activities.link}>
              <Activities />
            </Route>
            <Route path={TAB_INFO.feedback.link}>
              <Feedback />
            </Route>
            <Route path={TAB_INFO.intro.link}>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
