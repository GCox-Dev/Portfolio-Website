import React from "react";
import { FaCaretSquareDown } from "react-icons/fa";

export default function ProjectSlide(data) {

    const { project } = data;

    const summary = () => {
        let result = "";
        let intro = project.summary.split(" ");
        for (let i = 0; i < intro.length && i < 50; i++) {
            result += intro[i] + " ";
        }
        return (<p>{result}<a href={project.page_link}>[...]</a></p>);
    }

    return (
        <div className="project-slide">
            <img src={project.image} />
            <div className="project-info">
                <div className="info-content">
                    <a href={project.page_link}>{project.title}</a>
                    <p>{summary()}</p>
                    <div>  
                        <span className="category">{project.category}</span>
                        <span className="category">Featured</span>
                    </div>
                    <div className="languages">
                        {project.lang.map((value, key) => {
                            return(<span className='lang'>{value}</span>);
                        })}
                    </div>
                </div>
                <div className="info-footer">
                </div>
            </div>
        </div>
    );

}