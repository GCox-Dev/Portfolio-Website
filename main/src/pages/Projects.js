import React, { useEffect, useRef, useState } from 'react';
import { BsFilterLeft } from 'react-icons/bs';
import { FaSistrix } from 'react-icons/fa';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import data from '../data.json';

export default function Projects() {
	const [filteredData, setFilteredData] = useState(data);
	const [searchedData, setSearchedData] = useState(data);
	const [currentFilter, setCurrentFilter] = useState('oldest');

	const searchRef = useRef(null);

	function filterData(filter) {
		setCurrentFilter(filter);
		let result = filteredData;
		if (filter === 'oldest') {
			for (let i = 0; i < result.length; i++) {
				for (let j = i + 1; j < result.length; j++) {
					if (result[i].number > result[j].number) {
						let buffer = filteredData[j];
						result[j] = result[i];
						result[i] = buffer;
					}
				}
			}
		} else if (filter === 'newest') {
			for (let i = 0; i < result.length; i++) {
				for (let j = i + 1; j < result.length; j++) {
					if (result[i].number < result[j].number) {
						let buffer = filteredData[j];
						result[j] = result[i];
						result[i] = buffer;
					}
				}
			}
		} else if (filter === 'a-z') {
			for (let i = 0; i < result.length; i++) {
				for (let j = i + 1; j < result.length; j++) {
					if (
						result[i].title.localeCompare(result[j].title) >
						result[j].title.localeCompare(result[i].title)
					) {
						let buffer = filteredData[j];
						result[j] = result[i];
						result[i] = buffer;
					}
				}
			}
		} else if (filter === 'category') {
			for (let i = 0; i < result.length; i++) {
				for (let j = i + 1; j < result.length; j++) {
					if (
						result[i].title.localeCompare(result[j].category) >
						result[j].title.localeCompare(result[i].category)
					) {
						let buffer = filteredData[j];
						result[j] = result[i];
						result[i] = buffer;
					}
				}
			}
		} else if (filter === 'lang') {
			for (let i = 0; i < result.length; i++) {
				for (let j = i + 1; j < result.length; j++) {
					if (
						result[i].title.localeCompare(result[j].lang[0]) >
						result[j].title.localeCompare(result[i].lang[0])
					) {
						let buffer = filteredData[j];
						result[j] = result[i];
						result[i] = buffer;
					}
				}
			}
		}

		setFilteredData(result);
		searchData(searchRef.current.value.toLowerCase());
	}

	function searchData(searchTerm) {
		const newFilter = data.filter((value) => {
			return (
				value.title.toLowerCase().includes(searchTerm) ||
				value.category.toLowerCase().includes(searchTerm)
			);
		});

		if (searchTerm === '' || null) {
			setSearchedData(filteredData);
		} else {
			setSearchedData(newFilter);
		}
	}
	return (
		<div>
			<Header titles={['Projects']} />
			<div className="page">
				<div className="filter-container">
					<div className="search-container">
						<input
							type="text"
							ref={searchRef}
							className="search projects"
							required
							onChange={(event) => {
								searchData(event.target.value.toLowerCase());
							}}
						/>
						<FaSistrix className="search-icon" />
					</div>
					<div className="filter">
						<BsFilterLeft className="filter-icon" />
						<div className="dropdown">
							<div
								className={
									currentFilter == 'oldest' ? 'option-selected' : 'option'
								}
								onClick={() => {
									filterData('oldest');
								}}
							>
								Oldest
							</div>
							<div
								className={
									currentFilter == 'newest' ? 'option-selected' : 'option'
								}
								onClick={() => {
									filterData('newest');
								}}
							>
								Newest
							</div>
							<div
								className={
									currentFilter == 'a-z' ? 'option-selected' : 'option'
								}
								onClick={() => {
									filterData('a-z');
								}}
							>
								A-Z
							</div>
							<div
								className={
									currentFilter == 'category' ? 'option-selected' : 'option'
								}
								onClick={() => {
									filterData('category');
								}}
							>
								Category
							</div>
							<div
								className={
									currentFilter == 'lang' ? 'option-selected' : 'option'
								}
								onClick={() => {
									filterData('lang');
								}}
							>
								Lang
							</div>
						</div>
					</div>
				</div>
				<div className="projects-container">
					{searchedData.map((value, key) => {
						return <ProjectCard project={value} key={key} home={true} />;
					})}
				</div>
			</div>
		</div>
	);
}
