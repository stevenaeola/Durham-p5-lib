class Sun {

  constructor(sunX, sunY) {
    this.sunX = sunX;
    this.sunY = sunY;
  }

  createSun() {
    for (this.i = 10; this.i > 0; --this.i) {
      var size = map(this.i, 10, 0, 100, 0);
      fill(lerpColor(color(255, 245, 200), color(255, 255, 250), 1 - this.i / 10));
      ellipse(this.sunX, this.sunY, size, size);

      if (dist(this.sunX, this.sunY, mouseX, mouseY) < size / 2 && mouseIsPressed) {
        this.sunX = mouseX;
        this.sunY = mouseY;
      }
    }
  }
  
}