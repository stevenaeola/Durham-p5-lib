const A = {
  COLOUR: 0,
  MAG: 1,
  SPEED: 2,
  BIG: 3,
  VEL: 4,
  LOC: 5,
  WIGGLE: 6
};

class Fish {
  constructor (colour = color(0, 0, 255, 30), mag = 1, speed = 1, big = random(0.1, 0.3), vel = createVector(random(-1, 1), random(-1, 1)), loc = createVector(random(width), random(height)), wiggle = random(-90, 90)) {
    // These arrays store the appearance of the fish as it was before a fade was initialised, after the fish has finished fading, the frame count at which the fade was started and the number of frames until it is finished.
    this.oldAppearance = [colour, mag, speed, big, vel, loc, wiggle];
    this.newAppearance = [colour, mag, speed, big, vel, loc, wiggle];
    this.initialFrames = [0, 0, 0, 0, 0, 0, 0];
    this.framesUntilFadeDone = [1, 1, 1, 1, 1, 1, 1];

    // This function cleans up set methods for the appearance properties of the fish
    this.setAppearance = function (valRef, val) {
      this.oldAppearance[valRef] = val;
      this.newAppearance[valRef] = val;
      this.initialFrames[valRef] = 0;
      this.framesUntilFadeDone[valRef] = 1;
    };

    // This function cleans up fade methods for the appearance properties of the fish
    this.fadeAppearance = function (valRef, val, frames) {
      this.oldAppearance[valRef] = this.lerpValue(valRef);
      this.newAppearance[valRef] = val;
      this.initialFrames[valRef] = frameCount;
      this.framesUntilFadeDone[valRef] = frames;
    };

    // This function allows for linear interpolation between two appearance values (i.e. help the fade to occur). It also prevents code for the get methods being repeated many times
    this.lerpValue = function (valRef) {
      var oldVal;
      var newVal;
      var initial;
      var timeUntilDone;
      // If the value is a vector, do vector interpolation
      if (valRef === A.VEL || valRef === A.LOC) {
        oldVal = this.oldAppearance[valRef];
        newVal = this.newAppearance[valRef];
        initial = this.initialFrames[valRef];
        timeUntilDone = this.framesUntilFadeDone[valRef];
        var lerped = oldVal;
        lerped.lerp(oldVal, newVal, min((frameCount - initial) / timeUntilDone, 1));
        return lerped;
      // If the value is a colour, do colour interpolation
      } else if (valRef === A.COLOUR) {
        oldVal = this.oldAppearance[A.COLOUR];
        newVal = this.newAppearance[A.COLOUR];
        initial = this.initialFrames[A.COLOUR];
        timeUntilDone = this.framesUntilFadeDone[A.COLOUR];
        return lerpColor(oldVal, newVal, min((frameCount - initial) / timeUntilDone, 1));
      // Otherwise, do normal linear interpolation
      } else if (valRef === A.MAG || valRef === A.SPEED || valRef === A.WIGGLE || valRef === A.BIG) {
        oldVal = this.oldAppearance[valRef];
        newVal = this.newAppearance[valRef];
        initial = this.initialFrames[valRef];
        timeUntilDone = this.framesUntilFadeDone[valRef];
        return lerp(oldVal, newVal, min((frameCount - initial) / timeUntilDone, 1));
      }
    };
  }

  get colour () {
    return this.lerpValue(A.COLOUR);
  }

  set colour (c) {
    this.setAppearance(A.COLOUR, c);
  }

  get mag () {
    return this.lerpValue(A.MAG);
  }

  set mag (m) {
    this.setAppearance(A.MAG, max(m, 0.1));
  }

  get speed () {
    return this.lerpValue(A.SPEED);
  }

  set speed (s) {
    this.setAppearance(A.SPEED, s);
  }

  get big () {
    return this.lerpValue(A.BIG);
  }

  set big (b) {
    this.setAppearance(A.BIG, b);
  }

  get vel () {
    return this.lerpValue(A.VEL);
  }

  set vel (v) {
    this.setAppearance(A.VEL, v);
  }

  get loc () {
    return this.lerpValue(A.LOC);
  }

  set loc (l) {
    this.setAppearance(A.LOC, l);
  }

  get wiggle () {
    return this.lerpValue(A.WIGGLE);
  }

  set wiggle (w) {
    this.setAppearance(A.WIGGLE, w);
  }

  get dim () {
    return this.big * this.mag;
  }

  draw (g="") {
    var x;
    var angle;
    var v;
    if (g) {
      g.stroke(color(red(this.colour), green(this.colour), blue(this.colour), 255)); // The outside stroke of the fish should always be of full alpha
      g.fill(this.colour);

      this.loc.add(p5.Vector.mult(this.vel, this.speed));
      push();
      g.beginShape();

      for (var i = 0; i <= 180; i += 20) {
        x = sin(radians(i)) * i / 3;
        angle = sin(radians(i + this.wiggle + frameCount * 5)) * 50;

        v = createVector((x - angle) * this.dim, i * 2 * this.dim);
        v.rotate(this.vel.heading() - radians(90));
        v.add(this.loc.x, this.loc.y);

        g.vertex(v.x, v.y);
        g.vertex(v.x, v.y);
      }
      for (var j = 180; j >= 0; j -= 20) {
        x = sin(radians(j)) * j / 3;
        angle = sin(radians(j + this.wiggle + frameCount * 5)) * 50;

        v = createVector((-x - angle) * this.dim, j * 2 * this.dim);
        v.rotate(this.vel.heading() - radians(90));
        v.add(this.loc.x, this.loc.y);

        g.vertex(v.x, v.y);
        g.vertex(v.x, v.y);
      }
      g.endShape();
    } else {
      stroke(color(red(this.colour), green(this.colour), blue(this.colour), 255));
      fill(this.colour);
      this.loc.add(p5.Vector.mult(this.vel, this.speed));
      push();
      translate(this.loc.x, this.loc.y);
      scale(this.dim);
      // Get the direction and add 90 degrees
      rotate(this.vel.heading() - radians(90));
      beginShape();
      for (var k = 0; k <= 180; k += 20) {
        x = sin(radians(k)) * k / 3;
        angle = sin(radians(k + this.wiggle + frameCount * 5)) * 50;
        vertex(x - angle, k * 2);
        vertex(x - angle, k * 2);
      }
      for (var l = 180; l >= 0; l -= 20) {
        x = sin(radians(l)) * l / 3;
        angle = sin(radians(l + this.wiggle + frameCount * 5)) * 50;
        vertex(-x - angle, l * 2);
        vertex(-x - angle, l * 2);
      }
      endShape();
    }
    pop();
  }

  // If the fish leaves the viewing area, wrap it to the other side.
  boundaries (g="") {
    if (g) {
      if (this.loc.x < -100) this.loc.x = g.width + 100;
      if (this.loc.x > g.width + 100) this.loc.x = -100;
      if (this.loc.y < -100) this.loc.y = g.height + 100;
      if (this.loc.y > g.height + 100) this.loc.y = -100;
    } else {
      if (this.loc.x < -100) this.loc.x = width + 100;
      if (this.loc.x > width + 100) this.loc.x = -100;
      if (this.loc.y < -100) this.loc.y = height + 100;
      if (this.loc.y > height + 100) this.loc.y = -100;
    }
  }

  fadeColour (c, frames = 100) {
    this.fadeAppearance(A.COLOUR, c, frames);
  }

  fadeMag (m, frames = 100) {
    this.fadeAppearance(A.MAG, m, frames);
  }

  fadeSpeed (s, frames = 100) {
    this.fadeAppearance(A.SPEED, s, frames);
  }
}
