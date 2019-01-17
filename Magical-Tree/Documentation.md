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

This method has an optional parameter g which allows for the tree and all components to be drawn on a an object or as a texture. The if statement checks if this parameter is present and then calls the individual draw functions of the tree component objects.
