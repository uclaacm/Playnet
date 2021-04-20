import React from 'react';
import { Point } from '../typings';

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

export interface GraphProps {
  xyMap: Point[];
  beta_xyMap: Point[];
}

function Graph(props: GraphProps): JSX.Element {
  const {xyMap, beta_xyMap} = props;
  const [width, height] = [400, 300];
  const offset = 20;
  const aPath = writePath(scaleDimensions(xyMap, width, height), height, offset);
  const bPath = writePath(scaleDimensions(beta_xyMap, width, height), height , offset);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={`M ${width-offset}, ${height-offset} L ${offset}, ${height-offset} L ${offset}, ${offset}`} stroke={'#000'} strokeWidth={8} fill={'none'}/>
      <path d={aPath} stroke={AColor} strokeWidth={6} fill={'none'}/>
      <path d={bPath} stroke={BColor} strokeWidth={6} fill={'none'}/>
    </svg>
  );
}

export default Graph;