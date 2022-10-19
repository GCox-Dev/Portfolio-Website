import React, { useRef } from 'react';
import { FaChevronUp } from 'react-icons/fa';

export default function ToTop() {
	const toTopRef = useRef(null);

	function toTop() {
		var targetPosition = 0;
		var startPosition = window.pageYOffset;
		var distance = targetPosition - startPosition;
		var startTime = null;

		function animation(currentTime) {
			if (startTime == null) startTime = currentTime;
			var timeElapsed = currentTime - startTime;
			var run = ease(timeElapsed, startPosition, distance, 1000);
			window.scrollTo(0, run);
			if (timeElapsed < 1000) requestAnimationFrame(animation);
		}

		function ease(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return (c / 2) * t * t + b;
			t--;
			return (-c / 2) * (t * (t - 2) - 1) + b;
		}

		requestAnimationFrame(animation);
	}

	window.addEventListener('scroll', () => {
		try {
			if (window.pageYOffset >= window.innerHeight * 0.5) {
				toTopRef.current.style.opacity = 1;
			} else toTopRef.current.style.opacity = 0;
		} catch (error) {}
	});

	return (
		<div onClick={toTop} className="to-top" ref={toTopRef}>
			<FaChevronUp />
		</div>
	);
}
