/*
Frozen brush

Makes use of a delaunay algorithm to create crystal-like shapes.
I did NOT develop delaunay.js, and not sure who the author really is to give proper credit.

Controls:
	- Drag the mouse.
    - Press any key to toggle between fill and stroke.

Inspired by:
	Makio135's sketch www.openprocessing.org/sketch/385808

Author:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

var allParticles = [];
var maxLevel = 2;
var useFill = false;

var data = [];

// Moves to a random direction and comes to a stop.
// Spawns other particles within its lifetime.
class Particle{
  constructor(x, y, level){
		this.level = level;
    this.life = 0;
    // this.maxLevel = maxLevel
    
    this.pos = new p5.Vector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(((this.level-0)/(maxLevel-0)*(2-5)+5));
    
    this.move = function() {
      this.life++;
      
      // Add friction.
      this.vel.mult(0.9);
      
      this.pos.add(this.vel);
      
      // Spawn a new particle if conditions are met.
      if (this.life % 10 == 0) {
        if (this.level > 0) {
          this.level -= 1;
          var newParticle = new Particle(this.pos.x, this.pos.y, this.level-1);
          allParticles.push(newParticle);
        }
      }
    }
  }
  getX(){return this.x}
  getY(){return this.y}
  getLevel(){return this.level}
  setX(x){return this.x = x}
  setY(y){return this.y = y}
  setLevel(level){return this.level=level}
}



