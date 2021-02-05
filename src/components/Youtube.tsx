import React, { useState } from 'react';

import './styles/YouTube.scss';

function YouTube(props: YouTubeProps): JSX.Element {
    const [ chosenVideo] = useState(0);

    return(
        <div id={"youtube-wrapper"}>
            <div id={'youtube-searchbar'}></div>
            <div id={"youtube-content"}>
                <div className={"youtube-video"}></div>
                <div className={"youtube-video"}></div>
                <div className={"youtube-video"}></div>
                <div className={"youtube-video"}></div>
            </div>
        </div>
    )
}
export default YouTube;