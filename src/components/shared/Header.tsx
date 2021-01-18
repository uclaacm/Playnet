import React from 'react';

import '../styles/App.scss';

import { Link } from 'react-router-dom';
import { HeaderSections } from '../shared/PlaynetConstants';


type HeaderProps = {
    section: HeaderSections,
}
function Header(props: HeaderProps) {
    return (
        <div>
            <nav>
                <div
                    id="textSpan"
                    style={(props.section === HeaderSections.intro) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                >
                    <Link to="/">Home</Link>
                </div>
                <div
                    id="textSpan"
                    style={(props.section === HeaderSections.activities) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                >
                    <Link to="/activities">Activities</Link>
                </div>
                <div
                    id="textSpan"
                    style={(props.section === HeaderSections.feedback) ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
                >
                    <Link to="/feedback">Feedback</Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;