import React from 'react';
import {Link} from 'react-router-dom';
import Computer from '../../../shared/Computer';

export default function Outro(): JSX.Element {

  return (
    <div id={'outro-container'}>
      <Computer text={
        <>
          <p>
            Just like in the game, video compression involves taking out information
            that we’ve seen before. We don’t need to be told something we already know!
          </p>
          <p>
            If you want to learn how compression works in more detail, you can learn coding
            when you’re older! You can get a head start today on websites
            like <Link to='https://code.org'>code.org</Link> and <Link to='https://scratch.mit.edu'>scratch.mit.edu</Link>.
          </p>
        </>
      }/>
      <button>Play another activity</button>
    </div>
  );
}