class ball{
	
constructor(){
  this.x = random(windowWidth);
  this.y = random(windowHeight);
  this.diameter = random(10, 30);
	//var speed = 1;
	//var dir = random(0, 2*PI);
	this.Dir = random(0, 2*PI);
     //this.speed = 1;
     this.speed = 1;
  this.speedx = this.speed*cos(this.Dir);
  this.speedy = this.speed*sin(this.Dir);
  this.fsumx = 0;
  this.fsumy = 0;
 this.mouseTouchRadius=65;
 //this.mouseSpringRate = 0.5;
 this.mouseSpringRate = 0.2;
 this.springRate=0.25;

 //
 //this.numberOfBalls=500;
   
   }
    move() {
		if(mouseIsPressed){
			var distance = dist(this.x, this.y, mouseX, mouseY);
			var touchDist = this.mouseTouchRadius;
			//var touchDist = mouseTouchRadius;
			if(distance<touchDist){
				var dx = this.x - mouseX;
				var dy = this.y - mouseY;
				var force = this.mouseSpringRate*(touchDist-distance);
				//var force = mouseSpringRate*(touchDist-distance);
				dx /= distance;
				dy /= distance;
				var tfx = dx*force;
				var tfy = dy*force;
				this.fsumx += tfx;
				this.fsumy += tfy;
			}
		}
		if(this.x<this.diameter/2){this.fsumx-=(this.springRate*(this.x-this.diameter/2));}
		if(this.y<this.diameter/2){this.fsumy-=(this.springRate*(this.y-this.diameter/2));}
		if(this.x>(windowWidth-this.diameter/2)){this.fsumx-=(this.springRate*(this.x-(windowWidth-this.diameter/2)));}
		if(this.y>(windowHeight-this.diameter/2)){
			this.fsumy-=(this.springRate*(this.y-(windowHeight-this.diameter/2)));
			this.fsumy-=this.speedy*0.01;
			console.log(this.y>windowHeight-this.diameter/2);
			console.log(this.fsumy);
			//console.log(this.y);
			//console.log(windowHeight);
			
		}
    this.speedx += this.fsumx;
    this.speedy += this.fsumy;
		this.fsumx = 0;
		this.fsumy = 0.05;
    this.x += this.speedx;
    this.y += this.speedy;
  }

  display() {
  	    //console.log(this.fsumx);
  	    //console.log(this.fsumy);
		//var colorShift = mag(this.fsumx, this.fsumy)*100;
		var colorShift = mag(this.fsumx, this.fsumy)*100;

		fill(255, 255-colorShift, 255-colorShift);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

 /*get x(){
 	return this.x;
 }
 get y(){
 	return this.y;
 }*/

}
