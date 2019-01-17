class clDrawLeaves {

  //initially leaf array set to empty as it is reliant on tree
  constructor(leafArray = []) {
    this.leafs = leafArray;
    this.randomColor = true;
    this.minHue = 0;
    this.maxHue = 0;
  }

  //generates leaves
  genLeaves(minDiam, maxDiam, minAlpha, maxAlpha, g) {
    var minHue;
    var maxHue;
    var rdn0 = random(255);
    var rdn1 = random(255);
    var i = 0;
    var h;
    var s = 255;
    var b = 255;
    var a;
    var diam;
    var jitterX;
    var jitterY;
    if (this.randomColor) {
      minHue = min(rdn0, rdn1);
      maxHue = max(rdn0, rdn1);
    } else {
      minHue = this.minHue;
      maxHue = this.maxHue;
    }
    //draws leaf at every vector in array
    for (i; i < this.leafs.length; i += 1) {

      h = map(i, 0, this.leafs.length, minHue, maxHue);
      a = random(minAlpha, maxAlpha);

      diam = random(minDiam, maxDiam);
      jitterX = random(-30, 30);
      jitterY = random(-30, 30);

      //if g exists
      if (g) {
        this.renderer.colorMode(HSB);
        this.renderer.noStroke();
        this.renderer.fill(h, s, b, a);
        this.renderer.ellipse(this.leafs[i].x + jitterX, this.leafs[i].y + jitterY, diam, diam);

      } else {
        fill(h, s, b, a);
        ellipse(this.leafs[i].x + jitterX, this.leafs[i].y + jitterY, diam, diam);
      }
    }
  }



  draw(g) {
    //if statement for presence of optional renderer
    if (g) {
      //creates ofscreen image to draw to g
      this.renderer = createGraphics(width, height);
      this.renderer.clear();
      //big leaves
      this.genLeaves(0, 90, 0, 0.03, g);
      //small leaves
      this.genLeaves(0, 15, 0, 0.25, g);
      //runs leaf generater as normal
    } else {
      //big leaves
      this.genLeaves(0, 90, 0, 0.03);
      //small leaves
      this.genLeaves(0, 15, 0, 0.25);
    }
    //if optional renderer exists draw to it
    if (g) {
      g.image(this.renderer, 0, 0);
    }
  }

  //sets min and max color Hue
  changeColor(argMinHue, argMaxHue) {
    this.minHue = argMinHue;
    this.maxHue = argMaxHue;
    //stops leaves being random colors
    this.randomColor = false;

  }

  //returns users chosen color
  getColor() {
    return this.maxHue - 5;
  }
  
  //sets array of leaf vector points
  setLeafArray(argLeafArray) {
    this.leafs = argLeafArray;

  }

  //draw fruit function which either draws to canvas or optional renderer
  drawFruit(g) {
    //if statement for presence of optional renderer
    if (g) {
      this.genLeaves(0, 12, 0, 0.60, g);
    } else {
      this.genLeaves(0, 12, 0, 0.60);
    }
    //if g exists, draw to that
    if (g) {
      g.image(this.renderer, 0, 0);
    }
  }

  //method that deletes the leaves contained in the leaf array
  deleteLeaf() {
    this.leafs.splice(0, this.leafs.length);
  }

  //setter for if the trees colors are random or not
  setRandomColor(argBool) {
    this.randomColor = argBool;
  }

}
