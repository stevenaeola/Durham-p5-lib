var MAX_PARTICLES = 200;
var COLORS = ['rgba(255,255,255,.7)']

var particles = [];
var pool = [];


function preload() {
	song = loadSound('https://ia600208.us.archive.org/3/items/CountryRoads_363/CountryRoadswestVirginia-JohnDenver.mp3')
	img = loadImage('https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_640/v1/hellofresh_s3/image/55b9a2ec4dab7184418b4567.png')
}

function setup() {
	createCanvas(windowWidth, windowHeight);

}

function draw() {
	drawingContext.globalCompositeOperation = 'normal';
	background(0);
	for (var i = particles.length - 1; i >= 0; i--) {
		particles[i].draw();
	}
}


function moved() {
	var max = random(1, 4);
	var pi = 3.14
	for (var i = 0; i < max; i++) {
		if (particles.length >= MAX_PARTICLES) {
			pool.push(particles.shift());
		}

		let a = document.getElementById('size').value * 10
		let b = document.getElementById('theta').value / 10
		let c = document.getElementById('force').value / 100
		let d = document.getElementById('drag').value
		let e = document.getElementById('sizescalar').value / 100
		let bb = document.getElementById('randomm').checked
		if (bb) {
			b = undefined
		}
		let myred = document.getElementById('myred').checked
		let mygreen = document.getElementById('mygreen').checked
		let myblue = document.getElementById('myblue').checked
		if (myred) {
			if (!COLORS.includes('rgba(255,0,0,.7)')) {
				COLORS.splice(1, 0, 'rgba(255,0,0,.7)')
			}
		} else {
			COLORS.splice(1, 1)
		}
		if (mygreen) {
			if (!COLORS.includes('rgba(0,255,0,.7)')) {
				COLORS.splice(2, 0, 'rgba(0,255,0,.7)')
			}
		} else {
			COLORS.splice(2, 1)
		}
		if (myblue) {
			if (!COLORS.includes('rgba(0,0,255,.7)')) {
				COLORS.splice(3, 0, 'rgba(0,0,255,.7)')
			}
		} else {
			COLORS.splice(3, 1)
		}


		const classes = {
			Circle,
			Triangle,
			Potato,
			Square,
			VerticalLine,
			HorizontalLine
		};
		let classSelector = document.getElementById('mySelect').value

		particle = new classes[classSelector](mouseX, mouseY, a, b, c, random(COLORS), d, e);
		particle.setvelocityX(sin(particle.gettheta()) * particle.getforce());
		particle.setvelocityY(cos(particle.gettheta()) * particle.getforce());
		particles.push(particle);
	}
}

function mouseMoved() {
	moved();
}

function mousePressed() {
	console.log(mouseX, mouseY)
	if (mouseY > 385 || mouseX > 170) {
		if (song.isPlaying()) {
			song.pause();
			document.getElementById('size').value = 20
			document.getElementById('sizescalar').value = 97
			document.getElementById('mySelect').value = "Circle"
			document.getElementById('force').value = 90
			document.getElementById('theta').value = 15
		} else {
			song.play();
			document.getElementById('size').value = 50
			document.getElementById('sizescalar').value = 100
			document.getElementById('mySelect').value = "Potato"
			document.getElementById('force').value = 80
			document.getElementById('theta').value = 1
		}
	}
}