import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './components/Home';
import Activities from './components/Activities';
import Feedback from './components/Feedback';

import './global.scss';

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root'),
);
