class clMagicalTree {

  constructor() {
    this.objBg = new clTreeBackground();
    this.objTree = new clCreateTree();
    this.objGround = new clGround();
    this.objLeaf = new clDrawLeaves();
    this.objFruit = new clDrawLeaves()
  }

  draw(g) {
    colorMode(HSB);
    noLoop();
    if (g) {
    //this.buildBg(g);
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
    

  buildTree(g) {
    if (g) {
      this.objTree.draw(g);
      this.objLeaf.setLeafArray(this.objTree.leafArray);
    } else {
      this.objTree.draw();
      this.objLeaf.setLeafArray(this.objTree.leafArray);
    }
  }
    


  buildGround(g) {
    if (g) {
      this.objGround.draw(g);
    
    } else {
      this.objGround.draw();
    }
  }


  buildBg(g) {
    if (g) {
      this.objBg.draw(g);
    } else {
      this.objBg.draw();
    }
    
  }


  buildLeaf(g) {
    if (g) {
      this.objLeaf.draw(g);
    } else {
      this.objLeaf.draw();
    }
    
  }

  setLeafColor(argColor) {
    var minColor = parseInt(argColor) - 15;
    var maxColor = parseInt(argColor) + 15;
    this.objLeaf.changeColor(minColor, maxColor);
  }

  setFruitColor(argColor) {
    if (argColor != this.objFruit.getColor()) {
      this.redraw();
    }
    
      var minColor = parseInt(argColor) - 5;
      var maxColor = parseInt(argColor) + 5;
      this.objFruit.changeColor(minColor, maxColor); 
      this.redraw();
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
    this.objTree.setHeight(parseInt(argHeight));

  }

  setTreeAge(argAge) {
    this.objTree.setAge(parseInt(argAge));
  }

  setTreeDensity(argDensity) {
    this.objTree.setDensity(parseInt(argDensity));
  }   
    
  getTreeHeight() {
    return this.objTree.getHeight();
  }

  getTreeAge() {
    return this.objTree.getAge();
  }

  getTreeDensity(argDensity) {
    return this.objTree.getDensity();
  }

  redraw() {
    this.objLeaf.deleteLeaf();
    this.objFruit.deleteLeaf();
    redraw();
  }

  setRandomLeafColor(argBool) {
    this.objLeaf.setRandomColor(argBool);
  }
}
