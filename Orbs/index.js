var o; //Initialise variable for object of sketch
//var pg;
function setup() {
	document.getElementById("colour0").value = "#A0ECD0"; //Reset colour picker values to defaults
	document.getElementById("colour1").value = "#ECD893";
	document.getElementById("colour2").value = "#E7AF7E";
	document.getElementById("colour3").value = "#B78376";
	
	var canvas = createCanvas(500,500);
	canvas.parent("sketch-holder"); //Set parent property to enable CSS transformations to be applied to canvas
	//pg = createGraphics(500, 500);
	noStroke();
	//Create Orbs object
	o = new Orbs(120, 20, 400, 100, 10.0, PI / 3.8, [color('#A0ECD0'), color('#ECD893'), color('#E7AF7E'), color('#B78376')]);
}

function draw() {
	background('#676E81');
	o.draw();
	
}
document.addEventListener("DOMContentLoaded", function(){ //Wait for all page content to load before initialising listener functions

//Set up listener functions
var slSpeed = document.getElementById("slSpeed");
slSpeed.oninput = function() {
  o.setSpeed(int(this.value) * 10);
  if (o.getSpeed() == 200) //Set speed value to be such that the sketch stops moving when the slider is positioned fully to the left
	o.setSpeed(10000000000000);
} 

var slNum = document.getElementById("slNum");
slNum.oninput = function() {
  o.setNum(this.value);
  
} 

var slTop = document.getElementById("slTop");
slTop.oninput = function() {
  o.setHiLimit(this.value);
} 

var slBot = document.getElementById("slBot");
slBot.oninput = function() {
	o.setLoLimit(int(this.value));
}

var slSize = document.getElementById("slSize");
slSize.oninput = function() {
	o.setSize(int(this.value));
}

var slFreq = document.getElementById("slFreq");
slFreq.oninput = function() {
	o.setFreq(PI / (int(this.value) / 10));
}

window.addEventListener("load", startup, false);
function startup() {
	//Initialise colour picker inputs
	colour0 = document.getElementById("colour0");
	colour0.addEventListener("change", changeC0, false);
	colour1 = document.getElementById("colour1");
	colour1.addEventListener("change", changeC1, false);
	colour2 = document.getElementById("colour2");
	colour2.addEventListener("change", changeC2, false);
	colour3 = document.getElementById("colour3");
	colour3.addEventListener("change", changeC3, false);
}
//Functions for changing individual stream colours
var colour0;
function changeC0(event){
	o.setPalette(0, color(this.value));
}
var colour1;
function changeC1(event){
	o.setPalette(1, color(this.value));
}
var colour2;
function changeC2(event){
	o.setPalette(2, color(this.value));
}
var colour3;
function changeC3(event){
	o.setPalette(3, color(this.value));
}
//Initialise button listener for random colour function
var randomC = document.getElementById("randomC");
randomC.addEventListener("click", randomiseColours);
function randomiseColours(){
	o.randomiseColours()
	}
	
})