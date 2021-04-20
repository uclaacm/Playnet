import React, { useContext } from 'react';
import { GameContext } from '.';
import Star from '../../../../assets/activity1/game1/star.svg';
import { random } from '../../../../utils';
import { getABTestingControlGraph, getABTestingProductGraph } from './gameCalculationsUtil';
import { A3_GAME_STATE } from './GameConstants';
import { Point } from './typings';

const AColor = "#FF0000";
const BColor = "#0094FF";

const scaleDimensions = (xyMap: Point[], width: number, height: number): Point[] => {
  return xyMap.map(({x, y}) => {
    return {
       x: x*width / 100,
       y: y*height / 100,
     }
    }
  )
};

const writePath = (xyMap: Point[], height: number, offset: number): string => {
  return xyMap.slice(1).reduce((acc: string, {x, y}: Point): string => {
    return `${acc} L ${x + offset}, ${height - y + 2 * offset}`;
  }, `M ${xyMap[0].x + offset},${height - xyMap[0].y + 2 * offset}`);
};


interface ReviewProps {
  stars: number;
}

function Review(props: ReviewProps): JSX.Element {
  const {stars} = props;
  const star = Array(5).fill(undefined).map((_v, i) => i < stars ? true : false);
  return (
    <div>
      <p>{random(reviewer_names)}: {random(reviews[props.stars])}</p>
      <div className={'stars'}>
        {Array(5).fill(false).map((_v, i) => 
          <img src={Star} style={star[i] ? {} : {filter: 'grayscale(100%)'}}/>
        )}
      </div>
    </div>
  );
}

function ABTestingReport(): JSX.Element {
  const { setState, featureWeights, targetWeights, timeAllocation, daysLeft } = useContext(GameContext);

  const {xyMap, dxyMap} = getABTestingControlGraph(timeAllocation.abTest);
  const {xyMap: beta_xyMap} = getABTestingProductGraph(targetWeights, featureWeights, xyMap, dxyMap, timeAllocation);

  const [width, height] = [400, 300];
  const offset = 20;
  const aPath = writePath(scaleDimensions(xyMap, width, height), height, offset);
  const bPath = writePath(scaleDimensions(beta_xyMap, width, height), height , offset);

  const generateReviews = (featureWeights: number[], targetWeights: number[]): number[] => {
    const offBy = targetWeights.reduce((acc: number, value: number, index: number) => {
      return acc + Math.abs(featureWeights[index] - value);
    }, 0);
    const convertToStars = () => Math.floor((100 - offBy + (Math.random() * 20 - 10)) / 20) + 1;
    return [
      convertToStars(),
      convertToStars(),
    ];
  }

  const handleSubmit = () => {
    const popup = document.getElementById('popup');
    popup && (popup.style.visibility = 'visible');
  }

  return <>
    <PopUp />
    <div id='top-bar-align-right'>
      <div className='inline'>
        <div id='top-bar-clock' />
        <div className='vertically-centered'>Days Left: {daysLeft}</div>
      </div>
    </div>
    <h3>A/B Testing: Report</h3>
    <div className='inline'>
      <div className='half'>
        Reviews
        {
          generateReviews(featureWeights, targetWeights).map((stars) => <Review stars={stars} />)
        }
      </div>
      <div className='half'>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <path d={`M ${width-offset}, ${height-offset} L ${offset}, ${height-offset} L ${offset}, ${offset}`} stroke={'#000'} strokeWidth={8} fill={'none'}/>
          <path d={aPath} stroke={AColor} strokeWidth={6} fill={'none'}/>
          <path d={bPath} stroke={BColor} strokeWidth={6} fill={'none'}/>
        </svg>
      </div>
    </div>
    <div>
      <button className="playnet-button playnet-btn-blue" onClick={() => setState(A3_GAME_STATE.PriorityChoices)}>Go back to variables</button>
      <button className="playnet-button" onClick={handleSubmit}>Submit final product</button>
    </div>
  </>;
}
export default ABTestingReport;