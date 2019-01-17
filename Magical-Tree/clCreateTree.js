class clCreateTree {

  constructor() {
    this.tree = createGraphics(width, height);
    this.n = 0;
    this.leafs = [];
    this.treeHeight = 150;
    this.treeDensity = 3;
    this.treeAge = 70;
  }

  //creates tree
  sketch() {
    var i = 0;
    this.tree.beginShape();
    this.tree.noStroke();
    this.tree.background(0, 0);


    for (i; i < this.treeDensity; i += 1) {
      this.tree.fill(map(i, 0, 2, 60, 20));
      this.branch(width / 2, height, this.treeAge, -HALF_PI, this.treeHeight, 0);
    }
    this.tree.endShape();
  }
  
  draw(g) {
    this.tree.noLoop();
    this.tree.clear();
    this.sketch();
    //checks for optional parameter
    if (g) {
      g.image(this.tree, 5, 5);
    } else {
      image(this.tree, 5, 5);
    }

  }

  //recursive branch method
  branch(argX, argY, bSize, theta, bLength, pos) {
    var x = argX;
    var y = argY;
    var diam = lerp(bSize, 0.7 * bSize, pos / bLength);
    var drawLeftBranch;
    var drawRightBranch;
    this.n += 0.01;
    diam *= map(noise(this.n), 0, 1, 0.4, 1.6);

    this.tree.ellipse(x, y, diam, diam);
    if (bSize > 0.6) {
      if (pos < bLength) {
        x += cos(theta + random(-PI / 10, PI / 10));
        y += sin(theta + random(-PI / 10, PI / 10));
        this.branch(x, y, bSize, theta, bLength, pos + 1);
      } else {
        this.leafs.push(createVector(x, y));
        drawLeftBranch = random(1) > 0.1;
        drawRightBranch = random(1) > 0.1;
        if (drawLeftBranch) {
 this.branch(x, y, random(0.5, 0.7) * bSize, theta - random(PI / 15, PI / 5), random(0.6, 0.8) * bLength, 0);
}
        if (drawRightBranch) {
 this.branch(x, y, random(0.5, 0.7) * bSize, theta + random(PI / 15, PI / 5), random(0.6, 0.8) * bLength, 0);
}

        if (!drawLeftBranch && !drawRightBranch) {
          this.tree.push();
          this.tree.translate(x, y);
          this.tree.rotate(theta);
          this.tree.quad(0, -diam / 2, 2 * diam, -diam / 6, 2 * diam, diam / 6, 0, diam / 2);
          this.tree.pop();
        }
      }
    }
  }

  //getter for leaf array
  get leafArray() {
    return this.leafs;
  }

  //setter for tree height
  setHeight(tHeight) {
    this.treeHeight = tHeight;
  }

  //setter for tree density
  setDensity(tDensity) {
    this.treeDensity = tDensity;
  }

  //setter for tree age
  setAge(tAge) {
    this.treeAge = tAge;
  }

  //getter for tree height
  getHeight() {
    return this.treeHeight;
  }

  //getter for tree density
  getDensity() {
    return this.treeDensity;
  }

  //getter for tree age
  getAge() {
    return this.treeAge;
  }

}
