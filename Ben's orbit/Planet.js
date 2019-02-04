class Planet {
  constructor(x, y, radius, speed, colour) {
    this.x = x;
    this.y = y;
    this.radius = radius || 70;
    this.speed = speed || 0.0001;
    this.colour = colour || "green";
  }

  getColour() {                           //get and set methods for colour, radius and speed
    return this.colour;
  }

  setColour(colour) {
    this.colour = colour;
  }

  getRadius() {
    return this.radius;
  }

  setRadius(radius) {
    this.radius = radius;
  }

  getSpeed() {
    return this.speed;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  setCoords(millis, rOrbit, rOrbit2) {
    this.x = (sin(millis * this.speed) * rOrbit) / 2;
    this.y = (cos(millis * this.speed) * rOrbit2) / 2;
  }

  display(g) {
    if (g) {
      g.fill(this.colour);
      g.strokeWeight(5);
      g.stroke(0); /**/
      g.ellipse(this.x, this.y, this.radius, this.radius);
    } else {
      fill(this.colour);
      strokeWeight(5);
      stroke(0); /**/
      ellipse(this.x, this.y, this.radius, this.radius);
    }
  }

  overLapping() {
    if (this.y < 0) {
      return true;
    } else {
      return false;
    }
  }
}
