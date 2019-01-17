// This sketch borrows heavily from yasai's perlin noise sketch
// Tony R. 2018

var seed = "openprocessing";
var nums;
var maxLife = 10;
var noiseScale = 200;
var	simulationSpeed = 0.2;
var fadeFrame = 0;

var padding_top = 100;
var padding_side = 100;
var inner_square = 512;

var particles = [];
var backgroundColor;
var color_from;
var color_to;

function setup(){
	randomSeed(seed);
	noiseSeed(seed);
	nums = 100;
	
	backgroundColor = color(20, 20, 20);
	//color_from = color('black');
	//color_to = color('white');
	color_from = color('purple');
	color_to = color('cyan');
	
	//createCanvas(windowWidth, windowHeight);
	createCanvas(windowHeight, windowHeight);
	background(backgroundColor);
	
	noStroke();
	smooth();
	
	padding_top = (height - inner_square)/2;
	padding_side = (width - inner_square)/2;
	
	for(var i = 0; i < nums; i++){
		var p = new Particle();
		p.pos.x = random(padding_side, width-padding_side);
		p.pos.y = padding_top;
		particles[i] = p;
	}
	
	background(color(0));
	fill(color(255));
}

function draw(){
	
	++fadeFrame;
	if(fadeFrame % 5 == 0){
		
		blendMode(DIFFERENCE);
		fill(1, 1, 1);
		rect(0,0,width,height);

		blendMode(LIGHTEST);
		//blendMode(DARKEST); //looks terrible. stutters
		fill(backgroundColor);
		rect(0,0,width,height);
	}
	
	blendMode(BLEND);
	
	for(var i = 0; i < nums; i++){
		var iterations = map(i,0,nums,5,1);
		var radius = map(i,0,nums,2,6);
		
		particles[i].move(iterations);
		particles[i].checkEdge();
		
		var alpha = 255;
		
		var particle_heading = particles[i].vel.heading()/PI;
		if(particle_heading < 0){
				particle_heading *= -1;
		}
		var particle_color = lerpColor(particles[i].color1, particles[i].color2, particle_heading);
		
		var fade_ratio; //TODO
		fade_ratio = min(particles[i].life * 5 / maxLife, 1);
		fade_ratio = min((maxLife - particles[i].life) * 5 / maxLife, fade_ratio);

		fill(red(particle_color), green(particle_color), blue(particle_color), alpha * fade_ratio);
		particles[i].display(radius);
	} 
}






function Particle(){
// member properties and initialization
	this.vel = createVector(0, 0);
	this.pos = createVector(random(0, width), random(0, height));
	this.life = random(0, maxLife);
	this.flip = int(random(0,2)) * 2 - 1;
	this.color1 = this.color2 = color('white');
	
	if(int(random(3)) == 1){
		//this.color1 = color('palegreen');
		//this.color2 = color('cyan');
		this.color1 = color_from;
		this.color2 = color_to;
	}
	
// member functions
	this.move = function(iterations){
		if((this.life -= 0.01666) < 0)
			this.respawnTop();
		while(iterations > 0){
			
			var transition = map(this.pos.x, padding_side, width-padding_side, 0, 1);
			var angle = noise(this.pos.x/noiseScale, this.pos.y/noiseScale)*transition*TWO_PI*noiseScale;
			//var transition = map(this.pos.y, height/5, height-padding_top, 0, 1, true);
			//var angle = HALF_PI;
			//angle += (noise(this.pos.x/noiseScale, this.pos.y/noiseScale)-0.5)*transition*TWO_PI*noiseScale/66;

			this.vel.x = cos(angle);
			this.vel.y = sin(angle);
			this.vel.mult(simulationSpeed);
			this.pos.add(this.vel);
			--iterations;
		}
	}

	this.checkEdge = function(){
		if(this.pos.x > width - padding_side
		|| this.pos.x < padding_side
		|| this.pos.y > height - padding_top
		|| this.pos.y < padding_top){
			this.respawnTop();
		}
	}
	
	this.respawn = function(){
		this.pos.x = random(0, width);
		this.pos.y = random(0, height);
		this.life = maxLife;
	}
	
	this.respawnTop = function() {
		this.pos.x = random(padding_side, width-padding_side);
		this.pos.y = padding_top;
		this.life = maxLife;
		//this.color1 = lerpColor(color('white'), color_from, (this.pos.x-padding_side)/inner_square);
		//this.color2 = lerpColor(color('white'), color_to, (this.pos.x-padding_side)/inner_square);
	}

	this.display = function(r){
		ellipse(this.pos.x, this.pos.y, r, r);
	}
}