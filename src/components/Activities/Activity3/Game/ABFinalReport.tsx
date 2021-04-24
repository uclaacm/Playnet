import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import { GameContext } from '.';
import Graph from './ABTestingReport/Graph';
import Review from './ABTestingReport/Review';
import { getABTestingControlGraph, getABTestingProductGraph, getFinalControlGraph, getFinalProductGraph, numFinalStars } from './gameCalculationsUtil';
import { DISPLAY_OPTIONS } from './TimeAllocation';

function ABFinalReport(): JSX.Element {
  const { startNewGame, variableSelection, featureWeights, targetWeights, timeAllocation } = useContext(GameContext);

  const {xyMap: xyMap , dxyMap: dxyMap} = getABTestingControlGraph(timeAllocation.abTest);
  const {xyMap: beta_xyMap} = getABTestingProductGraph(targetWeights, featureWeights, xyMap, dxyMap, timeAllocation);

  const {xyMap: final_xyMap , dxyMap: final_dxyMap} = getFinalControlGraph(timeAllocation.abTest);
  const {xyMap: final_beta_xyMap} = getFinalProductGraph(
    targetWeights, featureWeights, final_xyMap, final_dxyMap, timeAllocation);

  const finalY = final_xyMap[final_xyMap.length - 1].y;
  const finalBetaY = final_beta_xyMap[final_beta_xyMap.length - 1].y;
  const stars = numFinalStars(finalY, finalBetaY);

  const getTimePercentages = () => {
    const [first, second, third] = Object.values(timeAllocation);
    const total = first + second + third;
    return Object.values(timeAllocation).map(v => v * 100 / total);
  };

  const timePercentages = getTimePercentages();

  const getGradient = (split: number[]) => {
    const [first, second] = split;
    const t1 = first;
    const t2 = second + t1;
    return 'linear-gradient(to right, #FFBA09 0%, #FFBA09 ' +
           `${t1}%, #A1D900 ${t1}%, #A1D900 ${t2}%,` +
           `#04C439 ${t2}%, #04C439 100%)`;
  };

  return (
    <>
      <div className='inline'>
        <div className='half'>
          <h3>Development Summary</h3>
          <div className='result'>
            <h4>Variables</h4>
            <div>
              <div id='variable-summary'>
                {variableSelection.map((val) =>
                  <div key={val}>
                    <div className='variable-image' id={val.toLowerCase().replace(' ', '-')} />
                    <span>{val}</span>
                  </div>,
                )}
              </div>
              <div className='bar' style={{ background: getGradient(featureWeights) }}>
                {featureWeights.map((t, i) =>
                  <>
                    <div data-tip data-for={`variable-${i}`} key={i} style={{ width: `${t}%`, height: '30px'}}></div>
                    <ReactToolTip id={`variable-${i}`}>{t}%</ReactToolTip>
                  </>,
                )}
              </div>
            </div>
          </div>
          <div className='result'>
            <h4>Timeline</h4>
            <div>
              <div id='timeline-summary'>
                {DISPLAY_OPTIONS.map(({src, text}) =>
                  <div key={text} className={'centered-box'}>
                    <img src={src}/>
                    {text}
                  </div>,
                )}
              </div>
              <div className='bar' style={{ background: getGradient(timePercentages) }}>
                {Object.values(timeAllocation).map((t, i) =>
                  <>
                    <div data-tip data-for={`time-${i}`} key={i} style={{ width: `${timePercentages[i]}%`, height: '30px'}}></div>
                    <ReactToolTip id={`time-${i}`}>{t} days</ReactToolTip>
                  </>,
                )}
              </div>
            </div>
          </div>
          <div className='result'>
            <h4>A/B Test</h4>
            <Graph xyMap={xyMap} beta_xyMap={beta_xyMap} width={200} height={150} offset={5}/>
          </div>
        </div>
        <div className='half final-result'>
          <h3>Final Result</h3>
          <Graph xyMap={final_xyMap} beta_xyMap={final_beta_xyMap} width={300} height={225} offset={8}/>
          <Review stars={stars} noText={true}/>
        </div>
      </div>
      <div>
        <Link to="/activities"><button className='playnet-button playnet-btn-blue'>Play another activity</button></Link>
        <button className="playnet-button" onClick={startNewGame}>Replay</button>
      </div>
    </>
  );
}
export default ABFinalReport;