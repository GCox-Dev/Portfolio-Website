import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsDashLg } from 'react-icons/bs';

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
                            <BsDashLg onClick={() => setSlide(key)} className={currentSlide.index === key ? 'dot selected' : 'dot'} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}