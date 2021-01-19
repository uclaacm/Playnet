import React from 'react';
import {
  useRouteMatch,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Activity1 from './Activities/Activity1';
import Activity2 from './Activities/Activity2';
import Activity3 from './Activities/Activity3';
import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

function Activities(): JSX.Element {
  const { url, path } = useRouteMatch();
  return (
    <div>
      <Base section={HeaderSections.ACTIVITIES}>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={`${path}/1`}>
            <Activity1 />
          </Route>
          <Route path={`${path}/2`}>
            <Activity2 />
          </Route>
          <Route path={`${path}/3`}>
            <Activity3 />
          </Route>
          <Route path="/">
            <ActivityHome url={url} />
          </Route>
        </Switch>
      </Base>
    </div>
  );
}

function ActivityHome(props: { url: string }): JSX.Element {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`${props.url}/1`}>Activity 1</Link>
          </li>
          <li>
            <Link to={`${props.url}/2`}>Activity 2</Link>
          </li>
          <li>
            <Link to={`${props.url}/3`}>Activity 3</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Activities;