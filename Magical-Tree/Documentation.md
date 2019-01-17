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


