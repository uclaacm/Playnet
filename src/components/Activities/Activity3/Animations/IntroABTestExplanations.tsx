import React from 'react';
import ABCompare from '../../../../assets/activity3/AB-compare.svg';
import ABGraph from '../../../../assets/activity3/AB-graph.svg';

export function ABTestSlide1(): JSX.Element {
  return <img src={ABCompare} alt='version a versus version b' style={{ maxHeight: '50vh' }} />;
}

export function ABTestSlide2(): JSX.Element {
  return <img src={ABGraph} alt='Graph comparing different versions of a product' style={{ maxHeight: '50vh' }} />;
}