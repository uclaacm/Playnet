import React, { useEffect, useState } from 'react';

import './styles/YouTube.scss';

const chill_girl_path = '../assets/chill_girl.jpg';
const baby_pig_path = '../assets/baby_pig.jpg';
const baby_shark_path = '../assets/baby_shark.jpg';
const nether_portal_path = '../assets/nether_portal.jpg';

function YouTube(props): JSX.Element {
    {/*This component is being passed props.chooseVideo function, 
    which it can use to tell the parent which video has been chosen */}
    if (props.chosenVideo == null) {
        return(
            <div id={"intro-wrapper"}>
                <h1 id={"intro-title"}>Want to learn how youtube works?</h1>
                <p id={"intro-subtitle"}>Choose a video below and we will show you!</p>
            <div id={"computer"}>
                <div id={"youtube-wrapper"}>
                    <button onClick={() => { props.showNext(true); props.setVideo(chill_girl_path)}} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={chill_girl_path} alt={"Image of a girl with headphones on studying"} />
                        <p>LoFi hip hop to study to</p>
                    </button>
                    <button onClick={() => { props.showNext(true); props.setVideo(baby_pig_path)}} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={baby_pig_path} alt={"Image of a girl with headphones on studying"} />
                        <p>Baby Monkey Riding on a Pig</p>
                    </button>
                    <button onClick={() => { props.showNext(true); props.setVideo(baby_shark_path)}} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={baby_shark_path} alt={"Image of a girl with headphones on studying"} />
                        <p>Baby Shark</p>
                    </button>
                    <button onClick={() => { props.showNext(true); props.setVideo(nether_portal_path) }} className={"youtube-video"}>
                        <img className={"youtube-thumbnail"} src={nether_portal_path} alt={"Image of a girl with headphones on studying"} />
                        <p>How to play Minecraft</p>
                    </button>
                </div>
                
            </div>
            </div>
        )
    }
    else{
        return(
            <div id={"intro-wrapper"}>
                <h1 id={"intro-title"}>Yay! Your video is ready to watch!</h1>
                <p id={"intro-subtitle"}>Now find out whats going on behind the scenes!</p>
            <div id={"computer"}>
                <div id={ "final-video" }>
                    <img  id={"final-thumbnail"} src={props.chosenVideo} />
                </div>
            </div>
            </div>
        )
    }
}
export default YouTube;