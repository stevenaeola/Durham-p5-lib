class clMagicalTree {

  constructor(argRenderer) {
    if (argRenderer != undefined) {
      this.renderer = argRenderer;
      
    } else {
      createCanvas(900, 700);
    }
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
    if (this.renderer != undefined) {
      this.objTree.draw(this.renderer);
      this.objLeaf.setLeafArray(this.objTree.leafArray, this.renderer);
    } else {
      this.objTree.draw();
      this.objLeaf.setLeafArray(this.objTree.leafArray);
    }
  }


  buildGround() {
    if (this.renderer != undefined) {
      this.objGround.draw(this.renderer);
    
    } else {
      this.objGround.draw();
    }
  }


  buildBg() {
    if (this.renderer != undefined) {
      this.objBg.draw(this.renderer);
    } else {
      this.objBg.draw();
    }
    
  }


  buildLeaf() {
    if (this.renderer != undefined) {
      this.objLeaf.draw(this.renderer);
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
    this.objTree.setDensity(argDensity);
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

  //randomise() {
  //  var fruits = ['apple', 'orange', 'plum', 'lemon', 'no fruit']
  //  var randomItem = fruits[Math.floor(Math.random()*fruits.length)];
  //  this.setLeafColor(random(360));
  //  this.addFruit(randomItem);
  //  this.setTreeAge(random(150));
  //  this.setTreeHeight(random(50, 200));
  //  this.setTreeDensity(random(1, 10));
  //  this.redraw();
  
  //}

}
