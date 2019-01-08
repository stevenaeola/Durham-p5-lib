var g;
var p;

function setup () {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  g = createGraphics(1000, 1000);
  p = new Pond(50);
}

function draw () {
  p.draw();
}
