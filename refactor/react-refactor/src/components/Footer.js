import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer>
            <div className="footer-section">
                <h4>{'<follow me>'}</h4>
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/grant-cox-545300226/" target="_blank">
                        <FaLinkedin />
                    </a>
                    <a href="https://www.instagram.com/gcoxdev/" target="_blank">
                        <FaInstagram />
                    </a>
                    <a href="https://github.com/gcox-dev" target="_blank">
                        <FaGithub />
                    </a>
                </div>
                <h5>Copyright © 2022 GCox Dev</h5>
            </div>
        </footer>
    );
}