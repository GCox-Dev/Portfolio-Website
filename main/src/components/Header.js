import React, { useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { typeWriter } from '../components/animations';
import NavBar from './NavBar'


export default function Header(props) {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const header = useRef(null);
    const headerTitle = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        ctxRef.current = ctx;

        init();
        animate();
        typeWriter(props.titles, ".header-title", 200);

    }, []);

    let particleArray = []

    let mouse = {
        x: null,
        y: null,
        radius: 75
    }

    let density = 7000;

    function mouseMove(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }

    function mouseOut() {
        mouse.x = undefined;
        mouse.y = undefined;
    }

    window.onresize = () => {
        ctxRef.current.canvas.width = window.innerWidth;
        ctxRef.current.canvas.height = window.innerHeight;
        reset();
    }

    class Particle {
        constructor(x,y,dirX,dirY,size,color) {
            this.x = x;
            this.y = y;
            this.dirX = dirX;
            this.dirY = dirY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctxRef.current.beginPath();
            ctxRef.current.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
            ctxRef.current.fillStyle = this.color;
            ctxRef.current.fill();
        }

        update() {
            if (this.x > window.innerWidth || this.x < 0) {
                this.dirX *= -1;
            } if (this.y > window.innerHeight || this.y < 0) {
                this.dirY *= -1;
            }

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < mouse.radius) {
                if (mouse.x < this.x && this.x < window.innerWidth - this.size * 10) {
                    this.x += mouse.radius - distance;
                }
                if (mouse.x > this.x && this.x > this.size * 10) {
                    this.x -= mouse.radius - distance;
                }
                if (mouse.y < this.y && this.y < window.innerHeight - this.size * 10) {
                    this.y += mouse.radius - distance;
                }
                if (mouse.y > this.y && this.y > this.size * 10) {
                    this.y -= mouse.radius - distance;
                }
            }

            this.x += this.dirX;
            this.y += this.dirY;
            this.draw();
        }

    }

    function init() {
        particleArray = []
        let numberOfParticles = Math.round((window.innerWidth * window.innerHeight) / density);
        numberOfParticles = (numberOfParticles < 200) ? numberOfParticles : 200;
        console.log(numberOfParticles);
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1) + 0.5;
            let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
            let dirX = (Math.random() * 0.5) - 0.25;
            let dirY = (Math.random() * 0.5) - 0.25;
            let color = '#ffffff';
            particleArray.push(new Particle(x, y, dirX, dirY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctxRef.current.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].update();
        }

        connect();
    }

    function connect() {
        let opacity = 1;
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
                let distance = ((particleArray[a].x - particleArray[b].x)
                * (particleArray[a].x - particleArray[b].x))
                + ((particleArray[a].y - particleArray[b].y)
                * (particleArray[a].y - particleArray[b].y));
                opacity = 0.75 - distance / 20000;
                if (distance < (window.innerWidth/7) * (window.innerHeight/7)) {
                    ctxRef.current.strokeStyle = `rgba(255,255,255,${opacity}`;
                    ctxRef.current.beginPath();
                    ctxRef.current.moveTo(particleArray[a].x, particleArray[a].y);
                    ctxRef.current.lineTo(particleArray[b].x, particleArray[b].y);
                    ctxRef.current.stroke();
                }
            }
        }
    }

    const reset = () => init();

    function callToAction() {
        var targetPosition = window.innerHeight;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var startTime = null;
    
        function animation(currentTime) {
            if (startTime == null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, distance, 1000);
            window.scrollTo(0, run);
            if (timeElapsed < 1000) requestAnimationFrame(animation);
        }
    
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
    
        requestAnimationFrame(animation);
    }

    return (
        <header
        onMouseMove={(event) => mouseMove(event)}
        onMouseOut={mouseOut()}
        ref={header}>
            <canvas ref={canvasRef} className='header-animation'></canvas>
            <div className='header-content'>
                <code ref={headerTitle} className='header-title'></code>
                <FaChevronDown onClick={callToAction} className="call-to-action"/>
            </div>
        </header>
    );
}