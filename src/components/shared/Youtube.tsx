import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/YouTube.scss';

const chill_girl_path = '../../assets/chill_girl.jpg';
const baby_shark_path = '../../assets/baby_shark.jpg';
const nether_portal_path = "../../assets/nether_portal.jpg";

import chill_girl from '../../assets/chill_girl.jpg';
import baby_shark from '../../assets/baby_shark.jpg';
import nether_portal from "../../assets/nether_portal.jpg";

function YouTube(props): JSX.Element {
    if (props.chosenVideo == null) {
        return(
            <div id={"intro-wrapper"}>
                <h1 id={"intro-title"}>Want to learn how YouTube works?</h1>
                <p id={"intro-subtitle"}>Choose a video below and we will show you!</p>
                <div id={"computer"}>
                    <div id={"youtube-wrapper"}>
                        <button onClick={() => {props.showNext(true); props.setVideo(chill_girl_path)}} className={"youtube-video"}>
                            <img className={"youtube-thumbnail"} src={chill_girl} alt={"Image of a girl with headphones on studying"} />
                            <p>LoFi hip hop to study to</p>
                        </button>
                        <button onClick={() => {props.showNext(true); props.setVideo(baby_shark_path)}} className={"youtube-video"}>
                            <img className={"youtube-thumbnail"} src={baby_shark} alt={"Image of two children and a shark dancing"} />
                            <p>Baby Shark</p>
                        </button>
                        <button onClick={() => {props.showNext(true); props.setVideo(nether_portal_path) }} className={"youtube-video"}>
                            <img className={"youtube-thumbnail"} src={nether_portal} alt={"Image of a pixelated portal from the popular videogame Minecraft"} />
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
                <h1 id={"intro-title"}>Yay! Your video is ready to be watched!</h1>
                <Link id={"continue-button"} to="/activities">Now find out what's going on behind the scenes!</Link>
                <div id={"computer"}>
                    <iframe  id={"final-video"} src={"https://www.youtube.com/embed/XqZsoesa55w?autoplay=1&mute=1"} />
                </div>
            </div>
        )
    }
}
export default YouTube;