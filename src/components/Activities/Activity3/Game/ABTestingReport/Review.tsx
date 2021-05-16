import React from 'react';
import Star from '../../../../../assets/activity1/game1/star.svg';
import { random } from '../../../../../utils';
import { VARIABLES } from '../GameConstants';

// All the main face emojis (and some others) to make it easier if you want to change something! 
// 😀😃😄😁😆😅😂🤣🥲☺️😊😇🙂🙃😉😌😍🥰😘😋😛😝😜🤪🤨🧐🤓😎🥸🤩🥳😏
// 😒😞😔😟😕🙁☹️😣😖😫😩🥺😢😭😤😠😡🤬🤯😳🥵🥶😱😨😰😥😓🤗🤔🤭🤫🤥
// 😶😐😑😬🙄😯😦😧😮😲🥱😴🤤😪😵🤐🥴🤢🤮🤧😷🤒🤕🤑🤠😈👿🤡💩👻🤖
// 👏👏🏻👏🏼👏🏽👏🏾👏🏾 🤝👍👎
// 🤦‍♀️🤦🏻‍♀️🤦🏽‍♀️🤦🏾‍♀️🤦🏿‍♀️ 🤦‍♂️🤦🏻‍♂️🤦🏼‍♂️🤦🏽‍♂️🤦🏾‍♂️🤦🏿‍♂️ 🤦🤦🏻🤦🏼🤦🏽🤦🏾🤦🏿

const reviewer_names = [
  'coolcat139',
  'epicgamerbro',
  '4crunchytuna',
  'awesomenator314',
  'therealpewdiepie',
  'wdgwth2',
  'captainawesome123',
];

export enum weightDifference {
  low,
  high,
  good,
}

type singleRatingReview = { [key in weightDifference]: string[]}
let defaultRatingReview = {
  [weightDifference.low]: [],
  [weightDifference.high]: [],
  [weightDifference.good]: [],
}

const substantialReviews: { [key in VARIABLES]: { [key: number]: singleRatingReview} } = {
  [VARIABLES.CREDIBLE]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['omg this is so fake, im never coming back to this site 😬'],
      [weightDifference.high]: ['these are all boring documentaries, they care too much about credibility 😤😤'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ["hm kinda sus if it's true but its ok i guess 🧐🧐"],
      [weightDifference.high]: ['this is too credible and boring, I want to see something more interesting and controverial 😖'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['Everything is so credible its amazing, i feel like MLA or something', 'wow ok believable :0'],
    },
  },
  [VARIABLES.POPULAR]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ["whats this stupid video 😡... I don't think ANYONE would like it"],
      [weightDifference.high]: ['man this is so basic and mainstream... im out 😩'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ["why would i watch this if nobody else likes it 😑😑"],
      [weightDifference.high]: ['ok i guess the video is meh, seems like something wannabe popular peeps would like 🥴'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['wow ok, goat, no wonder ppl like this', 
      "omg i love this, now i know why it's so popular 🤩🤩"],
    },
  },
  [VARIABLES.RECENT_UPLOAD]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ["These videos were literally uploaded during my grandparent's time.....😴"],
      [weightDifference.high]: ['Wow I feel like these recs are only giving me the new stupid stuff 😥😥'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['ok this is not that unfresh 🙃🙃'],
      [weightDifference.high]: ['gimme some oldies pls 🥺'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['fressshhhhhh', 'omg this is CLEAN and FRESH 😌'],
    },
  },
  [VARIABLES.SAME_CONTENT]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['does yt even care about giving me the same content that i like?? 😕😕'],
      [weightDifference.high]: ['OMG NO MORE BABY DOO DOO SHARK AH STOP 🤬'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['hi youtube can you consider what i like more :( notice me pls senpai'],
      [weightDifference.high]: ['wow freaking youtube just giving me the same things over and over 😫'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['WOW youtube literally knows exactly when i want to try new things or watch past things', 
      'nice balance of new and old content everytime uwu 😎😎'],
    },
  },
  [VARIABLES.SAME_CREATOR]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['OMG why dont i see the new dude perfect videos?? i\'ve watched every other one! 🧐🤨'],
      [weightDifference.high]: ['ahhhh no more freaking pewdiepie BLEB MMF 🥴'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['meh content, i wanna see bae masterchef 🥺🥺'],
      [weightDifference.high]: ['haaaa youtube thinks i only like marshmello or smthg 🤦🏽‍♀️'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['daYuM i am a DISCOVERER of great creators 😍😍😍', 
      'ok i see you youtube, givin me those fresh creators'],
    },
  },
  [VARIABLES.SUBSCRIBED]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['haaaa youtube doesn\'t even know what im subscribed to or something 🤢🤢'],
      [weightDifference.high]: ['bruh this is trash, i know im subscribed but like gimme something new.. 🤔🤔'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['why do you think i subscribed to those channels youtube? i want to see their videos! 🤦🏼‍♂️😠'],
      [weightDifference.high]: ['meh ig could should me more cool things but i guess my subs are good too 😶🙃'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['LOVE this, this is why i subscribe 🌟', 
      'okay this is why i use youtube, it knows my subscriptions 😎'],
    },
  },
};

interface ReviewProps {
  stars: number;
  variableReview?: VariableReview;
}

export interface VariableReview {
  variable: VARIABLES,
  rating: number,
  weightDifference: weightDifference,
}

function Review(props: ReviewProps): JSX.Element {
  const { stars, variableReview } = props;
  const star = Array(5).fill(undefined).map((_v, i) => i < stars ? true : false);

  const getAReview = (review: VariableReview) : string => {
    const {variable, rating, weightDifference: diff} = review;
    const value = random(substantialReviews[variable][rating][diff]) ?? 
      random(substantialReviews[variable][rating][weightDifference.good]);
    return value!;
  }

  return (
    <div>
      {variableReview && <p>{random(reviewer_names)}: {
       getAReview(variableReview)
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