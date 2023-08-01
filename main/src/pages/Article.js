import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Carousel, { ImageSlide } from '../components/Carousel';
import Header from '../components/Header';
import data from '../data.json';

export default function Article(props) {
	const { cur, contents } = props;

	return (
		<div>
			<Header titles={[cur.title]} />
			<article>
				<section className="table-of-contents">
					<h3>{'<Table of Contents>'}</h3>
					<ul>
						{contents.map((section, key) => {
							let link = section.toLowerCase();
							link.replace(' ', '-');
							return (
								<li>
									<a href={`#${link}`}>{section}</a>
								</li>
							);
						})}
					</ul>
				</section>
				<h2>{`<${cur.title}>`}</h2>
				{props.children}
				<NextArticle cur={cur} />
			</article>
		</div>
	);
}

function NextArticle(props) {
	let { cur } = props;
	if (data[cur.number].has_article) {
		return cur.number < data.length ? (
			<a href={`${data[cur.number].page_link}`}>Next Article</a>
		) : (
			<></>
		);
	} else {
		let num = cur.number;
		while (num < data.length) {
			if (data[num].has_article) {
				return <a href={`${data[num].page_link}`}>Next Article</a>;
			} else num++;
		}
		return <></>;
	}
}

function Tp(props) {
	return <p>&nbsp;&nbsp;&nbsp;&nbsp;{props.children}</p>;
}

function Subtitle(props) {
	let link = props.children.toLowerCase();
	link.replace(' ', '-');
	return <h3 id={link}>{`<${props.children}>`}</h3>;
}

function Image(props) {
	let { src } = props;
	return <img className="image" src={src} />;
}

function Video(props) {
	let { src } = props;
	return (
		<iframe
			class="video"
			src={`${src}&loop=1&mute=1&autoplay=1`}
			frameborder="0"
			allowfullscreen
		></iframe>
	);
}

function Code(props) {
	let { lang } = props;
	return (
		<div className="code">
			<SyntaxHighlighter language={lang} style={monokaiSublime}>
				{props.children}
			</SyntaxHighlighter>
		</div>
	);
}

function Sources(props) {
	let { srcs } = props;
	return (
		<div className="sources">
			{srcs.map((value, key) => {
				return (
					<a target="_blank" href={value.link}>
						{value.txt}
					</a>
				);
			})}
		</div>
	);
}

export function Cyclone() {
	return (
		<Article
			cur={data[0]}
			contents={['Images', 'Video', 'Design Process', 'Circuit', 'Conclusion']}
		>
			<p>
				This Arduino project re-creates a common arcade game found in most
				arcades. The goal is to stop the moving LED in the middle. It features
				three game modes, with increasing difficulty and point values. As the
				LED bounces back and forth the player has the chance to use the green
				play button in order to stop the LED. Depending on the color of the LED,
				a certain amount of points are awarded. Point values scale with the
				difficulty. The player has five tries in order to acquire as many points
				as possible.
			</p>
			<Tp>
				This project was created for a class I took my sophomore year of
				highschool called Principles of Engineering (a PLTW class). The goal was
				to design and create a project that used a microcontroller in order to
				automate some process.
			</Tp>
			<Tp>
				The electronics inside Cyclone are very simple, using only an Arduino
				Nano, five LEDs, two buttons, a LCD, and a buzzer for feedback. It
				relies on the Arduino and C++ to drive the gameplay. The LCD displays
				information about the game, such as game mode, points, and tries left.
			</Tp>
			<Tp>
				There are two buttons that control gameplay. The first is the green play
				button. This starts the game, and stops the LED while in game. The
				second is the yellow mode button. This allows the player to select a
				game mode within the start menu. Both buttons allow the player to stop
				the LED while playing the game.
			</Tp>
			<Tp>
				There are three game modes: easy, hard, and master. Each mode
				corresponds to an increasing speed and higher point values. This way a
				player can earn more points in master mode than in easy mode.
			</Tp>
			<Subtitle>Images</Subtitle>
			<Carousel
				slides={[
					<ImageSlide src="/images/cyclone/img1.jpg" />,
					<ImageSlide src="/images/cyclone/img2.jpg" />,
					<ImageSlide src="/images/cyclone/img3.jpg" />,
					<ImageSlide src="/images/cyclone/img4.jpg" />,
					<ImageSlide src="/images/cyclone/img5.jpg" />,
				]}
			/>
			<Subtitle>Video</Subtitle>
			<Video
				src={'https://www.youtube.com/embed/KX64nM4xGWQ?playlist=KX64nM4xGWQ'}
			/>
			<Subtitle>Design Process</Subtitle>
			<p>
				In order to complete the project as instructed it you had to stick to
				the following constraints:
				<ul>
					<li>
						Must be user friendly. Use of labels and/or directions allow for an
						“untrained” person to utilize the machine.
					</li>
					<li>Must successfully meet the team's design statement.</li>
					<li>Must be efficient and reliable.</li>
					<li>
						Program must include pseudocode and a filled out pltw template.
					</li>
					<li>
						Program includes functions, while loops, if/else structures, and
						variables.
					</li>
					<li>Must be able to run “untethered” from the computer</li>
					<li>Must include some autonomous component</li>
				</ul>
				Me and my classmates were given two routes to follow, one being a robot
				and the other was to integrate a microcontroller into our previous
				arcade game project. I chose the arcade game option and started from
				scratch, as my previous arcade game didn’t require any automation.
			</p>
			<Tp>
				Most of my classmates used a microcontroller called a Vex Cortex. These
				were supplied to us and interfaced with the rest of the VEX parts we had
				in the classroom. However there were some limitations. While it was
				convenient that the Vex Cortex worked with the part we already had, it
				only supported those parts. This meant that many of the parts that were
				required to make my game idea functional were not available. In addition
				the Vex Cortex ran on its own programming language called RobotC, and
				even though it was easy to learn it had even more limitations.
			</Tp>
			<Tp>
				Instead I used an Arduino Nano, something I already had experience using
				and it used C++, a language I knew. In addition it provided libraries
				for the LCD and the buzzer.
			</Tp>
			<Tp>
				I began with a basic prototype, an LED bouncing back and forth that
				stopped when you pressed a button. Then I implemented a basic user
				interface using the LCD including a start menu, scores and other
				gameplay elements. Finally I implemented game modes and other finishing
				touches including the enclosure. This wrapped up the project.
			</Tp>
			<Subtitle>Circuit</Subtitle>
			<Image src={'/images/cyclone/circuit.jpg'} />
			<Subtitle>Conclusion</Subtitle>
			<p>
				I am very happy with the final results. However I would make some
				changes. This would include making a custom 3D printed enclosure, this
				would allow for a smaller arcade game and some more uniform spacing
				between the LEDs.
			</p>
			<Sources
				srcs={[
					{
						link: 'https://github.com/grantcox22/Cyclone-Arcade-Game',
						txt: 'Github',
					},
				]}
			/>
		</Article>
	);
}

export function FinalsWeek() {
	return (
		<Article
			cur={data[1]}
			contents={['Images', 'Design Process', 'Conclusion']}
		>
			<p>
				Finals Week is an app that contains all of the tools you need to
				effectively get through finals week. Whether that be a final grade
				calculator, calculators for both cumulative and semester GPA, or a study
				timer. This app can help you prioritize what classes you need to study
				for, and ultimately help you build a better study plan.
			</p>
			<Subtitle>Images</Subtitle>
			<Carousel
				slides={[
					<ImageSlide src="/images/finals-week/img1.jpg" />,
					<ImageSlide src="/images/finals-week/img2.jpg" />,
					<ImageSlide src="/images/finals-week/img3.jpg" />,
					<ImageSlide src="/images/finals-week/img4.jpg" />,
				]}
			/>
			<Subtitle>Design Process</Subtitle>
			<p>
				As the first app I had ever developed, the process was a little shaky.
				Even though I already knew Java, I decided to learn a whole new language
				and API. I choose Flutter for its simplicity and flexibility. It took me
				a couple of days to get a good idea of Dart’s syntax and the structure
				of Flutter. The syntax of Dart is very similar to a combination of
				JavaScript and Java. Whereas Flutter is structured similarly to HTML,
				thus making it pretty easy for me to learn.
			</p>
			<Tp>
				I began with the final grade calculator, as this was the only feature I
				initially planned. However after I finished that I thought the app was
				lacking, so I entered what many developers would call feature hell. I
				added many features that didn’t need to be in the app.
			</Tp>
			<Tp>
				However I eventually ended up in the last stage of development. At this
				point I started testing for bugs, typos, and any other things that would
				ruin the user experience. I finally uploaded the app to the Google Play
				store, not without hiccups, but it was released to all Android phones.
				Unfortunately the Apple app store was out of my budget.
			</Tp>
			<Subtitle>Conclusion</Subtitle>
			<p>
				Being my first app I had not yet learned the problem solving, time
				management, and planning skills I have now. This led to an unnecessarily
				long development time. What should’ve taken three solid work days, took
				about two weeks. However I am pretty happy with the final product, and
				it was a great first project adventuring into app development.
			</p>
			<Sources
				srcs={[
					{ link: 'https://github.com/GCox-Dev/Finals_Week', txt: 'Github' },
					{
						link: 'https://play.google.com/store/apps/details?id=com.grant.gradehub',
						txt: 'Download',
					},
				]}
			/>
		</Article>
	);
}

export function ToDoList() {
	return (
		<Article
			cur={data[2]}
			contents={['Images', 'Design Process', 'Conclusion']}
		>
			<p>
				To Do List is an app that allows you to organize and keep track of all
				of your homework. You can add assignments to your list. Give them a
				name, due date, a subject, and finally a priority. These properties
				allow you to sort through your assignments. If you’d like to knock out
				an entire subject one night, you can sort by subject. If you’d like to
				finish the most important assignments first, sort by priority.
			</p>
			<Subtitle>Images</Subtitle>
			<Carousel
				slides={[
					<ImageSlide src="/images/to-do-list/img1.jpg" />,
					<ImageSlide src="/images/to-do-list/img2.jpg" />,
					<ImageSlide src="/images/to-do-list/img3.jpg" />,
					<ImageSlide src="/images/to-do-list/img4.jpg" />,
				]}
			/>
			<Subtitle>Design Process</Subtitle>
			<p>
				Development of this app went pretty smoothly. I was inspired by a
				classmate who had made a similar application in python. Seeing this
				project I wanted to create something similar as a mobile app.
			</p>
			<Tp>
				Using my previous knowledge I gained in the development of Finals Week,
				I created a more streamlined process. Whereas previously I wrote common
				widgets over and over again, I had created reusable widgets. This sped
				development up exponentially, as I didn’t have to recreate things I had
				already coded.
			</Tp>
			<Subtitle>Conclusion</Subtitle>
			<p>
				In conclusion, the systems I had built for myself made the development
				of this app very easy, and I plan to develop apps like this in the
				future. I thoroughly enjoyed this app, and hope you find it useful too.
			</p>
			<Sources
				srcs={[
					{
						link: 'https://github.com/GCox-Dev/homework-to-do-list',
						txt: 'Github',
					},
					{
						link: 'https://play.google.com/store/apps/details?id=com.gcoxdev.homework_to_do_list',
						txt: 'Download',
					},
				]}
			/>
		</Article>
	);
}

export function Portfolio() {
	return (
		<Article cur={data[4]} contents={['Design Process', 'Conclusion']}>
			<p>
				This website is a showcase of my computer science projects. These range
				from websites and app development, to arduino robots, and even
				javascript games. I love to code, and I love to share my work. So by
				creating this website I have done both, it allows me to share everything
				I do to the world.
			</p>
			<Subtitle>Design Process</Subtitle>
			<p>
				This is the fifth version of this site. I have been building some sort
				of my own personal website for about six years, however I only took it
				seriously when I started on the third version. This had some of the
				features that exist today however I did not use git at the time and it
				was ultimately lost when the laptop went out.
			</p>
			<Tp>
				The fourth version was created with HTML/CSS and vanilla JavaScript.
				This was the version initially released. It had most of the features of
				the current site, however it was missing sorting and a site wide search
				bar.
			</Tp>
			<Tp>
				The fifth version is the current one. I built this version of the
				website in React, making development much easier. I added the search bar
				to the nav, filtering, and some new animations. But I ultimately made
				the change to create a cleaner than the previous version.
			</Tp>
			<Subtitle>Conclusion</Subtitle>
			<p>
				This project has been one of my favorite projects to work on. I have
				dreamed of having a website of my one for years, and finally I have one.
				Computer Science is one of my biggest passions. Despite having many
				hobbies, most of them involve computers. So to have a website where I
				can post about it is a source of great pride for me.
			</p>
			<Sources
				srcs={[
					{
						link: 'https://github.com/GCox-Dev/Portfolio-Website',
						txt: 'Github',
					},
				]}
			/>
		</Article>
	);
}

export function NBodyArticle() {
	return (
		<Article
			cur={data[5]}
			contents={['Explanation', 'Screen Shots', 'Conclusion']}
		>
			<p>
				A <a href="https://gcox.dev/projects/n-body/demo">N-Body Simulation</a>{' '}
				calculates the gravity for a system of a n amount of bodies. This serves
				to explore planetary orbits and how planets affect each other. You can
				click to add a body to the simulation. By clicking and dragging you can
				give the body an initial velocity. In addition you can alter parameters
				like initial mass and the gravitational constant.
			</p>
			<Subtitle>Explanation</Subtitle>
			<p>
				The force of gravity on one body in a system equals the sumation of
				forces equal to the gravitational constant times the product of the two
				masses over the distance between the two bodies squared. Or ΣF = G *
				((m₁ * m₂) / r²). This equation can be calculated by looping over every
				body in the system:{' '}
			</p>
			<Code lang="javascript">
				{`for (let i = 0; i < bodies.length; i++) {
    let b1 = bodies[i]
    for (let j = 0; j < bodies.length; j++) {
        let b2 = bodies[j]

    }
}`}
			</Code>
			<p>Now we can find the distance between body 1 and body 2:</p>
			<Code lang="javascript">
				{`let dx = b2.pos.x - b1.pos.x
let dy = b2.pos.y - b1.pos.y
let dist = Math.sqrt((dx * dx) + (dy * dy) + (S*S))`}
			</Code>
			<p>
				Because we only need the acceleration and not the force, we need to
				divide the mass of the first body from the equation. This results in the
				mass of the first body being excluded from the equation. Now that we
				have this acceleration we can add it to the total acceleration of body
				1:
			</p>
			<Code lang="javascript">
				{`b1.acc.x += G * b2.mass * dx / Math.pow(dist, 2);
b1.acc.y += G * b2.mass * dy / Math.pow(dist, 2);`}
			</Code>
			<p>All together this should look like:</p>
			<Code lang="javascript">
				{`for (let i = 0; i < bodies.length; i++) {
    let b1 = bodies[i];
    b1.acc = {x : 0, y : 0};
    for (let j = 0; j < bodies.length; j++) {
        let b2 = bodies[j];

        // Caluclate Distance
        let dx = b2.pos.x - b1.pos.x;
        let dy = b2.pos.y - b1.pos.y;

        // Calculate Acceleration
        let dist = Math.sqrt((dx * dx) + (dy * dy) + (S*S));
        b1.acc.x += G * b2.mass * dx / Math.pow(dist, 2);
        b1.acc.y += G * b2.mass * dy / Math.pow(dist, 2);
    }
}`}
			</Code>
			<Subtitle>Screen Shots</Subtitle>
			<Carousel
				slides={[
					<ImageSlide src="/images/n-body/img1.png" />,
					<ImageSlide src="/images/n-body/img2.png" />,
					<ImageSlide src="/images/n-body/img3.png" />,
				]}
			/>
			<Subtitle>Conclusion</Subtitle>
			<p>
				This was an awesome project. I learned how to use a canvas with
				JavaScript and how to simulate different objects. I had great fun
				figuring out how to visualize this physics equation I learned in AP
				Physics.
			</p>
			<Sources
				srcs={[
					{
						link: 'https://github.com/grantcox22/N-Body-Simulation',
						txt: 'Github',
					},
					{ link: 'https://gcox.dev/projects/n-body/demo', txt: 'Demo' },
				]}
			/>
		</Article>
	);
}

export function MapGenerationArticle() {
	return (
		<Article
			cur={data[7]}
			contents={[
				'Random Noise',
				'Perlin Noise',
				'Diamond Square Algorithm',
				'Layered Noise',
				'Results',
				'Conclusion',
			]}
		>
			<p>
				With this{' '}
				<a href="https://gcox.dev/projects/map-generation/demo">tool</a> you can
				procedurally generate cool maps. Using different noise algorithms allows
				you to generate random and unique maps every time. With two different
				noise algorithms you can explore their different benefits and drawbacks,
				and learn how you can implement these concepts into your own projects.
			</p>
			<Subtitle>Random Noise</Subtitle>
			<p>
				Noise has many applications within computer science. In this case we are
				using noise to procedurally generate maps. By generating random values
				within an array we can make a height map. From there we can assign
				different colors according to the height of that point. However as you
				can see in the picture below there is a problem with randomly generated
				noise. There are no smooth transitions between points, which results in
				unnatural height maps. This is where other types of noise come in.
			</p>
			<Image src={'/images/map-generation/noise1.png'} />
			<Subtitle>Perlin Noise</Subtitle>
			<p>
				Perlin Noise was developed by Ken Perlin in the early 80s. It is an
				extremely useful and versatile algorithm and can be used to generate
				fire effects, water, clouds, and in our case terrain. For a more in
				depth explanation visit this extremely helpful{' '}
				<a href="https://adrianb.io/2014/08/09/perlinnoise.html">article</a>
			</p>
			<Image src={'/images/map-generation/noise2.png'} />
			<Subtitle>Diamond Sqaure Algorithm</Subtitle>
			<p>
				The diamond square algorithm is another way to generate height maps.
				However instead of finding random values for every point within the area
				random values are assigned to the corners of the height map. The first
				step is the diamond step. For every square in the array we take the
				midpoint of that square and set it to the average of the four corners.
				The second step is the square step. For every diamond in the array we
				take the midpoint of that diamond and set it the average of the four
				corners plus a random value. These steps are repeated, each time with
				smaller increments until the array is filled with values.
			</p>
			<Image src={'/images/map-generation/diamondsquare.png'} />
			<Image src={'/images/map-generation/noise3.png'} />
			<Subtitle>Layered Noise</Subtitle>
			<p>
				Another way we can apply the perlin noise algorithm is by layering the
				noise. This helps with creating a rougher and more natural look. This is
				achieved by looping over each point in an array multiple times, each
				time applying the perlin noise algorithm, but with increasing frequency
				and decreasing amplitude every time the point is looped over. See the
				example below.
			</p>
			<Image src={'/images/map-generation/noise4.png'} />
			<Subtitle>Results</Subtitle>
			<p>
				The diamond square algoritm, as seen below, produces more noisy terrain.
				This can in some cases be better for certain applications as the rough
				edges can look more natural.
			</p>
			<br></br>
			<Carousel
				slides={[
					<ImageSlide src="/images/map-generation/diamond-square-1.png" />,
					<ImageSlide src="/images/map-generation/diamond-square-2.png" />,
					<ImageSlide src="/images/map-generation/diamond-square-3.png" />,
				]}
			/>
			<br></br>
			<p>
				The perlin noise algorithm produces much smoother edges. While this
				looks less natural on a small scale when applied to procedurally
				generating game worlds this becomes an advatange. The lack of noisy
				seems between two terrain types helps 3d meshes become less complicated
				and elemenate unnatural artifacts.
			</p>
			<br></br>
			<Carousel
				slides={[
					<ImageSlide src="/images/map-generation/perlin-noise-1.png" />,
					<ImageSlide src="/images/map-generation/perlin-noise-2.png" />,
					<ImageSlide src="/images/map-generation/perlin-noise-3.png" />,
				]}
			/>
			<Subtitle>Conclusion</Subtitle>
			<p>
				While the diamond square algorithm provides for some noisy natural
				terrain, perlin noise is the superior algorithm in application. Duw to
				its wide spread use in game development many libraries already exist.
				And with the use of noise layering a more natural look and be acheived
				by blending many layers of perlin noise.
			</p>
			<Sources
				srcs={[
					{
						link: 'https://github.com/grantcox22/MapGeneration.git',
						txt: 'Github',
					},
					{
						link: 'https://gcox.dev/projects/map-generation/demo',
						txt: 'Demo',
					},
				]}
			/>
		</Article>
	);
}

export function GameOfLifeArticle() {
	return (
		<Article
			cur={data[9]}
			contents={['Images', 'How it Works', 'Simulation in Motion']}
		>
			<p>
				The{' '}
				<a href="https://gcox.dev/projects/game-of-life/demo">Game of Life</a>{' '}
				is a cellular automaton devised by British mathematician John Conway in
				the 1970s. Despite its simplicity, it is possible to create advanced
				machines using the life-like behaviors of the structures that form.
			</p>
			<Subtitle>Images</Subtitle>
			<Carousel
				slides={[
					<ImageSlide src="/images/game-of-life/img1.svg" />,
					<ImageSlide src="/images/game-of-life/img2.svg" />,
					<ImageSlide src="/images/game-of-life/img3.svg" />,
				]}
			/>
			<Subtitle>How it Works</Subtitle>
			<p>
				The simulation runs off of a simple set of rules. These rules decide if
				a cell lives or dies based on its neighbor's state.
				<ul>
					<li>
						If a cell has less than two neighbors it dies due to underpopulation
					</li>
					<li>If a cell has two neighbors it stays the same</li>
					<li>If a cell has three neighbors it becomes alive</li>
					<li>
						If a cell has more than three neighbors it dies due to
						overpopulation
					</li>
				</ul>
				This creates the illusion of life as cells reproduce, live, and die.
			</p>
			<Tp>
				During each cycle of the simulation, each cell checks each of its
				neighbor's states at that moment in time. Depending on how many
				neighbors are alive or dead at the given moment decides whether or not
				that cell survives or dies. Most formations are unstable however there
				are some formations that will survive given there are no interruptions.
				There are three types of these: still lifes, oscillators, and
				spaceships.
			</Tp>
			<Subtitle>Simulation in Motion</Subtitle>
			<Video
				src={'https://www.youtube.com/embed/4rzF-hFc1gw?playlist=4rzF-hFc1gw'}
			/>
			<Sources
				srcs={[
					{ link: 'https://github.com/grantcox22/GameOfLife', txt: 'Github' },
					{ link: 'https://gcox.dev/projects/game-of-life/demo', txt: 'Demo' },
				]}
			/>
		</Article>
	);
}
