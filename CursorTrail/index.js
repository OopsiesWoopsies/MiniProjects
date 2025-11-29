const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const trailOfFilledRects = [];

class FilledRectInfo {
  constructor(x, y, lifetime, colour, size) {
    this.x = x;
    this.y = y;
    this.lifetime = lifetime;
    this.colour = colour;
    this.size = size;
  }
  decreaseLifetime() {
    if (lifetime > 0) lifetime--;
  }
}

function drawTrail() {
  let len = trailOfFilledRects.length;
  for (let i = 0; i < len; i++) {
    ctx.fillStyle = trailOfFilledRects[i].colour;
    const x = trailOfFilledRects[i].x;
    const y = trailOfFilledRects[i].y;
    const size = trailOfFilledRects[i].size;
    ctx.fillRect(x, y, size, size);
    trailOfFilledRects[i].lifetime--;
    if (trailOfFilledRects[i].lifetime > 0) continue;
    ctx.clearRect(x, y, size, size);
    [trailOfFilledRects[i], trailOfFilledRects[len - 1]] = [
      trailOfFilledRects[len - 1],
      trailOfFilledRects[i],
    ];
    trailOfFilledRects.pop();
    len--;
  }

  requestAnimationFrame(drawTrail);
}

let lastX;
let lastY;

requestAnimationFrame(drawTrail);

myCanvas.addEventListener("mousemove", (event) => {
  x = event.offsetX;
  y = event.offsetY;
  trailOfFilledRects.push(new FilledRectInfo(x, y, 20, "white", 10));
  [lastX, lastY] = [event.offsetX, event.offsetY];
});

myCanvas.addEventListener("mouseenter", (event) => {
  lastX = event.clientX;
  lastY = event.clientY;
});
