import React from 'react';
import Star from '../../../../../assets/activity1/game1/star.svg';
import { random } from '../../../../../utils';
import { VARIABLES, VARIABLE_CONTENT } from '../GameConstants';

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
    'mlegh ew!',
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
};

const substantialReviews = {// : {[key in VARIABLES]: string[]} = {
  [VARIABLES.CREDIBLE]: {
    1: ["omg this is so fake, im never coming back to this site"],
    2: ["wow flat earth?? p fake..."],
    3: ["hm kinda sus if it's true but its ok i guess"],
    4: ["wow ok believable"],
    5: ["Everything is so credible its amazing, i feel like MLA or something"],
  },
  [VARIABLES.POPULAR]: {
    1: ["whats this stupid video... I don't think ANYONE would like it"],
    2: ["man this is so basic and mainstream"],
    3: ["ok i guess the video is meh, seems like something wannabe popular peeps would like"],
    4: ["wow ok no wonder ppl like this"],
    5: ["omg i love this, now i know why it's so popular"],
  },
  [VARIABLES.RECENT_UPLOAD]: {
    1: ["These videos are literally uploaded during my grandparent's time....."],
    2: ["Wow I feel like these recs are only giving me the new stupid stuff"],
    3: ["ok this is not that unfresh"],
    4: ["fressshhhhhh"],
    5: ["omg this is CLEAN and FRESH"],
  },
  [VARIABLES.SAME_CONTENT]: {
    1: ["OMG NO MORE BABY DOO DOO SHARK AH STOP"],
    2: ["wow freaking youtube just giving me the same things over and over"],
    3: [""], // TODO: ADD MORE
    4: ["fressshhhhhh"],
    5: ["omg this is CLEAN and FRESH"],
  }
};

interface ReviewProps {
  stars: number;
  noText?: boolean;
}

function Review(props: ReviewProps): JSX.Element {
  const {noText, stars} = props;
  const star = Array(5).fill(undefined).map((_v, i) => i < stars ? true : false);
  return (
    <div>
      {!noText && <p>{random(reviewer_names)}: {random(reviews[props.stars])}</p>}
      <div className={'stars'}>
        {Array(5).fill(false).map((_v, i) =>
          <img key={i} src={Star} style={star[i] ? {} : {filter: 'grayscale(100%)'}}/>,
        )}
      </div>
    </div>
  );
}

export default Review;