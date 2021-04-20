import React from 'react';
import Star from '../../../../../assets/activity1/game1/star.svg';
import { random } from '../../../../../utils';

const reviewer_names = [
  'coolcat139',
  'epicgamerbro',
  '4crunchytuna',
  'awesomenator314',
  'therealpewdiepie',
  'wdgwth2',
  'captainawesome123',
];

const reviews: {[key: number]: string[]} = {
  1: [
    'I hate this feature! It crashes all the time!',
    'It takes too long to load :(',
    '😡😡',
    'Sad face',
  ],
  2: [
    'I don’t want to see the same content over and over!',
    'honestly, i could do a better job at this',
    'marginally better than nyan cat',
    'boooooring',
  ],
  3: [
    'meh',
    'honestly, pretty meh',
    'meh meh meh',
    'average amount of meh',
  ],
  4: [
    'this is pretty cool!',
    'wow ur so talented!',
    'adopt me',
    'this makes me so happy 😌😌',
    'oof this makes me soft',
  ],
  5: [
    'Best video ever!',
    '🤩🤩🤩',
    'I watched this on repeat for 4 hours',
    'I wish I could do this',
    'Love this content 😍😍',
  ],
}

interface ReviewProps {
  stars: number;
}

function Review(props: ReviewProps): JSX.Element {
  const {stars} = props;
  const star = Array(5).fill(undefined).map((_v, i) => i < stars ? true : false);
  return (
    <div>
      <p>{random(reviewer_names)}: {random(reviews[props.stars])}</p>
      <div className={'stars'}>
        {Array(5).fill(false).map((_v, i) => 
          <img src={Star} style={star[i] ? {} : {filter: 'grayscale(100%)'}}/>
        )}
      </div>
    </div>
  );
}

export default Review;