import React from 'react';

import { HeaderSections } from '../PlaynetConstants';
import Footer from './Footer';
import Header from './Header';

import '../../styles/Base.scss';

export interface BaseProps {
  section: HeaderSections,
  children?: React.ReactNode;
}
function Base(props: BaseProps): JSX.Element {
  return (
    <>
      <Header section={props.section} />
      <div className={'body'}>
        { props.children }
      </div>
      <Footer />
    </>
  );
}

export default Base;
