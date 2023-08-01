import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
	const date = new Date();
	return (
		<footer>
			<div className="footer-section">
				<h4>{'<follow me>'}</h4>
				<div className="social-links">
					<a
						href="https://www.linkedin.com/in/grant-cox-545300226/"
						target="_blank"
					>
						<FaLinkedin />
					</a>
					<a href="https://www.instagram.com/gcoxdev/" target="_blank">
						<FaInstagram />
					</a>
					<a href="https://github.com/gcox-dev" target="_blank">
						<FaGithub />
					</a>
				</div>
				<h5>Copyright © {date.getFullYear()} GCox Dev | v4.2.1</h5>
			</div>
		</footer>
	);
}
