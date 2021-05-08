import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/YouTube.scss';

import baby_shark from '../../assets/baby_shark.jpg';
import chill_girl from '../../assets/chill_girl.jpg';
import nether_portal from '../../assets/nether_portal.jpg';
import { VideoChoices, VideoInfo } from '../shared/PlaynetConstants';

interface IntroYouTubeProps {
  setChosenVideo: (chosenVideo: VideoChoices) => void;
}

function IntroYouTube(props: IntroYouTubeProps): JSX.Element {
  const VIDEOS = {
    [VideoChoices.CHILL_GIRL]: {
      alt: 'Image of a girl with headphones on studying',
      text: 'LoFi hip hop to study to',
      src: chill_girl,
    },
    [VideoChoices.BABY_SHARK]: {
      alt: 'Image of two children and a shark dancing',
      text: 'Baby Shark',
      src: baby_shark,
    },
    [VideoChoices.NETHER_PORTAL]: {
      alt: 'Image of a girl with headphones on studying',
      text: 'How to play Minecraft',
      src: nether_portal,
    },
  };

  return (
    <div id="intro-wrapper">
      <h1 id="intro-title">Want to learn how YouTube works?</h1>
      <p id="intro-subtitle">Choose a video below and we will show you!</p>
      <div id="youtube-computer">
        <div id="youtube-wrapper">
          {
            Object.entries(VIDEOS).map(([key, value], i) => (
              <button onClick={() => props.setChosenVideo(key as VideoChoices)} className="youtube-video" key={i}>
                <img className="youtube-thumbnail" src={value.src} alt={value.alt} />
                <p>{value.text}</p>
              </button>
            ))
          }
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
    <div id="intro-wrapper">
      <h1 id="intro-title" style={{ marginTop: 0 }}>Yay! Your video is ready to be watched!</h1>
      <button className="playnet-button">
        <Link to="/activities">Now find out what&apos;s going on behind the scenes!</Link>
      </button>
      <div id="youtube-computer">
        <iframe id="youtube-final-video" src={`${VideoInfo[props.chosenVideo].url}?autoplay=1&mute=1`} />
      </div>
    </div>
  );
}
export { IntroYouTube, FinalYouTube };
