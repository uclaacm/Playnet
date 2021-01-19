import React from 'react';

import { HeaderSections } from '../PlaynetConstants';
import Footer from './Footer';
import Header from './Header';

export interface BaseProps {
  section: HeaderSections,
  children?: React.ReactNode;
}
function Base(props: BaseProps): JSX.Element {
  return (
    <div>
      <Header section={props.section} />
      { props.children }
      <Footer />
    </div>
  );
}

export default Base;