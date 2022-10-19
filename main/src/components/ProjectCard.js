import React from 'react';
import Projects from '../pages/Projects';

export default function ProjectCard(data) {
	const { project, home } = data;

	const summary = () => {
		let result = '';
		let intro = project.summary.split('');
		for (let i = 0; i < intro.length && i < 99; i++) {
			if (intro[i] != undefined) result += intro[i];
			else break;
		}
		if (intro[99] != undefined)
			result += intro[99] == ' ' ? intro[99] : intro[99] + ' ';
		else result += ' ';
		return (
			<p>
				{result}
				<a href={project.page_link} target="_blank">
					[...]
				</a>
			</p>
		);
	};
	return (
		<div className="project-card">
			<img src={project.image} />
			<div className="project-content">
				<div className="categories">
					<span className="category">{project.category}</span>
					{project.featured && <span className="category">Featured</span>}
				</div>
				<a href={project.page_link} target="_blank">
					{project.title}
				</a>
				{summary()}
			</div>
			<div className="project-footer">
				{project.lang.map((value, key) => {
					return <span className="lang">{value}</span>;
				})}
			</div>
		</div>
	);
}
