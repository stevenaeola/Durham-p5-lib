"use strict";

/* Variables used for drawing */
var system;
var g;
var canvas;

/* Variables used for extra animation */
var angle = 0;
var cookies = document.cookie;

/** P5 setup function for pre-drawing setup */
function setup() {
	/* Create the system and configure it acoording to the settings*/
	system = new PendulumSystem(4, 30, 0, 100, 500);
	
	if (cookies.includes("3D=true")) {
		g = createGraphics(system.size, system.size);
	}
	if (g) {
		canvas = createCanvas(system.size*2, system.size*2, WEBGL);
		pixelDensity(1);
	}
	else {
		canvas = createCanvas(system.size, system.size, WEBGL);
	}
	canvas.parent("ProgramHolder");

}

/** P5 draw function for drawing and animation */
function draw() {
	
	background(256);
	if (g){
		rotateX(angle);
		rotateY(angle);
		rotateZ(angle);
		angle += 0.001

		texture(g);
		box(system.size);
		g.clear();
	}
	
	system.tick();
	
}

function mousePressed() {
	system.clicked();
}

