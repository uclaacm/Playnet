import React, { useState } from 'react';

import './styles/YouTube.scss';

import Computer from '../assets/computer.svg'
import ChillPic from '../assets/chill_girl.jpg';

function YouTube(props: YouTubeProps): JSX.Element {
    const [ chosenVideo] = useState(0);

    return(
    <div id={"computer-wrapper"}>
        <img id={"computer"} src={Computer} />
        <div id={"youtube-wrapper"}>
            <div className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </div>
            <div className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </div>
            <div className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </div>
        </div>
        
    </div>
    )
}
export default YouTube;