import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import data from '../data.json';


export default function SearchResult() {

    const [ filteredData, setFilteredData ] = useState([]);
    const [ lastTerm, setLastTerm ] = useState();

    const { term } = useParams();

    function searchData() {
        if (term == lastTerm) return;
        const searchTerm = term.toLowerCase();
        const newFilter = data.filter((value) => {
            return (value.title.toLowerCase().includes(searchTerm) || value.category.toLowerCase().includes(searchTerm));
        });

        if (searchTerm === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }

        setLastTerm(term);

    }

    useEffect(() => {
        searchData();
    });

    return (
        <div className='page'>
            <h1 className='resultsTitle'>{(filteredData.length > 0) ? `Search Results` : 'No Result'}</h1>
            {filteredData.length > 0 && (
                <div className='projects-container'>
                    {filteredData.map((value, key) => {
                        console.log(value.image);
                        return (<ProjectCard project={value} key={key} home={false} />);
                    })}
                </div> 
            )}
        </div>
    );
}