class CordDrawing extends ImageHandler {
	get done() {
		return this._counter >= this._lines;
	}

	get initialised() {
		return this._initialised || false;
	}

	get scale() {
		return this._diameter/this.width;
	}

	get counter() {
		return this._counter;
	}

	get diameter() {
		return this._diameter;
	}

	get src() {
		return this._src;
	}

	get sampling() {
		return this._sampling;
	}

	get lines() {
		return this._lines;
	}

	get weight() {
		return this._weight;
	}

	constructor(args) {
		//Create object if one wasn't passed
		if(!args) {
			args = {};
		}

		//Defaults for the imagehandler class
		args.src = args.src || "example.png";
		args.sampling = args.sampling || 1;

		super(args.src, args.sampling);

		//Set default values or get them args object
		this._src = args.src;
		this._sampling = Math.floor(args.sampling);
		this._nbPegs  = Math.floor(args.pegs) || 500;
		this._lines = Math.floor(args.lines) || 2750;
		this._weight = args.weight || 0.16;

		this._diameter = args.diameter || -1;

		if(args.createCanvas === undefined) {
			this._createCanvas = true;
		} else {
			this._createCanvas = args.createCanvas;
		}
	}

	setup() {
		super.setup();

		this._counter = 0;

		if(this._diameter == -1) {
			this._diameter = super.width;
		}

		if(this._createCanvas) {
			createCanvas(this._diameter, this._diameter);
		}

		//Create pegs
		this._pegs = [];
		let dTheta = 2*Math.PI/this._nbPegs;
		let id = 0;
		for(let theta = 0; theta < 2*Math.PI; theta += dTheta) {
			let x = super.scaledWidth/2 + (super.scaledWidth/2)*Math.cos(theta);
			let y = super.scaledWidth/2 + (super.scaledWidth/2)*Math.sin(theta);
			this._pegs.push({
				x: x,
				y: y,
				id: id
			});
			id += 1;
		}

		this._currentPeg = this._pegs[0];

		//Check that the image has been loaded properly
		if(super.image.pixels.length != 4) {
			this._initialised = true;
		}
	}

	draw(g) {
		if(this.done) {
			return;
		}

		//Makes sure there is an area to draw to
		if(!g && !this._createCanvas) {
			return false;
		}

		let nextPeg = this.findNextPegByLum();

		this.reduceLumOfLine(
			this._currentPeg.x, this._currentPeg.y,
			nextPeg.x, nextPeg.y,
			255*this._weight
		);


		//Calculate the x and y coordinates to the right scale
		let x0 = this._currentPeg.x * (1/this._sampling) * this.scale;
		let y0 = this._currentPeg.y * (1/this._sampling) * this.scale;

		let x1 = nextPeg.x * (1/this._sampling) * this.scale;
		let y1 = nextPeg.y * (1/this._sampling) * this.scale;

		this._currentPeg = nextPeg;

		if(g) {
			g.strokeWeight(this._weight);
			g.line(x0,y0,x1,y1);
		} else {
			strokeWeight(this._weight);
			line(x0,y0,x1,y1);
		}

		this._counter += 1;
	}

	findNextPegByLum() {
		let lums = [];
		let ids = [];
		//Get a list of average luminosity of lines
		for(let i = 0; i < this._pegs.length; i += 1) {
			if(this._pegs.id != this._currentPeg.id) {
				let testpeg = this._pegs[i];
				lums.push(this.getAvgLumOfLine(
					this._currentPeg.x, this._currentPeg.y,
					testpeg.x, testpeg.y
				));
				ids.push(testpeg.id);
			}
		}

		//Find the peg that gives the highest average
		let largest = 0;
		let id = 0;
		for(let i = 0; i < lums.length; i += 1) {
			if(lums[i]> largest) {
				largest	= lums[i];
				id = ids[i];
			}
		}

		return this._pegs[id];
	}

	getAvgLumOfLine(x0,y0,x1,y1) {
		let points = CordDrawing.brasenhamPoints(x0,y0,x1,y1);

		let t = 0;
		for(let i = 0; i < points.length; i += 1) {
			t += super.getLumAt(points[i].x, points[i].y);
		}

		return t/points.length;
	}

	reduceLumOfLine(x0,y0,x1,y1,reducer) {
		let points = CordDrawing.brasenhamPoints(x0,y0,x1,y1);

		for(let i = 0; i < points.length; i += 1) {
			let x = points[i].x;
			let y = points[i].y;
			let lum = super.getLumAt(x,y);
			let newValue = lum - reducer > 0 ? lum - reducer : 0;
			super.setLumAt(newValue,x,y);
		}
	}

	// Adapted from Stack Overflow user Phrogz
	// https://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
	static brasenhamPoints(x0, y0, x1, y1){
		x0 = Math.floor(x0);
		x1 = Math.floor(x1);
		y0 = Math.floor(y0);
		y1 = Math.floor(y1);

		let dx = Math.abs(x1-x0);
		let dy = Math.abs(y1-y0);
		let sx = (x0 < x1) ? 1 : -1;
		let sy = (y0 < y1) ? 1 : -1;
		let err = dx-dy;

		let points = [];

		let condition = true;
		while(condition){
			points.push({x: x0, y: y0});

			if ((x0==x1) && (y0==y1)){
				condition = false;
			}
			let e2 = 2*err;
			if (e2 >-dy){
				err -= dy; x0  += sx;
			}
			if (e2 < dx){
				err += dx; y0  += sy;
			}
		}

		return points;
	}
}