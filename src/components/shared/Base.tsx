import React from 'react';

import '../styles/App.scss';

import Header from '../shared/Header';
import Footer from '../shared/Footer';
import { HeaderSections } from '../shared/PlaynetConstants';


type BaseProps = {
    section: HeaderSections,
    children?: React.ReactNode;
}
function Base (props: BaseProps) {
    return (
        <div>
            <Header section = { props.section }/>
            { props.children}
            <Footer />
        </div>
    );
}

export default Base;