import React from 'react';
import Clock from '../../../../assets/clock.svg';

interface ResultsProps {
  header: string,
  time: number,
}

function Results(props: ResultsProps){
  const {header, time} = props;
  return (
    <div className='results-container'>
      <h3>{header}:</h3>
      <div>
        <img src={Clock} alt={'A timer'}/>
        {time/1000} seconds
      </div>
    </div>
  );
}

function GameResults(): JSX.Element {
  const t_uncompressedTime = sessionStorage.getItem('uncompressedTime');
  const t_compressedTime = sessionStorage.getItem('compressedTime');

  const results = [
    {header: 'Uncompressed', time: t_uncompressedTime ?? 0},
    {header: 'Compressed', time: t_compressedTime ?? 0},
  ];

  return (
    <div id='game-results-container'>
      <div id='game-results'>
        {results.map(({header, time}, i) => <Results key={i} header={header} time={+time}/>)}
      </div>
      <p>Wow! When you played the second time, it was a lot faster!</p>
      <p>That’s why YouTube videos are compressed: it makes your computer play videos faster.</p>
    </div>
  );
}

export default GameResults;