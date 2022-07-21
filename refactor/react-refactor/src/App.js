import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet} from 'react-router-dom';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import ToTop from './components/ToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import SearchResult from './pages/SearchResult';
import Article from './components/Article';


export default function App() {

  return (
    <div className='web-content'>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Outlet />}>
          <Route index element={<Home />}/>
          <Route path="/projects" element={<Outlet />}>
            <Route index element={<Projects />}/>
            <Route path="/projects/diamond-square" element={<Article title={"Diamond Square"}><h1>Test</h1></Article>}/>
          </Route>
          <Route path="/about" element={<About />}/>
          <Route path="/results/:term" element={<SearchResult />}/>
        </Route>
      </Routes>
      <ToTop />
      <Footer />
    </div>
  );
}
