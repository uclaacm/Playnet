import React, { useEffect, useState } from 'react';

import './styles/YouTube.scss';

import Computer from '../assets/computer.svg'
import ChillPic from '../assets/chill_girl.jpg';



function YouTube(props: YouTubeProps): JSX.Element {
    {/*This component is being passed props.chooseVideo function, 
    which it can use to tell the parent which video has been chosen */}

    return(
    <div id={"computer-wrapper"}>
        <div id={"youtube-wrapper"}>
            <button onClick={useEffect(() => {props.setVideo("lofi")})} className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </button>
            <button onClick={useEffect(() => {props.setVideo("babyshark")})} className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </button>
            <button onClick={useEffect(() => {props.setVideo("babymonkey")})} className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </button>
            <button onClick={useEffect(() => {props.setVideo("babymonkey")})} className={"youtube-video"}>
                <img className={"youtube-thumbnail"} src={ChillPic} alt={"Image of a girl with headphones on studying"} />
                <p>LoFi hip hop to study to</p>
            </button>
        </div>
        
    </div>
    )
}
export default YouTube;