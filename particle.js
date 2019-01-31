
class Particle {
  constructor(l,n,r,o,rotation) { 
    this.l = l || 1;
    this.n = random(1, width/2);
    this.r = random(0, TWO_PI);
    this.o = random(1, random(1, width/this.n));
    this.rotation= rotation || 0;
  }

  draw() {
    this.l++;
    push();
    rotate(this.r);
    translate(this.drawDist(), 0);
    fill(255, min(this.l, 255));
    imageMode(CENTER);
    image(imageP, 0, 0, width/this.o/8, width/this.o/8);
    pop();

   this.o-=0.07;
  }

  drawDist() {
    return atan(this.n/this.o)*width/HALF_PI;
  }

  drawrun(){

    background(bgColour);

    translate(width/2, height/2);
    this.rotation-=0.002;
    rotate(this.rotation);

    for (i = 0; i<particle.length; i++) {
      particle[i].draw();
      if (particle[i].drawDist()>diagonal) {
        particle[i] = new Particle();
      }
    }

  }

}

var song;
var imageP;

function preload() {
  par=new Particle(); 
  song = loadSound('YKZZLDX.mp3');
  imageP = loadImage("particle.png");
}


var particle = new Array(800);
var diagonal;

function setp(){
  createCanvas(1440, 900);
  frameRate(30);

	for (i = 0; i<particle.length; i++) {
    particle[i] = new Particle();
    particle[i].o = random(1, random(1, width/particle[i].n));
  }

  diagonal = sqrt(width*width + height * height)/2;
  song.play();
}

