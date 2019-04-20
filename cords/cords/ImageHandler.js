const RedChannel = 0;
const GreenChannel = 1;
const BlueChannel = 2;

class ImageHandler {
	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get scaling() {
		return this._scaling;
	}

	get scaledWidth() {
		return this._scaledWidth;
	}

	get scaledHeight() {
		return this._scaledHeight;
	}

	get image() {
		return this._image;
	}

	get RGB() {
		return this._RGB;
	}

	get lum() {
		return this._lum;
	}

	constructor(src = "example.png", scaling) {
		this._image = loadImage(src);
		this._scaling = scaling || 1;
	}

	setup() {
		this._image.loadPixels();

		this._width = this._image.width;
		this._height = this._image.height;

		this._scaledWidth = this._width * this._scaling;
		this._scaledHeight = this._height * this._scaling;

		//Split and scale colour channels
		this._RGB = {
			r : this.scaleChannel(RedChannel),
			g : this.scaleChannel(GreenChannel),
			b : this.scaleChannel(BlueChannel)
		};

		//Get the luminosity
		this._lum = this._RGB.r;
		for(let i = 0; i < this._RGB.r.length; i += 1) {
			this._lum[i] = 255 - (this._RGB.r[i] *  299/1000 + this._RGB.g[i] * 587/1000 + this._RGB.b[i] * 114/1000);
		}
	}

	setPixelAt(value, x, y) {
		if(x < 0 || x > this.scaledWidth || y < 0 || y > this.scaledHeight) {
			return -1;
		}
		let i = this.scaledWidth * y + x;
		this._RGB.r[i] = value[0];
		this._RGB.g[i] = value[1];
		this._RGB.b[i] = value[2];

		return i;
	}

	getPixelAt(x, y) {
		if(x < 0 || x > this.scaledWidth || y < 0 || y > this.scaledHeight) {
			return [0,0,0];
		}
		let red = this._RGB.r[this.scaledWidth * y + x];
		let green = this._RGB.g[this.scaledWidth * y + x];
		let blue = this._RGB.b[this.scaledWidth * y + x];

		return [red, green, blue];
	}

	setLumAt(value, x, y) {
		if(x < 0 || x > this.scaledWidth || y < 0 || y > this.scaledHeight) {
			return -1;
		}
		let i = this.scaledWidth * y + x;
		this._lum[i] = value;

		return i;
	}

	getLumAt(x, y) {
		if(x < 0 || x > this.scaledWidth || y < 0 || y > this.scaledHeight) {
			return 0;
		}
		return this._lum[this.scaledWidth * y + x];
	}

	scaleChannel(channel) {
		let scaledPixels = [];

		let pixels = this.getChannel(channel);

		let length = pixels.length * Math.pow(this._scaling,2);
		for(let i = 0; i < length; i += 1) {
			let x = Math.floor(i % this.scaledWidth);
			let y = Math.floor(i / this.scaledWidth);

			scaledPixels.push(
				pixels[this._width*Math.floor(y/this._scaling) + Math.floor(x/this._scaling)]
			);
		}

		return scaledPixels;
	}

	getChannel(channel) {
		let returnChannel = [];

		let length = this._image.pixels.length;
		for(let i = channel; i < length; i += 4) {
			returnChannel.push(this._image.pixels[i]);
		}

		return returnChannel;
	}
}