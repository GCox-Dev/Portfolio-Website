import React from 'react';
import Header from '../components/Header';

export default function Home () {
    return (
        <div>
            <Header titles={["Web Dev", "App Dev", "GCox Dev"]}/>
            <div className="page"></div>
        </div>
    );
}