import React from 'react';
import Header from './Header'

export default function Article(props) {
    const { title } = props;

    return (
        <div>
            <Header titles={[title]} />
            <div className='page'>
                {props.children}
            </div>
        </div>
    );
}