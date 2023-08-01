import Carousel, { ProjectSlide } from '../components/Carousel';
import Contact from '../components/Contact';
import Header from '../components/Header';
import PageSection from '../components/PageSection';
import ProjectCard from '../components/ProjectCard';
import data from '../data.json';

export default function Home() {
	let featured = [];
	for (let i = data.length - 1; i >= 0; i--) {
		if (data[i].featured) {
			featured.push(data[i]);
		}
	}

	return (
		<div>
			<Header titles={['Web Dev', 'App Dev', 'GCox Dev']} />
			<div className="page">
				<PageSection title={'projects'}>
					<Carousel
						slides={featured.map((value, key) => {
							return <ProjectSlide project={value} />;
						})}
						tag={'home-carousel'}
					/>
					<div className="featured-cards">
						<div className="projects-container">
							{featured.map((value, key) => {
								return <ProjectCard project={value} key={key} />;
							})}
						</div>
					</div>
				</PageSection>
				<PageSection title={'about'}>
					<p>
						Hi, my name is Grant Cox. I am a solo web developer with over three
						years of experience. I am currently a sophomore in college studying
						electrical and computer engineering, with a minor in computer
						science.
					</p>
				</PageSection>
				<PageSection title={'skills'}>
					<div className="sub-section">
						<h4>&#60;web dev&#62;</h4>
						<p>
							Over the years I have used many different tools in order to create
							websites. I have used HTML/CSS with vanilla JavaScript, WordPress,
							and React.
						</p>
						<div className="sub-section">
							<ul>
								<li>HTML</li>
								<li>CSS</li>
								<li>JS</li>
								<li>React</li>
								<li>WordPress</li>
							</ul>
						</div>
						<h4>&#60;/web dev&#62;</h4>
					</div>
					<div className="sub-section">
						<h4>&#60;app dev&#62;</h4>
						<p>
							I use Dart along side the Flutter API to make mobile apps. Flutter
							was built by Google, and builds to both Android and Apple. Instead
							of using native components, Flutter renders custom pixels directly
							to the phone screen. I have published two apps so far available on
							the Google Play store.
						</p>
						<div className="sub-section">
							<ul>
								<li>Dart</li>
								<li>Flutter</li>
							</ul>
						</div>
						<h4>&#60;/app dev&#62;</h4>
					</div>
					<div className="sub-section">
						<h4>&#60;electronics&#62;</h4>
						<p>
							As an electrical engineering student I love to tinker with
							electronics. Using an Arduino and C++ I can create pretty much
							anything. This includes robots, arcade games, and security devices
							to name a few.
						</p>
						<div className="sub-section">
							<ul>
								<li>C++</li>
							</ul>
						</div>
						<h4>&#60;/electronics&#62;</h4>
					</div>
				</PageSection>
				<PageSection title={'contact'}>
					<Contact />
				</PageSection>
			</div>
		</div>
	);
}
