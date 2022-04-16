var canvas = document.querySelector(".header-animation");
var ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth,
ctx.canvas.height = window.innerHeight;

let particleArray = []

let mouse = {
    x: null,
    y: null,
    radius: 100
}

document.querySelector('.header').addEventListener('mousemove',
    (event) => {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }
);
window.addEventListener('resize',
    (event) => {
        ctx.canvas.width = window.innerWidth,
        ctx.canvas.height = window.innerHeight;
        reset();
    }
);

document.querySelector('.header').addEventListener('mouseout',
    (event) => {
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

class Particle {
    constructor(x, y, dirX, dirY, size, color) {
        this.x = x;
        this.y = y;
        this.dirX = dirX;
        this.dirY = dirY;
        this.size = size;
        this.color = color;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.dirX *= -1;
        } if (this.y > canvas.height || this.y < 0) {
            this.dirY *= -1;
        }

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 4;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 4;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 4;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 4;
            }
        }

        this.x += this.dirX;
        this.y += this.dirY;
        this.draw();
    }
}

function init() {
    particleArray = []
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 1) - 0.5;
        let dirY = (Math.random() * 1) - 0.5;
        let color = '#ffffff';
        particleArray.push(new Particle(x, y, dirX, dirY, size, color));
    }

}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

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
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = `rgba(255,255,255,${opacity}`;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function reset() {
    particleArray = []
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let dirX = (Math.random() * 0.5) - 0.25;
        let dirY = (Math.random() * 0.5) - 0.25;
        let color = '#ffffff';
        particleArray.push(new Particle(x, y, dirX, dirY, size, color));
    }
}

init();
animate();