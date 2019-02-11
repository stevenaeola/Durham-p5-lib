class FrozenBrush {

    constructor(useFill, distThresh, brushColour, fadeSpeed, maxLevel) {
        // allParticles, data, useFill, and maxLevel have been moved inside the class. They were previously global variables.
        // This allows for multiple instances with different properties.
        this.allParticles = [];
        this.data = [];
        this.setSpawnRate(10);
        this.setUseFill(useFill);
        this.setDistThresh(distThresh);
        this.setBrushColour(brushColour);
        this.setFadeSpeed(fadeSpeed);
        this.setMaxLevel(maxLevel);
    }

    addParticle(particle) {
        this.allParticles.push(particle);
    }

    draw() {

        // Create fade effect; fade speed has been made settable.
        noStroke();
        fill(0, this.fadeSpeed);
        rect(0, 0, width, height);

        // Move and spawn particles.
        // Remove any that is below the velocity threshold.
        for (var i = this.allParticles.length - 1; i > -1; i--) {
            this.allParticles[i].move();
            if (this.allParticles[i].vel.mag() < 0.01) {
                this.allParticles.splice(i, 1);
            }
        }

        if (this.allParticles.length > 0) {
            // Run script to get points to create triangles with.
            this.data = Delaunay.triangulate(this.allParticles.map(function(pt) {
                return [pt.getPos().x, pt.getPos().y]; // All pt.pos calls have been changed to use getters.
            }));

            strokeWeight(0.1);

            // Display triangles individually.
            for (var i = 0; i < this.data.length; i += 3) {
                // Collect particles that make this triangle.
                var p1 = this.allParticles[this.data[i]];
                var p2 = this.allParticles[this.data[i + 1]];
                var p3 = this.allParticles[this.data[i + 2]];

                // Don't draw triangle if its area is too big. Distance threshold has been made settable.
                if (dist(p1.getPos().x, p1.getPos().y, p2.getPos().x, p2.getPos().y) > this.distThresh) {
                    continue;
                }
                if (dist(p2.getPos().x, p2.getPos().y, p3.getPos().x, p3.getPos().y) > this.distThresh) {
                    continue;
                }
                if (dist(p1.getPos().x, p1.getPos().y, p3.getPos().x, p3.getPos().y) > this.distThresh) {
                    continue;
                }

                // Changed from HSL to RGB for compatibility with HTML colour picking, and made colour settable.
                // Also removed the colour change functionality to make the brush more reliable for drawing. This was a design decision.
                if (this.useFill) {
                    noStroke();
                    fill(this.brushColour);
                } else {
                    noFill();
                    stroke(this.brushColour);
                }
                triangle(p1.getPos().x, p1.getPos().y, p2.getPos().x, p2.getPos().y, p3.getPos().x, p3.getPos().y);
            }
        }

        noStroke();
        fill(255);

    }

    // Removed keyPressed method because useFill is now settable.

    // Added parameters so that this method doesn't have to be dependent on the mouse, and made maxLevel settable.
    mouseDragged(x, y) {
        this.addParticle(new Particle(x, y, this.maxLevel, this));
    }

    // Getters and setters:

    getUseFill() {
        return this.useFill;
    }

    setUseFill(useFill) {
        this.useFill = useFill;
    }

    getMaxLevel() {
        return this.maxLevel;
    }

    setMaxLevel(maxLevel) {
        if (maxLevel < 0) {
            this.maxLevel = 0;
        } else {
            this.maxLevel = maxLevel;
        }
    }

    // Spawn rate is settable and gettable despite not being set in the constructor.
    // Implementations can optionally take advantage of this.
    getSpawnRate() {
        return this.spawnRate;
    }

    setSpawnRate(spawnRate) {
        if (spawnRate < 0) {
            this.spawnRate = 0;
        } else {
            this.spawnRate = spawnRate;
        }
    }

    getDistThresh() {
        return this.distThresh;
    }

    setDistThresh(distThresh) {
        if (distThresh < 0) {
            this.distThresh = 0;
        } else {
            this.distThresh = distThresh;
        }
    }

    getFadeSpeed() {
        return this.fadeSpeed;
    }

    setFadeSpeed(fadeSpeed) {
        // Makes sure that fade speed is within the alpha range 0 to 255.
        if (fadeSpeed < 0) {
            this.fadeSpeed = 0;
        } else if (fadeSpeed > 255) {
            this.fadeSpeed = 255;
        } else {
            this.fadeSpeed = fadeSpeed;
        }
    }

    getBrushColour() {
        return this.brushColour;
    }

    setBrushColour(brushColour) {
        this.brushColour = brushColour;
    }

}

class Particle {
    // Now uses accessor methods rather than direct access.

    constructor(x, y, level, frozenBrush) {
        this.level = level;
        this.life = 0;
        this.pos = new p5.Vector(x, y);
        this.vel = p5.Vector.random2D();
        this.vel.mult(map(this.level, 0, frozenBrush.getMaxLevel(), 5, 2));
        this.frozenBrush = frozenBrush;
    }

    // Moves to a random direction and comes to a stop.
    // Spawns other particles within its lifetime.
    move() {

        this.life++;

        // Add friction.
        this.vel.mult(0.9);

        this.pos.add(this.vel);

        // Spawn a new particle if conditions are met.
        if (this.life % this.frozenBrush.getSpawnRate() === 0) {
            if (this.level > 0) {
                this.level -= 1;
                var newParticle = new Particle(this.pos.x, this.pos.y, this.level - 1, this.frozenBrush);
                this.frozenBrush.addParticle(newParticle);
            }
        }

    }

    getPos() {
        return this.pos;
    }

}