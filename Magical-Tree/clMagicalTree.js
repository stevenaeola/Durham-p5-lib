class clMagicalTree {

  //creates instances of objects for tree
  constructor() {
    this.objBg = new clTreeBackground();
    this.objTree = new clCreateTree();
    this.objGround = new clGround();
    this.objLeaf = new clDrawLeaves();
    this.objFruit = new clDrawLeaves();
  }

  draw(g) {
    //checks if g exists to pass variable
    colorMode(HSB);
    noLoop();
    if (g) {
    this.buildBg(g);
    this.buildTree(g);
    this.buildGround(g);
    this.buildLeaf(g);
    } else {
    this.buildBg();
    this.buildTree();
    this.buildGround();
    this.buildLeaf();
    }
  }

  //generates random tree
  buildTree(g) {
    if (g) {
      this.objTree.draw(g);
      this.objLeaf.setLeafArray(this.objTree.leafArray);
    } else {
      this.objTree.draw();
      this.objLeaf.setLeafArray(this.objTree.leafArray);
    }
  }


  //draws ground for tree
  buildGround(g) {
    if (g) {
      this.objGround.draw(g);

    } else {
      this.objGround.draw();
    }
  }

  //draws tree background
  buildBg(g) {
    if (g) {
      this.objBg.draw(g);
    } else {
      this.objBg.draw();
    }

  }

  //draws leves on tree
  buildLeaf(g) {
    if (g) {
      this.objLeaf.draw(g);
    } else {
      this.objLeaf.draw();
    }

  }

  //setter for leaf color
  setLeafColor(argColor, radix) {
    var minColor = parseInt(argColor, radix) - 15;
    var maxColor = parseInt(argColor, radix) + 15;
    this.objLeaf.changeColor(minColor, maxColor);
  }

  //setter for fruit color
  setFruitColor(argColor, radix) {
    var minColor = parseInt(argColor, radix) - 5;
    var maxColor = parseInt(argColor, radix) + 5;
    if (argColor !== this.objFruit.getColor()) {
      this.redraw();
    }
      this.objFruit.changeColor(minColor, maxColor);
      this.redraw();
  }

  //method for adding fruit to tree
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
        this.setFruitColor(285);
        break;

      case "no fruit":
        this.objFruit.deleteLeaf();

    }
    //if no fruit has been seletced, redraws tree
    if (argFruit === "no fruit") {
      this.redraw();
    } else {

      this.objFruit.drawFruit();
    }

  }
  
  //setter for tree height
  setTreeHeight(argHeight, radix) {
    this.objTree.setHeight(parseInt(argHeight, radix));

  }
  
  //setter for tree age
  setTreeAge(argAge, radix) {
    this.objTree.setAge(parseInt(argAge, radix));
  }

  //setter for tree density
  setTreeDensity(argDensity, radix) {
    this.objTree.setDensity(parseInt(argDensity, radix));
  }

  //getter for height 
  getTreeHeight() {
    return this.objTree.getHeight();
  }

  //getter for age
  getTreeAge() {
    return this.objTree.getAge();
  }

  //getter for density
  getTreeDensity() {
    return this.objTree.getDensity();
  }

  //redraws magical tree
  reraw() {
    this.objLeaf.deleteLeaf();
    this.objFruit.deleteLeaf();
    redraw();
  }

  //setter for raibow colors on tree
  setRandomLeafColor(argBool) {
    this.objLeaf.setRandomColor(argBool);
  }
}
