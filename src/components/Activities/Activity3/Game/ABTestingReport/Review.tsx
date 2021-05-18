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
const defaultRatingReview = {
  [weightDifference.low]: [],
  [weightDifference.high]: [],
  [weightDifference.good]: [],
};

const bugReviews: {[key: number]: string[]} = {
  1: [
    'I hate this feature! It crashes all the time!',
    'big buggy :(((((((((((((((((((((((',
    '😡😡',
    'Sad face',
  ],
  2: [
    'mmf why it crash',
    'honestly, i could do a better job at this',
    'marginally better than nyan cat',
    'pain 😖',
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


const substantialReviews: { [key in VARIABLES]: { [key: number]: singleRatingReview} } = {
  [VARIABLES.CREDIBLE]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['omg this is so fake, im never coming back to this site 😬',
        'ALKSJDLKJFLKEJKLFJLKEEFS 5 minute videos FAKE', 'lmao santa isnt real checkmate youtube'],
      [weightDifference.high]: ['these are all boring documentaries, they care too much about credibility 😤😤',
        'BORING AH PLS CYAAAAAA'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ["hm kinda sus if it's true but its ok i guess 🧐🧐", 'daily mail is 😩'],
      [weightDifference.high]: ['this is too credible and boring, I want to see something more interesting and controverial 😖',
        'meh meh meh 😴 entertain me pls', 'eh these r alright but kinda basic'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['Everything is so credible its amazing, i feel like MLA or something',
        'wow ok believable :0', 'wowwww i feel enlightened'],
    },
  },
  [VARIABLES.POPULAR]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ["whats this stupid video 😡... I don't think ANYONE would like it",
        'I AM BORE MLEM', 'only 5 views but 1337 dislikes 0_0'],
      [weightDifference.high]: ['man this is so basic and mainstream... im out 😩'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['why would i watch this if nobody else likes it 😑😑'],
      [weightDifference.high]: ['ok i guess the video is meh, seems like something wannabe popular peeps would like 🥴',
        'meh maybe kool kids would like, but im not a kool kid :\')'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['wow ok, goat, no wonder ppl like this',
        "omg i love this, now i know why it's so popular 🤩🤩", 'these vids be hype af'],
    },
  },
  [VARIABLES.RECENT_UPLOAD]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ["These videos were literally uploaded during my grandparent's time.....😴", 'lmao where r all these 10 yr old vids coming from'],
      [weightDifference.high]: ['Wow I feel like these recs are only giving me the new stupid stuff 😥😥'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['ok this is not that unfresh 🙃🙃', 'woah this looks kinda cool n new'],
      [weightDifference.high]: ['gimme some oldies pls 🥺', 'kinda missing the old days rn'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['fressshhhhhh', 'omg this is CLEAN and FRESH 😌', 'first comment hehe'],
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
      [weightDifference.high]: ['wow freaking youtube just giving me the same things over and over 😫', 'stuffs starting to feel a bit samey'],
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
        'okay this is why i use youtube, it knows my subscriptions 😎', 'hey yt recs have gotten p good :0'],
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
  };

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