import React, { useState } from 'react';

interface InfoCardProps {
  phrases: JSX.Element[],
  col: number,
  goNextParentState: () => void,
}
const InfoCard = (props: InfoCardProps): JSX.Element => {
  const { phrases, col, goNextParentState } = props;
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="info-card disable-blur" style={{ gridColumn: col }}>
        <div className="info-card-content">
          {phrases[index]}
        </div>
        <div className="info-card-btn-container">
          {
            (index < phrases.length - 1)
              ? (
                <>
                  <div className="page-num">
                    {`${index + 1}/${phrases.length}`}
                  </div>
                  <button className="playnet-button" onClick={() => setIndex(index + 1)}>{'>'}</button>
                </>
              )
              : <button className="playnet-button" onClick={goNextParentState}>Continue</button>
          }
        </div>
      </div>
    </>
  );
};

export default InfoCard;
