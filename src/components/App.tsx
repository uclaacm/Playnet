import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './styles/App.scss';

import Activities from './Activities';
import Feedback from './Feedback';
import Home from './Home';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        <div>
          {/* A <Switch> looks through its children Routes and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/activities">
              <Activities />
            </Route>
            <Route path="/feedback">
              <Feedback />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;