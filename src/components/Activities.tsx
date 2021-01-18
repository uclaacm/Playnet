import React from 'react';
import {
  Switch,
  Route,
  Link,
} from "react-router-dom";

import './styles/App.scss';

import Base from './shared/Base';
import Activity1 from './Activities/Activity1';
import Activity2 from './Activities/Activity2';
import Activity3 from './Activities/Activity3';
import { HeaderSections } from './shared/PlaynetConstants';

function Activities() {
  return (
    <div>
      <Base section = {HeaderSections.activities}>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/activities/1">
            <Activity1 />
          </Route>
          <Route path="/activities/2">
            <Activity2 />
          </Route>          
          <Route path="/activities/3">
            <Activity3 />
          </Route>
          <Route path="/">
            <ActivityHome />
          </Route>
        </Switch>      
      </Base>
    </div>
  );
}

function ActivityHome() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/activities/1">Activity 1</Link>
          </li>
          <li>
            <Link to="/activities/2">Activity 2</Link>
          </li>
          <li>
            <Link to="/activities/3">Activity 3</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Activities;