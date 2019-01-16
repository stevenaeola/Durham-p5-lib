var particles_a = [];
var slidersA = [document.getElementById("R1"), document.getElementById("G1"), document.getElementById("B1")];
var particles_b = [];
var slidersB = [document.getElementById("R2"), document.getElementById("G2"), document.getElementById("B2")];
var particles_c = [];
var slidersC = [document.getElementById("R3"), document.getElementById("G3"), document.getElementById("B3")];
var sliderN = document.getElementById("N");
var sliderS = document.getElementById("S");
var noiseScale = 800;

for (var i = 0; i < slidersA.length; i++){
	slidersA[i].oninput = function(){
		document.getElementById("a").style.backgroundColor = 'rgb(' + [slidersA[0].value,slidersA[1].value,slidersA[2].value].join(',') + ')';
	}
}
for (var i = 0; i < slidersB.length; i++){
	slidersB[i].oninput = function(){
		document.getElementById("b").style.backgroundColor = 'rgb(' + [slidersB[0].value,slidersB[1].value,slidersB[2].value].join(',') + ')';
	}
}
for (var i = 0; i < slidersC.length; i++){
	slidersC[i].oninput = function(){
		document.getElementById("c").style.backgroundColor = 'rgb(' + [slidersC[0].value,slidersC[1].value,slidersC[2].value].join(',') + ')';
	}
}

sliderN.oninput = function(){
	document.getElementById("n").innerHTML = this.value;
}

sliderS.oninput = function(){
	document.getElementById("s").innerHTML = this.value;
}

function reload(){
	// console.log("reload");
	a = [slidersA[0].value, slidersA[1].value, slidersA[2].value];
	b = [slidersB[0].value, slidersB[1].value, slidersB[2].value];
	c = [slidersC[0].value, slidersC[1].value, slidersC[2].value];
	n = sliderN.value;
	s = parseFloat(sliderS.value);
	main = new Sketch(a, b, c, n, s);
}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("canvas");
	reload();
}

function draw(){
		main.draw()
}
	
class Sketch{
	constructor(a, b, c, n, s){
		this.a = a;
		this.b = b;
		this.c = c;
		this.n = n;
		background(21, 8, 50);
		for(var i = 0; i < this.n; i++){
			particles_a[i] = new Particle(random(0, width),random(0,height), s);
			particles_b[i] = new Particle(random(0, width),random(0,height), s);
			particles_c[i] = new Particle(random(0, width),random(0,height), s);
		}
	}

	draw(){
		noStroke();
		smooth();
			for(var i = 0; i < this.n; i++){
			var radius = 1.5*map(i,0, this.n,1,2);
			var alpha = map(i,0, this.n,0,250);

			fill(this.a[0], this.a[1], this.a[2], alpha);
			particles_a[i].move();
			particles_a[i].display(radius);
			particles_a[i].checkEdge();

			fill(this.b[0], this.b[1], this.b[2], alpha);
			particles_b[i].move();
			particles_b[i].display(radius);
			particles_b[i].checkEdge();

			fill(this.c[0], this.c[1], this.c[2], alpha);
			particles_c[i].move();
			particles_c[i].display(radius);
			particles_c[i].checkEdge(); 
		}
	}
}



class Particle{
	constructor(x, y, speed){
		this.dir = createVector(0, 0);
		this.vel = createVector(0, 0);
		this.pos = createVector(x, y);
		this.speed = speed;
	}	

	move(){
		var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*TWO_PI*noiseScale;
		this.dir.x = cos(angle);
		this.dir.y = sin(angle);
		this.vel = this.dir.copy();
		this.vel.mult(this.speed);
		this.pos.add(this.vel);
	}

	checkEdge(){
		if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0){
			this.pos.x = random(50, width);
			this.pos.y = random(50, height);
		}
	}

	display(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}