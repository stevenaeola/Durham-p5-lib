function setup() {
  createCanvas(displayWidth, displayHeight);
  p = new Pond();
}

function draw() {
    p.draw();
}

class Pond {
    constructor(number=50) {
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
            this.fish.push(new Fish(color(255, 255, 0)));
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
    
    fade(index, colour, frames) {
        this.fish[index].fade(colour, frames);
    }
    
    fadeAll(colour, frames) {
        for (var i = 0; i < this.fish.length; i++) {
            this.fade(i, colour, frames)
        }
    }
    
    avgSpeed(factor) {
        for (var i = 0; i < this.fish.length; i++) {
            this.fish[i].setSpeed(factor);
        }
    }
}
