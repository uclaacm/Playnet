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
import ActivityCard from './shared/ActivityCard';
import Base from './shared/Base';
import { HeaderSections } from './shared/PlaynetConstants';

import './styles/Activities.scss';

/**
 * The following is a mapping between an activity and its descirption
 */
const ACTIVITES: {[key: string]: string} = {
  'lost-in-translation': 'When you use the search bar, how does YouTube know what you’re looking for?',
  'sending-videos': 'Videos hold a lot of information! How can pages load quickly?',
  'mind-reading': 'Have you ever wondered how YouTube knows what you want to watch next?',
};

interface ActivityHomeProps {
  url: string;
}

function ActivityHome(props: ActivityHomeProps): JSX.Element {
  const { url } = props;
  return (
    <div id={'activity-home'}>
      <h2>Activities</h2>
      <nav id={'activity-card-container'}>
        {Object.keys(ACTIVITES).map((path, i) =>
          <Link to={`${url}/${path}`} key={`activities-card-${i}`}>
            <ActivityCard
              id={path}
              description={ACTIVITES[`${path}`]}/>
          </Link>,
        )}
      </nav>
    </div>
  );
}

function Activities(): JSX.Element {
  const { url, path } = useRouteMatch();
  return (
    <Base section={HeaderSections.ACTIVITIES}>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route exact path={`${path}/lost-in-translation`}>
          <Activity1 />
        </Route>
        <Route exact path={`${path}/sending-videos`}>
          <Activity2 />
        </Route>
        <Route exact path={`${path}/mind-reading`}>
          <Activity3 />
        </Route>
        <Route path="/">
          <ActivityHome url={url} />
        </Route>
      </Switch>
    </Base>
  );
}

export default Activities;
