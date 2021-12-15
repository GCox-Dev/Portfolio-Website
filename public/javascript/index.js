let projects = null;
let doFeaturedAnimation = false;
let doSkillsAnimation = false;
let navOn = false;

// Load Data

function init(func) {
    fetch('../assets/data.json')
        .then(response => response.json())
        .then((data) => {
            func(data);
        })
        .catch(error => console.log(error));
}

function createFeaturedFromData() {
    let projectsContainer = document.querySelector(".featured-content");
    let index = 0;
    if (projects != null) {
        projects.forEach((project) => {
            if (project.featured) {
                let summary = "";
                let introduction = project.intro.split(" ");
                let letterCount = 0;
                for (let i = 0; i < introduction.length && i < 40; i++) {
                    summary += introduction[i] + " ";
                    letterCount = i;
                }
                if (letterCount == 39) summary += " [...]";
                index++;
                projectsContainer.innerHTML += `
                <div class="card featured-card">
                    <code class="number">0${index}</code>
                    <code class="title">${project.title}</code>
                    <p>${summary}</p>
                    <a href="${project.page_link}">read more</a>
                </div>
                `;
            }
        });
    } else {

    }
}

// Universal Animations

function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    let site = document.querySelector("html");

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navOn = !navOn;
        if (navOn) site.style.overflowY = "hidden";
        else site.style.overflowY = "scroll";
        navLinks.forEach((link, index) => {
            if (link.style.animation) link.style.animation = "";
            else link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        burger.classList.toggle('toggle');
    });
}

function typeAnimation(txt, tar, spd) {
    const textElement = document.querySelector(`.${tar}`);
    var i = 0;
    textElement.textContent = '';
    function typeWriter() {
        if (i < txt.length) {
            textElement.innerHTML += txt.charAt(i);
            i++;
            setTimeout(typeWriter, spd);
        }
    }

    typeWriter();
}

function flashingChar(txt, char, tar, spd) {
    let charOn = false;
    const textElement = document.querySelector(`.${tar}`);
    function frame() {
        if (charOn) textElement.innerHTML = `${txt}${char}`;
        else textElement.innerHTML = txt;
        charOn = !charOn;
    }
    setInterval(() => frame(), spd);
}

function sendTo(tar, dur) {
    const target = document.querySelector(`.${tar}`);
    var targetPosition = target.offsetTop;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTime = null;

    function animation(currentTime) {
        if (startTime == null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, dur);
        window.scrollTo(0, run);
        if (timeElapsed < dur) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Section Animations

function headerAnimation() {
    window.setTimeout(() => typeAnimation('Web Dev', 'header-title', 150), 300);
    window.setTimeout(() => typeAnimation('App Dev', 'header-title', 150), 3100);
    window.setTimeout(() => typeAnimation('GCox Dev', 'header-title', 150), 6500);
    window.setTimeout(() => flashingChar('GCox Dev', '_', 'header-title', 500), 7500);
}

function featuredAnimation() {
    window.setTimeout(() => typeAnimation('Projects', 'featured', 150), 300);
    window.setTimeout(() => {
        flashingChar('Projects', ':', "featured", 500);
        let projectCards = document.querySelectorAll('.featured-card');

        let index = 0;

        let timer = setInterval(addCard, 500);

        function addCard() {
            projectCards[index].classList.toggle("visible");
            index++;
            if (index === projectCards.length) {
                clearInterval(timer);
                timer = null;
            }
        }

    }, 1200);
}

function skillsAnimation() {
    window.setTimeout(() => typeAnimation('Skills', 'skills', 150), 300);
    window.setTimeout(() => {
        flashingChar('Skills', ':', "skills", 500);
        let projectCards = document.querySelectorAll('.skill-card');

        let index = 0;

        let timer = setInterval(addCard, 500);

        function addCard() {
            projectCards[index].classList.toggle("visible");
            index++;
            if (index === projectCards.length) {
                clearInterval(timer);
                timer = null;
            }
        }

    }, 1100);
}

function aboutAnimation() {
    window.setTimeout(() => typeAnimation('About', 'header-title', 150), 300);
    window.setTimeout(() => flashingChar('About', '_', 'header-title', 500), 900);
}

function projectsAnimation() {
    window.setTimeout(() => typeAnimation('Projects', 'header-title', 150), 300);
    window.setTimeout(() => flashingChar('Projects', '_', 'header-title', 500), 900);
}

//Buttons

function button(tar, func) {
    let button = document.querySelector(`.${tar}`);
    button.addEventListener("click", () => func());
}

function callToAction() {
    let charOn = false;
    const button = document.querySelector(`.call-to-action`);
    function frame() {
        if (charOn) button.style.opacity = 1;
        else button.style.opacity = 0;
        charOn = !charOn;
    }
    setInterval(() => frame(), 1000);
}

function toTopIn() {
    let header = document.querySelector('.header');
    let button = document.querySelector('.to-top');
    if (window.pageYOffset >= header.getBoundingClientRect().bottom * 0.75) button.style.opacity = 1;
    else button.style.opacity = 0;
}

// Main Functions

function homeMain(data) {
    projects = data;
    headerAnimation();
    navSlide();
    toTopIn();
    createFeaturedFromData();
    featuredTitle();
    skillsTitle();
    callToAction();
    onScroll([toTopIn, featuredTitle, skillsTitle]);
    button('to-top', () => sendTo('header', 1000));
    button('call-to-action', () => sendTo('sec-1', 1000));
}

function aboutMain() {
    aboutAnimation();
    navSlide();
    toTopIn();
    callToAction();
    onScroll([toTopIn]);
    button('to-top', () => sendTo('header', 1000));
    button('call-to-action', () => sendTo('sec-1', 1000));
}

function projectsMain(data) {
    projects = data;
    navSlide();
    projectsAnimation();
    toTopIn();
    callToAction();
    onScroll([toTopIn]);
    button('to-top', () => sendTo('header', 1000));
    button('call-to-action', () => sendTo('sec-1', 1000));
}

// Page Interactions

function onScroll(args) {
    window.addEventListener("scroll", () => {
        for (let i = 0; i < args.length; i++) {
            args[i]();
        }
    });
}

function featuredTitle() {
    let header = document.querySelector('.header');
    if (window.pageYOffset >= header.getBoundingClientRect().bottom * 0.5 && !doFeaturedAnimation) {
        featuredAnimation();
        doFeaturedAnimation = true;
    }
}

function skillsTitle() {
    let header = document.querySelector('.sec-1');
    if (window.pageYOffset >= header.getBoundingClientRect().bottom * 1.4 && !doSkillsAnimation) {
        skillsAnimation();
        doSkillsAnimation = true;
    }
}

window.addEventListener("resize", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    let site = document.querySelector("html");
    navOn = false;
    site.style.overflowY = "scroll";

    nav.classList.remove('nav-active');
    navLinks.forEach((link, index) => {
        if (link.style.animation) link.style.animation = "";
    });
    burger.classList.remove('toggle');
});