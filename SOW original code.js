// Justin Chambers
// 4/2018

var canvasSize = 400;
var halfCanvasSize = canvasSize * 0.5;
var sunHeight = 150;
var sunSize = canvasSize * 0.25;
var gradientSteps = 10;

var noiseScale = 0.07;
var waveMovementSpeed = 1.75;

var waterStrokeWeight = 6;
var waterStride = 10;

function setup() {
	createCanvas(canvasSize, canvasSize);
	background(100);
	noStroke();

	// sky background
	fill(50, 90, 100);
	rect(0, 0, canvasSize, canvasSize);

	// sky burst
	var from = color(69, 103, 108);
	var to = color(240, 220, 180);
	for (var i = gradientSteps; i > 0; --i) {
		var size = map(i, gradientSteps, 0, canvasSize + 50, halfCanvasSize);
		fill(lerpColor(from, to, 1 - i / gradientSteps));
		ellipse(halfCanvasSize, sunHeight, size, size);
	}

	// horizon fades
	from = color(210, 140, 100, 30);
	to = color(85, 40, 50, 30);
	for (var i = gradientSteps; i > 0; --i) {
		var sizeX = map(i, gradientSteps, 0, canvasSize, halfCanvasSize);
		var sizeY = map(i, gradientSteps, 0, canvasSize * 0.3, 20);
		var posOffset = map(i, gradientSteps, 0, halfCanvasSize, halfCanvasSize + 50);
		fill(lerpColor(from, to, 1 - i / gradientSteps));
		ellipse(halfCanvasSize - posOffset, sunHeight, sizeX, sizeY);
		ellipse(halfCanvasSize + posOffset, sunHeight, sizeX, sizeY);
	}

	// sun
	from = color(255, 245, 200);
	to = color(255, 255, 250);
	for (var i = gradientSteps; i > 0; --i) {
		var size = map(i, gradientSteps, 0, sunSize, 0);
		fill(lerpColor(from, to, 1 - i / gradientSteps));
		ellipse(halfCanvasSize, sunHeight, size, size);
	}
	
	// setup for the water line drawing
	strokeWeight(waterStrokeWeight);
}

function draw() {
	// water and reflection coloration based on perlin noise
	var lineToggle = 0;
	var reflectionHalfWidth = sunSize;
	var reflectionColor = color(240, 125, 125);
	var highlightColor = color(240, 240, 175);
	var waterLowColor = color(0, 12, 31);
	var waterHighColor = color(100, 110, 130);
	var noiseZInput = frameCount / 100 * waveMovementSpeed;
	
	for (var yPos = sunHeight + waterStrokeWeight; yPos < height + waterStrokeWeight; yPos += waterStrokeWeight) {
		var yPosMap01 = map(yPos, sunHeight, height, 0, 1);
		var noiseYInput = noiseScale * (yPos * map(yPos, sunHeight, height, 1.5, 1) - frameCount / 3) * waveMovementSpeed;
		
		for (var xPos = lineToggle; xPos <= width - lineToggle; xPos += waterStride) {
			var noiseXInput = noiseScale * ((xPos - (1 - yPosMap01) * halfCanvasSize / 2) + waterStride * 0.5) / (yPosMap01 * 10 + 1);
			var noiseVal = noise(noiseXInput, noiseYInput, noiseZInput);
			var noiseValIncreasedContrast = constrain(map(noiseVal, 0.1, 0.6, 0, 1), 0, 1);
			var edgeBlendModifier = constrain((2 - (abs(halfCanvasSize - xPos + lineToggle) / (reflectionHalfWidth * (yPosMap01 + 0.6))) * 2), 0, 1);
			
			// base water color
			var c = lerpColor(waterLowColor, waterHighColor, noiseVal);
			// primary reflection color within the center region
			c = lerpColor(c, reflectionColor, constrain(noiseValIncreasedContrast * 4 - 3, 0, edgeBlendModifier));
			// secondary highlight color (with added emphasis just below the sun)
			c = lerpColor(c, highlightColor, constrain((noiseVal * 10 - 6), 0, edgeBlendModifier) + pow(1 - yPosMap01, 8) * edgeBlendModifier * 1.5);
			// random highlights in the waves outside of the center region
			c = lerpColor(c, highlightColor, constrain((noiseVal * 10 - 7), 0, 1));

			// draw the line segment
			stroke(c);
			line(xPos, yPos, xPos + waterStride, yPos);
		}
		// alternate each row to add variety
		lineToggle = lineToggle == 0 ? -waterStride / 2 : 0;
	}
}