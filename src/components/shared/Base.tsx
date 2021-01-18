import React from 'react';

import '../styles/App.scss';

import Footer from '../shared/Footer';
import Header from '../shared/Header';
import { HeaderSections } from '../shared/PlaynetConstants';


type BaseProps = {
  section: HeaderSections,
  children?: React.ReactNode;
}
function Base(props: BaseProps): JSX.Element {
  return (
    <div>
      <Header section={props.section} />
      { props.children}
      <Footer />
    </div>
  );
}

export default Base;