import React from 'react';
import Computer from '../../../shared/Computer';

export default function Outro(): JSX.Element {

  return (
    <Computer>
      <>
        <p>
            If you want to learn how compression works in more detail, you can
            watch <a href='https://www.youtube.com/watch?v=QoZ8pccsYo4&ab_channel=LeoIsikdogan' target='_blank' rel='noreferrer'>this video</a>.
            Spatial compression, temporal compression, quantizing, codecs, there is
            so much that goes into video compression!
        </p>
        <p>
            To find out more, you can learn coding
            when you’re older! You can get a head start today on websites
            like <a href='https://code.org' target='_blank' rel='noreferrer'>code.org</a> and <a href='https://scratch.mit.edu' target='_blank' rel='noreferrer'>scratch.mit.edu</a>.
        </p>
      </>
    </Computer>
  );
}