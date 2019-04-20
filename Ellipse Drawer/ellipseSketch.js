/*
	CC BY-SA 3.0. See LICENSE.md for more information.
	Original sketch:
		https://www.openprocessing.org/sketch/616194
	Original instructions:
		Move the mouse and press the keys (left arrow, right arrow, up arrow, down arrow) to experiment

	This file contains the classes ellipses and sketch
	The ellipse class handles the drawing of ellipses and the properties of individual ellipses
	The sketch class handles the properties of the sketch and the current drawing parameters
		Changing the current drawing parameters does not affect ellipses that have already been drawn
*/

var current = [];
var g;

class ellipses {
	constructor(x, y, size = 50, colour = 0, alpha = 0.2, saturation = 100, brightness = 100, velFactor = 2) {
		// check that parameters are valid
		if ((isNaN(x) == true) | (isNaN(y) == true) | (isNaN(size) == true) | (isNaN(alpha) == true) | (isNaN(saturation) == true) | (isNaN(brightness) == true) | (isNaN(velFactor) == true) | (size < 0) | (colour < 0) | (colour > 255) | (alpha < 0) | (alpha > 1) | (saturation < 0) | (saturation > 255) | (brightness < 0) | (brightness > 255)) {
			throw new Error("invalid ellipses parameters");
		}
		this._x = x;
		this._y = y;
		this._size = size;
		this.position = createVector(x, y);
		this._colour = colour;
		this._saturation = saturation;
		this._brightness = brightness;
		this._alpha = alpha;
		this._velFactor = velFactor;
		// velocity is random, between -1*velFactor and 1*velFactor
		this.velocity = createVector(random(-1,1)*this.velFactor, random(-1,1)*this.velFactor);
	}

	// getter and setter for the original x-coord

	get x() {
		return this._x;
	}

	set x(xVal) {
		if (isNaN(xVal) == false) {
			this._x = xVal;
		}
	}

	// getter and setter for the original y-coord

	get y() {
		return this._y;
	}

	set y(yVal) {
		if (isNaN(yVal) == false) {
			this._x = yVal;
		}
	}

	// getter and setter for the size of this ellipse, greater than 0

	get size() {
		return this._size;
	}

	set size(sizeVal) {
		if ((sizeVal >= 0) && (isNaN(sizeVal) == false)) {
			this._size = Number(sizeVal);
		}
	}

	// getter and setter for the colour of this ellipse, from 0 to 255

	get colour() {
		return this._colour;
	}

	set colour(colourVal) {
		if ((colourVal >= 0) && (colourVal <= 255) && (isNaN(colourVal) == false)) {
			this._colour = Number(colourVal);
		}
	}

	// getter and setter for the alpha of this ellipse, from 0 to 1

	get alpha() {
		return this._alpha;
	}

	set alpha(alphaVal) {
		if ((alphaVal >= 0) && (alphaVal <= 1) && (isNaN(alphaVal) == false)) {
			this._alpha = Number(alphaVal);
		}
	}

	// getter and setter for the saturation of this ellipse, from 0 to 255

	get saturation() {
		return this._saturation;
	}

	set saturation(saturVal) {
		if ((saturVal >= 0) && (saturVal <= 255) && (isNaN(saturVal) == false)) {
			this._saturation = Number(saturVal);
		}
	}

	// getter and setter for the brightness of this ellipse, from 0 to 255

	get brightness() {
		return this._brightness;
	}

	set brightness(brightVal) {
		if ((brightVal >= 0) && (brightVal <= 255) && (isNaN(brightVal) == false)) {
			this._brightness = Number(brightVal);
		}
	}

	// getter and setter for the velocity factor of this ellipse

	get velFactor() {
		return this._velFactor;
	}

	set velFactor(val) {
		if ((isNaN(val) == false) && (val >= 0)) {
			this._velFactor = val;
		}
	}

	// getter for the xPos

	get xPos() {
		return this.position.x;
	}

	// getter for the yPos

	get yPos() {
		return this.position.y;
	}

	// update position of ellipse when canvas redrawn

	run(g) {
		if (g) {
			// add the velocity to the current position to allow movement
			this.position.add(this.velocity);
			// draw ellipse to graphic
			g.fill(color(this.colour, this.saturation, this.brightness, this.alpha));
			g.stroke("white");
			g.ellipse(this.xPos,this.yPos,this.size,this.size);
		} else {
			// add the velocity to the current position to allow movement
			this.position.add(this.velocity);
			// draw ellipse to canvas
			fill(color(this.colour, this.saturation, this.brightness,this.alpha));
			stroke("white");
			ellipse(this.position.x,this.position.y,this.size,this.size);
		}
	}

	draw(g) {
		if (g) {
			// draw ellipse to graphic
			g.fill(color(this.colour, this.saturation, this.brightness, this.alpha));
			g.stroke("white");
			g.ellipse(this.x,this.y,this.size,this.size);
		} else {
			// draw ellipse to canvas
			fill(color(this.colour, this.saturation, this.brightness,this.alpha));
			stroke("white");
			ellipse(this.x,this.y,this.size,this.size);
		}
	}
}

class sketch {
	constructor(penSize = 50, colour = 0, alpha = 0.2, saturation = 100, brightness = 100, velFactor = 2, alwaysDraw = false) {
		// check that the parameters are valid and within the correct ranges
		if ((isNaN(penSize) == true) | (isNaN(colour) == true) | (isNaN(alpha) == true) | (isNaN(saturation) == true) | (isNaN(brightness) == true) | (isNaN(velFactor) == true) | (typeof alwaysDraw !== "boolean") | (penSize < 0) | (colour < 0) | (colour > 255) | (alpha < 0) | (alpha > 1) | (saturation < 0) | (saturation > 255) | (brightness < 0) | (brightness > 255)) {
			throw new Error("invalid sketch parameters");
		}
		this._penSize = penSize;
		this._colour = colour;
		this._alpha = alpha;
		this._saturation = saturation;
		this._brightness = brightness;
		this._velFactor = velFactor;
		this._alwaysDraw = alwaysDraw;
	}

	// getter and setter for penSize, greater than 0

	set penSize (penVal) {
		if ((penVal >= 0) && (isNaN(penVal) == false)) {
			this._penSize = Number(penVal);
		}
	}

	get penSize() {
		return this._penSize;
	}

	// getter and setter for colour, from 0 to 255

	set colour(colVal) {
		if ((colVal >= 0) && (colVal <= 255) && (isNaN(colVal) == false)) {
			this._colour = Number(colVal);
		}
	}

	get colour() {
		return this._colour;
	}

	// getter and setter for alpha, from 0 to 1

	set alpha(alpVal) {
		if ((alpVal >= 0) && (alpVal <= 1) && (isNaN(alpVal) == false)) {
			this._alpha = Number(alpVal);
		}
	}

	get alpha() {
		return this._alpha;
	}

	// getter and setter for saturation, from 0 to 255

	set saturation(satVal) {
		if ((satVal >= 0) && (satVal <= 255) && (isNaN(satVal) == false)) {
			this._saturation = Number(satVal);
		}
	}

	get saturation() {
		return this._saturation;
	}

	// getter and setter for brightness, from 0 to 255

	set brightness(briVal) {
		if ((briVal >= 0) && (briVal <= 255) && (isNaN(briVal) == false)) {
			this._brightness = Number(briVal);
		}
	}

	get brightness() {
		return this._brightness;
	}

	// getter and setter for _velFactor
	// the velocity, a number from -1 to 1, is multiplied by this

	set velFactor(velVal) {
		if (velVal >= 0 && (isNaN(velVal) == false)) {
			this._velFactor = Number(velVal);
		}
	}

	get velFactor() {
		return this._velFactor;
	}

	// getter and setter for alwaysDraw

	set alwaysDraw(arg) {
		if (String(arg) == "false") {
			this._alwaysDraw = false;
		} else if (String(arg) == "true") {
			this._alwaysDraw = true;
		}
	}

	get alwaysDraw() {
		return this._alwaysDraw;
	}

	// functions to increase and decrease colour

	increaseColour(ciVal) {
		if (isNaN(ciVal) == false) {
			this._colour += ciVal;
			if (this._colour > 255) {
				this._colour = 0;
			}
		}
	}

	decreaseColour(cdVal) {
		if (isNaN(cdVal) == false) {
			this._colour -= cdVal;
			if (this._colour < 0) {
				this._colour = 255;
			}
		}
	}

	// functions to increase and decrease penSize - penSize is between 0 and 100

	increasePenSize(piVal) {
		if (isNaN(piVal) == false) {
			if (this.penSize + piVal <= 100) {
				this.penSize += piVal;
			}
		}
	}

	decreasePenSize(pdVal) {
		if (isNaN(pdVal) == false) {
			if (this.penSize - pdVal > 0) {
				this.penSize -= pdVal;
			}
		}
	}

	setup(width, height, renderer) {
		if (renderer) {
			createCanvas(width, height, renderer);
			colorMode(HSB);
			background("grey");
			// cube will be a third of the width of the canvas
			g = createGraphics(width/3,width/3);
			g.background("black");
		} else {
			createCanvas(width, height);
			background("black");
			colorMode(HSB);
		}
	}

	reset(g) {
		if (g) {
			background("grey");
			//ortho to prevent drawing based on webgl coords
			ortho();
			g.background("black");
			g.rect(width/3,width/3);
			//rectangle containing ellipses becomes texture of the box
			texture(g);
			box(width/3);
		} else {
			// reset background to black
			background("black");
		}
	}

	draw() {
		clear();
		this.reset(g);
		let newParticles = [];
		if (g) {
			// xPos and yPos define where the mouse is in terms of graphic
			const xPos = mouseX-(width/2 - width/6);
			const yPos = mouseY-(height/2 - width/6);
			for (let i = 0; i < current.length; i++) {
				// if ellipse outside the bounds of the box, remove
				if ((current[i].xPos <= 0) || (current[i].xPos >= width/3) || (current[i].yPos < 0) || (current[i].yPos > width/3)) {
					delete current[i];
				} else {
					//ortho to allow drawing where the mouse is, rather than based on perspective
					ortho();
					g.rect(width/3,width/3);
					current[i].run(g);
					// push to newParticles array
					newParticles.push(current[i]);
					// rectangle containing ellipses becomes texture of the box
					texture(g);
					box(width/3);
				}
			}
			current = newParticles;
			// if mouse has been moved more than 0.5px or alwaysDraw is true, draw
			if ((Math.abs(pwinMouseX - winMouseX) > 0.5) || (Math.abs(pwinMouseY - winMouseY) > 0.5) || this.alwaysDraw) {
				// if mouse is within the bounds of the face of the cube
				if ((xPos >= 0) && (xPos <= width/3) && (yPos >= 0) && (yPos <= width/3)) {
					// create new ellipse
					let e = new ellipses(xPos, yPos, this.penSize, this.colour, this.alpha, this.saturation, this.brightness, this.velFactor);
					current.push(e);
					//ortho to allow drawing where the mouse is, rather than based on perspective
					ortho();
					g.rect(width/3,width/3);
					// rectangle containing ellipses becomes texture of the box
					texture(g);
					box(width/3);
				}
			}

		} else {
			for (let i = 0; i < current.length; i++) {
				// if the ellipse has moved out of the canvas, stop drawing it
				if ((current[i].xPos <= 0) || (current[i].xPos >= width) || (current[i].yPos <= 0) || (current[i].yPos >= height)) {
					delete current[i];
				} else {
					// otherwise draw ellipse and push to newParticles array
					current[i].run();
					newParticles.push(current[i]);
				}
			}
			current = newParticles;
			// if mouse has been moved more than 0.5px or alwaysDraw is true, draw
			if ((Math.abs(pwinMouseX - winMouseX) > 0.5) || (Math.abs(pwinMouseY - winMouseY) > 0.5) || this.alwaysDraw) {
				// if mouse is within canvas
				if ((mouseX >= 0) && (mouseX <= width) && (mouseY >= 0) && (mouseY <= height)) {
					// new ellipse, add to array current (so it can be drawn each time the draw function is called)
					let e = new ellipses(mouseX,mouseY,this.penSize,this.colour,this.alpha,this.saturation,this.brightness,this.velFactor);
					current.push(e);
					e.draw();
				}
			}
		}

		// events when a key is pressed
		if (keyIsPressed) {
			if (key == "w") {
				// increase value of colour by 5 when w pressed
				this.increaseColour(5);
			} else if (key == "s") {
				// decrease value of colour by 5 when s pressed
				this.decreaseColour(5);
			} else if (keyCode === LEFT_ARROW) {
				// decrease value of penSize by 5 when left arrow pressed
				this.decreasePenSize(5);
			} else if (keyCode === RIGHT_ARROW) {
				// increase value of penSize by 5 when right arrow pressed
				this.increasePenSize(5);
			} else if (keyCode === 32) {
				// when space is pressed, reset the canvas and clear array current to prevent ellipses being redrawn
				this.reset(g);
				current = [];
			}
		}
	}
}
