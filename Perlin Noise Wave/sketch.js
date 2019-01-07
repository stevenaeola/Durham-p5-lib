var offset = 300;
var noiseF;
var ofs = 0.0;

var sliderx;
var slidery;

var bgcolour;
var colourbutton;
var backgroundcolour;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255, 150);
  strokeWeight(1.5);
  noFill();

  noiseF = random(200);

  sliderx = createSlider(0, width, 100);
  sliderx.position(10, 10);
  sliderx.style('width', '80px');

  slidery = createSlider(0, height, 100);
  slidery.position(10, 40);
  slidery.style('width', '80px');

  slidercolour1 = createSlider(0, 255, 100);
  slidercolour1.position(10, 70);
  slidercolour1.style('width', '80px');

  slidercolour2 = createSlider(0, 255, 100);
  slidercolour2.position(10, 100);
  slidercolour2.style('width', '80px');

  bgcolour = "white";
  backgroundcolour = createInput("Enter background colour");
  backgroundcolour.position(200, 20);
  backgroundcolour.size(150);

  colourbutton = createButton("Change colour");
  colourbutton.position(backgroundcolour.x + backgroundcolour.width, 20);
  colourbutton.mousePressed(changeColour);

}

function changeColour() {
  bgcolour = backgroundcolour.value();
}

function draw() {
  background(bgcolour);

  ofs += 0.015;
  var waveH = map(sliderx.value(), 0, width, 100, 500);

  text("Wave width", sliderx.x * 2 + sliderx.width, 20);
  text("Wave Height", slidery.x * 2 + slidery.width, 50);
  text("Colour 1", slidercolour1.x * 2 + slidercolour1.width, 80);
  text("Colour 2", slidercolour2.x * 2 + slidercolour2.width, 110);

  for (var h = slidery.value(); h < height + 100; h += 4) {
    line = new Wave(slidery.value(), sliderx.value(), noiseF, ofs, h, waveH, slidercolour1.value(), slidercolour2.value());
    line.drawLine();
  }
}