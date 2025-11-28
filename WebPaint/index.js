const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

let draw = false;
let erase = false;
let lastX = 0;
let lastY = 0;
let drawSize = 5;

const colours = [
  "pink",
  "black",
  "red",
  "orange",
  "gold",
  "green",
  "lime",
  "blue",
  "cyan",
  "blueviolet",
];
let colourIndex = 1;

ctx.strokeStyle = colours[colourIndex];
ctx.lineWidth = drawSize;
ctx.lineCap = "round";

myCanvas.addEventListener("mousemove", (event) => {
  if (draw || erase) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    [lastX, lastY] = [event.offsetX, event.offsetY];
  }
});

myCanvas.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = drawSize;
    draw = true;
  } else if (event.button === 2) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = drawSize + 5;
    erase = true;
  } else if (event.button === 1) {
    event.preventDefault();
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  }
  [lastX, lastY] = [event.offsetX, event.offsetY];
});

myCanvas.addEventListener("mouseup", (event) => {
  erase = false;
  draw = false;
});

myCanvas.addEventListener("mouseleave", (event) => {
  draw = false;
  erase = false;
});

myCanvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key >= 0 && event.key <= 9) {
    colourIndex = event.key;
    ctx.strokeStyle = colours[colourIndex];
    console.log(colourIndex);
  }
});

window.addEventListener("resize", () => {
  const imageData = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);

  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;

  ctx.strokeStyle = colours[colourIndex];
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

  ctx.putImageData(imageData, 0, 0);
});
