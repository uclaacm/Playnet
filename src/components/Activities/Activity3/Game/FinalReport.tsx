import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import { GameContext } from '.';
import Graph from './ABTestingReport/Graph';
import Review from './ABTestingReport/Review';
import { getFinalControlGraph, getFinalProductGraph, numFinalStars } from './gameCalculationsUtil';
import { PERCENT_THRESHOLD } from './GameConstantsToMessWith';
import { DISPLAY_OPTIONS } from './TimeAllocation';

interface FinalReportProps {
  goIntroSlide: () => void;
}

function FinalReport(props: FinalReportProps): JSX.Element {
  const {
    variableSelection, featureWeights, targetWeights, timeAllocation, getABTestingGraph,
  } = useContext(GameContext);

  const { xyMap: final_xyMap, dxyMap: final_dxyMap } = getFinalControlGraph();
  const { xyMap: final_beta_xyMap } = getFinalProductGraph(
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
                    {t > PERCENT_THRESHOLD.VARIABLES ? //percentage where the text no longer fits inside the corresponding section, note this is not a pixel value, and rather a percentage based on my laptop screen
                      <div key={i} style={{ width: `${t}%` }}>{t}%</div> :
                      <>
                        <div data-tip data-for={`variable-${i}`} key={i} style={{ width: `${t}%`, height: '30px' }}></div>
                        <ReactToolTip id={`variable-${i}`}>{t}%</ReactToolTip>
                      </>
                    }
                  </>,
                )}
              </div>
            </div>
          </div>
          <div className='result'>
            <h4>Timeline</h4>
            <div>
              <div id='timeline-summary'>
                {DISPLAY_OPTIONS.map(({ src, text }) =>
                  <div key={text} className={'centered-box'}>
                    <img src={src} />
                    {text}
                  </div>,
                )}
              </div>
              <div className='bar' style={{ background: getGradient(timePercentages) }}>
                {Object.values(timeAllocation).map((t, i) =>
                  <>
                    {timePercentages[i] > PERCENT_THRESHOLD.DAYS ? 
                      <div key={i} style={{ width: `${timePercentages[i]}%` }}>{t} days</div> :
                      <>
                        <div data-tip data-for={`time-${i}`} key={i} style={{ width: `${timePercentages[i]}%`, height: '30px' }}></div>
                        <ReactToolTip id={`time-${i}`}>{t} days</ReactToolTip>
                      </>
                    }
                  </>,
                )}
              </div>
            </div>
          </div>
          <div className='result'>
            <h4>A/B Test</h4>
            <div>
              {getABTestingGraph()}
            </div>
          </div>
        </div>
        <div className='half final-result'>
          <h3>Final Result</h3>
          <Graph xyMap={final_xyMap} beta_xyMap={final_beta_xyMap} />
          <Review stars={stars} />
        </div>
      </div>
      <div>
        <Link to="/activities"><button className='playnet-button playnet-btn-blue'>Play another activity</button></Link>
        <button className="playnet-button" onClick={props.goIntroSlide}>Replay</button>
      </div>
    </>
  );
}
export default FinalReport;
