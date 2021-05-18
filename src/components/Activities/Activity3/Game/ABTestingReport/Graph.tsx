import React from 'react';
import ReactTooltip from 'react-tooltip';
import { PlaynetColors } from '../../../../shared/PlaynetConstants';
import { Point } from '../typings';

const scaleDimensions = (xyMap: Point[], width: number, height: number): Point[] =>
  xyMap.map(({ x, y }) => {
    return {
      x: x * width / 100,
      y: y * height / 100,
    };
  });

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
  xyMap.slice(1).reduce((acc: string, { x, y }: Point): string => {
    return `${acc} L ${x + offset}, ${height - y + 2 * offset}`;
  }, `M ${xyMap[0].x + offset},${height - xyMap[0].y + 2 * offset}`);

export interface GraphProps {
  xyMap: Point[];
  beta_xyMap: Point[];
}

function Graph(props: GraphProps): JSX.Element {
  const { xyMap, beta_xyMap } = props;
  const width = 133;
  const height = 100;
  const offset = 3;
  const aPath = writePath(scaleDimensions(xyMap, width, height), height, offset);
  const bPath = writePath(scaleDimensions(beta_xyMap, width, height), height, offset);

  return (
    <div>
      <svg width="60%" height="60%" viewBox={`0 0 ${width} ${height}`}>
        <path d={`M ${width - offset}, ${height - offset} L ${offset}, ${height - offset} L ${offset}, ${offset}`} stroke={'#000'} strokeWidth={offset / 1.5} fill={'none'} />
        <path data-tip
          data-for={'A'}
          d={aPath} stroke={PlaynetColors.INCORRECT_RED} strokeWidth={offset / 1.5} fill={'none'} strokeLinecap={'round'} strokeLinejoin={'round'} />
        <path data-tip
          data-for={'B'}
          d={bPath} stroke={PlaynetColors.LIGHT_BLUE} strokeWidth={offset / 1.5} fill={'none'} strokeLinecap={'round'} strokeLinejoin={'round'} strokeDasharray={'5 8'} />
      </svg>
      <ReactTooltip id={'A'}>Version A (old version)</ReactTooltip>
      <ReactTooltip id={'B'}>Version B (your version)</ReactTooltip>
      <div className={'abtest-graph-key'}>
      Key:
          <div className={'inline-graph-key'}>
            <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3" y1="3" x2="21" y2="3" stroke="#FF0000" strokeWidth="5" strokeLinecap="round" />
            </svg> Version A (original) 
          </div> {' '}
          <div className={'inline-graph-key'}>
            <svg width="24" height="7" viewBox="0 0 24 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="3" y1="3.5" x2="21" y2="3.5" stroke="#0094FF" strokeWidth="5" strokeLinecap="round" strokeDasharray="5 8" />
            </svg> Version B (yours)
          </div>
      </div>
    </div>
  );
}

export default Graph;