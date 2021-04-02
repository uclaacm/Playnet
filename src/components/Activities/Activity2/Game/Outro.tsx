import React from 'react';
import Computer from '../../../shared/Computer';

export default function Outro(): JSX.Element {

  return (
    <Computer>
      <>
        <p>
            Just like in the game, video compression involves taking out information
            that we’ve seen before. We don’t need to be told something we already know!
        </p>
        <p>
            If you want to learn how compression works in more detail, you can learn coding
            when you’re older! You can get a head start today on websites
            like <a href='https://code.org' target='_blank' rel='noreferrer'>code.org</a> and <a href='https://scratch.mit.edu' target='_blank' rel='noreferrer'>scratch.mit.edu</a>.
        </p>
      </>
    </Computer>
  );
}