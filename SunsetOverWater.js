class project{
	constructor(canvasSize, halfCanvasSize, sunHeight, sunSize, gradientSteps,
	noiseScale, waveMovementSpeed, waterStrokeWeight, waterStride)
	{
		this.canvasSize = canvasSize || 400
		this.halfCanvasSize = halfCanvasSize || 200
		this.sunHeight = sunHeight || 150
		this.sunSize = sunSize || 100
		this.gradientSteps = gradientSteps || 10
		this.noiseScale = noiseScale || 0.07
		this.waveMovementSpeed = waveMovementSpeed || 1.75
		this.waterStrokeWeight = waterStrokeWeight || 6
		this.waterStride = waterStride || 10
	}
	
	setup(){
		var c = createCanvas(this.canvasSize, this.canvasSize);
		c.parent("canvasContainer");
		background(100);
		noStroke();
		

		//sky background
		fill(50, 90, 100);
		rect(0, 0, this.canvasSize, this.canvasSize);
		
		//sky burst
		var from = color(69, 103, 108);
		var to = color(240, 220, 180);
		for (var i = this.gradientSteps; i > 0; --i) {
			var size = map(i, this.gradientSteps, 0, this.canvasSize + 50, this.halfCanvasSize);
			fill(lerpColor(from, to, 1 - i / this.gradientSteps));
			ellipse(this.halfCanvasSize, this.sunHeight, size, size);
		}	

		//horizon fades
		from = color(210, 140, 100, 30);
		to = color(85, 40, 50, 30);
		for (var i = this.gradientSteps; i > 0; --i) {
			var sizeX = map(i, this.gradientSteps, 0, this.canvasSize, this.halfCanvasSize);
			var sizeY = map(i, this.gradientSteps, 0, this.canvasSize * 0.3, 20);
			var posOffset = map(i, this.gradientSteps, 0, this.halfCanvasSize, this.halfCanvasSize + 50);
			fill(lerpColor(from, to, 1 - i / this.gradientSteps));
			ellipse(this.halfCanvasSize - posOffset, this.sunHeight, sizeX, sizeY);
			ellipse(this.halfCanvasSize + posOffset, this.sunHeight, sizeX, sizeY);
		}
		
		//sun
		from = color(255, 245, 200);
		to = color(255, 255, 250);
		for (var i = this.gradientSteps; i > 0; --i) {
			var size = map(i, this.gradientSteps, 0, this.sunSize, 0);
			fill(lerpColor(from, to, 1 - i / this.gradientSteps));
			ellipse(this.halfCanvasSize, this.sunHeight, size, size);
		}
		
		//setup for the water line drawing
		strokeWeight(this.waterStrokeWeight);
	}
	
	draw(){
		//water and reflection coloration based on perlin noise
	var lineToggle = 0;
	var reflectionHalfWidth = this.sunSize;
	var reflectionColor = color(240, 125, 125);
	var highlightColor = color(240, 240, 175);
	var waterLowColor = color(0, 12, 31);
	var waterHighColor = color(100, 110, 130);
	var noiseZInput = frameCount / 100 * this.waveMovementSpeed;
	
	for (var yPos = this.sunHeight + this.waterStrokeWeight; yPos < height + this.waterStrokeWeight; yPos += this.waterStrokeWeight) {
		var yPosMap01 = map(yPos, this.sunHeight, height, 0, 1);
		var noiseYInput = this.noiseScale * (yPos * map(yPos, this.sunHeight, height, 1.5, 1) - frameCount / 3) * this.waveMovementSpeed;
		
		for (var xPos = lineToggle; xPos <= width - lineToggle; xPos += this.waterStride) {
			var noiseXInput = this.noiseScale * ((xPos - (1 - yPosMap01) * this.halfCanvasSize / 2) + this.waterStride * 0.5) / (yPosMap01 * 10 + 1);
			var noiseVal = noise(noiseXInput, noiseYInput, noiseZInput);
			var noiseValIncreasedContrast = constrain(map(noiseVal, 0.1, 0.6, 0, 1), 0, 1);
			var edgeBlendModifier = constrain((2 - (abs(this.halfCanvasSize - xPos + lineToggle) / (reflectionHalfWidth * (yPosMap01 + 0.6))) * 2), 0, 1);
			
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
			line(xPos, yPos, xPos + this.waterStride, yPos);
		}
		// alternate each row to add variety
		lineToggle = lineToggle == 0 ? -this.waterStride / 2 : 0;
	}}
}	