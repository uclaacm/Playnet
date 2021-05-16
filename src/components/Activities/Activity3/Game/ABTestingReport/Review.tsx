import React from 'react';
import Star from '../../../../../assets/activity1/game1/star.svg';
import { random } from '../../../../../utils';
import { VARIABLES } from '../GameConstants';

const reviewer_names = [
  'coolcat139',
  'epicgamerbro',
  '4crunchytuna',
  'awesomenator314',
  'therealpewdiepie',
  'wdgwth2',
  'captainawesome123',
];

const substantialReviews: { [key in VARIABLES]: { [key: number]: string[] } } = {
  [VARIABLES.CREDIBLE]: {
    1: ['omg this is so fake, im never coming back to this site'],
    2: ['wow flat earth?? p fake...'],
    3: ["hm kinda sus if it's true but its ok i guess"],
    4: ['wow ok believable'],
    5: ['Everything is so credible its amazing, i feel like MLA or something'],
  },
  [VARIABLES.POPULAR]: {
    1: ["whats this stupid video... I don't think ANYONE would like it"],
    2: ['man this is so basic and mainstream'],
    3: ['ok i guess the video is meh, seems like something wannabe popular peeps would like'],
    4: ['wow ok no wonder ppl like this'],
    5: ["omg i love this, now i know why it's so popular 🤩🤩"],
  },
  [VARIABLES.RECENT_UPLOAD]: {
    1: ["These videos are literally uploaded during my grandparent's time....."],
    2: ['Wow I feel like these recs are only giving me the new stupid stuff'],
    3: ['ok this is not that unfresh'],
    4: ['fressshhhhhh'],
    5: ['omg this is CLEAN and FRESH 😌'],
  },
  [VARIABLES.SAME_CONTENT]: {
    1: ['OMG NO MORE BABY DOO DOO SHARK AH STOP'],
    2: ['wow freaking youtube just giving me the same things over and over'],
    3: ['meh content, nothing new and cool'],
    4: ['ok..... nice new content'],
    5: ['WOW youtube literally knows exactly when i want to try new things or watch past things'],
  },
  [VARIABLES.SAME_CREATOR]: {
    1: ['ahhhh no more freaking pewdiepie omg'],
    2: ['haaaa youtube thinks i only like marshmello or smthg'],
    3: ['meh content, nothing new and cool'],
    4: ['ok i see you youtube, givin me those fresh creators'],
    5: ['daYuM i am a DISCOVERER of great creators 😍😍😍'],
  },
  [VARIABLES.SUBSCRIBED]: {
    1: ['bruh this is trash, i know im subscribed but like gimme something new..'],
    2: ['haaaa youtube doesn\'t even know what im subscribed to or something'],
    3: ['meh ig could should me more cool things but i guess my subs are good too'],
    4: ['okay this is why i use youtube, it knows my subscriptions 😎'],
    5: ['LOVE this, this is why i subscribe 🌟'],
  },
};

interface ReviewProps {
  stars: number;
  noText?: boolean;
  variable?: VARIABLES;
}

function Review(props: ReviewProps): JSX.Element {
  const { noText, stars, variable } = props;
  const star = Array(5).fill(undefined).map((_v, i) => i < stars ? true : false);
  return (
    <div>
      {variable && !noText && <p>{random(reviewer_names)}: {
        random(substantialReviews[variable][stars])
      }</p>}
      <div className={'stars'}>
        {Array(5).fill(false).map((_v, i) =>
          <img key={i} src={Star} style={star[i] ? {} : { filter: 'grayscale(100%)' }} />,
        )}
      </div>
    </div>
  );
}

export default Review;