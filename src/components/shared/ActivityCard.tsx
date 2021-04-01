import React from 'react';
import { capitalize } from '../../utils';

export interface ActivityCardProps {
  id: string;
  description: string;
  disableHover?: boolean;
}

function ActivityCard(props: ActivityCardProps): JSX.Element {
  const {id, description} = props;
  const title = id.split('-').map((word) => capitalize(word)).join(' ');
  const activityCardStyle = (props.disableHover !== undefined && props.disableHover === true) ? 'activity-card no-hover' : 'activity-card';
  return (
    <div className={activityCardStyle}>
      <div id={id} className={'activity-splash'}/>
      <div className={'content'}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ActivityCard;