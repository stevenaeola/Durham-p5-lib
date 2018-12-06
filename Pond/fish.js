class Fish {
    constructor(c) {
        this.loc = createVector(random(width), random(height));
        /* Make a random velocity */
        this.vel = createVector(random(-1, 1), random(-1, 1));
        /* Adds some individuality to the fish wiggle */
        this.s = random(-90, 90);
        this.d = random(0.1, 0.3);
        
        this.oldColour = c;
        this.colour = c;
        this.framesToFade = 1;
        this.subtractingFactor = 1;
        
        this.avgSpeed = 1;
    }

    draw() {
        this.col = lerpColor(this.oldColour, this.colour, frameCount / this.framesToFade - this.subtractingFactor);
        stroke(this.col);
        fill(red(this.col), green(this.col), blue(this.col), 20);

        this.loc.add(this.vel);
        push();
        translate(this.loc.x, this.loc.y);
        scale(this.d);
        /* Get the direction and add 90 degrees. */
        rotate(this.vel.heading()-radians(90));
        beginShape();
        for (var i = 0; i <= 180; i+=20) {
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
        for (var i = 180; i >= 0; i-=20) {
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
    
    // Fades the fish from the current colour to a new one in the given number of frames
    fade(newColour, framesToFade) {
        this.oldColour = this.colour;
        this.colour = newColour;
        this.framesToFade = framesToFade;
        this.subtractingFactor = frameCount / framesToFade;
    }
    
    setSpeed(factor) {
        this.vel.mult(factor);
    }
}
