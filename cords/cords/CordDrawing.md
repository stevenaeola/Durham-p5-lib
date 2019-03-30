# CordDrawing
Takes an image and redraws it using cords of a circle. Each line follows from where the last line left so it acts as a single thread creating the image.

## Properties
* `src` **string** file location of the image.
* `sampling` **number** amount the image is scaled up for processing and then scaled down for display.
* `lines` **number** the limit of lines drawn.
* `weight` **number** the stroke weight of the lines.
* `diameter` **number** the diameter of the circle that is displayed. *Value is set in setup function if it isn't set in the args.*
* `scale` **number** the value of the display diameter divided by the image width. *Value is set in the setup function.*
* `counter` **number** the number of line that have been drawn.
* `createCanvas` **boolean** whether or not the canvas has been created by the class or it is drawing to a graphics area.
* `initialised` **boolean** if the image has been properly loaded at the end of `setup()` this will be true otherwise it will be false.
* `done` **boolean** if the number of lines draws is equal to the line limit.

## constructor
Any new instance of the CordDrawing should be made in the `preload()` function of p5.
### Parameters
* `args` **object**
	* `args.src` **string** *Default* `"example.png"` file location of the image.
	* `args.diameter` **number** *Default: the width of the image* sets the size of the circle that will be draw and the size of the canvas if `args.createCanvas` is `true`.
	* `args.sampling` **number** *Default:* `1` amount the image is scaled up for processing and then scaled down for display.
	* `args.pegs` **number** *Default:* `500` number of pegs placed on the circumference of the circle for the cords to be drawn from.
	* `args.lines` **number** *Default:* `2750` limit of lines drawn.
	* `args.weight` **number** *Default:* `0.16` line weight of the cords.
	* `args.createCanvas` **boolean** *Default:* `True` will create a canvas to draw to. If it is false a graphics area or canvas has to be given in the draw function.

### Example
```javascipt
var cd;
function preload() {
	cd = new CordDrawing();
}
```
## setup
Creates the canvas if needed and genral setup needed before the drawing can begin.
### Example
```javascript
function setup() {
	cd.setup();
}
```

## draw
Draws a line between the current peg and then next next which is the best candiate to create the image.

Will only draw to the canvas the class has created, or the grpahics area specified. I will not draw to a canvas created by other means. 
### Parameters
* `g` **object** *optional* the graphics area you want the image drawn to, if it not specified it will draw to the canvas the class created. 

### Returns
**undefined** or **boolean** Only returns when something goes wrong or is no longer drawing as the number of lines drawn match the line limit. Returns `false` when no graphics area is given and the class hasn't created a canvas. Returns `undefined` when it is done drawing.

### Example
```javascript
function draw() {
	cd.draw();
}
``` 
Draws a line each animaion frame.

## findNextPegByLum
Calculates the best peg to go to from the current peg by the luminosity of the pixels between them.
### Returns
**object** peg with largest sum of the luminosities of the pixels between the current peg and the other pegs.

## getAvgLumOfLine
Calculates the average of the luminosity of the pixles between two points.
### Parameters
* `x0` **number** x-coordinate of the first point.
* `y0` **number** y-coordinate of the first point.
* `x1` **number** x-coordinate of the second point.
* `y1` **number** y-coordinate of the second point.

### Returns
**number** average luminosity of the pixels between tow points.

## reduceLumOfLine
Reduces the luminosity of the the pixels on a line by a set amount.
### Parameters
* `x0` **number** x-coordinate of the first point.
* `y0` **number** y-coordinate of the first point.
* `x1` **number** x-coordinate of the second point.
* `y1` **number** y-coordinate of the second point.
* `reducer` **number** amount to be subtracted form the luminosity of each pixel.

## *static* brasenhamPoints
Calculates which pixels form a line between two points.
Adapted from [StackOverflow](https://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript) user Phrogz
### Parameters
* `x0` **number** x-coordinate of the first point.
* `y0` **number** y-coordinate of the first point.
* `x1` **number** x-coordinate of the second point.
* `y1` **number** y-coordinate of the second point.

### Returns
**array** the coordinates of the pixels between the two specified points. The cooridinates are stored as objects `{x: x0, y: y0}`
### Example
```javascript
var points = CordDrawing.brasenhamPoints(0,0,50,100);
```
Returns **array** the points between the points (0,0) and (50,100).