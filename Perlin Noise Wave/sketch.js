var offset = 300;
var waveSpeed = 0.0;

var sliderX;
var sliderY;

var bgColour = 'white';
var sunX = 400;
var sunY = 100;

function setup() {
  createCanvas(windowWidth, windowHeight-200);
  noiseVal = random(200);

  sliderX = createSlider(0, width, 100);
  sliderX.position(10, 180);

  sliderColour1 = createSlider(0, 255, 100);
  sliderColour1.position(10, 210);
  sliderColour2 = createSlider(0, 255, 100);
  sliderColour2.position(10, 240);
  
  sun = new Sun(sunX, sunY);
  
}

function changeColour() {
  bgcolour = document.getElementById("colour").value;
}

function draw() {
  background(bgColour);

  strokeWeight(0);
  sun.createSun();
  
  noFill();
  strokeWeight(1.5);
  waveSpeed += 0.015;
  var waveH = map(sliderX.value(), 0, width, 100, 500);

  text("Wave width", sliderX.x * 2 + sliderX.width + 10, 20);
  text("Colour 1", sliderColour1.x * 2 + sliderColour1.width + 10, 50);
  text("Colour 2", sliderColour2.x * 2 + sliderColour2.width + 10, 80);

  for (var waveNum = sun.sunY + 10; waveNum < height; waveNum += 3) {
    line = new Wave(sun.sunY + 10, noiseVal, waveSpeed, waveNum, waveH, sliderColour1.value(), sliderColour2.value());
    line.drawLine();
  }
}