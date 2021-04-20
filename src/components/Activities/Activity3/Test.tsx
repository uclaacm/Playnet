import React from 'react';
import { getControlGraphForABTesting, getBetaGraphForABTesting } from './Game/gameCalculationsUtil';

function Test() : JSX.Element {
  const map = getControlGraphForABTesting(10);
  console.log(getBetaGraphForABTesting([33,33,34], [33,33,34], 
    map.xyMap, map.dxyMap, {debug: 7, build: 7, abTest: 7}));
  return <>
    </>;
}

export default Test;