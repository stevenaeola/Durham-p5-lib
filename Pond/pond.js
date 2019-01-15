class Pond {
  constructor (number = 10, pondColour = color('black'), fishColour = color(0, 0, 255, 20)) {
    this.pondColour = pondColour;
    this.fish = [];
    for (var i = 0; i < number; i++) {
      this.add(new Fish(fishColour));
    }
  }

  draw (g = '') {
    if (g) {
      // Draw background of pond
      g.background(this.pondColour);
      g.fill(color(red(this.pondColour), green(this.pondColour), blue(this.pondColour), 30));
      g.rect(-10, -10, width + 20, height + 20);

      g.strokeWeight(5);
      g.strokeJoin(ROUND);
      g.stroke(0, 150, 255);

      for (var i = 0; i < this.fish.length; i++) {
        var f = this.fish[i];
        f.draw(g);
        f.boundaries(g);
      }
    } else {
      // Draw background of pond
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

  // Add a fish object to the fish array
  add (f) {
    this.fish.push(f);
  }

  // Remove numberToKill fish from the end of the fish array
  trawl (numberToKill = this.fish.length) {
    var length = this.fish.length;
    for (var i = 0; i < min(numberToKill, length); i++) {
      this.fish.pop();
    }
  }

  // Functions below allow user to fade properties of all fish in pond
  fadeColour (c, frames = 100) {
    if (a) {
      var col = color(c);
      col.setAlpha(a);
    }
    for (var i = 0; i < this.fish.length; i++) {
      this.fish[i].fadeColour(col, frames);
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
