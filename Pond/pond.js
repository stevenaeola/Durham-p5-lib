class Pond {
  constructor (number = 10, fishColour = color('blue'), pondColour = color('black'), size = 1, speed = 1, alpha = 20) {
    this.pondColour = pondColour;
    /* Add fish */
    this.fish = [];
    for (var i = 0; i < number; i++) {
      this.add(new Fish());
    }
  }

  draw (g = '') {
    if (g) {
      g.background(this.pondColour);
      g.fill(color(red(this.pondColour), green(this.pondColour), blue(this.pondColour), 30));
      g.rect(-10, -10, width + 20, height + 20);
      g.strokeJoin(ROUND);
      g.stroke(0, 150, 255);
      for (var i = 0; i < this.fish.length; i++) {
        var f = this.fish[i];
        f.draw(g);
        f.boundaries(g);
      }
    } else {
      fill(color(red(this.pondColour), green(this.pondColour), blue(this.pondColour), 30));
      rect(-10, -10, width + 20, height + 20);
      strokeWeight(10);
      strokeJoin(ROUND);
      stroke(0, 150, 255);
      for (var i = 0; i < this.fish.length; i++) {
        var f = this.fish[i];
        f.draw();
        f.boundaries();
      }
    }
  }

  add (f) {
    this.fish.push(f);
  }

  trawl (numberToKill = this.fish.length) {
    var length = this.fish.length;
    for (var i = 0; i < min(numberToKill, length); i++) {
      this.fish.pop();
    }
  }

  fadeColour (c, frames = 100) {
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeColour(c, frames);
    }
  }

  fadeMag (m, frames = 100) {
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeMag(m, frames);
    }
  }

  fadeSpeed (s, frames = 100) {
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeSpeed(s, frames);
    }
  }
  
  fadeVel (v, frames = 100) {
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeVel(v, frames);
    }
  }
  
  fadeLoc (l, frames = 100) {
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeLoc(l, frames);
    }
  }
  
  fadeWiggle (w, frames = 100) {
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeWiggle(w, frames);
    }
  }
}
