var offset = 300;
var waveSpeed = 0.0;

var sliderX;
var sliderY;

var bgColour = 'white';
var sunX = 400;
var sunY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseVal = random(200);

  sliderX = createSlider(0, width, 100);
  sliderX.position(10, 180);

  sliderColour1 = createSlider(0, 255, 100);
  sliderColour1.position(10, 210);
  sliderColour2 = createSlider(0, 255, 100);
  sliderColour2.position(10, 240);


}

function changeColour() {
  bgcolour = document.getElementById("colour").value;
}

function draw() {
  background(bgColour);

  strokeWeight(0);
  from = color(255, 245, 200);
  to = color(255, 255, 250);
  for (var i = 10; i > 0; --i) {
    var size = map(i, 10, 0, 100, 0);
    fill(lerpColor(color(255, 245, 200), color(255, 255, 250), 1 - i / 10));
    ellipse(sunX, sunY, size, size);

    if (dist(sunX, sunY, mouseX, mouseY) < size / 2 && mouseIsPressed) {
      sunX = mouseX;
      sunY = mouseY;
    }
  }
  noFill();
  strokeWeight(1.5);
  waveSpeed += 0.015;
  var waveH = map(sliderX.value(), 0, width, 100, 500);

  text("Wave width", sliderX.x * 2 + sliderX.width + 10, 20);
  text("Colour 1", sliderColour1.x * 2 + sliderColour1.width + 10, 50);
  text("Colour 2", sliderColour2.x * 2 + sliderColour2.width + 10, 80);

  for (var waveNum = sunY + 10; waveNum < height; waveNum += 3) {
    line = new Wave(sunY + 10, sliderX.value(), noiseVal, waveSpeed, waveNum, waveH, sliderColour1.value(), sliderColour2.value());
    line.drawLine();
  }
}