import React from 'react';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import data from '../data.json';


export default function Projects() {
    return (
        <div>
            <Header titles={["Projects"]}/>
            <div className="page">
                <div className='projects-container'>
                    {data.map((value) => {
                        return(<ProjectCard project={value} />);
                    })}
                </div>
            </div>
        </div>
    );
}