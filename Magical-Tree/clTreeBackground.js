class clTreeBackground {

  constructor() {
    //background drawn on renderer ofscreen
    this.bg = createGraphics(width, height);
  }

  draw(g) {

    noLoop();
    //generates background
    this.bg.noStroke();
    for (this.diam = 1.5 * width; this.diam > 0.5 * width; this.diam -= 20) {
        //changed this to make the gradient more pronounced
        this.bg.fill(map(this.diam, 0.5 * width, 1.5 * width, 255, 110));
        this.bg.ellipse(width / 2, height / 2, this.diam, this.diam);
    }
    //if statement for if to draw to canvas or optional renderer
    if (g) {
      g.image(this.bg, 0, 0);
    } else {
      image(this.bg, 0, 0);
    }
    
  }

}
