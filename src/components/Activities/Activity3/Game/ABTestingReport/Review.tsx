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

export enum weightDifference {
  low,
  high,
  good,
}

type singleRatingReview = { [key in weightDifference]: [string, string, string, ...]} 
// type singleRatingReview = { [key in weightDifference]: string[]} 
  // change to second line before pushing to main
const defaultRatingReview : singleRatingReview = {
  [weightDifference.low]: [],
  [weightDifference.high]: [],
  [weightDifference.good]: [],
};

const substantialReviews: { [key in VARIABLES]: { [key: number]: singleRatingReview} } = {
  [VARIABLES.CREDIBLE]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['omg this is so fake, im never coming back to this site 😬',
        'ALKSJDLKJFLKEJKLFJLKEEFS 5 minute videos FAKE', 
        'lmao santa isnt real checkmate youtube'],
      [weightDifference.high]: ['these are all boring documentaries, they care too much about credibility 😤😤',
        'BORING AH PLS CYAAAAAA',
        'pls gimme something spicy 🌶️🌶️ sigh this sucks'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ["hm kinda sus if it's true but its ok i guess 🧐🧐", 
      'daily mail is 😩', 
      'free 100000 vbucks hmm seems pretty sketch'],
      [weightDifference.high]: ['this is too credible and boring, I want to see something more interesting and controverial 😖',
        'meh meh meh 😴 entertain me pls', 
        'eh these r alright but kinda basic'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['Everything is so credible its amazing, i feel like MLA or something',
        'wow ok believable :0', 
        'wowwww i feel enlightened'],
    },
  },
  [VARIABLES.POPULAR]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ["whats this stupid video 😡... I don't think ANYONE would like it",
        'I AM BORE MLEM', 
        'only 5 views but 1337 dislikes 0_0'],
      [weightDifference.high]: ['man this is so basic and mainstream... im out 😩',
        'i am in pain :(((((((( i would go to tik tok if i want something this basic',
        'BAISC AF'
        ],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['why would i watch this if nobody else likes it 😑😑', 
      'i used to like this stuff but now its kinda lame',
      '7 views??? boosted af'],
      [weightDifference.high]: ['ok i guess the video is meh, seems like something wannabe popular peeps would like 🥴',
        'meh maybe kool kids would like, but im not a kool kid :\')',
        '🎵 you think youre cooler than me 🎵'
      ],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['wow ok, goat, no wonder ppl like this',
        "omg i love this, now i know why it's so popular 🤩🤩", 
        'these vids be hype af'],
    },
  },
  [VARIABLES.RECENT_UPLOAD]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ["These videos were literally uploaded during my grandparent's time.....😴", 
      'lmao where r all these 10 yr old vids coming from',
      'dude yt ????? 👿👿👿 1990??? i didnt even know yt was a thing back then'],
      [weightDifference.high]: ['Wow I feel like these recs are only giving me the new stupid stuff 😥😥',
      'holy why u givin me only uploaded 2 min ago......................',
      'wtf are my recs holy literally sort by upload or something 🙁'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['ok this is not that unfresh 🙃🙃', 
      'ig this looks kinda cool n new',
      'wow dying is la is like 3 yrs old now 🤓 omg im old'
    ],
      [weightDifference.high]: ['gimme some oldies pls 🥺', 
      'kinda missing the old days rn',
      'erm id go to like tiktok if like i wanted to see daily content😪😪'
    ],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['fressshhhhhh', 
      'omg this is CLEAN and FRESH 😌',  
      'first comment hehe', 
      'here from yt recommended 😎'],
    },
  },
  [VARIABLES.SAME_CONTENT]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['does yt even care about giving me the same content that i like?? 😕😕',
        'bruh do you even keep history lol',
        'why does yt steal all my data and literally still have 🗑️🗑️🗑️TRASH recs'],
      [weightDifference.high]: ['OMG NO MORE BABY DOO DOO SHARK AH STOP 🤬', 
      'i meannnn i like fortnite but like TOO MUCH FORTNITE',
      'ummmmm did i like switch on autorepeat or something????? 😩😩'],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['hi youtube can you consider what i like more', 
        ':( notice me pls senpai',
      ],
      [weightDifference.high]: ['wow freaking youtube just giving me the same things over and over 😫', 
      'stuffs starting to feel a bit samey',
      'ah i literally watched this vid like 2 weeks ago'
    ],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['WOW youtube literally knows exactly when i want to try new things or watch past things',
        'GODLY balance of new and old content everytime 😎😎',
        'ahhh recs are literally like omg no one except you knows me this well',
        'high key youtube is bae 🥺'],
    },
  },
  [VARIABLES.SAME_CREATOR]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['OMG why dont i see the new dude perfect videos?? i\'ve watched every other one! 🧐🤨',
        'bro wheres my slice and rice.... yt i can literally do a better job than u',
        'holy what are these random creators?? boosted af holy 😡'
      ],
      [weightDifference.high]: ['ahhhh no more freaking pewdiepie BLEB MMF 🥴',
        'OMG so aggro i literally lke watch this guy once and now my recs are FLOODED AF 😡',
        'YT PLS TAKE IT AWAY FROM MY RECS LIKE I WATCHED ONE WIRED VID AND NOW IT WONT LEAVE 😭😭😭 painnnn'
    ],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['why is yt giving me art vids, i wanna see bae masterchef 🥺🥺', 
        'i literally only watch aimer music vids but like it be giving me 5 minute physics?? like hello???',
        'tectone only... wtf is like buzzfeed?? how/why do you think id liek that??'
    ],
      [weightDifference.high]: ['haaaa youtube thinks i only like marshmello or smthg 🤦🏽‍♀️'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['daYuM i am a DISCOVERER of great creators 😍😍😍',
        'ok i see you youtube, givin me those fresh creators',
        'omg whoever made this--marry me pls 🥺'],
    },
  },
  [VARIABLES.SUBSCRIBED]: {
    1: {
      ...defaultRatingReview,
      [weightDifference.low]: ['haaaa youtube doesn\'t even know what im subscribed to or something 🤢🤢',
        'yo do u even like why do i even subscribe if like yt literally just ignores it',
        'yoooooooo im literally only subbed to anna akana and like who are these randos... yt you are canceled 🤦🏻🤦🏼🤦🏽'
      ],
      [weightDifference.high]: ['bruh this is trash, i know im subscribed but like gimme something new.. 🤔🤔',
        'when you only subbed to one channel so now literally you cant find anything else... this is why i use tiktok',
        'HI YT do you think u can entertain me with just that one channel im subbed???? ive literally seen this vid liek 7x at this point'
    ],
    },
    2: {
      ...defaultRatingReview,
      [weightDifference.low]: ['why do you think i subscribed to those channels youtube? i want to see their videos! 🤦🏼‍♂️😠'],
      [weightDifference.high]: ['meh ig could should me more cool things but i guess my subs are good too 😶🙃'],
    },
    3: {
      ...defaultRatingReview,
      [weightDifference.good]: ['LOVE this, this is why i subscribe 🌟',
        'okay this is why i use youtube, it knows my subscriptions 😎',
        'uwu yt knows me so well 🥺'],
    },
  },
};

export interface ReviewProps {
  stars: number;
  variableReview?: VariableReview;
  isBugReview?: boolean;
}

export interface VariableReview {
  variable: VARIABLES,
  rating: number,
  weightDifference: weightDifference,
}

function Review(props: ReviewProps): JSX.Element {
  const { stars, variableReview, isBugReview } = props;
  const star = Array(5).fill(undefined).map((_v, i) => i < stars ? true : false);

  const getAVariableReview = (review: VariableReview) : string => {
    const {variable, rating, weightDifference: diff} = review;
    const value = random(substantialReviews[variable][rating][diff]) ??
      random(substantialReviews[variable][rating][weightDifference.good]);
    return value!;
  };

  return (
    <div>
      {variableReview && <p>{random(reviewer_names)}: {
        getAVariableReview(variableReview)
      }
      </p>}
      {isBugReview && <p>{random(reviewer_names)}: {
        random(bugReviews[stars])
      }
      </p>}
      <div className={'stars'}>
        {Array(5).fill(false).map((_v, i) =>
          <img key={i} src={Star} style={star[i] ? {} : { filter: 'grayscale(100%)' }} />,
        )}
      </div>
    </div>
  );
}

export default Review;