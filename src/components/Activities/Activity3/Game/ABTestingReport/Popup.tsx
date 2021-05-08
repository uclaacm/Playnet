import React, { useContext } from 'react';
import { GameContext } from '..';
import { A3_GAME_STATE } from '../GameConstants';

interface PopUpProps {
  close: () => void;
}

function PopUp(props: PopUpProps): JSX.Element {
  const { setState } = useContext(GameContext);
  return (
    <div id="popup">
      <h4>Are you sure?</h4>
      <p>
        Once you submit these settings, you can’t change them! We are about to see
        whether the 10 people in our A/B test really predicted how everyone is going
        to react to your product.
      </p>
      <p>
        The final reactions might be different than you expect!
      </p>
      <div>
        <button className="playnet-button playnet-btn-blue" onClick={props.close}>No, go back</button>
        <button className="playnet-button" onClick={() => setState(A3_GAME_STATE.FinalReport)}>Yes, I&apos;m sure</button>
      </div>
    </div>
  );
}

export default PopUp;
