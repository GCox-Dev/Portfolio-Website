import React, { useRef } from 'react';

export default function PageSection(props) {
	const { title } = props;
	const sectionRef = useRef(null);

	window.addEventListener('load', () => {
		if (
			window.scrollY >
			sectionRef.current.offsetTop + window.innerHeight * 0.5
		) {
			sectionRef.current.style.opacity = 1;
			sectionRef.current.style.transform = 'translateX(0)';
		}
	});

	window.addEventListener('scroll', () => {
		if (
			window.scrollY >
			sectionRef.current.offsetTop + window.innerHeight * 0.5
		) {
			sectionRef.current.style.opacity = 1;
			sectionRef.current.style.transform = 'translateX(0)';
		}
	});

	return (
		<section ref={sectionRef}>
			<h4>{`<${title}>`}</h4>
			{props.children}
			<h4>{`</${title}>`}</h4>
		</section>
	);
}
