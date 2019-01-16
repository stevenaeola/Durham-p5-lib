class clGround {

  constructor(argRenderer) {
    this.n = 0;
    if (argRenderer != undefined) {
      renderer.this = argRenderer;
    }
  }

  draw() {
    var i = 0;
    if (this.renderer != undefined) {
      this.renderer.noLoop();
      this.renderer.noStroke();
      this.renderer.fill(20);
      this.renderer.beginShape();
      this.renderer.vertex(0, height);
      for (i; i <= width; i += 50) {
        this.renderer.vertex(i, this.renderer.map(noise(this.n), 0, 1, height - 30, height));
        this.n += 0.1;
      }
      this.renderer.vertex(width, height);
      this.renderer.endShape();
      image(this.renderer, 0, 0);
      
    } else {
      noLoop();
      noStroke();
      fill(20);
      beginShape();
      vertex(0, height);
      for (i; i <= width; i += 50) {
        vertex(i, map(noise(this.n), 0, 1, height - 30, height));
        this.n += 0.1;
      }
      vertex(width, height);
      endShape();
    }
    
    
  }

}
