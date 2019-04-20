/*
  Author: Ben Kelvin Harries
  Adapted from Orbits by Santiago Fiorino https://www.openprocessing.org/sketch/567018 
  Licence: Creative Commons Attribution ShareAlike https://creativecommons.org/licenses/by-sa/3.0/legalcode
*/
//for further detail on methods and parameters look at documentation in README.md
var solar;
var g;
var canvas;
var flag;
var TwoDimensionalCanvas;
var ThreeDimensionalCanvas;

function setup(flag = "1") {
  solar = new Solar();
  solar.setup();
  console.log(flag);
  if (flag === "1" || flag === 1) {
    console.log('going')
    TwoDimensionalCanvas = createCanvas(windowWidth, windowHeight);

  } else if (flag === "2" || flag === 2) {
    ThreeDimensionalCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
    g = createGraphics(800, 800);
  }
}

function draw() {
  solar.draw(g);
}

//pressing enter (13) makes new planet
document.addEventListener("keydown", enterPressed, false);

function enterPressed(evt) {
  if (evt.key === "13") {
    solar.newPlanet();
  }
}

//pressing spacebar(32) makes new array -> hence removes old
document.addEventListener("keydown", spacebarPressed, false);

function spacebarPressed(evt) {
  if (evt.key === "32") {
    solar.reset();
  }
}

//executed by drop down menu's 'submit' button
function galaxy() {
  let menu = document.getElementById("mode");
  flag = menu.options[menu.selectedIndex].value;
  if (flag === "1"){
    location.reload();
  }
  setup(flag);
}
