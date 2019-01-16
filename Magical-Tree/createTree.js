class clCreateTree {

  constructor(argRenderer) {
    if (argRenderer != undefined) {
      this.tree = argRenderer;
    } else {
      this.tree = createGraphics(width, height);
    }
    
    this.n = 0;
    this.leafs = [];
    this.treeHeight = 150;
    this.treeDensity = 3;
    this.treeAge = 70;
  }

  sketch() {
    this.tree.beginShape();
    this.tree.noStroke();
    this.tree.background(0, 0);

    for (var i = 0; i < this.treeDensity; i++) {
      this.tree.fill(map(i, 0, 2, 60, 20));
      this.branch(width / 2, height, this.treeAge, -HALF_PI, this.treeHeight, 0);
    }
    this.tree.endShape();
  }

  draw() {
    noLoop();
    this.tree.clear();
    this.sketch();
    image(this.tree, 5, 5);

  }


  branch(x, y, bSize, theta, bLength, pos) {

    this.n += 0.01;
    var diam = lerp(bSize, 0.7 * bSize, pos / bLength);
    diam *= map(noise(this.n), 0, 1, 0.4, 1.6);

    this.tree.ellipse(x, y, diam, diam);
    if (bSize > 0.6) {
      if (pos < bLength) {
        x += cos(theta + random(-PI / 10, PI / 10));
        y += sin(theta + random(-PI / 10, PI / 10));
        this.branch(x, y, bSize, theta, bLength, pos + 1);
      } else {
        this.leafs.push(createVector(x, y));
        var drawLeftBranch = random(1) > 0.1;
        var drawRightBranch = random(1) > 0.1;
        if (drawLeftBranch) this.branch(x, y, random(0.5, 0.7) * bSize, theta - random(PI / 15, PI / 5), random(0.6, 0.8) * bLength, 0);
        if (drawRightBranch) this.branch(x, y, random(0.5, 0.7) * bSize, theta + random(PI / 15, PI / 5), random(0.6, 0.8) * bLength, 0);

        if (!drawLeftBranch && !drawRightBranch) {
          this.tree.push()
          this.tree.translate(x, y);
          this.tree.rotate(theta);
          this.tree.quad(0, -diam / 2, 2 * diam, -diam / 6, 2 * diam, diam / 6, 0, diam / 2);
          this.tree.pop();
        }
      }
    }
  }

  get leafArray() {
    return this.leafs
  }


  setHeight(tHeight) {
    this.treeHeight = tHeight;
  }

  setDensity(tDensity) {
    this.treeDensity = tDensity;
  }

  setAge(tAge) {
    this.treeAge = tAge;
  }

  getHeight() {
    return this.treeHeight;
  }

  getDensity() {
    return this.treeDensity;
  }

  getAge() {
    return this.treeAge;
  }

}
