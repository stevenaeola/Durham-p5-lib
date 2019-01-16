class Pond {
  constructor (number = 10, pondColour = color('black'), fishColour = color(0, 0, 255, 20), fishMag = 1, fishSpeed = 1) {
    this.pondColour = pondColour;
    this.fish = [];
    for (var i = 0; i < number; i++) {
      this.add(new Fish(fishColour, fishMag, fishSpeed));
    }
  }

  draw (g = '') {
    if (g) {
      // Draw background of pond
      g.background(this.pondColour);
      g.fill(color(red(this.pondColour), green(this.pondColour), blue(this.pondColour), 30));
      g.rect(-10, -10, g.width + 20, g.height + 20);

      g.strokeWeight(5);
      g.strokeJoin(ROUND);
      g.stroke(0, 150, 255);
      var f;
      for (var i = 0; i < this.fish.length; i++) {
        f = this.fish[i];
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

      for (var j = 0; j < this.fish.length; j++) {
        f = this.fish[j];
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
}
