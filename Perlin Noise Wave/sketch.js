var sliderX;
var sliderY;

var bgColour = 'white';


function setup() {
  createCanvas(windowWidth, windowHeight-200);

  sliderX = createSlider(0, width, 100);
  sliderX.position(10, 180);

  sliderColour1 = createSlider(0, 255, 10);
  sliderColour1.position(10, 210);
  sliderColour2 = createSlider(0, 255, 100);
  sliderColour2.position(10, 240);
  
  x = new Control();
  
}

function changeColour() {
  bgColour = document.getElementById("colour").value;
}

function draw() {
  x.setColours(sliderColour1.value(), sliderColour2.value());
  x.getSlidervalue(sliderX.value());
  x.draw();
  text("Wave width", sliderX.x * 2 + sliderX.width + 10, 20);
  text("Colour 1", sliderColour1.x * 2 + sliderColour1.width + 10, 50);
  text("Colour 2", sliderColour2.x * 2 + sliderColour2.width + 10, 80);


}