# StarField

An adapted component from a p5.js project, originally forked from Ning Shen's [Starfield](https://www.openprocessing.org/sketch/429790), licensed under [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

# Methods and Parameters

## starfield.js

The component consists of 3 classes: **StarField**, **Planet** and **Star**:

### StarField

#### constructor(starDensity, planetDensity, maxSpeed, objectLabelling, drawCube, drawSphere)

  The constructor takes 6 optional parameters, `starDensity`, `planetDensity`, `maxSpeed`, `objectLabelling`, `drawCube` and `drawSphere`, expecting a boolean value for `objectLabelling`, `drawCube` and `drawSphere`, and integers for all others. If no values are specified, then they will default to 50, 400, 40, false, false and false respectively. The values of these parameters are then passed to variables of the same name (excluding `drawCube`, which becomes `this.cube` and `drawSphere` which becomes `this.sphere`. The constructor then initialises multiple other variables, `speed`, `mX`, `mY`, and two empty lists named `stars` and `planets`, adhering to the convention of prefixing them with `this.`.

  `speed` is used to set the default scrolling speed of the StarField when the mouse is not pressed, by default, this is set to 1. `mX` and `mY` represent translated versions of the current x and y coordinates of the mouse, where mX is the current x coordinate minus half the width of the window the component is rendered in, and mY is the current y coordinate minus half the height of the window. (The reason for this translation is explained in `draw(g)`)
  
  An if statement is then used to check whether `cube` or `sphere` is true, and if so, creates a canvas with WEBGL enabled using `createCanvas(windowWidth, windowHeight, WEBGL)`. It then creates a p5.Renderer object and stores it in a variable named `g` using `this.g = createGraphics(windowWidth, windowHeight)`. If instead, `cube` and `sphere` are both false, a regular P2D canvas is created with `createCanvas(windowWidth, windowHeight)`. `windowWidth` and `windowHeight` are used to create a canvas with width and height equal to that of the window that the component is being intialised in.

  The constructor finally populates the lists `stars` and `planets` by intialising new instances of the classes `Star` and `Planet`, storing each instance as an element in the list. It creates as many stars as the value of `starDensity` and as many planets as the value of `planetDensity`.

#### getters and setters

Getters and setters exist for all relevant variables in the following form:

~~~~

get speed() {

  return this._speed;

}

~~~~

~~~~

set speed(speed) {

  this._speed = speed;

}

~~~~



#### draw(g)

The `draw(g)` function begins by checking whether or not the property `this.g` exists, and if so, assigns `g = this.g`, allowing the code to run as if it was passed a p5.Renderer object as a parameter in the `draw(g)` method. A white background is then created with `background(255)` in preparation for the cube or sphere to be drawn. 

If `g` exists the background of the p5.Renderer `g` is set to a translucent black using `g.background(0,100)`, allowing a trailing effect when planets and stars move, as this translucent background is drawn over the StarField every frame. If `g` is undefined, `background(0, 100)` is used to draw a translucent black background onto the main canvas instead. `translate(width/2, height/2)` is then used to translate all proceeding graphics, this allows the StarField effect to appear to come from the center.
 
 Since the `draw` function is called every frame, we update the variables `mX` and `mY` so the component is always aware of where the mouse is, allowing functionality for star and planet labelling. Their values are defined identically to how they are definined in the constructor. `noStroke()` is also used to remove strokes from all subsequent drawing in the sketch.

 For loops are then used to draw and update the positions of each star and planet. This is done for each item in the lists `stars` and `planets`, using the `star` and `planet` methods `update(this.speed)` and `show(g)`. The for loops also check if the mouse's X and Y posititon are within 10 pixels of the current star or planet in the loop, if `objectLabelling` equals true and if `this.g` is undefined. If so, the method `label()` is called on that graphic. (The reasons for passing the parameters `this.speed` and `g` can be found in the explanation of the methods mentioned above)

An if statement then checks whether or not the mouse is pressed. If it is, whilst the value of `speed` is less than `maxSpeed`, it increases `speed` by increments of 0.005. If the mouse is not pressed, whilst the value of `speed` is greater than zero, it decreases `speed` by decrements of 0.1.

Finally, an if statement checks whether or not `this.g` exists and if so prepares for drawing for a 3D shape. `rotateX(frameCount * 0.01)` and `rotateY(frameCount * 0.01)` create a slow rotation for the object, and `texture(g)` sets the texture for the shape as the p5.Renderer object that was originally passed into `draw(g)`. Another nested if statement checks whether `cube` is true, and if so uses `box(windowWidth/4)` to draw a box with side length equal to a quarter of `windowWidth`. If not it checks if `sphere` is true, `sphere(windowWidth/6, 50, 50)` is used to draw a sphere with radius equal to a sixth of `windowWidth`. The values 50 and 50 specify the amount of segments used to render the sphere, creating a smoother texture. 

##### Side note 
The `drawCube`/`cube` and `drawSphere`/`sphere` parts of the component exist purely as a feature to automate the drawing of the sketch onto a cube or sphere if the user should require it. This saves them from having to create their own p5.Render object and draw the 3D shapes themselves, simplifying the use of the component as much as possible. The component additionally allows any p5.Renderer `g` to be passed into `draw(g)`, and will draw the StarField directly onto that object, allowing free choice for the user should they want to draw onto a different renderer. The parameters `drawCube` and `drawSphere` in this case should be left blank.

### Planet

#### constructor()

Initialises the variables `x`, `y`, `z`, `red`, `green`, `blue`, `sx`, `sy`, `r`, `gods`, `numerals` and `name`.

`x`, `y` and `z` are randomly generated numbers, representing the initial pseudo-3D coordinates (since they are drawn in the P2D rendering mode) of each graphic, with `x` between `-width/2` and `width/2`, `y` between `-height/2` and `height/2`, and `z` between 0 and `width`, where `height` and `width` are the height and width of the canvas.  

`red`, `green` and `blue` are all RGB values between 0 and 130 (to stop the planets from being too vibrant) and determining the colour of the planet.

`sx` maps the value of `x/z` from between 0 and 1, to between 0 and `width`. Similarly `sy` maps the value of `y/z` from between 0 and 1 to between 0 and `height`. These mappings allow stars and planets to be rendered in positions as if they were moving towards the screen in 3D space, creating the 3D, scrolling feel of the StarField.

`r` maps `z` from between 0 and `width` to between 10 and 0, allowing the radius of the graphics to change in relation to `z`, creating the effect that they are moving towards the screen.

The variables `gods` and `numerals` are lists of strings containing the names of Greek gods and Roman Numerals, respectively. These lists are used to randomly generate the names of planets.

`name` is where each planet's name is generated. Using the `random()` method of JavaScript's `Math` object, random numbers corresponding to the indices of list elements are generated, and `name` is created as a concatenation of the god and numeral at the generated indices.

#### getters and setters

Getters and setters are defined for all variables using the format depicted above in the **StarField** class.

#### label()

The label method uses `fill(30)` to set the fill colour to a translucent grey. Then `ellipse(this.sx, this.sy, 15)` is called, drawing a circle with radius 15 and centre at x and y positions equal to `sx` and `sy`, which are the current coordinates of the planet.

`rect(this.sx - 35, this.sy - 40, 70, 25, 3, 3, 3, 3)` is used to draw a rectangle above the current position of the planet, which is then used to hold the text of the planet's name. The parameters with value 3 specify the radius of curvature of the rectangle's corners, creating a sleeker look. Similarly `triangle(this.sx, this.sy - 10, this.sx - 7, this.sy - 16, this.sx + 7, this.sy - 16)` is used to draw a triangle below the rectangle, giving the graphics the appearance of a label. 

`fill(255)` is used to set the fill colour to white. `textSize(12)` sets the text size to 12, `textFont("Arial")` sets the font to Arial, and `textAlign(CENTER)` makes it such that any text is drawn with its centre at the x and y coordinates provided.

`text(this.name, this.sx, this.sy -23)` draws the planet's name at the centre of the previously drawn rectangle. 

#### update(speed)

`z` is decremented by the value of the parameter `speed`, allowing each planet to move towards the screen proportionally to the value passed to it. Once `z` becomes less than 1 (i.e the planet has appeared to reach the screen) `x`, `y` and `z` are then reset to new values in the same way as before in the constructor, so the next time the planet is drawn it will appear to be in the distance as a new graphic. By doing this, the StarField appears endless and continues indefinitely. 

#### show(g)

`sx`, `sy` and `r` are mapped as before in the constructor to update the position of each planet. An if statement is used such that if g is passed as a parameter, the subsequent graphics are proceeded by `g.`, ensuring that they're drawn onto the p5.Renderer object. If the parameter is not provided, they are instead drawn onto the regular canvas. `fill(this.red, this.green, this.blue)` is used to set the fill colour equal to the random RGB value generated in the constructor, and `ellipse(this.sx, this.sy, this.r)` is used to draw the planet with centre at the coordinates represented by `sx` and `sy` and radius `r`. (Note that due to the fact the StarField appears smaller when drawn onto a 3D shape, if `g` is passed as a parameter to `show()`, the radius of each ellipse drawn is increased by 3 pixels)

### Star

#### constructor()

The **Star** constructor contains similar variables to those in **Planet**, excluding `red`, `green` and `blue`, since each star is the same colour. Instead of `gods` and `numerals`, each star is given 2 strings named `chars` and `nums`, where `chars` contains every letter of the alphabet in both upper and lower case, and `nums` contains each digit from 0 to 9.

`name` is then generated using for loops to select 5 random characters from `chars` and 2 random digits form `nums`, using the same `random()` method from the `Math` object as before, and by concatenating the resulting strings.

The variables `x`, `y`, `z`, `sx` and `sy` are identical to in **Planet** and `r` is almost identical, but instead of mapping `z` to between 10 and 0, it maps to between 5 and 0. This makes stars smaller than planets, and therefore easier for a user to distinguish between the two (despite stars being larger in the real world).

#### getters and setters

Getters and setters exist for all variables in the class and are written in the same format as that shown under **StarField** above.

#### label()

This method is identical to that of **Planet** mentioned above.

#### update(speed)

This method is also identical to that of **Planet**, and is explained above.

#### show(g)

This method is very similar to that of **Planet** but uses `fill(255)` as opposed to `fill(this.red, this.green, this.blue)` to set the fill colour to white, since all stars are the same colour.

# Example 

## index.html

index.html consists of HTML form controls that allow interaction with the Document Object Model. 3 sliders exist for **Star Density**, **Planet Density** and **Max Speed**, each of which controls the numerical value of the parameters fed to an instance of the `StarField` class. **Star Density** allows a range between 0 and 2000 defaulting at 400, whereas **Planet Density** takes values of the same range, but defaults at 40. **Max Speed** can take any value from 1 to 100, but defaults at 70 to avoid the sketch behaving too erratically.

3 checkboxes exist, **Object Labelling**, **Draw on Cube** and **Draw on Sphere**. These three checkboxes feed whether or not they are checked into a variable which is then used as a parameter for an instance of **StarField**.

Since the **StarField** populates the `stars` and `planets` lists in the constructor, there is a generate button that creates a new instance of the sketch with the parameters specified by the form controls. It does this by using an event listener to check for a button press, and when it receives one, runs the JavaScript function `generate()`. This retrieves the current numerical value of the form controls, stores them in variables, and then passes these variables as parameters to the `setup()` function in **index.js**, creating a new instance of **StarField** with the values specified. There is also an additional variable named `refresh`, that stores a boolean value representing whether or not the current rendering mode is P2D (false) or WEBGL (true). If it is WEBGL, then when generate is pressed, and WEBGL is no longer required (i.e no 3D shapes are being drawn), the page is reloaded to restore the rendering mode back to P2D. The code for doing so is as follows:

~~~~
      var starDensity = document.getElementById("starDensity").value;
      var planetDensity = document.getElementById("planetDensity").value;
      var maxSpeed = document.getElementById("maxSpeed").value;
      var labellingOn = document.getElementById("labellingOn").checked;
      var drawBox = document.getElementById("drawBox").checked;
      var drawSphere = document.getElementById("drawSphere").checked;
      var refresh = false;

      function generate() {
        starDensity = document.getElementById("starDensity").value;
        planetDensity = document.getElementById("planetDensity").value;
        maxSpeed = document.getElementById("maxSpeed").value;
        labellingOn = document.getElementById("labellingOn").checked;
        drawBox = document.getElementById("drawBox").checked;
        drawSphere = document.getElementById("drawSphere").checked;

        if (drawBox || drawSphere) {
          refresh = true;
        }
        else if (refresh && !drawBox && !drawSphere) {
          refresh = false;
          location.reload();
        }
        setup(starDensity, planetDensity, maxSpeed, labellingOn, drawBox, drawSphere);
      }
      
      document.getElementById("generate").addEventListener("click", generate);

~~~~

## index.js

 The component can be easily embedded in an HTML page through the use of an additional **index.js** file. In **index.html** we import the **starfield.js** code containing the class, the **p5.js** library and **index.js**, we do this as follows:
~~~~
    <script src="../p5.js"></script>
    <script src="starfield.js"></script>
    <script src="index.js"></script>
~~~~

We then create an instance of **StarField** in **index.js**:

~~~~
var s;

function setup(starDensity, planetDensity, maxSpeed, objectLabelling, drawCube, drawSphere) {
    s = new StarField(starDensity, planetDensity, maxSpeed, objectLabelling, drawCube, drawSphere);
}

function draw(g) {
    s.draw(g);
}
~~~~

This allows the use of the generate button (mentioned above) in **index.html**, and the creation of new instances of **StarField** through calls to `setup()`. As mentioned above, if `drawCube` and `drawSphere` are left undefined or false, then a p5.renderer can be passed to `draw(g)` and the StarField will be drawn directly onto it.













 









