var g;
var p;

function setup () {
  canvas = createCanvas(windowWidth, windowHeight / 2);
  // canvas = createCanvas(windowWidth, windowHeight / 2, WEBGL);
  canvas.parent('canvas');
  g = createGraphics(250, 250);
  p = new Pond(20);
}

function draw () {
  p.draw();
  // p.draw(g);
  // background(color('white'));
  // texture(g);
  // box(100);
}

document.addEventListener('DOMContentLoaded', function () {
  var colourPicker = document.getElementById('fishColour');
  var alphaPicker = document.getElementById('fishAlpha');
  colour = function () {
    let c = colourPicker.value;
    let a = alphaPicker.value;
    col = color(c);
    col.setAlpha(a);
    p.fadeColour(col, 100);
  };
  colourPicker.addEventListener('change', colour);
  alphaPicker.addEventListener('change', colour);

  var sizeSlider = document.getElementById('fishMag');
  siz = function () {
    let m = exp(sizeSlider.value);
    p.fadeMag(m, 10);
  };
  sizeSlider.addEventListener('change', siz);

  var speedSlider = document.getElementById('fishSpeed');
  speed = function () {
    let s = speedSlider.value;
    p.fadeSpeed(s, 1);
  };
  speedSlider.addEventListener('change', speed);

  var trawlButton = document.getElementById('fishTrawl');
  trawlButton.addEventListener('click', function () { p.trawl(3); });

  var addButton = document.getElementById('fishAdd');
  var newFishColour = document.getElementById('newFishColour');
  var newFishAlpha = document.getElementById('newFishAlpha');
  var newFishMag = document.getElementById('newFishMag');
  var newFishSpeed = document.getElementById('newFishSpeed');

  addButton.addEventListener('click', function () {
    let col = color(newFishColour.value);
    let m = exp(newFishMag.value);
    let s = parseFloat(newFishSpeed.value);
    col.setAlpha(newFishAlpha.value);
    p.add(new Fish(col, m, s, 0.2));
  });
});
