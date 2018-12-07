/*

	This is a p5 script that was taken and modified from
	Raven Kwok's "Noise Turbulance Doodles", which can be found here:
	https://www.openprocessing.org/sketch/448633
	
	It has been modified to be object-orientated, and I have also added a helper class
	so you can easily add this to any html page.
	
	Since the original code was licensed under Creative Commons Attribution-ShareALike,
	this code is also licensed under Creative Commons Attribution-ShareALike, so feel
	free to share and adapt this code for yourself.
	
	There are no warranties for this code, so sorry if your processor melts from all
	of the pretty colours.
	
	Created by Benjamin Beddows, aka drwhut.

	ORIGINAL NOTES
	==============
	Noise turbulence doodles

	Changed how it renders to feel more stylized.

	Author:
		Raven Kwok aka Guo, Ruiwen
		ravenkwok.com
		twitter.com/ravenkwok
		vimeo.com/ravenkwok
		ravenkwok.tumblr.com
		flickr.com/photos/ravenkwok

	Forked by:
		Jason Labbe

	Site:
		jasonlabbe3d.com
*/

/*
	An object that has a colour, then moves around a bit, then dies a very sad death.
*/
class Particle {
  
	constructor(x, y, xOfst, yOfst, h, lifeSpan = 90, decay = 0.75, sizeScalar = 1, velScalar = 0.25, minSizeRatio = 0.05, maxSizeRatio = 0.5) {
		this.loc = createVector(x, y);
		
		// Assign an initial velocity.
		var randDegrees = random(360);
		this.vel = createVector(cos(radians(randDegrees)), sin(radians(randDegrees)));
		this.vel.mult(random(5));
		
		this.acc = createVector(0,0);
		this.velScalar = velScalar;
		
		this.passedLife = 0;
		this.lifeSpan = lifeSpan;
		this.decay = decay;
		
		// Get the hue object, and manipulate it so the next particle is a bigger hue.
		// If we go more than the max hue, go back to the start.
		// This works because objects are passed by reference, not by value.
		this.h = h.current;
		
		if (h.minH != h.maxH) {
			h.current += 0.5;
			if (h.current > h.maxH) {
			  h.current = h.minH + h.current - h.maxH;
			}
		}
		
		this.c = color(this.h, 255, 255, 10);
		
		// Make the size of the particles big, then small, then big, etc.
		this.sizeMult = constrain(sin(frameCount*0.02), minSizeRatio, maxSizeRatio) * sizeScalar;
		this.xOfst = xOfst;
		this.yOfst = yOfst;
	}
  
	/*
		Update the position and decay of the particle for one frame.
	*/
	update() {
		// Age this particle to it's death, which is kind of morbid,
		// but it would be too crowded if we let them live forever...
		if (this.passedLife >= this.lifeSpan){
			this.dead = true; // ded
		} else {
			this.passedLife++;
		}
		
		this.alpha = float(this.lifeSpan-this.passedLife)/this.lifeSpan * 70+50;
		this.weight = float(this.lifeSpan-this.passedLife)/this.lifeSpan * this.weightRange;
		
		// Reset the acceleration each frame so it does always increase.
		this.acc.set(0,0);
		
		// Create a rotation and magnitude of the new acceleration, by taking it's
		// position on the canvas and the frame count, and applying perlin noise.
		// Particles in the same place at the same time will tend towards the same direction.
		var rn = (noise((this.loc.x+frameCount+this.xOfst)*.01, (this.loc.y+frameCount+this.yOfst)*.01)-.5)*TWO_PI*4;
		var mag = noise((this.loc.y-frameCount)*.01, (this.loc.x-frameCount)*.01);
		
		// Assign the new acceleration.
		var dir = createVector(cos(rn),sin(rn));
		this.acc.add(dir);
		this.acc.mult(mag);
		
		// Randomly generate a direction velocity vector, and add it on to the acceleration.
		// This makes the particle go in random directions, but smoothly, as if it's following a path.
		var randRn = random(TWO_PI);
		var randV = createVector(cos(randRn), sin(randRn));
		randV.mult(this.velScalar);
		this.acc.add(randV);
		
		// Add the acceleration to the velocity, decay, then add to the location.
		this.vel.add(this.acc);
		this.vel.mult(this.decay);
		this.loc.add(this.vel);
	}
  
	/*
		Paint the particle onto the canvas.
	*/
	draw() {
		strokeWeight((this.lifeSpan-this.passedLife)*this.sizeMult);
		stroke(this.c);
		point(this.loc.x, this.loc.y);
	}
	
	// GETTERS
	
	getLifeSpan() {
		return this.lifeSpan;
	}
	
	getDecay() {
		return this.decay;
	}
	
	getVelScalar() {
		return this.velScalar;
	}
	
	// SETTERS
	
	setLifeSpan(lifeSpan) {
		if (lifeSpan < 0)
			lifeSpan = 0;
		
		this.lifeSpan = lifeSpan;
	}
	
	setDecay(decay) {
		if (decay < 0)
			decay = 0;
		
		this.decay = decay;
	}
	
	setVelScalar(velScalar) {
		this.velScalar = velScalar;
	}
}

/*
	A class that manages a list of Particles, and helps with updating and drawing them.
*/
class NoiseTurbulanceHelper {
	
	constructor(hModes = [[100, 220], [0, 55], [20, 100], [110, 180], [150, 255]], numParticlesPerFrame = 10, pLifeSpan = 90, pDecay = 0.75, pSizeScalar = 1, pVelScalar = 0.25, pMinSizeRatio = 0.05, pMaxSizeRatio = 0.5) {		
		this.hModes = hModes;
		
		this.h = {
			hIndex: 0,
			minH: hModes[0][0],
			maxH: hModes[0][1],
		};
		
		this.h.current = this.h.minH;
		
		this.pts = [];
		
		this.pLifeSpan = pLifeSpan;
		this.pDecay = pDecay;
		this.pSizeScalar = pSizeScalar;
		this.pVelScalar = pVelScalar;
		this.numParticlesPerFrame = numParticlesPerFrame;
		this.pMinSizeRatio = pMinSizeRatio;
		this.pMaxSizeRatio = pMaxSizeRatio;
	}
	
	// GETTERS
	
	getNumParticlesPerFrame() {
		return this.numParticlesPerFrame;
	}
	
	getParticleLifeSpan() {
		return this.pLifeSpan;
	}
	
	getParticleDecay() {
		return this.pDecay;
	}
	
	getParticleSizeScalar() {
		return this.pSizeScalar;
	}
	
	getParticleVelScalar() {
		return this.pVelScalar;
	}
	
	getParticleMinSizeRatio() {
		return this.pMinSizeRatio;
	}
	
	getParticleMaxSizeRatio() {
		return this.pMaxSizeRatio;
	}
	
	getHueModes() {
		return this.hModes;
	}
	
	// SETTERS
	
	setNumParticlesPerFrame(numParticlesPerFrame) {
		if (numParticlesPerFrame < 0)
			numParticlesPerFrame = 0;
		
		this.numParticlesPerFrame = numParticlesPerFrame;
	}
	
	setParticleLifeSpan(pLifeSpan) {
		this.pLifeSpan = pLifeSpan;
	}
	
	setParticleDecay(pDecay) {
		this.pDecay = pDecay;
	}
	
	setParticleSizeScalar(pSizeScalar) {
		if (pSizeScalar < 0)
			pSizeScalar = -pSizeScalar;
		
		this.pSizeScalar = pSizeScalar;
	}
	
	setParticleVelScalar(pVelScalar) {
		this.pVelScalar = pVelScalar;
	}
	
	setParticleMinSizeRatio(pMinSizeRatio) {
		if (pMinSizeRatio < 0)
			pMinSizeRatio = 0;
		
		else if (pMinSizeRatio > 1)
			pMinSizeRatio = 1;
		
		if (pMinSizeRatio > this.pMaxSizeRatio)
			pMinSizeRatio = this.pMaxSizeRatio;
		
		this.pMinSizeRatio = pMinSizeRatio;
	}
	
	setParticleMaxSizeRatio(pMaxSizeRatio) {
		
		if (pMaxSizeRatio < 0)
			pMaxSizeRatio = 0;
		
		else if (pMaxSizeRatio > 1)
			pMaxSizeRatio = 1;
		
		if (pMaxSizeRatio < this.pMinSizeRatio)
			pMaxSizeRatio = this.pMinSizeRatio;
		
		this.pMaxSizeRatio = pMaxSizeRatio;
	}
	
	/*
		hModes should be an non-empty array of length-2 arrays.
		Each length-2 array should contain integers, with the 1st integer being < the 2nd,
		and both numbers being >= 0, and <= 255.
	*/
	setHueModes(hModes) {
		this.hModes = hModes;
	}
	
	/*
		Clear the canvas.
	*/
	clear() {
		for (var i = this.pts.length - 1; i > -1; i--) {
			var p = this.pts[i];
			this.pts.splice(i, 1);
		}
		background(0);
	}

	/*
		A p5 function to be run so the helper can get key presses.
	*/
	keyPressed() {
		if (key == 'c') {
			this.clear();
		} else {
			this.changeHue();
		}
	}

	/*
		Go to the next hue mode. This can be called by pressing any key (except c).
		If index is -1, it will go to the next hue mode.
	*/
	changeHue(index=-1) {
		
		if (index == -1) {
			this.h.hIndex++;
			
			if (this.h.hIndex >= this.hModes.length) {
				this.h.hIndex = 0;
			}
		}
		else if (index > -1) {
			if (index < this.hModes.length) {
				this.h.hIndex = index;
			}
		}

		this.h.minH = this.hModes[this.h.hIndex][0];
		this.h.maxH = this.hModes[this.h.hIndex][1];

		this.h.current = this.h.minH;
	}
	
	/*
		Get the hue mode index we're currently on.
	*/
	getHueIndex() {
		return this.h.hIndex;
	}

	/*
		Setup the p5 canvas, should be called in a global function called setup().
	*/
	setup(width, height, renderer) {
		createCanvas(width, height, renderer);
		smooth();
		colorMode(HSB);
		rectMode(CENTER);

		background(0);
	}

	/*
		Draw the current state of particles, and update them.
		If the mouse is pressed, create new particles.
		Should be called in a global function called draw().
	*/
	draw() {  
		if (mouseIsPressed) {
			for (var i = 0; i < this.numParticlesPerFrame; i++) {
				var newP = new Particle(mouseX, mouseY, i + this.pts.length, i + this.pts.length, this.h,
					this.pLifeSpan, this.pDecay, this.pSizeScalar, this.pVelScalar, this.pMinSizeRatio, this.pMaxSizeRatio);
				this.pts.push(newP);
			}
		}

		for (var i = this.pts.length - 1; i >= 0; i--) {
			var p = this.pts[i];
			if (p.dead) {
				this.pts.splice(i, 1);
			} else {
				p.update();
				p.draw();
			}
		}
	}
}