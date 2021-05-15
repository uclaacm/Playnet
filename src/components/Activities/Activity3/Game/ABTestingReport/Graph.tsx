import React from 'react';
import ReactTooltip from 'react-tooltip';
import { PlaynetColors } from '../../../../shared/PlaynetConstants';
import { Point } from '../typings';

/**
 * A reduction function that takes an array of coordinates and returns a svg path.
 *
 * Learn more about the svg path tags here:
 * https://css-tricks.com/svg-path-syntax-illustrated-guide/
 *
 * @param xyMap the coordinates to plot
 * @param height the height of the graph
 * @param offset the offset of the graph
 * @returns svg path to draw
 */
const writePath = (xyMap: Point[], height: number, offset: number): string =>
  xyMap.slice(1).reduce((acc: string, {x, y}: Point): string => {
    return `${acc} L ${x + offset}, ${height - y + 2 * offset}`;
  }, `M ${xyMap[0].x + offset},${height - xyMap[0].y + 2 * offset}`);

  const scaleDimensions = (xyMap: Point[], width: number, height: number): Point[] =>
  xyMap.map(({x, y}) => {
    return {
      x: x*width / 100,
      y: y*height / 100,
    };
  });

export interface GraphProps {
  xyMap: Point[];
  beta_xyMap: Point[];
}

function Graph(props: GraphProps): JSX.Element {
  const {xyMap, beta_xyMap} = props;
  const width = 133;
  const height = 100;
  const offset = 3;
  const aPath = writePath(scaleDimensions(xyMap, width, height), height, offset);
  const bPath = writePath(scaleDimensions(beta_xyMap, width, height), height , offset);

  return (
    <div>
      <svg width="60%" height="60%" viewBox={`0 0 ${width} ${height}`}>
        <path d={`M ${width-offset}, ${height-offset} L ${offset}, ${height-offset} L ${offset}, ${offset}`} stroke={'#000'} strokeWidth={offset/1.5} fill={'none'}/>
        <path data-tip
          data-for={'A'}
          d={aPath} stroke={PlaynetColors.INCORRECT_RED} strokeWidth={offset/1.5} fill={'none'}/>
        <path data-tip
          data-for={'B'}
          d={bPath} stroke={PlaynetColors.LIGHT_BLUE} strokeWidth={offset/1.5} fill={'none'}/>
      </svg>
      <ReactTooltip id={'A'}>Version A (old version)</ReactTooltip>
      <ReactTooltip id={'B'}>Version B (your version)</ReactTooltip>
    </div>
  );
}

export default Graph;