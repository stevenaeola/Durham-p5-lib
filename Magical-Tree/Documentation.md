# Documentation of the Magical Tree reusable compent:

## first section:
eplanation of each class and their relavent methods and parameters

### list of classes:
1. clMagicalTree
1. clCreateTree
1. clDrawLeaves
1. clGround
1. clTreeBackground

### clMagicalTree

The MagicalTree class is the master class of this reusable compoent, its purpose is to control how the sketch displays. Defined within it the necessary objects to display the tree, and allow for the optional p5 renderer to be used.
The MagicalTree class begins with its contructor, shown below:

    constructor() {
        this.objBg = new clTreeBackground();
        this.objTree = new clCreateTree();
        this.objGround = new clGround();
        this.objLeaf = new clDrawLeaves();
        this.objFruit = new clDrawLeaves();
    }
 
The constructor takes no parameters however creates 5 attributes, which are objects for each of the different parts of the tree. objBg is the background object which display behind the tree.
objTree is the object that is instansiated from the createTree class, which generates the tree.
objGround is the object of the ground that the tree is rooted in, and there are two instances of the clDrawLeaves class, which are for the leaves of the tree (objLeaf) and the fruit of the tree (objFruit).

The draw method within the MagicalTree class is shown below:

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

This method has an optional parameter g which allows for the tree and all components to be drawn on a an object or as a texture. The if statement checks if this parameter is present and then calls the individual build methods of the tree component objects.

So that this component can be flexable to the user, several build methods are used, meaning that the user does not have to include all the aspects of the magical tree, for example choosing to call all build methods but the background, or ground. The build methods are shown below and include a chec for the optional renderer argument g.

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
      
The MagicalTree class has a series of getters and setters for all aspects of the tree customisation. To modify the color of the trees leaves, the setLeafColor method can be called, shown below, which takes an integer as a color and runs the relivent setters within the objLeaf.

      setLeafColor(argColor, radix) {
        var minColor = parseInt(argColor, radix) - 15;
        var maxColor = parseInt(argColor, radix) + 15;
        this.objLeaf.changeColor(minColor, maxColor);
      }
The minColor and maxColor is to add a slight range in the leaves color, which gives a more natural and asthetic look.

Similarly to the setLeafColor, there is a setter to change the fruits color, which again takes a integer parameter:

    setFruitColor(argColor, radix) {
        var minColor = parseInt(argColor, radix) - 5;
        var maxColor = parseInt(argColor, radix) + 5;
        if (argColor !== this.objFruit.getColor()) {
          this.redraw();
        }
          this.objFruit.changeColor(minColor, maxColor);
          this.redraw();
      }
An if statement checks if the current color of the fruit is the same as the new color, if so it doesnt redraw the tree.

The addFruit method shown below, takes a frit name as a parameter (in string form), and then uses a switch statement to find the assosiated HSB color.

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
    
The if statement above checks if the "no fruit" option was passed as an argument, if so the tree is redrawn, otherwise the new fruit is added to the tree by calling the a method on the objFruit within the drawLeaves class.


Other than adding the frit and changing the color of the leaves, the MagicalTree class has three other modifiers. These are the trees height, the trees age, and the trees density. These can all be set using setters in the format of 'object.setTreeAttribute(value)'. The getters can also be used via 'object.getTreeAttribute()' where object referes to the name of your MagicalTree object, and attribute referes to Age, Width or Height.

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
      
Another feature of the magical tree, is that the colors do not have to be a single color, for example, where the program is first run, its color is set to random and produces a ranbow effect. This can be set by the user via the setRandomLeafColor method. which takes a boolean value as a parameter.

    //setter for raibow colors on tree
    setRandomLeafColor(argBool) {
      this.objLeaf.setRandomColor(argBool);
    }
    
Finally in the MagicalTree masterclass, there is a redraw() method, which sets up the canvas or area where the tree is to be redrawn. As the sketch is static, the leaves and fruit must be removed to not cause an overlap. 

    //redraws magical tree
    redraw() {
      this.objLeaf.deleteLeaf();
      this.objFruit.deleteLeaf();
      redraw();
    }

### clCreateTree

The next class is CreateTree, which is responsible for the design and layout of the tree itself. The constructor is shown below, which creates several class attributes, the most noticable is 'this.tree' which creates a offscreen graphics renderer where the tree is drawn. The trees hight, density and age are also preset as the original defults.

    constructor() {
      this.tree = createGraphics(width, height);
      this.n = 0;
      this.leafs = [];
      this.treeHeight = 150;
      this.treeDensity = 3;
      this.treeAge = 70;
    }

The draw function of the CreateTree class, like the other classes, has an optional parameter g, which is where the optional renderer can be passed to. Noloop is set to only draw a single instance of the tree, and the this.tree render is cleared before another sketch begins.

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
The sketch method is run which strats the recurrsive tree creation.

Below is the sketch method which begins the generate the branches of the tree. The sketch uses the attributes of treeAge, treeDensity and treeHeight to set how the tree will appear, and then calls the branch function to create the trunk of the tree.

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
      
The next method used by the createTree class is branch, this is a recurrsive function which generates the trnks and branches of the tree. The branches are drawn to the offscreen renderer 'this.tree'. This method also uses a array of vectors named this.leafs, where at each point that a new branch is created, the vector coordinates are added to the array. This will be usd to draw on the trees.

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
      
 As previously mention above, the 'this.leaf' attribute is a array of vectors which is where each leaf will be placed. In order for the DrawLeaf class to place the leaves, it needs access to this array via a getter shown below:
 
     //getter for leaf array
      get leafArray() {
        return this.leafs;
      }
      
 Finnaly the CreateTree class has getters and setters for each of the modifiers, that being the height, age and density of the tree, which can be changed through class methodsor by interactable DOM elements. The setters and getters are shown below:
 
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

### clDrawLeaves

The DrawLeaves class has a constructor shown below, which takes an array parameter for the vector coordinates where the eaves should be placed, this is defulted to empty as the object is created in the MagicalTree class before the tree has been drawn.

    constructor(leafArray = []) {
        this.leafs = leafArray;
        this.randomColor = true;
        this.minHue = 0;
        this.maxHue = 0;
    }
The attributes of the contructor are for the random clor boolean, and the min and max colorHue which is initially defulted to 0.
 
The draw method of DrawLeaves takes n optional parameter g for the optional renderer, if this is present, the eaves will be drawn to an offscreen graphic, which is then drawn to the optional renderer g through 'g.image(this.renderer, 0, 0). Otherwise the leaves are drawn onto the canvas.

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
    
The genLeaves method generates the leaves onto the tree, via the this.leafs array. It checks the random color boolean for if the tree will be a user set color or the defut rainbow color. The optional renderer is also checked, which if true will be drawn, the ellipse (which is the leaf shape) will be drawn to the offscreen graphic. Otherwise the ellipse is drawn to the screen.
    
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
    
The change color method sets the attributes of minHue and maxHue to those passed in the parameter, it also sets the randomColor to false.

    //sets min and max color Hue
    changeColor(argMinHue, argMaxHue) {
      this.minHue = argMinHue;
      this.maxHue = argMaxHue;
      //stops leaves being random colors
      this.randomColor = false;
    }

The getColor getter returns the leaf color that is currently stored

    //returns users chosen color
    getColor() {
      return this.maxHue - 5;
    }
    
The set leaf array is a setter which changes the this.leaf array, this is essential as the array is orrignally created by the creaeTree class, and this setter is used when the leaves are to be drawn.

    //sets array of leaf vector points
      setLeafArray(argLeafArray) {
        this.leafs = argLeafArray;

      }
 
The drawFruit method takes an optional parameter g, and draws the fruit onto the tree, this is seperate to the draw method as the fruit has a different shape and style thus must be drawn different.
 
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
    
deleteLeaf removes all of the vectors is the this.leaf array to stop them being shown.
  
    //method that deletes the leaves contained in the leaf array
    deleteLeaf() {
      this.leafs.splice(0, this.leafs.length);
    }
    
The setRandomColor method takes a boolen argument and changes the randomColor attribute.
  
      //setter for if the trees colors are random or not
    setRandomColor(argBool) {
      this.randomColor = argBool;
    }
    
### clGround
