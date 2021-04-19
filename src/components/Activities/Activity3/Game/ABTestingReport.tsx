import React, { useContext, useEffect } from 'react';
import { GameContext } from '.';
import { getBetaGraphForABTesting, getControlGraphForABTesting } from './gameCalculationsUtil';

function ABTestingReport(): JSX.Element {
  const { featureWeights, targetWeights, timeAllocation,
    daysLeft } = useContext(GameContext);
  useEffect(() => {})
  const graph = getControlGraphForABTesting(timeAllocation[2])

  return <>
    <div id='top-bar-align-right'>
      <div className='inline'>
        <div id='top-bar-clock' />
        <div className='vertically-centered'>Days Left: {daysLeft}</div>
      </div>
    </div>
    <div className='inline'>
      <div className='half' style={{ height: '100%' }}>
        Reviews:
        {
        //map of reviews
        }
      </div>
      <div className='half'>
        Graph
        {
          graph
        }
        {
          getBetaGraphForABTesting(targetWeights, featureWeights, graph, timeAllocation)
        }
      </div>
    </div>
  </>;
}
export default ABTestingReport;