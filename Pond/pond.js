var fish = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  /* Gives a nice glow feel */
  strokeWeight(10);
  /* 
   IMPORTANT: because we are using vertices to make our fish, the line joining becomes spiky when the 
   strokeWeight is bigger than 1. 
   */
  strokeJoin(ROUND);
  stroke(0, 150, 255);
  /* Add 100 fish */
  for (i = 0; i < 60; i++) {
    fish.push(new Fish());
  }
}

function draw() {
  fill(0, 30);
  rect(-10, -10, width+20, height+20);
  fill(0, 150, 255, 20);
  
  for (var i = 0; i < fish.length; i++) {
    var f = fish[i];
    f.draw();
    f.boundaries();
  }
}

class Fish {
    constructor() {
        this.loc = createVector(random(width), random(height));
        /* Make a random velocity */
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.s = random(-90, 90);
        this.d = random(0.1, 0.3);
    }

  draw() {
    this.loc.add(this.vel);
    push();
    translate(this.loc.x, this.loc.y);
    scale(this.d);
    /* Get the direction and add 90 degrees. */
    rotate(this.vel.heading()-radians(90));
    beginShape();
    for (i = 0; i <= 180; i+=20) {
      var x = sin(radians(i)) * i/3;
      var angle = sin(radians(i+this.s+frameCount*5)) * 50;
      vertex(x-angle, i*2);
      vertex(x-angle, i*2);
    }
    /* 
     Started from the top now we are here. We need to now start to draw from where the first for loop left off. 
     Otherwise un ugly line will appear down the middle. To see what I mean uncomment the below line and comment
     the other line.
     */
    for (i = 180; i >= 0; i-=20) {
      //for (i = 0; i < 180; i+=20){
      x = sin(radians(i)) * i/3;
      angle = sin(radians(i+this.s+frameCount*5)) * 50;
      vertex(-x-angle, i*2);
      vertex(-x-angle, i*2);
    }
    endShape();
    pop();
  }

  boundaries() {
    /* Instead of changing the velocity when the fish  */
    if (this.loc.x < -100) this.loc.x = width+100;
    if (this.loc.x > width+100) this.loc.x = -100;
    if (this.loc.y < -100) this.loc.y = height+100;
    if (this.loc.y > height+100) this.loc.y = -100;
  }
}
