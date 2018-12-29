class Fish {
    constructor(c=color('blue'), d=1, speed = 1, alpha=20) {
        this.loc = createVector(random(width), random(height));
        /* Make a random velocity */
        this.vel = createVector(random(-1, 1), random(-1, 1));
        /* Adds some individuality to the fish wiggle */
        this.s = random(-90, 90);
        //New sizeMult, old sizeMult, initial frames, frames until fade done
        this.size = random(0.1, 0.3);
        this.d = [d, d, 0, 1];
        //New colour, old colour, initial frames, frames until fade done
        this.c = [c, c, 0, 1];
        //New alpha, old alpha, initial frames, frames until fade done
        this.a = [alpha, alpha, 0, 1]
        //New speedMult, old speedMult, initial frames, frames until fade done        
        this.v = [speed, speed, 0, 1];
    
        this.lerpValue = function(lerpObj) {
            return lerp(lerpObj[1], lerpObj[0], min((frameCount - lerpObj[2]) / lerpObj[3], 1));
        }
        
        this.lerpColourObj = function(c) {
            return lerpColor(c[1], c[0], (frameCount - c[2]) / c[3]);
        }
    }

    draw(g) {
        if (g) {
            var col = this.lerpColourObj(this.c);
            g.stroke(col);
            g.strokeWeight(10 * this.size * this.lerpValue(this.d));
            g.fill(red(col), green(col), blue(col), this.lerpValue(this.a));
            
            this.loc.add(p5.Vector.mult(this.vel, this.lerpValue(this.v)));
            push();
            g.beginShape();
            for (var i = 0; i <= 180; i+=20) {
                var mult = this.size * this.lerpValue(this.d);
                
                var x = sin(radians(i)) * i/3;
                var angle = sin(radians(i+this.s+frameCount*5)) * 50;
                
                var v = createVector((x-angle) * mult, i*2 * mult);
                v.rotate(this.vel.heading()-radians(90))
                v.add(this.loc.x, this.loc.y);
                
                g.vertex(v.x, v.y);
                g.vertex(v.x, v.y);
            }
            for (var i = 180; i >= 0; i-=20) {
                var mult = this.size * this.lerpValue(this.d);

                
                x = sin(radians(i)) * i/3;
                angle = sin(radians(i+this.s+frameCount*5)) * 50;
                
                var v = createVector((-x-angle) * mult, i*2 * mult);
                v.rotate(this.vel.heading()-radians(90))
                v.add(this.loc.x, this.loc.y);
                
                g.vertex(v.x, v.y);
                g.vertex(v.x, v.y);
            }
            g.endShape();

        } else {
            var col = this.lerpColourObj(this.c);
            stroke(col);
            fill(red(col), green(col), blue(col), this.lerpValue(this.a));
            
            this.loc.add(p5.Vector.mult(this.vel, this.lerpValue(this.v)));
            push();
            translate(this.loc.x, this.loc.y);
            scale(this.size * this.lerpValue(this.d));
            /* Get the direction and add 90 degrees. */
            rotate(this.vel.heading()-radians(90));
            beginShape();
            for (var i = 0; i <= 180; i+=20) {
                var x = sin(radians(i)) * i/3;
                var angle = sin(radians(i+this.s+frameCount*5)) * 50;
                vertex(x-angle, i*2);
                vertex(x-angle, i*2);
            }
            for (var i = 180; i >= 0; i-=20) {
                x = sin(radians(i)) * i/3;
                angle = sin(radians(i+this.s+frameCount*5)) * 50;
                vertex(-x-angle, i*2);
                vertex(-x-angle, i*2);
            }
            endShape();
        }
        pop();
    }

    boundaries() {
        /* Instead of changing the velocity when the fish  */
        if (this.loc.x < -100) this.loc.x = width+100;
        if (this.loc.x > width+100) this.loc.x = -100;
        if (this.loc.y < -100) this.loc.y = height+100;
        if (this.loc.y > height+100) this.loc.y = -100;
    }
    
    fadeColour(colour, frames) {
        this.c = [colour, this.c[0], frameCount, frames];
    }
    
    fadeAlpha(alpha, frames) {
        this.a = [alpha, this.a[0], frameCount, frames];
    }
    
    fadeSize(sizeMult, frames) {
        this.d = [sizeMult, this.d[0], frameCount, frames];
    }
    
    fadeSpeed(speedMult, frames) {
        this.v = [speedMult, this.v[0], frameCount, frames];
    }
}
