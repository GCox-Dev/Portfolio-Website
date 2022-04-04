var canvas = null;
var ctx = null;

const RANDOM_INITIAL_RANGE = 15;

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}  

class Camera {
    constructor(initScale) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = initScale;
    }
}

class Map {
    constructor(N, tileWidth) {
        this.size = Math.pow(2, N) + 1;

        this.tileWidth = tileWidth;

        this.tiles = new Array(this.size * this.size).fill(0);
    }

    index(x, y) {
        return this.size * x + y;
    }

    init() {
        this.tiles[this.index(0, this.size - 1)] = randomInRange(0, RANDOM_INITIAL_RANGE);
        this.tiles[this.index(0, 0)] = randomInRange(0, RANDOM_INITIAL_RANGE);
        this.tiles[this.index(this.size - 1, this.size - 1)] = randomInRange(0, RANDOM_INITIAL_RANGE);
        this.tiles[this.index(this.size - 1, 0)] = randomInRange(0, RANDOM_INITIAL_RANGE);

        let chunkSize = this.size - 1;
        let randomFactor = RANDOM_INITIAL_RANGE;

        while (chunkSize > 1) {
            this.diamond(chunkSize, randomFactor);
            this.square(chunkSize, randomFactor);
            chunkSize /= 2;
            randomFactor /= 2;
        }
    }

    diamond(chunkSize, randomFactor) {
        let sumComponents = 0;
        let sum = 0;
        for (let i = 0; i < this.size - 1; i += chunkSize) {
          for (let j = 0; j < this.size - 1; j += chunkSize) {
            const BOTTOM_RIGHT = this.tiles[this.index(j + chunkSize, i + chunkSize)];
            const BOTTOM_LEFT = this.tiles[this.index(j + chunkSize, i)];
            const TOP_LEFT = this.tiles[this.index(j, i)];
            const TOP_RIGHT = this.tiles[this.index(j, i + chunkSize)];
            const { count, sum } = [
              BOTTOM_RIGHT,
              BOTTOM_LEFT,
              TOP_LEFT,
              TOP_RIGHT
            ].reduce(
              (result, value) => {
                if (isFinite(value) && value != null) {
                  result.sum += value;
                  result.count += 1;
                }
                return result;
              },
              { sum: 0, count: 0 }
            );
            const changed = {row: j + chunkSize / 2, column: i + chunkSize / 2};
            this.tiles[this.index(changed.row, changed.column)] =
              sum / count + randomInRange(-randomFactor, randomFactor);
          }
        }
        
    }

    square(chunkSize, randomFactor) {
        const half = chunkSize / 2;
        for (let y = 0; y < this.size; y += half) {
          for (let x = (y + half) % chunkSize; x < this.size; x += chunkSize) {
            const BOTTOM = this.tiles[this.index(y + half, x)];
            const LEFT = this.tiles[this.index(y, x - half)];
            const TOP = this.tiles[this.index(y - half, x)];
            const RIGHT = this.tiles[this.index(y, x + half)];
            const { count, sum } = [BOTTOM, LEFT, TOP, RIGHT].reduce(
              (result, value) => {
                if (isFinite(value) && value != null) {
                  result.sum += value;
                  result.count += 1;
                }
                return result;
              },
              { sum: 0, count: 0 }
            );
            this.tiles[this.index(y,x)] = sum / count + randomInRange(-randomFactor, randomFactor);
          }
        }
    }

    color(index) {
        if (this.tiles[index] <= 0) return "#082e4f";
        else if (this.tiles[index] <= 2) return "#0c3a61";
        else if (this.tiles[index] <= 4) return "#0e4878";
        else if (this.tiles[index] <= 5) return "#146db8";
        else if (this.tiles[index] <= 6) return "#009dc4";
        else if (this.tiles[index] <= 6.5) return "#ebe98f";
        else if (this.tiles[index] <= 7) return "#edeb80";
        else if (this.tiles[index] <= 10) return "#058503";
        else if (this.tiles[index] <= 12) return "#126e10";
        else if (this.tiles[index] <= 13) return "#144f09";
        else if (this.tiles[index] <= 16) return "#422a00";
        else return "#fff";
    }

    render(camera) {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                    ctx.fillStyle = this.color(this.index(x, y));
                    ctx.fillRect(x * (this.tileWidth * camera.scale) + (ctx.canvas.width / 2) - ((map.size * map.tileWidth) / 2) * camera.scale + camera.offsetX * camera.scale, y * (this.tileWidth * camera.scale) + (ctx.canvas.height / 2) - ((map.size * map.tileWidth) / 2) * camera.scale + camera.offsetY * camera.scale, this.tileWidth * camera.scale, this.tileWidth * camera.scale);
            }
        }
    }


}

let camera = new Camera(1);
let map = new Map(8, 100);

function render() {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    map.render(camera);
}

function init() {
    canvas = document.querySelector(".canvas");
    ctx = canvas.getContext("2d");
    ctx.canvas.width = 1600;
    ctx.canvas.height = 1200;

    map.init();

    renderMap = setInterval(render, 60);
}

let mouseX = 0;
let mouseY = 0;
let mousedown = false;

document.querySelector(".canvas").addEventListener('mousedown', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mousedown = true;
});
document.querySelector(".canvas").addEventListener('mousemove', (e) => {
    if (mousedown) {
        let dX = e.clientX - mouseX;
        let dY = e.clientY - mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        camera.offsetX += dX * 1.5;
        camera.offsetY += dY * 1.5;
    }
});
document.querySelector(".canvas").addEventListener('mouseup', (e) => {
    mousedown = false;  
    mouseX = 0;
    mouseY = 0;
});
document.querySelector(".canvas").addEventListener("mouseleave", (e) => {
    mousedown = false;    
    mouseX = 0;
    mouseY = 0;
});
window.addEventListener('keydown', (e) => {
    if (e.keyCode = 32) map.init();
})
window.addEventListener('wheel', (e) => {
    requestAnimationFrame(() => {
        camera.scale += e.deltaY * -0.125;
        camera.scale = Math.min(Math.max(.05, camera.scale), 5);
    });
});

init();