# In and Out animation object documentation #
## Description ##
Animation in p5 that generates an iterative "triangle-within-triangle" shape that oscilliates in and out in a harmonic fashion. Optional parameters to adjust position in canvas, size, colour and more.

---
## Requirements ##
* p5
* ESCRIPT 2015
---
## Usage ##
```javascript
  var i;
  var cnv; // Add optional arguments here

  function setup() {
    i = new InAndOut();
    cnv = createCanvas(canvasWidth, canvasHeight)
    // Your setup procedure here
  }

  function draw(){
    // Other drawing procedures here
    i.draw(cnv);
  }
```
---
## Arguments ##
#### constructor(x_pos, y_pos, length, level, colour, colour_fade, line_weight, animation_time, master_rotate)
```
  x_pos: X position of bottom left corner of triangle. Default = 40
  y_pos: Y position of bottom left corner of triangle. Default = 460
  length: Size of the side of the largest triangle. Default = 460
  level: Amount of iterations to draw triangles for per frame. Default = 100
  colour: Triangle line colour as a array. Default = [0, 0, 0]
  colour_fade: Value to add to colour each recursive call as an array. Default = [0, 0, 0]
  line_weight: Thickness of drawn line. Default = 1
  animation_time: Time for one complete loop of the animation in milliseconds. Default = 6000
  master_rotate: Time for one rotation of entire object in milliseconds. Default = 0
```
#### draw(r)
```
  r: Graphic or Canvas to draw object on. p5.Renderer object.
  If none passed then default renderer used.
```
#### getters/setters
```
  Object contains functions to get and set attributes defined in constructor. (see Arguments -> constructor for attribute names)
  Getters are of the format get_XXX() where XXX is the class attribute.
  Setters are of the format set_XXX(_) where XXX is the class attribute and _ is the value to set.
```
---

## Examples ##
#### Example 1 ####
```javascript
/* Create new object at x = 500, y = 500 of size = 200
  Recursion depth of 100, colour Blue with a fade of [3, 0, -3]*/
var i;
var cnv;
function setup()
  i = new InAndOut(500, 500, 200, 100, [0, 0, 255], [3, 0, -3]);
  cnv = createCanvas(1000, 1000);
  // Your setup procedure here
}

function draw(){
  // Other drawing procedures here
  i.draw(cnv);
}  
```
#### Example 2 ####
```javascript
// Define multiple objects and draw them together
var i = []
var cnv
function setup() {
  cnv = createCanvas(1000, 1000)
  i[0] = new InAndOut(500, 500, 200, 100, [0, 0, 255], [3, 0, -3]);
  i[1] = new InAndOut(400, 500, 200, 100, [0, 255, 0], [3, -3, 3]);
  i[2] = new InAndOut(300, 500, 200, 100, [255, 0, 0], [-3, 0, 3]);
  // Your setup procedure here
}

function draw(){
  // Other drawing procedures here
  for (let _ = 0; _ < 3; _++){
    i[_].draw(cnv);  
  }
}  
```
#### Example 3 ####
```javascript
  // Define rotating object with increased line weight.
  var i
  var cnv
  function setup() {
    cnv = createCanvas(1000, 1000);
    i = new InAndOut(500, 500, 200, 100, [0, 0, 255], [3, 0, -3], 3, 1500, 3000);
    // Your setup procedure here
  }

  function draw(){
    // Other drawing procedures here
    i.draw(cnv);
  }  
```
---
## Example Page ##
The example page contains a canvas on the left encapsulated within a black outlined box with a single InAndOut object within it instantiated with the default attributes contained within the html form located on the right of the screen.

X Position controls the x position of the object from the canvas origin.

Y Position controls the y position of the object from the canvas origin.

Side Length controls the length of the sides of the outer most triangle.

Recursion Depth controls the amount of iterations every frame. Large values may cause performance to dramatically decrease.

Colour controls the RGB colour of the outer most triangle as a comma delimited string. A single value will be interpreted as greyscale and values above or below 255 or 0 respectively will instead be interpreted as these max or min values.

Colour Fade controls the amount added to the colour value of each recursive triangle each recursive call. Similar restrictions with value boundaries and format apply.

Line Weight controls the line weight of the triangles.

Animation Time controls the time for one complete oscillation to be completed in milliseconds.

Master Time controls the time for one complete rotation of the object in milliseconds. By default this is 0 so the object will not be rotating.

---
## Original Source ##
#### Source Location
[Original Source in Processing here](https://www.openprocessing.org/sketch/563267)

#### Changes from source
* Parameterised code to include ability to change position, size, number of iterations, colour, fading of colour, line weight, time for animation to complete and rotation.

* Changed from recursive implementation to iterative implementation to allow for greater "depth" without performance becoming too low to run.

* Changed from a sketch to class implementation with getters and setters

---
## License
```
"In and out" by GabrielNoldorin http://www.openprocessing.org/sketch/563267  
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/
```
