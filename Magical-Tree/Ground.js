class clGround {

  constructor() {
    this.n = 0;
  }

  draw() {
    noLoop();
    noStroke();
    fill(20);
    beginShape();
    vertex(0, height);
    for (var i = 0; i <= width; i += 50) {
      vertex(i, map(noise(this.n), 0, 1, height - 30, height));
      this.n += 0.1;
    }
    vertex(width, height);
    endShape();
  }

}
