var p;

function setup () {
  canvas = createCanvas(windowWidth, windowHeight / 2);
  canvas.parent('canvas');
  p = new Pond(20);
}

function draw () {
  p.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight / 2);
}

document.addEventListener('DOMContentLoaded', function () {
  var colourPicker = document.getElementById('fishColour');
  var alphaPicker = document.getElementById('fishAlpha');
  var colour = function () {
    let c = color(colourPicker.value);
    let a = alphaPicker.value;
    c.setAlpha(a);
    p.fadeColour(c, 100);
  };
  colourPicker.addEventListener('change', colour);
  alphaPicker.addEventListener('change', colour);

  var sizeSlider = document.getElementById('fishMag');
  sizeSlider.addEventListener('change', function() {
    let m = exp(sizeSlider.value);
    p.fadeMag(m, 10);
  });

  var speedSlider = document.getElementById('fishSpeed');
  speedSlider.addEventListener('change', function () {
    let s = speedSlider.value;
    p.fadeSpeed(s, 1);
  });

  var trawlButton = document.getElementById('fishTrawl');
  trawlButton.addEventListener('click', function () { p.trawl(3); });

  var addButton = document.getElementById('fishAdd');
  var newFishColour = document.getElementById('newFishColour');
  var newFishAlpha = document.getElementById('newFishAlpha');
  var newFishMag = document.getElementById('newFishMag');
  var newFishSpeed = document.getElementById('newFishSpeed');

  addButton.addEventListener('click', function () {
    let c = color(newFishColour.value);
    let m = exp(newFishMag.value);
    let s = parseFloat(newFishSpeed.value);
    c.setAlpha(newFishAlpha.value);
    p.add(new Fish(c, m, s, 0.2));
  });
});
