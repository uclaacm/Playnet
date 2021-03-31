import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/YouTube.scss';

import baby_shark from '../../assets/baby_shark.jpg';
import chill_girl from '../../assets/chill_girl.jpg';
import nether_portal from '../../assets/nether_portal.jpg';
import { VideoChoices, VideoLinks } from '../shared/PlaynetConstants';

interface IntroYouTubeProps {
  setChosenVideo: (chosenVideo: VideoChoices) => void;
}

function IntroYouTube(props: IntroYouTubeProps): JSX.Element {
  function youtubeButton(videoPath: VideoChoices) {
    props.setChosenVideo(videoPath);
  }
  return (
    <div id={'intro-wrapper'}>
      <h1 id={'intro-title'}>Want to learn how YouTube works?</h1>
      <p id={'intro-subtitle'}>Choose a video below and we will show you!</p>
      <div id={'youtube-computer'}>
        <div id={'youtube-wrapper'}>
          <button onClick={() => youtubeButton(VideoChoices.CHILL_GIRL)} className={'youtube-video'}>
            <img className={'youtube-thumbnail'} src={chill_girl} alt={'Image of a girl with headphones on studying'} />
            <p>LoFi hip hop to study to</p>
          </button>
          <button onClick={() => youtubeButton(VideoChoices.BABY_SHARK)} className={'youtube-video'}>
            <img className={'youtube-thumbnail'} src={baby_shark} alt={'Image of two children and a shark dancing'} />
            <p>Baby Shark</p>
          </button>
          <button onClick={() => youtubeButton(VideoChoices.NETHER_PORTAL)} className={'youtube-video'}>
            <img className={'youtube-thumbnail'} src={nether_portal} alt={'Image of a pixelated portal from the popular videogame Minecraft'} />
            <p>How to play Minecraft</p>
          </button>
        </div>
      </div>
    </div>
  );
}

interface FinalYouTubeProps {
  chosenVideo: VideoChoices;
}
function FinalYouTube(props: FinalYouTubeProps): JSX.Element {
  return (
    <div id={'intro-wrapper'}>
      <h1 id={'intro-title'} style={{ marginTop: 0 }}>Yay! Your video is ready to be watched!</h1>
      <Link id={'continue-button'} to="/activities">Now find out what&apos;s going on behind the scenes!</Link>
      <div id={'youtube-computer'}>
        <iframe id={'youtube-final-video'} src={`${VideoLinks[props.chosenVideo]}?autoplay=1&mute=1`} />
      </div>
    </div>
  );
}
export { IntroYouTube, FinalYouTube };