import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import data from '../data.json';

export default function NavBar() {
	const [isNavExpanded, setIsNavExpanded] = useState(false);
	const [filteredData, setFilteredData] = useState([]);

	const searchRef = useRef(null);

	let navigate = useNavigate();

	useEffect(() => {
		window.onscroll = () => {
			if (isNavExpanded) window.scroll(0, 0);
			else return;
		};

		searchRef.current.addEventListener('keyup', (event) => {
			if (event.keyCode == 13) {
				navigate(`../results/${event.target.value}`, { replace: true });
			}
		});
	}, []);

	function searchData(event) {
		const searchTerm = event.target.value.toLowerCase();
		const newFilter = data.filter((value) => {
			return (
				value.title.toLowerCase().includes(searchTerm) ||
				value.category.toLowerCase().includes(searchTerm)
			);
		});

		if (searchTerm === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	}

	return (
		<nav className="nav-bar">
			<div className="site-identity">
				<a href="/">
					<Logo className="site-logo" />
				</a>
			</div>
			<ul className={!isNavExpanded ? 'nav-links' : 'nav-links nav-active'}>
				<div className="search-container">
					<input
						type="text"
						ref={searchRef}
						className="search"
						required
						onChange={(event) => {
							searchData(event);
						}}
					/>
					<FaSearch className="search-icon" />
					{filteredData.length > 0 && (
						<div className="results">
							{filteredData.map((value) => {
								return (
									<a className="result" href={value.page_link} target="_blank">
										{value.title}
									</a>
								);
							})}
						</div>
					)}
				</div>
				<li>
					<a
						href="/"
						className={window.location.pathname == '/' ? 'active' : ''}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/projects"
						className={window.location.pathname == '/projects' ? 'active' : ''}
					>
						Projects
					</a>
				</li>
				<li>
					<a
						href="/about"
						className={window.location.pathname == '/about' ? 'active' : ''}
					>
						About
					</a>
				</li>
			</ul>
			<div
				className={!isNavExpanded ? 'burger' : 'burger toggle'}
				onClick={() => setIsNavExpanded(!isNavExpanded)}
			>
				<div className="line1"></div>
				<div className="line2"></div>
				<div className="line3"></div>
			</div>
		</nav>
	);
}
