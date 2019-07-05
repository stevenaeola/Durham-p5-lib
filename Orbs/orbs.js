
	class Orbs {
	constructor(s, n, lL, hL, sz, fr, p) {
		//Initialise object variables
		this.speed = s;
		this.num = n;
		this.loLimit = lL;
		this.hiLimit = hL;
		this.theta = 0.0;
		this.size = sz;
		this.edge = 100;
		this.step = (width - 2 * this.edge) / this.num;
		this.palette = p;
		this.f = color(0)
		this.frequency = fr;
	}

	draw(g) {
		//If a p5.renderer object is present render to this instead of the canvas
		if (g) {
			var i = 0;
			//Each stream of particles is processed serparately
			for (var j = 0; j < 4; j++) {
				//Iterate through each x coordinate, rightmost coordinate determined by 401 multiplied by the frequency of the function. 
				//The frequency will determine how many repetitions of the wave will be compressed into the 300 pixel coordinate range
				//Each loop the x coordinate will be increased by the amount step, determined by the canvas width and number of particles
				for (var x = 100; x < 401 * this.frequency; x += this.step) {
					//Y values follow a sine wave, giving the impression that the wave is moving across the page
					var y = map(sin(j * PI / 8 + this.theta + (TWO_PI / this.num * i)), -1, 1, this.loLimit, this.hiLimit);
					for (var h = 0; h < 7; h++) {
						this.f = this.palette[j % 4]; //The colour of each stream is extracted from the palette array
						g.fill(this.f, h * 30);
						if (y >= this.hiLimit - 100 && y <= this.loLimit) //If the particle is in a valid position on the page
							//As particles move up and down the page their size changes relative to their distance from the top and bottom limits
							var scal = map(y, this.loLimit - 100, this.hiLimit, 1, 2.8 - h * 0.3);
						g.ellipse(x / this.frequency, y, this.size * scal, this.size * scal);
					}
					g.fill(this.f);
					g.ellipse(x / this.frequency, y, this.size, this.size); //x position must be corrected to account for wave frequency
					i++;
				}
			}
			//As the function follows a sine wave, reducing the angle by which the wave steps through each frame will appear to slow down the rate at which the wave moves across the page
					this.theta += TWO_PI / this.speed; 
		}
		else
		{
			var i = 0;
			for (var j = 0; j < 4; j++) {
				for (var x = 100; x < 401 * this.frequency; x += this.step) {
					var y = map(sin(j * PI / 8 + this.theta + (TWO_PI / this.num * i)), -1, 1, this.loLimit, this.hiLimit);
					for (var h = 0; h < 7; h++) {
						this.f = this.palette[j % 4];
						fill(this.f, h * 30);
						if (y >= this.hiLimit - 100 && y <= this.loLimit) 
							var scal = map(y, this.loLimit - 100, this.hiLimit, 1, 2.8 - h * 0.3);
						ellipse(x / this.frequency, y, this.size * scal, this.size * scal);
					}
					fill(this.f);
					ellipse(x / this.frequency, y, this.size, this.size);
					i++;
				}
			}
					this.theta += TWO_PI / this.speed;

		}

	}

	getSpeed() {
		return this.speed;
	}
	setSpeed(s) {
		this.speed = s;
	}

	getNum() {
		return this.num;
	}
	setNum(n) {
		this.num = n;
		//When the number of particles is changed the step value must also be corrected to ensure that wave adjusts to this change
		this.step = (width - 2 * this.edge) / this.num;
	}

	getHiLimit() {
		return this.hiLimit;
	}
	setHiLimit(hL) {
		this.hiLimit = hL;
	}
	
	getLoLimit() {
		return this.loLimit;
	}
	setLoLimit(lL) {
		this.loLimit = lL;
	}

	getSize() {
		return this.size;
	}
	setSize(sz) {
		this.size = sz;
	}
	
	getFreq() {
		return this.frequency;
	}
	setFreq(freq) {
		//In order to produce accurate waveforms the frequency must be divided by PI
		this.frequency = PI / freq;
	}
	
	setPalette(i, col) {
		this.palette[i] = col;
	}
	
	randomiseColours(){
		//Iterate through each colour stream
		for (var i = 0; i < 4; i++) {
		//Result must be an integer
		var r = (Math.floor((255 * Math.random()) + 1)).toString(16);
		//If a single digit hex value is returned a zero must be added to ensure a 6 digit colour code is obtained
		if (r.length == 1)
			r = 0 + r
		var g = (Math.floor((255 * Math.random()) + 1)).toString(16);
		if (g.length == 1) 
			g = 0 + g
		var b = (Math.floor((255 * Math.random()) + 1)).toString(16);
		if (b.length == 1) 
			b = 0 + b
		var c = "#" + r + g + b;
		var C = color(c);
		//Set stream colour
		this.setPalette(i, C);
		}
	}
}