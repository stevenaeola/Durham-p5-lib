function setup() {
  createCanvas(windowWidth, windowHeight*0.5);
  p = new Pond(50, color(0, 100, 100));
}

function draw() {
    p.draw();
}

class Pond {
    constructor(number=50, colour=color('blue'), size=1, speed = 1, alpha=20) {
        strokeWeight(10);
        /* 
        IMPORTANT: because we are using vertices to make our fish, the line joining becomes spiky when the 
        strokeWeight is bigger than 1. 
        */
        strokeJoin(ROUND);
        stroke(0, 150, 255);
        /* Add fish */
        this.fish = []
        for (var i = 0; i < number; i++) {
            this.add(new Fish(colour, size, speed, alpha));
        }
    }
    
    draw() {
        fill(0, 30);
        rect(-10, -10, width+20, height+20);        
        for (var i = 0; i < this.fish.length; i++) {
            var f = this.fish[i];
            f.draw();
            f.boundaries();
        }          
    }
    
    add(f) {
        this.fish.push(f);
        
    }
    
    fadeColour(colour, frames=100) {
        for (var i = 0; i < this.fish.length; i++) {
            this.fish[i].fadeColour(colour, frames);
        }
    }
    
    fadeAlpha(alpha, frames=100) {
        for (var i = 0; i < this.fish.length; i++) {
            this.fish[i].fadeAlpha(alpha, frames);
        }
    }
    
    fadeSize(sizeMult, frames=100) {
        for (var i = 0; i < this.fish.length; i++) {
            this.fish[i].fadeSize(sizeMult, frames);
        }
    }
    
    fadeSpeed(speedMult, frames=100) {
        for (var i = 0; i < this.fish.length; i++) {
            this.fish[i].fadeSpeed(speedMult, frames);
        }
    }
}
