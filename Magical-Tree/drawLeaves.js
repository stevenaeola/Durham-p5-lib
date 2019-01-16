class clDrawLeaves {

  constructor(argRenderer, leafArray = []) {
    if (argRenderer != undefined) {
      this.renderer = argRenderer;
    }
    this.leafs = leafArray;
    this.randomColor = true;
    this.minHue = 0;
    this.maxHue = 0;
  }

  genLeaves(minDiam, maxDiam, minAlpha, maxAlpha) {

    var minHue;
    var maxHue;
    if (this.randomColor) {
      var rdn0 = random(255);
      var rdn1 = random(255);
      minHue = min(rdn0, rdn1);
      maxHue = max(rdn0, rdn1);
    } else {
      minHue = this.minHue;
      maxHue = this.maxHue;
    }

    for (var i = 0; i < this.leafs.length; i++) {
      var h = map(i, 0, this.leafs.length, minHue, maxHue);
      var s = 255;
      var b = 255;
      var a = random(minAlpha, maxAlpha);
      
      var diam = random(minDiam, maxDiam);
      var jitterX = random(-30, 30);
      var jitterY = random(-30, 30);
      
      if (this.renderer != undefined) {
        this.renderer.fill(h, s, b, a);
        this.renderer.ellipse(this.leafs[i].x + jitterX, this.leafs[i].y + jitterY, diam, diam);
      
      } else {
        fill(h, s, b, a);
        ellipse(this.leafs[i].x + jitterX, this.leafs[i].y + jitterY, diam, diam);
      }
    }
  }



  draw() {
    this.genLeaves(0, 90, 0, 0.03); // big leaves
    this.genLeaves(0, 15, 0, 0.25); // small leaves
    
    if (this.renderer != undefined) {
      image(this.renderer, 0, 0)
    }
  }

  changeColor(argMinHue, argMaxHue) {
    this.minHue = argMinHue;
    this.maxHue = argMaxHue;
    this.randomColor = false;
   

  }

  getColor() {
    return (this.maxHue - 5);
  }

  setLeafArray(argLeafArray) {
    this.leafs = argLeafArray;

  }

  drawFruit() {
    this.genLeaves(0, 12, 0, 0.60);
    if (this.renderer != undefined) {
      image(this.renderer, 0, 0)
    }
  }


  deleteLeaf() {
    this.leafs.splice(0, this.leafs.length);
  }

}
