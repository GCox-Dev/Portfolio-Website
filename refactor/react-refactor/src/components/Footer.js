import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer>
            <div className="footer-section">
                <h1>Follow Me:</h1>
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
                    <a href="mailto: gcoxdev@gmail.com" target="_blank">
                        <FiMail />
                    </a>
                </div>
            </div>
        </footer>
    );
}