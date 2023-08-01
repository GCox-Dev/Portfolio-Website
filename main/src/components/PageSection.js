import React, { useRef } from 'react';

export default function PageSection(props) {
	const { title } = props;
	const sectionRef = useRef(null);

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('show');
			} else {
				entry.target.classList.remove('show');
			}
		});
	});

	window.addEventListener('load', () => {
		let sections = document.querySelectorAll('.page-section');
		sections.forEach((el) => observer.observe(el));
	});

	return (
		<section className="page-section" ref={sectionRef}>
			<h4>{`<${title}>`}</h4>
			{props.children}
			<h4>{`</${title}>`}</h4>
		</section>
	);
}
