function setup() {
  createCanvas(displayWidth, displayHeight);
  p = new Pond();
}

function draw() {
    p.draw();
}

class Pond {
    
    constructor() {
        strokeWeight(10);
        /* 
        IMPORTANT: because we are using vertices to make our fish, the line joining becomes spiky when the 
        strokeWeight is bigger than 1. 
        */
        strokeJoin(ROUND);
        stroke(0, 150, 255);
        /* Add 100 fish */
        this.fish = []
        for (var i = 0; i < 60; i++) {
            this.fish.push(new Fish());
        }
    }
    
    draw() {
        fill(0, 30);
        rect(-10, -10, width+20, height+20);
        fill(0, 150, 255, 20);
        
        for (var i = 0; i < this.fish.length; i++) {
            var f = this.fish[i];
            f.draw();
            f.boundaries();
        }  
        
    }
}
