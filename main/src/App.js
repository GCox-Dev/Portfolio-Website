import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ToTop from './components/ToTop';
import About from './pages/About';
import {
	Cyclone,
	FinalsWeek,
	GameOfLifeArticle,
	MapGenerationArticle,
	NBodyArticle,
	Portfolio,
	ToDoList,
} from './pages/Article';
import Home from './pages/Home';
import NoResult from './pages/NoResult';
import Projects from './pages/Projects';
import SearchResult from './pages/SearchResult';
import FluidSimulation from './projects/fluid-simulation/FluidSimulation';
import GameOfLife from './projects/game-of-life/GameOfLife';
import MapGeneration from './projects/map-generation/MapGeneration';
import NBody from './projects/n-body/NBody';
import Particles from './projects/particles/Particles';
import Pong from './projects/pong/Pong';
import SnakeGame from './projects/snake/Snake';

export default function App() {
	return (
		<Routes>
			<Route exact path="/" element={<Page />}>
				<Route index element={<Home />} />
				<Route path="/projects" element={<Outlet />}>
					<Route index element={<Projects />} />
					<Route path="/projects/cyclone" element={<Cyclone />} />
					<Route path="/projects/finals-week" element={<FinalsWeek />} />
					<Route path="/projects/to-do-list" element={<ToDoList />} />
					<Route path="/projects/portfolio" element={<Portfolio />} />
					<Route path="/projects/n-body" element={<NBodyArticle />} />
					<Route
						path="/projects/map-generation"
						element={<MapGenerationArticle />}
					/>
					<Route
						path="/projects/game-of-life"
						element={<GameOfLifeArticle />}
					/>
				</Route>
				<Route path="/about" element={<About />} />
				<Route path="/results/:term" element={<SearchResult />} />
			</Route>
			<Route path="/projects/n-body/demo" element={<NBody />} />
			<Route path="/projects/map-generation/demo" element={<MapGeneration />} />
			<Route path="/projects/snake" element={<SnakeGame />} />
			<Route path="/projects/particles/" element={<Particles />} />
			<Route path="/projects/game-of-life/demo" element={<GameOfLife />} />
			<Route path="/projects/pong" element={<Pong />} />
			{/* <Route
				path="/projects/fluid-simulation/demo"
				element={<FluidSimulation />}
			/> */}
			<Route path="*" element={<NoResult />} />
		</Routes>
	);
}

function Page() {
	return (
		<div className="web-content">
			<NavBar />
			<Outlet />
			<ToTop />
			<Footer />
		</div>
	);
}
