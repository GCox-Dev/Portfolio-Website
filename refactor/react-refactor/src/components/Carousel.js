import React, { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

export default function Carousel(data) {

    let { slides, tag } = data;


    const [ currentSlide, setCurrentSlide ] = useState({ "index" : 0, "slide" : slides[0] })

    function changeSlide(direction) {
        let index = currentSlide.index + direction;
        console.log(index)
        if (index == -1) index = slides.length - 1;
        else if (index == slides.length) index = 0;

        setCurrentSlide({ "index" : index, "slide" : slides[index]} );
        
    }

    function setSlide(index) {
        setCurrentSlide({"index" : index, "slide" : slides[index]});
    }

    return (
        <div className={tag != null ? `carousel ${tag}` : 'carousel'}>
            <FaChevronLeft className='arrow left' onClick={() => changeSlide(-1)}/>
            <div className='slide'>{currentSlide.slide}</div>
            <FaChevronRight className='arrow right' onClick={() => changeSlide(1)}/>
            <div className='dots'>
                <div>
                    {slides.map((value, key) => {
                        return(
                            <BsDot onClick={() => setSlide(key)} className={currentSlide.index === key ? 'dot selected' : 'dot'} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function ProjectSlide(data) {

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

export function ImageSlide(props) {

    let {  src } = props;

    return (
        <div className='image-slide'><img src={src}/></div>
    );
}