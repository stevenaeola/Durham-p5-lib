class clMagicalTree {

  constructor() {
    createCanvas(900, 700);
    this.objBg = new clTreeBackground();
    this.objTree = new clCreateTree();
    this.objGround = new clGround();
    this.objLeaf = new clDrawLeaves();
    this.objFruit = new clDrawLeaves()
  }

  draw() {
    colorMode(HSB);
    this.buildBg();
    this.buildTree();
    this.buildGround();
    this.buildLeaf();
  }

  buildTree() {
    this.objTree.draw();
    this.objLeaf.setLeafArray(this.objTree.leafArray);
  }


  buildGround() {
    this.objGround.draw();
  }


  buildBg() {
    this.objBg.draw();
  }


  buildLeaf() {
    this.objLeaf.draw();

  }

  setLeafColor(argColor) {
    var minColor = argColor - 15;
    var maxColor = argColor + 15;
    this.objLeaf.changeColor(minColor, maxColor);

  }

  setFruitColor(argColor) {
    if (argColor != this.objFruit.getColor()) {
      this.redraw();
    }
    var minColor = argColor - 5;
    var maxColor = argColor + 5;
    this.objFruit.changeColor(minColor, maxColor);

  }

  addFruit(argFruit) {

    this.objFruit.setLeafArray(this.objTree.leafArray);
    switch (argFruit) {

      case "apple":
        this.setFruitColor(10);
        break;

      case "orange":
        this.setFruitColor(33);
        break;

      case "lemon":
        this.setFruitColor(60);
        break;

      case "plum":
        this.setFruitColor(285)
        break;

      case "no fruit":
        this.objFruit.deleteLeaf();

    }
    if (argFruit != "no fruit") {
      this.objFruit.drawFruit();
    } else {
      this.redraw();
    }

  }

  setTreeHeight(argHeight) {
    this.objTree.setHeight(argHeight);

  }

  setTreeAge(argAge) {
    this.objTree.setAge(argAge);

  }

  setTreeDensity(argDensity) {
    this.objTree.setDensity(argDensity);

  }

  redraw() {
    this.objLeaf.deleteLeaf();
    this.objFruit.deleteLeaf();
    redraw();
  }
}
