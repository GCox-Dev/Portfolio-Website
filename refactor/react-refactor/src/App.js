import React from 'react'
import { Routes, Route, Outlet} from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

export default function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Outlet />}>
          <Route index element={<Home />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/about" element={<About />}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}
