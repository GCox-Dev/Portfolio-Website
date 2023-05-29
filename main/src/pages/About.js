import React from 'react';
import Contact from '../components/Contact';
import Header from '../components/Header';
import PageSection from '../components/PageSection';

export default function About() {
	return (
		<div>
			<Header titles={['About']} />
			<div className="page">
				<PageSection title={'about'}>
					<p>
						Hi, my name is Grant Cox. I am a solo web developer with over three
						years of experience. I am currently a sophomore in college studying
						electrical and computer engineering, with a minor in computer
						science.
					</p>
					<p>
						&nbsp;&nbsp;&nbsp;&nbsp;I have been programing in one language or
						another for over six years. I began my journey in sixth grade with a
						computer class where we learned to create websites with basic HTML
						and CSS. I then got a Raspberry Pi where I would learn my first
						programming language, Python. Once I got the basics down I learned
						Java, C++, C#, JavaScript, and Dart. I now have formal education
						through my degree program which taught me algoritm design and
						optimization in C.
					</p>
					<div className="sub-section">
						<ul>
							<li>HTML</li>
							<li>CSS</li>
							<li>Python</li>
							<li>Java</li>
							<li>C</li>
							<li>C++</li>
							<li>C#</li>
							<li>WordPress</li>
							<li>JS</li>
							<li>Dart</li>
							<li>Flutter</li>
							<li>React</li>
						</ul>
					</div>
				</PageSection>
				<PageSection title={'Contact'}>
					<Contact />
				</PageSection>
			</div>
		</div>
	);
}
