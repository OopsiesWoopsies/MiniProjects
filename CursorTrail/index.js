const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

const trailOfShapes = [];

const colours = [
  "pink",
  "tomato",
  "red",
  "orange",
  "gold",
  "green",
  "lime",
  "blue",
  "cyan",
  "blueviolet",
];
let colourIndex = 9;

class CircleInfo {
  constructor(x, y, lifetime, colour, radius) {
    this.x = x;
    this.y = y;
    this.originalLifetime = lifetime;
    this.lifetime = lifetime;
    this.colour = colour;
    this.radius = radius;
    this.transparency = 1.0;
  }
  decreaseLifetime() {
    if (this.lifetime >= 0) this.lifetime--;
    this.transparency = this.lifetime / this.originalLifetime;
  }
}

function drawTrail() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  let len = trailOfShapes.length;
  for (let i = 0; i < len; i++) {
    ctx.globalAlpha = trailOfShapes[i].transparency;
    ctx.fillStyle = trailOfShapes[i].colour;
    const x = trailOfShapes[i].x;
    const y = trailOfShapes[i].y;
    const radius = trailOfShapes[i].radius;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    trailOfShapes[i].decreaseLifetime();
    if (trailOfShapes[i].lifetime >= 0) continue;
    [trailOfShapes[i], trailOfShapes[len - 1]] = [
      trailOfShapes[len - 1],
      trailOfShapes[i],
    ];
    trailOfShapes.pop();
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
  trailOfShapes.push(new CircleInfo(x, y, 20, colours[colourIndex], 10));

  [lastX, lastY] = [event.offsetX, event.offsetY];
});

myCanvas.addEventListener("mouseenter", (event) => {
  lastX = event.clientX;
  lastY = event.clientY;
});
