import React, { useState } from 'react';

import './styles/YouTube.scss';

import Computer from '../assets/computer.svg'
import ChillPic from '../assets/chill_girl.jpg';

function YouTube(props: YouTubeProps): JSX.Element {
    const [ chosenVideo] = useState(0);

    return(
        <div id={"youtube-wrapper"}>
            <img src={Computer} alt={"A basic image of a desktop monitor"} />
            <div id={'youtube-searchbar'}>Search</div>
            <div id={"youtube-content"}>
                <div className={"youtube-video"}>
                    <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                    <h1>LoFi hip hop to study to</h1>
                </div>
                <div className={"youtube-video"}>
                    <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                    <h1>LoFi hip hop to study to</h1>
                </div>
                <div className={"youtube-video"}>
                    <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                    <h1>LoFi hip hop to study to</h1>
                </div>
                <div className={"youtube-video"}>
                    <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                    <h1>LoFi hip hop to study to</h1>
                </div>
            </div>
        </div>
    )
}
export default YouTube;