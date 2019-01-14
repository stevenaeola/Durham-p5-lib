class clTreeBackground {

  constructor() {
    this.bg = createGraphics(width, height);
  }

  draw() {
    noLoop();
    this.bg.noStroke();
    for (this.diam = 1.5 * width; this.diam > 0.5 * width; this.diam -= 20) {
        this.bg.fill(map(this.diam, 0.5 * width, 1.5 * width, 255, 110)); // changed this to make the gradient more pronounced
        this.bg.ellipse(width / 2, height / 2, this.diam, this.diam);
    }
    image(this.bg, 0, 0);
  }

}
