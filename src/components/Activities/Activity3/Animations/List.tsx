import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';
import { CarouselContext } from '../../../shared/Carousel';
import ScalingSlide from '../../../shared/ScalingSlide';

function List(): JSX.Element {
  const { reloadTime } = useContext(CarouselContext);
  const timeline = useRef<AnimeTimelineInstance | null>(null);

  const RECOMMENDATION_PARAMETERS = [
    'Watch History Video Titles',
    'Watch History Channels',
    'Titles',
    'Search History',
    'Subscribed Channels',
    'Country',
    'Time of Day',
    'Previous Videos',
    'Watch Time',
    'Random Feedback',
    'User Video Preferred Tags',
    'User Likes',
    'Watch Session Length',
    'Video Clicks',
    'Preferred Popularity Level',
    'Video Length',
    'Video Popularity',
    'Quality fo Video',
    'Video Feedback',
    'Video Number of Views with respect to Time',
    'Credibility of Video',
    'Video Content',
    'Video Title',
    'Video Tags',
    'Video Creator',
    'Video Variety',
  ];
  const MAPPED_PARAMETERS = RECOMMENDATION_PARAMETERS.map((element) => <p key={element}>{element}</p>);

  useEffect(() => {
    timeline.current = anime.timeline({
      autoplay: false,
    }).add({
      targets: '#animated-list',
      translateY: -2500,
      duration: 2500,
      easing: 'easeInQuad',
    }).add({
      targets: '#animated-list',
      translateY: -4600,
      duration: 2500,
      easing: 'easeOutQuad',
    });
  }, []);

  useEffect(() => {
    timeline.current?.pause();
    timeline.current?.seek(0);
    timeline.current?.play();
  }, [reloadTime]);

  return (
    <ScalingSlide widthPx={1060}>
      <div id="animated-list-box">
        <div id="animated-list">
          {MAPPED_PARAMETERS}
          {MAPPED_PARAMETERS}
          {MAPPED_PARAMETERS}
          {MAPPED_PARAMETERS}
        </div>
      </div>
    </ScalingSlide>
  );
}
export default List;
