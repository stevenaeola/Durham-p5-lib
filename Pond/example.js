var g;
var p;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  g = createGraphics(1000, 1000);
  p = new Pond(50, color('red'), color('green'));
}

function draw() {
    background(255);
    p.draw(g);
    texture(g);
    rotateX(millis() / 10000);
    box(300);
}
