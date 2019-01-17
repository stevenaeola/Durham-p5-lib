class balls{
	constructor(numberOfBalls,springRate,dampingFactor,gravity,mouseTouchRadius){
		this.numberOfBalls = numberOfBalls || 200;
		this.springRate = springRate || 0.25;
		this.dampingFactor = dampingFactor || 0.5;
		this.gravity = gravity || 0.05;
		//this.speed = speed;
		//this.diameter = diameter;
		this.mouseTouchRadius = mouseTouchRadius || 65;
		this.mouseSpringRate = 0.05;
		this.ballArray = new Array();
	}

//var numberOfBalls = 50;
//var springRate = 0.25;
//var dampingFactor = 0.5;
//var gravity = 0.05;
//var mouseTouchRadius = 65;
//var mouseSpringRate = 0.05;

//var ballArray = [];



//get


getnumber(){
	return this.numberOfBalls;
}

getmouse(){
	return this.mouseTouchRadius;
}

getgravity(){
	return this.gravity;
}

getdamping(){
	return this.dampingFactor;
}



 
//set parts

 setNum(num){
 	this.numberOfBalls = num;
 	background(100);
 	this.ballArray = new Array();
  for (var i=0; i<this.numberOfBalls; i++) {
  	
  	let b = new ball();
    this.ballArray.push(b);
  }
 }



 setGra(gra){
 	this.gravity = gra;

 }

 setDamp(damp){
 	this.dampingFactor = damp;
 }

setMou(mouse){
	this.mouseTouchRadius = mouse;
}






//setup

 balls_setup() {
	//createCanvas(windowWidth, windowHeight);
  background(100);
  for (var i=0; i<this.numberOfBalls; i++) {
  	
  	let b = new ball();
    this.ballArray.push(b);
  }
}

 balls_draw() {
  background(50, 89, 100);
  for (var i=0; i<this.ballArray.length; i++) {
		for (var j=0; j<i; j++) {
			/*console.log(i);
			console.log(j);*/
      var distance = dist(this.ballArray[i].x, this.ballArray[i].y, this.ballArray[j].x, this.ballArray[j].y);
			var touchDist = this.ballArray[i].diameter/2 + this.ballArray[j].diameter/2;
			if(distance<touchDist){
				var dx = this.ballArray[i].x - this.ballArray[j].x;
				var dy = this.ballArray[i].y - this.ballArray[j].y;
				var force = this.springRate*(touchDist-distance);
				dx /= distance;
				dy /= distance;
				var tfx = dx*force;
				var tfy = dy*force;
				this.ballArray[i].fsumx += tfx;
				//console.log(this.ballArray[i].fsumx);
				this.ballArray[i].fsumy += tfy;
				this.ballArray[j].fsumx -= tfx;
				this.ballArray[j].fsumy -= tfy;
				var dspeedx = this.ballArray[i].speedx - this.ballArray[j].speedx;
				var dspeedy = this.ballArray[i].speedy - this.ballArray[j].speedy;
				var dotProduct = dspeedx * dx + dspeedy * dy;
				var damping = dotProduct*this.dampingFactor;
				var sfx = dx*damping;
				var sfy = dy*damping;
				this.ballArray[i].fsumx -= sfx;
				this.ballArray[i].fsumy -= sfy;
				this.ballArray[j].fsumx += sfx;
				this.ballArray[j].fsumy += sfy;
			}
		}
 }
  for (var i=1; i<this.ballArray.length; i++) {
    this.ballArray[i].display();
    this.ballArray[i].move();
  }

}


}