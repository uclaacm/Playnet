import React from 'react';
import { capitalize } from '../../utils';

export interface ActivityCardProps {
  id: string;
  description: string;
}

function ActivityCard(props: ActivityCardProps): JSX.Element {
  const {id, description} = props;
  const title = id.split('-').map((word) => capitalize(word)).join(' ');

  return (
    <div className={'activity-card'}>
      <div id={id} className={'activity-splash'}/>
      <div className={'content'}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ActivityCard;