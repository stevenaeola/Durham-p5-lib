/**
	Constant flags for colours
*/
const WebbedTextColorType = {
	"FIXED": 0b0000,
	"RANDOM_FIXED": 0b0001,
	"RANDOM_DYNAMIC": 0b0010,
	"DELTA_SMOOTHED": 0b0100,
	"TWINKLE": 0b1000
};

/**
	Time class. Used to get the delta time (time difference)
*/
class Time {
	constructor () {
		this.currentTime = millis();
	}

	getDelta () {
		this.oldTime = this.currentTime;
		this.currentTime = millis();
		return this.currentTime - this.oldTime;
	}
}

/**
	Class to allow easy bulk creation of webbed chars. Recommended to use unless you need finer control.
*/
class WebbyChars {
	constructor (graphicsOnly, cWidth = 1000, cHeight = 1000, cParent = null, background = null) {
		this.webbedTexts = [];
		//If graphicsOnly mode is true, the default canvas will be disabled so you can draw to anything.
		if (graphicsOnly === false) {
			this.canvas = createCanvas(cWidth, cHeight);
			if (typeof cParent === "string") this.canvas.parent(cParent);
		}
		this.background = background;
	}

	//Add the webbed text
	add (webbedText) {
		webbedText.setup();
		this.webbedTexts.push(webbedText);
	}
	
	//Remove the webbed text
	remove (webbedText) {
		for (let i = 0; i < this.webbedTexts.length; i++) {
			if (this.webbedTexts[i] === webbedText) {
				this.webbedTexts.splice(i, 1);
			}
		}
	}

	//Alias. Not strictly necessary
	getCanvas () {
		return this.canvas;
	}

	getWebbedTexts () {
		return this.webbedTexts;
	}

	//Draw the saved webbed texts. Set a background in the correct p5Renderer/p5Graphics context
	draw (p5Graphics = null) {
		if (this.background !== null) {
			if (p5Graphics !== null) {
				p5Graphics.background(this.background);
			}
			else {
				background(this.background);
			}
		}
		for (let i = 0; i < this.webbedTexts.length; i++) {
			this.webbedTexts[i].draw(p5Graphics);
		}
	}
}

/**
	Color storage and calculation class
*/
class WebbedTextColor {
	constructor (flags, c1 = null, c2 = null, maxTime = 1000) {
		//Mode flags
		this.flags = flags;
		//First color (context dependent)
		this.c1 = c1;
		//Second color (context dependent)
		this.c2 = c2;
		this.currentColor = null;
		//Max time color can hold before transition must complete
		this.maxTime = maxTime;
		this.timeLeft = maxTime;
		this.targetColor = null;
		this.time = new Time();
	}
	
	//Clone the color. Need to do this if using non-global colours.
	clone () {
		let clone = new WebbedTextColor(this.flags, this.c1, this.c2, this.maxTime);

		clone.currentColor = this.currentColor;
		clone.timeLeft = this.timeLeft;
		clone.targetColor = this.targetColor;
		clone.time = new Time();
		return clone;
	}

	//Determine what color will be set. (Context depending. Flags and c1/c2 affect this).
	getColor () {
		let delta = this.time.getDelta();

		if (this.hasFlag(WebbedTextColorType.RANDOM_FIXED)) {
			if (this.currentColor === null) {
				this.currentColor = this.getRandomColor(this.c1, this.c2);
			}
		}
		else if (this.hasFlag(WebbedTextColorType.RANDOM_DYNAMIC)) {
			if (this.hasFlag(WebbedTextColorType.DELTA_SMOOTHED)) {
				this.setDeltaDefaults();
				this.updateDeltaColor(delta, this.getRandomColor(this.c1, this.c2));
			}
			else {
				this.currentColor = this.getRandomColor(this.c1, this.c2);
			}
		}
		else if (this.hasFlag(WebbedTextColorType.TWINKLE)) {
			if (this.hasFlag(WebbedTextColorType.DELTA_SMOOTHED)) {
				this.setDeltaDefaults();
				if (this.currentColor === this.c1) {
					this.updateDeltaColor(delta, this.c2);
				}
				else if (this.currentColor === this.c2) {
					this.updateDeltaColor(delta, this.c1);
				}
				else {
					if (this.targetColor === this.c1) {
						this.updateDeltaColor(delta, this.c2);
					}
					else if (this.targetColor === this.c2) {
						this.updateDeltaColor(delta, this.c1);
					}
				}
			}
			else {
				if (this.currentColor === this.c1) {
					this.currentColor = this.c2;
				}
				else {
					this.currentColor = this.c1;
				}
			}
		}
		else {
			if (this.c1 === null) this.currentColor = color(255, 255, 255, 128);
			else this.currentColor = this.c1;
		}
		return this.currentColor;
	}

	//Check if a flag is set
	hasFlag (flag) {
		return (this.flags & flag) === flag;
	}

	//Update a color that must change based on time change
	updateDeltaColor (delta, newTarget) {
		if (this.timeLeft <= delta) {
			//If max time reached, reset
			this.currentColor = this.targetColor;
			this.targetColor = newTarget;
			this.timeLeft = this.maxTime;
		}
		else {
			//Linearly interpolate between current color and target
			this.currentColor = lerpColor(this.currentColor, this.targetColor, delta / this.timeLeft);
			this.timeLeft -= delta;
		}
	}

	//Set some sensible default colors to prevent undefined access
	setDeltaDefaults () {
		if (this.currentColor === null) {
			if (this.c1 === null) {
				this.currentColor = color(255, 255, 255, 255);
			}
			else {
				this.currentColor = this.c1;
			}
		}
		if (this.targetColor === null) {
			if (this.c2 === null) {
				this.targetColor = color(255, 255, 255, 255);
			}
			else {
				this.targetColor = this.c2;
			}
		}
	}

	//Generate a random color using the RGBA values of c1 and c2 as bounds for random
	getRandomColor (c1, c2) {
		let start = {"r": 0, "g": 0, "b": 0, "a": 255};
		let end = {"r": 255, "g": 255, "b": 255, "a": 255};

		if (c1 !== null) {
			start.r = c1.levels[0];
			start.g = c1.levels[1];
			start.b = c1.levels[2];
			start.a = c1.levels[3];
		}
		if (c2 !== null) {
			end.r = c2.levels[0];
			end.g = c2.levels[1];
			end.b = c2.levels[2];
			end.a = c2.levels[3];
		}
		return color(random(start.r, end.r), random(start.g, end.g), random(start.b, end.b), random(start.a, end.a));
	}
}

/**
	Vertex in a webbed text class
*/
class WebbedTextVertex {
	constructor (origin, position, movementRadius, direction, offset, vColor, lineColor, radius = 5, maxConnectableDistance = 20) {
		this.origin = origin;
		this.position = position;
		//Movement radius
		this.movementRadius = movementRadius;
		this.direction = direction;
		this.offset = offset;
		this.alpha = 0;
		this.numConnections = 0;
		this.maxConnectableDistance = maxConnectableDistance;
		this.connections = [];
		//Size of the point
		this.radius = radius;
		//Vertex color
		this.color = vColor;
		this.lineColor = lineColor;
	}

	//Draw the vertex, move it and draw its connections to nearby neighbours
	run (theta, vertices, g = null) {
		this.draw(g);
		this.move(theta);
		this.lineBetween(vertices, g);
	}

	//Move the vertex
	move (theta) {
		this.position.x = this.origin.x + sin(theta * this.direction + this.offset) * this.movementRadius;
		this.position.y = this.origin.y + cos(theta * this.direction + this.offset) * this.movementRadius;
	}

	//Draw lines between nearby vertices
	lineBetween (vertices, g = null) {
		this.numConnections = 1;
		for (let i = 0; i < vertices.length; i++) {
			let v2 = vertices[i];
			//Calculate the distance between 2 vertices
			let distance = this.position.dist(v2.position);

			//If in range
			if (distance > 0 && distance < this.maxConnectableDistance) {
				//Modify alpha value depending on number of formed connections. More connections = more opaque
				this.alpha = map(this.numConnections, 0, 10, 10, 255);
				let currentColor = this.lineColor.getColor();

				//Set line color based on settings, but override alpha channel
				if (g !== null) {
					g.stroke(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], this.alpha);
					g.line(this.position.x, this.position.y, v2.position.x, v2.position.y);
				}
				else {
					stroke(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], this.alpha);
					line(this.position.x, this.position.y, v2.position.x, v2.position.y);
				}
				this.connections[i] = true;
			}
			else {
				this.connections[i] = false;
			}
		}
		for (let i = 0; i < vertices.length; i++) {
			if (this.connections[i]) this.numConnections++;
		}
	}

	//Draw the vertex
	draw (g = null) {
		if (g !== null) {
			g.noStroke();
			g.fill(this.color.getColor());
			g.ellipse(this.position.x, this.position.y, this.radius, this.radius);
		}
		else {
			noStroke();
			fill(this.color.getColor());
			ellipse(this.position.x, this.position.y, this.radius, this.radius);
		}
	}
}

/**
	Class to store complete webbed texts
*/
class WebbedText {
	constructor (text, x = 0, y = 0, numVertices = 2000, fontName = "Helvetica", fontSize = 100, options = {}) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.numVertices = numVertices;
		this.fontName = fontName;
		this.fontSize = fontSize;
		this.theta = 0;
		this.vertices = [];
		//Set some sensible defaults
		this.options = {
			"minVertexMovementRadius": 5,
			"maxVertexMovementRadius": 10,
			"vertexRadius": 5,
			"maxVertexConnectableDistance": 20,
			"vertexMovementSpeed": 0.05,
			"vertexColor": new WebbedTextColor(WebbedTextColorType.FIXED, color(255, 0, 0, 255)),
			"lineColor": new WebbedTextColor(WebbedTextColorType.FIXED, color(255, 255, 255, 255)),
			"globalVertexColor": false,
			"globalLineColor": false
		};
		//Anything not set in constructor will be merged from the existing default options
		Object.assign(this.options, options);
	}

	setup () {
		this.vertices = [];
		let graphics = createGraphics(width, height);

		//Set the font, then determine the max space needed to draw the text.
		graphics.textFont(this.fontName, this.fontSize);
		let textWidthVar = Math.round(graphics.textWidth(this.text));
		let textAscentVar = Math.round(graphics.textAscent());
		let textDescentVar = Math.round(graphics.textDescent());

		//Resize buffer canvas based on calculated values. We do this, otherwise large drawing canvases have hardly any points actually being placed on the text.
		graphics.resizeCanvas(textWidthVar, textAscentVar + textDescentVar);
		graphics.push();
		graphics.noStroke();
		graphics.background(255);
		graphics.fill(0);
		graphics.textFont(this.fontName, this.fontSize);
		graphics.textAlign(LEFT, TOP);
		graphics.text(this.text, 0, 0, textWidthVar, textAscentVar + textDescentVar);
		//Restore settings
		graphics.pop();
		//Load pixels so we can get colors
		graphics.loadPixels();
		for (let i = 0; i < this.numVertices; i++) {
			let graphicsX = Math.floor(random(graphics.width));
			let graphicsY = Math.floor(random(graphics.height));
			//If black detected...
			if (brightness(graphics.get(graphicsX, graphicsY)) < 100) {
				//Place a vertex
				let origin = createVector(graphicsX + this.x, graphicsY + this.y);
				let movementRadius = random(this.options.minVertexMovementRadius, this.options.maxVertexMovementRadius);
				let position = createVector(origin.x + movementRadius, origin.y);
				let offset = random(TWO_PI);
				//Rotation direction
				let direction = 1;
				let r = random(1);

				if (r > 0.5) direction = -1;
				let vertexColor = this.options.vertexColor;
				//If not using global colors, then need to clone the color instance, otherwise the same timer will be used.
				if (this.options.globalVertexColor === false) {
					vertexColor = this.options.vertexColor.clone();
				}
				let lineColor = this.options.lineColor;

				if (this.options.globalLineColor === false) {
					lineColor = this.options.lineColor.clone();
				}
				//Create the vertices
				let vertex = new WebbedTextVertex(origin, position, movementRadius, direction, offset, vertexColor, lineColor, this.options.vertexRadius, this.options.maxVertexConnectableDistance);
				//Add the vertex to the array of vertices in this text
				this.vertices.push(vertex);
			}
		}
		//Cleanup
		graphics.noCanvas();
		graphics = null;
	}

	//Draw the vertices. Will call the run method for each vertex.
	draw (g = null) {
		for (let i = 0; i < this.vertices.length; i++) {
			this.vertices[i].run(this.theta, this.vertices, g);
		}
		this.theta += this.options.vertexMovementSpeed;
	}
}
