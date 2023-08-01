import React, { useEffect, useRef } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';

export default function FluidSimulation() {
	const cellSize = 4;
	const WIDTH = window.innerWidth / cellSize;
	const HEIGHT = window.innerHeight / cellSize;

	const canvasRef = useRef(null);
	const ctx = useRef(null);

	let cells = new Array(WIDTH * HEIGHT);
	console.log(cells.length);

	useEffect(() => {
		const canvas = canvasRef.current;

		const context = canvas.getContext('2d');

		context.canvas.width = window.innerWidth;
		context.canvas.height = window.innerHeight;

		ctx.current = context;
	});

	function animate() {
		ctx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);

		requestAnimationFrame(animate);
	}

	return (
		<>
			<canvas className="canvas" ref={canvasRef}></canvas>
			<a href="./">
				<Logo className="logo"></Logo>
			</a>
		</>
	);
}
