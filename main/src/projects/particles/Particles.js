import React, { useRef, useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { FiSettings } from 'react-icons/fi';

const WHITE = ["#ffffff", "#dddddd", "#fefefe"];
const RED = ["#ff0000", "#ff2200", "#dd1100"];
const GREEN = ["#00ff00", "#22ff00", "#11dd00"];
const BLUE = ["#0000ff", "#2200ff", "#1100dd"];
const RAINBOW = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"];
const RWB = ["#ff0000", "#ffffff", "#0000ff"];
const RGB = ["#ff0000", "#00ff00", "#0000ff"];

function color(scheme) {
    switch (scheme) {
        case "white":
            return WHITE[Math.floor(Math.random() * 3)];
        case "red":
            return RED[Math.floor(Math.random() * 3)];
        case "green":
            return GREEN[Math.floor(Math.random() * 3)];
        case "blue":
            return BLUE[Math.floor(Math.random() * 3)];
        case "rainbow":
            return RAINBOW[Math.floor(Math.random() * 7)];
        case "rwb":
            return RWB[Math.floor(Math.random() * 3)];
        case "rgb":
            return RGB[Math.floor(Math.random() * 3)];
    }
}

class Particle {
    constructor(x,y,settings) {
        this.x = x;
        this.y = y;
        this.velX = ((Math.random() * settings.speed.value) - (settings.speed.value / 2)) / 10;
        this.velY = ((Math.random() * settings.speed.value) - (settings.speed.value / 2)) / 10;
        this.size = (Math.random() * settings.max.value) + (settings.max.value / 2);
        this.color =  color(settings.scheme.value);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(settings, mouse) {

        if (this.x > window.innerWidth - this.size || this.x < 0) {
            this.velX *= -1;
        } if (this.y > window.innerHeight - this.size || this.y < 0) {
            this.velY *= -1;
        }

        if (settings.collide.checked) {
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
        }

        this.x += this.velX;
        this.y += this.velY;

    }

}

export default function Particles() {

    const canvasRef = useRef(null);
    const showSettings = useRef(null);
    const settings = useRef(null);
    const ctx = useRef(null);
    const UI = useRef(true);
    const [MOUSE, setMOUSE] = useState(false);

    let particles = [];

    let mouse = {
        x: null,
        y: null,
        radius: 100
    }

    function mouseMove(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }

    function mouseOut(event) {
        mouse.x = undefined;
        mouse.y = undefined;
    }

    window.onresize = () => {
        ctx.current.canvas.width = window.innerWidth;
        ctx.current.canvas.height = window.innerHeight;
        setParticles();
    }

    function setParticles() {
        particles = [];
        for (let i = 0; i < settings.current.number.value; i++) {
            let x = (Math.random() * (window.innerWidth - 50)) + 25;
            let y = (Math.random() * (window.innerHeight - 50)) + 25;
            particles.push(new Particle(x, y, settings.current));
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        const context = canvas.getContext('2d');
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;

        ctx.current = context;

        let can = document.querySelector(".canvas");

        can.onmousemove = mouseMove;
        can.onmouseout = mouseOut;

        setParticles();

        animate();
    });

    function animate() {

        ctx.current.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(settings.current, mouse);
            particles[i].draw(ctx.current);
        }
        requestAnimationFrame(animate);
    }

    return (
        <>
        <canvas className="canvas" ref={canvasRef}></canvas>
        <><form className="settings" ref={settings} >
            <label>Number</label>
            <input name='number' type="range" min="100" max="1000" defaultValue={500} onChange={() => setParticles()}/>
            <label>Max Radius</label>
            <input name='max' type="range" min="1" max="20" defaultValue={5} onChange={() => setParticles()}/>
            <label>Speed</label>
            <input name='speed' type="range" min="1" max="10" defaultValue={5} onChange={() => setParticles()}/>
            <label>Mouse</label>
            <input name="collide" type="checkbox" defaultValue={true} onClick={() => {setMOUSE(settings.current.collide.checked)}}/>
             {MOUSE && <><label>Mouse Radius</label>
            <input name='mouse_radius' type="range" min="50" max="200" defaultValue={100} onChange={(e) => {mouse.radius = e.target.value}}/></>}
            <label>Color</label>
            <select name={"scheme"} defaultValue={"white"} onChange={() => setParticles()}>
                <option value={"white"}>white</option>
                <option value={"red"}>red</option>
                <option value={"green"}>green</option>
                <option value={"blue"}>blue</option>
                <option value={"rainbow"}>rainbow</option>
                <option value={"rwb"}>r/w/b</option>
                <option value={"rgb"}>r/g/b</option>
            </select>
            <p onClick={() => {
                UI.current = !UI.current;
                if (UI.current) {
                    settings.current.style.visibility = "visible";
                    showSettings.current.style.display = "none";
                } else {
                    settings.current.style.visibility = "hidden";
                    showSettings.current.style.display = "block";
                }
            }}>Hide UI</p>
        </form>
        <div className='showSettings' ref={showSettings} onClick={() => {
            UI.current = !UI.current;
            if (UI.current) {
                settings.current.style.visibility = "visible";
                showSettings.current.style.display = "none";
            } else {
                settings.current.style.visibility = "hidden";
                showSettings.current.style.display = "block";
            }
        }}><FiSettings/></div>
        <a href="./"><Logo className="logo" /></a></>
        </>
    );
}