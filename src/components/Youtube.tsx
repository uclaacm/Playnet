import React, { useEffect, useState } from 'react';

import './styles/YouTube.scss';

import chill_girl from '../assets/chill_girl.jpg';
import baby_pig from '../assets/baby_pig.jpg';
import baby_shark from '../assets/baby_shark.jpg';
import nether_portal from '../assets/nether_portal.jpg';

function YouTube(props: YouTubeProps): JSX.Element {
    {/*This component is being passed props.chooseVideo function, 
    which it can use to tell the parent which video has been chosen */}
    if (props.intro == null) {
        return(
            <div id={"computer-wrapper"}>
                <div id={"youtube-wrapper"}>
                    <button onClick={() => { props.showNext(true); props.setVideo("lofi")}} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={chill_girl} alt={"Image of a girl with headphones on studying"} />
                        <p>LoFi hip hop to study to</p>
                    </button>
                    <button onClick={() => { props.showNext(true); props.setVideo("baby_pig")}} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={baby_pig} alt={"Image of a girl with headphones on studying"} />
                        <p>Baby Monkey Riding on a Pig</p>
                    </button>
                    <button onClick={() => { props.showNext(true); props.setVideo("baby_shark")}} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={baby_shark} alt={"Image of a girl with headphones on studying"} />
                        <p>Baby Shark</p>
                    </button>
                    <button onClick={() => { props.showNext(true); props.setVideo("minecraft") }} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={nether_portal} alt={"Image of a girl with headphones on studying"} />
                        <p>How to play Minecraft</p>
                    </button>
                </div>
                
            </div>
        )
    }
    else{
        return(
            <div id={"computer-wrapper"}>
                <p>Display the final video retrieved from all the server animations</p>
            </div>
        )
    }
}
export default YouTube;