import React, { useRef, useEffect } from 'react';
import { BsFileBreakFill, BsTelephoneMinus } from 'react-icons/bs';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import "./style.css"

const WIDTH = 1600;
const HEIGHT = 1200;

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dy = 0;
        this.score = 0;
        this.width = 20;
        this.height = 200;
    }

    draw(ctx) {

        if (this.y + this.dy > 0 && this.y + this.dy + this.height < HEIGHT) this.y += this.dy;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ball {
    constructor() {
        this.width = 20;
        this.height = 20;
        this.x = WIDTH / 2 - this.width / 2;
        this.y = HEIGHT / 2 - this.height / 2;
        this.dx = (Math.random() * 2 > 1) ? 6 : -6;
        this.dy = (Math.random() * 2 > 1) ? 6 : -6;
    }

    draw(ctx, player1, player2) {

        if ((this.x + this.dx < player1.x && this.y + this.dy + this.height > player1.y && this.y + this.dy < player1.y + player1.height) ||
            (this.x + this.dx + this.width > player2.x && this.y + this.dy + this.height > player2.y && this.y + this.dy < player2.y + player2.height)) {
            this.dx *= -1.1;
            this.dy *= 1.1;
        }

        if (this.y + this.dy < 0 || this.y + this.dy + this.height > HEIGHT) {
            this.dy *= -1;
        }

        if (this.x + this.dx < 0) {
            player2.score++;
            this.x = WIDTH / 2 - this.width / 2;
            this.y = HEIGHT / 2 - this.height / 2;
            this.dx = (Math.random() * 2 > 1) ? 6 : -6;
            this.dy = (Math.random() * 2 > 1) ? 6 : -6;
        } else if (this.x + this.dx + this.width > WIDTH) {
            player1.score++;
            this.x = WIDTH / 2 - this.width / 2;
            this.y = HEIGHT / 2 - this.height / 2;
            this.dx = (Math.random() * 2 > 1) ? 6 : -6;
            this.dy = (Math.random() * 2 > 1) ? 6 : -6;
        }


        this.x += this.dx;
        this.y += this.dy;

        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default function Pong() {
    

    const canvasRef = useRef(null);
    const ctx = useRef(null);

    const player1 = useRef(new Player(20, 50));
    const player2 = useRef(new Player(1560, 950));
    const ball = useRef(new Ball());

    const play = useRef(false);

    window.onkeydown = (e) => {
        switch (e.keyCode) {
            case 87:
                player1.current.dy = -6;
                break;
            case 83:
                player1.current.dy = 6;
                break;
            case 38:
                player2.current.dy = -6;
                break;
            case 40:
                player2.current.dy = 6;
                break;
            case 13:
                if (!play.current) {
                    player1.current.score = 0;
                    player2.current.score = 0;
                    ball.current.x = WIDTH / 2 - ball.current.width / 2;
                    ball.current.y = HEIGHT / 2 - ball.current.height / 2;;
                }
                play.current = true;
                break;
        }
    }
    window.onkeyup = (e) => {
        switch (e.keyCode) {
            case 87:
                player1.current.dy = 0;
                break;
            case 83:
                player1.current.dy = 0;
                break;
            case 38:
                player2.current.dy = 0;
                break;
            case 40:
                player2.current.dy = 0;
                break;
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        const context = canvas.getContext('2d');
        context.canvas.width = WIDTH;
        context.canvas.height = HEIGHT;
        
        ctx.current = context;

        ctx.current.fillStyle = "#fff";

        animate();
    });

    function halfLine(ctx) {
        for (let i = 0; i < HEIGHT / 20; i++) {
            if (!play.current) {
                if (i % 2 == 0 && (i < HEIGHT / 40 - 5 || i > HEIGHT / 40 + 5)) {
                    ctx.fillRect(1600 / 2 - 10, i * 20, 20, 20);
                }
            }
            else {
                if (i % 2 == 0) ctx.fillRect(1600 / 2 - 10, i * 20, 20, 20);
            }
        }
        if (!play.current) {
            ctx.textAlign = "center";
            ctx.textBaseline = "center";
            ctx.font = "40px PublicPixel";
            ctx.fillText("Enter to Start", WIDTH / 2, HEIGHT / 2);
        }
    }

    function scoreBoard(ctx) {
        ctx.textBaseline = "top";
        ctx.textAlign = "right";
        ctx.font = "100px PublicPixel";
        ctx.fillText(`${player1.current.score}`, WIDTH / 2 - 75, 20);
        ctx.textAlign = "left";
        ctx.fillText(`${player2.current.score}`, WIDTH / 2 + 75, 20);
    }

    function animate() {
        ctx.current.clearRect(0, 0, 1600, 1200);

        scoreBoard(ctx.current);
        halfLine(ctx.current);

        player1.current.draw(ctx.current);
        player2.current.draw(ctx.current);

        if (play.current) {
            ball.current.draw(ctx.current, player1.current, player2.current);
            if (player1.current.score >= 11 || player2.current.score >= 11) {
                play.current = false;
            }
        }

        requestAnimationFrame(animate);
    }

    return (<>
        {window.innerWidth >= 800 && window.innerHeight >= 600 ? <div className="pong"><canvas ref={canvasRef}></canvas></div> : <div className='noresult'><h4>Resolution Not Supported</h4></div>}
        <a href="./"><Logo className="logo"></Logo></a>
    </>);
}