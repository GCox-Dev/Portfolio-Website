var canvas = null;
var ctx = null;

const START = 0;
const GAME = 1;
const GAMEOVER = 2;

var score = 0;
var highscore = 0;
var gameState = START;

var accentColor = "#e82c6e";
var appleColor = "#e82c6e";
var snakeColor = "#42e82c";

var colorScheme = 0;

class Apple {
    constructor(width, color) {
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);   
        this.width = width;
        this.color = color;
    }

    respawn() {
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);   
    }

    draw() {
        ctx.fillStyle = appleColor;
        ctx.fillRect(this.x * this.width, 50 + this.y * this.width, this.width, this.width);
    }
}

class Snake {
    constructor(x,y, width) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.ndx = 0;
        this.ndy = 0;
        this.tailLen = 2;
        this.tailX = [];
        this.tailY = [];
        this.width = width;
    }

    update() {

        this.dx = this.ndx;
        this.dy = this.ndy;

        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x + this.dx > 20 || this.y < 0 || this.y + this.dy > 20) {
            this.dead();
        }

        if (this.x == apple.x && this.y == apple.y) {
            apple.respawn();
            score++;
            this.tailLen++;
        }

        if (this.tailLen > 2) {
            for (let i = 0; i < this.tailLen; i++) {
                if (this.x == this.tailX[i] && this.y == this.tailY[i]) this.dead();
                if (apple.x == this.tailX[i] && apple.y == this.tailY[i]) apple.respawn();
            }
        }

        
        let prevX = this.tailX[0];
        let prevY = this.tailY[0];
        this.tailX[0] = this.x;
        this.tailY[0] = this.y;
        for (let i = 0; i < this.tailLen; i++) {
            let prev2X = this.tailX[i];
            let prev2Y = this.tailY[i];
            this.tailX[i] = prevX;
            this.tailY[i] = prevY;
            prevX = prev2X;
            prevY = prev2Y;
        }
    }
    
    draw() {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(this.x * this.width, 50 + this.y * this.width, this.width, this.width);
        for (let i = 0; i < this.tailLen; i++) {
            ctx.fillRect(this.tailX[i] * this.width, 50 + this.tailY[i] * this.width, this.width, this.width);
        }
    }

    dead() {
        this.x = 1;
        this.y = 1;
        this.ndx = 0;
        this.ndy = 0;
        this.tailLen = 2;
        this.tailX = [];
        this.tailY = [];
        gameState = GAMEOVER;
        if (score > highscore) {
            highscore = score;
            window.localStorage.setItem("highscore", score)
        }
        apple.respawn();
    }
}

let apple = new Apple(40);
let player = new Snake(1, 1, 40)

function init() {
    if (window.innerHeight < 600 || window.innerWidth < 600) {
        console.log("Test")
        document.querySelector('.nosupport').style.display = "flex";
        document.querySelector('.canvas').style.display = "none";
    } else {
        document.querySelector('.nosupport').style.display = "none";
        document.querySelector('.canvas').style.display = "block";
    }
    canvas = document.querySelector(".canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = 800;
    ctx.canvas.height = 850;

    if (window.localStorage.getItem("highscore") !== null) {
        highscore = JSON.parse(window.localStorage.getItem("highscore"));
    } else {
        highscore = 0;
    }
    console.log(highscore);

    window.addEventListener("keydown", onKeyDown, false);

    drawGame = setInterval(draw, 10);
    updateGame = setInterval(update, 80);
}

window.addEventListener("resize", () => {
    if (window.innerHeight < 650 || window.innerWidth < 600) {
        document.querySelector('.nosupport').style.display = "flex";
        document.querySelector('.canvas').style.display = "none";
    } else {
        document.querySelector('.nosupport').style.display = "none";
        document.querySelector('.canvas').style.display = "block";
    }
});

function layeredText(txt, x, y, color, background) {
    ctx.fillStyle = background;
    ctx.fillText(txt, x+ 5, y);
    ctx.fillStyle = color;
    ctx.fillText(txt, x, y);
}

function scoreBoard() {
    ctx.font = '40px VT323';
    ctx.fillStyle = accentColor;
    ctx.fillRect(0,0,800,50);
    ctx.fillStyle = "white";
    ctx.textBaseline = 'top';
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${score}`, 10,2);
    ctx.textAlign = "right";
    ctx.fillText(`Highscore: ${highscore}`, ctx.canvas.width - 15, 2);
}

function startMenu() {
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.font = '200px VT323';
    layeredText("SNAKE", ctx.canvas.width / 2, ctx.canvas.height / 2 - 125, "white", accentColor);
    ctx.font = '50px VT323';
    layeredText("PRESS ENTER", ctx.canvas.width / 2, ctx.canvas.height / 2 + 50, "white", accentColor);
}

function gameOver() {
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillStyle = "red";
    ctx.font = '150px VT323';
    layeredText("GAME OVER", ctx.canvas.width / 2, ctx.canvas.height / 2 - 100, "white", "red");
    ctx.font = '50px VT323';
    layeredText("PRESS ANY KEY", ctx.canvas.width / 2, ctx.canvas.height / 2 + 30, "white", "red");
}

function grid() {
    for (let i = 0; i < 20; i+=1) {
        for (let j = 0; j < 20; j+=1) {
            if ((i + j + 1) % 2 == 0) {
                ctx.fillStyle = "#0c0c0c";
            } else {
                ctx.fillStyle = "#000";
            }
            ctx.fillRect(i*40,j*40+50,40,40);
        }
    }
}

function draw() {

    grid();
    scoreBoard();

    if (gameState == START) {
        startMenu();
    } else if (gameState == GAME) {
        apple.draw();
        player.draw();
    } else if (gameState == GAMEOVER) {
        gameOver();
    }

    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 10;
    ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function update() {
    if (gameState == GAME) player.update();
}

function onKeyDown(e) {
    if (gameState == GAME) {
        if (player.tailLen > 2) {
            if (e.keyCode == 37 && player.dx != 1) {
                player.ndx = -1;
                player.ndy = 0;
            }   else if (e.keyCode == 39 && player.dx != -1) {
                player.ndx = 1;
                player.ndy = 0;
            }   else if (e.keyCode == 38 && player.dy != 1) {
                player.ndx = 0;
                player.ndy = -1;
            }   else if (e.keyCode == 40 && player.dy != -1) {
                player.ndx = 0;
                player.ndy = 1;
            }
        }
        else {
            if (e.keyCode == 37) {
                player.ndx = -1;
                player.ndy = 0;
            }   else if (e.keyCode == 39) {
                player.ndx = 1;
                player.ndy = 0;
            }   else if (e.keyCode == 38) {
                player.ndx = 0;
                player.ndy = -1;
            }   else if (e.keyCode == 40) {
                player.ndx = 0;
                player.ndy = 1;
            }
        }
    }

    if (gameState == START) {
        if (e.keyCode == 13) {
            gameState = GAME;
        }
    }

    if (gameState == GAMEOVER) {
        gameState = GAME;
        score = 0;
    }
}

document.querySelector(".canvas").addEventListener("mousedown", () => {
    colorScheme++;
    if (colorScheme > 4) {
        colorScheme = 0;
    }

    if (colorScheme == 0) {
        accentColor = "#e82c6e";
        appleColor = "#e82c6e";
        snakeColor = "#42e82c";
    } else if (colorScheme == 1) {
        accentColor = "#42e82c";
        snakeColor = "#42e82c";
        appleColor = "red";
    } else if (colorScheme == 2) {
        accentColor = "#055deb";
        snakeColor = "#db8204";
        appleColor = "#055deb";
    } else if (colorScheme == 3) {
        accentColor = "#8f1ae8";
        snakeColor = "#e8da1a";
        appleColor = "#8f1ae8";
    } else if (colorScheme == 4) {
        accentColor = "#00b5a0";
        snakeColor = "white";
        appleColor = "red";
    }
});

init();
draw();