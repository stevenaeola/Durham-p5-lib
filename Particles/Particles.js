class Particles{

	constructor(width,height,noParticles,graphic,red,green,blue){
		this.particles=[];
		this.noParticles = noParticles || 500;
		this.width = width || 500;
		this.height = height || 500;
		this.graphic = graphic || false;
		this.red = red;
		this.green = green;
		this.blue = blue;
	}

	//initialises component on canvas of size width x height, if graphic=true the component is rendered onto an WEBGL cube instead
	init(){
		if(this.graphic){
			createCanvas(this.width,this.height,WEBGL);
			g = createGraphics(300,300);
			g.background(0);}
		else{
			createCanvas(this.width,this.height);
			//the blendmode() function does not exist for WEBGL, so the appearance of the effect is slightly different
			blendMode(ADD);
		}

		frameRate(45);
		//generates particles from the Particle class - the number is determined by the noParticles parameter
		for (let i=0; i<this.noParticles; i++){
			this.particles[i] = new Particle(this.width/2,this.height/2,this.graphic,this.red,this.green,this.blue);
		}

	}

	//draws Particles
	draw(){
		clear();
		background(0);
		for (let i=0; i< this.particles.length; i++){
			this.particles[i].draw();
			this.particles[i].move();
			//removes particles that go off screen
			if(this.particles[i].offscreen){
				this.particles.splice(i,1);}
			//creates particles to replace removed ones
			if (this.particles.length < this.noParticles){
				for (let j=this.particles.length; j<this.noParticles; j++){
					this.particles[j] = new Particle(this.width/2,this.height/2,this.graphic,this.red,this.green,this.blue);
					this.particles[j].move();
				}
			}
		}

		//renders Particles on rotating cube if graphic=true
		if(this.graphic){
			texture(g);
			rotateZ(frameCount * 0.02);
			rotateX(frameCount * 0.02);
			rotateY(frameCount * 0.02);
			box(this.width/2);

		}
	}
}

///////////////////////////////////////////////////////////////
//class used to generate each individual particle
class Particle{
	constructor(x_pos, y_pos,graphic, red, green, blue){
		this.x_pos = x_pos || 250;
		this.y_pos = y_pos || 250;
		this.dx = random(-5, 5);
		this.dy = random(-5, 5);
		//rgb colours taken as argument or directly from html sliders
		this.red= red || rSlider.value;
		this.green = green || gSlider.value;
		this.blue = blue || bSlider.value;
		this.bright= random(255);
		this.offscreen;
		this.width = 2*x_pos;
		this.height = 2*y_pos;
		this.graphic = graphic;
	}

	//draws particle at defined location, onto cube if graphic=true
	draw(){
		if(this.graphic){
			g.noStroke();
			g.fill(this.bright*this.red/255, this.bright*this.green/255, this.bright*this.blue/255,150);
			g.ellipse(this.x_pos/2, this.y_pos/2, 50, 50);
		}
		else{
			noStroke();
			fill(this.bright*this.red/255, this.bright*this.green/255, this.bright*this.blue/255,150);
			ellipse(this.x_pos, this.y_pos, 50, 50);
		}
	}

	move(){
		//moves particles in random direction
		this.x_pos += this.dx;
		this.y_pos += this.dy;
		this.bright--;
		//determines if particles have gone off screen or 'faded away', marks these as offscreen for deletion
		if (
			(this.bright <= 0) ||
					(this.x_pos < 0) ||
					(this.x_pos > this.width) ||
					(this.y_pos < 0) ||
					(this.y_pos > this.height)
		){this.offscreen = true;}
	}
}
