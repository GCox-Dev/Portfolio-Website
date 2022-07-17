import React, { useEffect } from 'react';

export default function ProjectCard(data) {
    let project = data.project;
    return (
        <div className="project-card">
            <div className='project-content'>
                <span className='category'>{project.category}</span>
                <h1 className='title'>{project.title}</h1>
            </div>
        </div>
    );
}