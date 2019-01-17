class stardust{
	constructor(particlesQuantity, colourR, colourG, colourB, controlRange, velocityMultiply){
		this.particlesQuantity = particlesQuantity || 1800;
		//PositionX of Particle
		this.positionX = new Array(particlesQuantity);
		//PositionY of Particle
		this.positionY = new Array(particlesQuantity);
		//Velocity Multiplier
		this.velocityMultiply = velocityMultiply || 0.5;
		//mouse control range 
		this.controlRange = controlRange || 0.1;
		//Velocity of Particle in X direction
		this.velocityX = new Array(particlesQuantity).fill(0);
		//Velocity of Particle in Y direction
		this.velocityY = new Array(particlesQuantity).fill(0);
		//set Initial Colour
		this.colourR = colourR || 64;	//Red Colour Scale of RGB
		this.colourG = colourG || 255; //Green Colour Scale of RGB
		this.colourB = colourB || 255; //Blue Colour Scale of RGB
		this.whatever = 0; //A to be calculated variable to set Velocity
		this.reset = 0; //A variable that can be either 1 or 0, to determine if the reset button in HTML is pressed
}
/*========================================================================================================================================================*/
/*-------------------------------------------------------------Buttons to show and Hide the User Input box------------------------------------------------*/
/*========================================================================================================================================================*/
	getpositionX(){
		return this.positionX;
	}
	//Get function for position X
	getpositionY(){
		return this.positionY;
	}
	//Get function for position Y
	getColourR(){
		return this.colourR;
	}
	//Get function for for Colour Scale RGB - RED
	getColourG(){
		return this.colourG;
	}
	//Get function for for Colour Scale RGB - GREEN
	getColourB(){
		return this.colourB;
	}
	//Get function for for Colour Scale RGB - BLUE
/*========================================================================================================================================================*/
/*-------------------------------------------------------------Buttons to show and Hide the User Input box------------------------------------------------*/
/*========================================================================================================================================================*/
	setColourR(colourR){
		this.colourR = colourR;
   		stroke(this.colourR, this.colourG, this.colourB); //Set Colour to update on the HTML
	}
	//Set Colour Scale RED upon update on UI
	setColourG(colourG){
		this.colourG = colourG;
   		stroke(this.colourR, this.colourG, this.colourB);
	}
	//Set Colour Scale GREEN upon update on UI
	setColourB(colourB){
		this.colourB = colourB;
   		stroke(this.colourR, this.colourG, this.colourB);
	}
	//Set Colour Scale BLUE upon update on UI
	setQuantity(quantity){
		this.particlesQuantity = quantity;
	}
	//Set the quantity of Partocles **MAX 10000**
	setVelocityMultiplier(velocityMultiply){
		this.velocityMultiply = velocityMultiply;
	}
	//Set the velocity multiplier to a certain value to make the particle move faster or slower
	//PS* If your screen is normally sized, I do not recognmmend cranking this up, it can take ages to find the particles back with out resetting
	setcontrolRange(controlRange){
		this.controlRange = controlRange;
	}
	//Set the distance multiplier between the cursor from the particles
	//0.05~0.4 is fun
/*========================================================================================================================================================*/
/*-------------------------------------------------------------------funtions-----------------------------------------------------------------------------*/
/*========================================================================================================================================================*/
/*--------------------------------------------------------Sets reset "signal" to true---------------------------------------------------------------------*/
 	Reset(){
	this.reset = 1;
	//console.log(this.reset);
	}
	//Reset function to reset every Parameter in the UI Page
/*--------------------------------------------------------Sets Up the Template to Run---------------------------------------------------------------------*/
  	setup(){
  		//console.log(this.colourR);
  		//console.log(this.colourG);
  		//console.log(this.colourB);
   		stroke(this.colourR, this.colourG, this.colourB); //Set up the colour RGB
   		for (var particle = 1; particle < this.particlesQuantity; particle++) { //When the number of particle is less than pre-set, add one
		this.positionX[particle] = random(0, width);
		this.positionY[particle] = random(0, height);
	}
	
		this.positionX[0] = 0;
		this.positionY[0] = 0;
   }
/*---------------------------------------------------Draw out the sketch after Calculation---------------------------------------------------------------*/
	draw(){
		//Reset the drawing canvas
		if(this.reset ==1){
			setup();
		}
		//Calculations for the velocity of Particles
		this.velocityX[0] = this.velocityX[0] * this.velocityMultiply + (mouseX - this.positionX[0]) * this.controlRange;
		this.velocityY[0] = this.velocityY[0] * this.velocityMultiply + (mouseY - this.positionY[0]) * this.controlRange;
		this.positionX[0] += this.velocityX[0];
		this.positionY[0] += this.velocityY[0];
	
		for (var particle = 1; particle < this.particlesQuantity; particle++) {
		this.whatever = 1024 / (sq(this.positionX[0] - this.positionX[particle]) + sq(this.positionY[0] - this.positionY[particle]));
		this.velocityX[particle] = this.velocityX[particle] * this.velocityMultiply + (this.velocityX[0] - this.velocityX[particle]) * this.whatever;
		this.velocityY[particle] = this.velocityY[particle] * this.velocityMultiply + (this.velocityY[0] - this.velocityY[particle]) * this.whatever;
		this.positionX[particle] += this.velocityX[particle];
		this.positionY[particle] += this.velocityY[particle];

		if ((this.positionX[particle] < 0 && this.velocityX[this.particle] < 0) || (this.positionX[this.particle] > width && this.velocityX[this.particle] > 0)) {
			this.velocityX[particle] = -this.velocityX[this.particle];
		}
		
		if ((this.positionY[particle] < 0 && this.velocityY[particle] < 0) || (this.positionY[particle] > height && this.velocityY[particle] > 0)) {
			this.velocityY[particle] = -this.velocityY[particle];
		}
		//console.log(this.positiony[particle]);
		//console.log(this.positionX[particle]);
		point(this.positionX[particle],this.positionY[particle]);
		//Point is a print function, aka Particle
	}
}
}