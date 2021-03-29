import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/YouTube.scss';

import baby_shark from '../../assets/baby_shark.jpg';
import chill_girl from '../../assets/chill_girl.jpg';
import nether_portal from '../../assets/nether_portal.jpg';

const CHILL_GIRL_URL = 'https://www.youtube.com/embed/-FlxM_0S2lA?autoplay=1&mute=1';
const BABY_SHARK_URL = 'https://www.youtube.com/embed/XqZsoesa55w?autoplay=1&mute=1';
const NETHER_PORTAL_URL = 'https://www.youtube.com/embed/h27ugp3gzWI?autoplay=1&mute=1';

interface YouTubeProps {
  chosenVideoPath: null|string;
  setChosenVideoPath: (chosenVideoPath: string|null) => void;
  showCarousel: () => void;
}

function YouTube(props: YouTubeProps): JSX.Element {
  function youtubeButton(videoPath: string|null) {
    props.showCarousel();
    props.setChosenVideoPath(videoPath);
  }
  if (!props.chosenVideoPath) {
    return (
      <div id={'intro-wrapper'}>
        <h1 id={'intro-title'}>Want to learn how YouTube works?</h1>
        <p id={'intro-subtitle'}>Choose a video below and we will show you!</p>
        <div id={'youtube-computer'}>
          <div id={'youtube-wrapper'}>
            <button onClick={() => youtubeButton(CHILL_GIRL_URL)} className={'youtube-video'}>
              <img className={'youtube-thumbnail'} src={chill_girl} alt={'Image of a girl with headphones on studying'} />
              <p>LoFi hip hop to study to</p>
            </button>
            <button onClick={() => youtubeButton(BABY_SHARK_URL)} className={'youtube-video'}>
              <img className={'youtube-thumbnail'} src={baby_shark} alt={'Image of two children and a shark dancing'} />
              <p>Baby Shark</p>
            </button>
            <button onClick={() => youtubeButton(NETHER_PORTAL_URL)} className={'youtube-video'}>
              <img className={'youtube-thumbnail'} src={nether_portal} alt={'Image of a pixelated portal from the popular videogame Minecraft'} />
              <p>How to play Minecraft</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div id={'intro-wrapper'}>
        <h1 id={'intro-title'}>Yay! Your video is ready to be watched!</h1>
        <Link id={'continue-button'} to="/activities">Now find out what&apos;s going on behind the scenes!</Link>
        <div id={'youtube-computer'}>
          <iframe id={'youtube-final-video'} src={props.chosenVideoPath} />
        </div>
      </div>
    );
  }
}
export default YouTube;