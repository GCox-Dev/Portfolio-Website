import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet} from 'react-router-dom';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import ToTop from './components/ToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import SearchResult from './pages/SearchResult';
import { Cyclone, FinalsWeek, MapGenerationArticle, NBodyArticle, Portfolio, ToDoList } from './pages/Article';
import NoResult from './pages/NoResult';
import NBody from './projects/n-body/NBody';
import SnakeGame from './projects/snake/Snake';
import MapGeneration from './projects/map-generation/MapGeneration';


export default function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Page />}>
        <Route index element={<Home />}/>
        <Route path="/projects" element={<Outlet />}>
          <Route index element={<Projects />}/>
          <Route path="/projects/cyclone" element={<Cyclone />}/>
          <Route path="/projects/finals-week" element={<FinalsWeek />}/>
          <Route path="/projects/to-do-list" element={<ToDoList />}/>
          <Route path="/projects/portfolio" element={<Portfolio />}/>
          <Route path="/projects/n-body" element={<NBodyArticle />}/>
          <Route path="/projects/map-generation" element={<MapGenerationArticle/>}/>
        </Route>
        <Route path="/about" element={<About />}/>
        <Route path="/results/:term" element={<SearchResult />}/>
      </Route>
      <Route path="/projects/n-body/demo" element={<NBody />}/>
      <Route path="/projects/map-generation/demo" element={<MapGeneration />}/>
      <Route path="/projects/snake" element={<SnakeGame />}/>
      <Route path="*" element={<NoResult/>}/>
    </Routes>
  );
}


function Page() {
  return (<div className='web-content'>
    <NavBar />
    <Outlet/>
    <ToTop />
    <Footer />
  </div>);
}