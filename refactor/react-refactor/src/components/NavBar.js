import React, { useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/logo.svg';
import "../index.css";

export default function NavBar() {

    const [isNavExpanded, setIsNavExpanded] = useState(false);

    window.onscroll = () => {
        if (isNavExpanded) window.scroll(0,0);
        else return;
    }

    return (
        <nav className="nav-bar">
            <div className="site-identity">
                <a href="/"><Logo className="site-logo"/></a>
            </div>
            <ul className={!isNavExpanded ? "nav-links" : "nav-links nav-active"}>
                 <li>
                    <NavLink activeClassName="active" to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/projects">Projects</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>
            <div className={!isNavExpanded ? "burger" : "burger toggle"} onClick={() => setIsNavExpanded(!isNavExpanded)}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
}