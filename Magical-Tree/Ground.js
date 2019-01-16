class clGround {

  constructor() {
    this.n = 0;
  }

  draw(g) {
    var i = 0;
    if (g) {
      var renderer = createGraphics(width, height);
      renderer.noLoop();
      renderer.noStroke();
      renderer.fill(20);
      renderer.beginShape();
      renderer.vertex(0, height);
      for (i; i <= width; i += 50) {
        renderer.vertex(i, renderer.map(noise(this.n), 0, 1, height - 30, height));
        this.n += 0.1;
      }
      renderer.vertex(width, height);
      renderer.endShape();
      g.image(renderer, 0, 0);
      
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
