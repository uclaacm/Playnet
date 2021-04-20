import React, { useState } from 'react';

interface InfoCardProps {
  phrases: JSX.Element[],
  parentIndex: number,
  goNextParentState: () => void,
}
const InfoCard = (props: InfoCardProps) => {
  const { phrases, parentIndex, goNextParentState } = props;
  const [index, setIndex] = useState(0);

  const getCol = () => {
    if (parentIndex == 2 || parentIndex == 3) {
      return 1;
    }
    return 2;
  }

  return (
    <>
      <div className='info-card disable-blur'
        style={{ '--info-card-col': getCol() }}
      >
        {phrases[index]}
        <div className='info-card-btn-container'>
          {
            (index < phrases.length - 1) ?
              <>
                <div className='page-num'>
                  {index + 1 + '/' + phrases.length}
                </div>
                <button className='playnet-button' onClick={() => setIndex(index + 1)}>{'>'}</button>
              </>
              :
              <button className='playnet-button' onClick={goNextParentState}>Continue</button>
          }
        </div>
      </div>
    </>
  );
}

export default InfoCard;