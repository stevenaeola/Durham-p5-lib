# Documentation

This file contains documentation for the classes `ellipses` and `sketch`, and the example code. The main class is `sketch` which utilises the `ellipses` class and handles the properties of the sketch.

## `ellipses(x, y, size, colour, alpha, saturation, brightness, velFactor)`

This class is used to draw individual ellipses to the canvas/graphic, and takes the following parameters:

* `x`: The original x-coordinate of the ellipse
* `y`: The original y-coordinate of the ellipse
* `size`: The diameter of the ellipse (px). Takes non-negative values. Defaults to 50.
* `colour`: The hue component of the colour. Takes values from 0 to 255. Defaults to 0.
* `alpha`: The alpha component of the colour. Takes values from 0 (transparent) to 1. Defaults to 0.2.
* `saturation`: The saturation component of the colour. Takes values from 0 to 255. Defaults to 100.
* `brightness`: The brightness component of the colour. Takes values from 0 to 255. Defaults to 100.
* `velFactor`: The velocity factor of the ellipse. Every ellipse has a random velocity in the x and y direction between `-velFactor` and `+velFactor`. A velFactor of 0 means that the ellipse does not move. Defaults to 2.

### Example usage
```
let e = new ellipses(mouseX, mouseY, 15, 125, 0.3, 80, 100, 5);

e.draw();
```

### Properties
The properties of an ellipse e can be set using the following:

* `e.x = value;` sets the original x-coordinate of e to `value`, if it is a number.
* `e.y = value;` sets the original y-coordinate of e to `value`, if it is a number.
* `e.size = value;` sets the size of e to `value`, if it is a non-negative number.
* `e.colour = value;` sets the colour of e to `value`, if it is a number between 0 and 255.
* `e.saturation = value;` sets the saturation of e to `value`, if it is a number between 0 and 255.
* `e.brightness = value;` sets the brightness of e to `value`, if it is a number between 0 and 255.
* `e.alpha = value;` sets the alpha of e to `value`, if it is a number between 0 and 1.
* `e.velFactor = value;` sets the velFactor of e to `value`, if it is a number.

The following properties of an ellipse e can be read using get methods:

* `e.x` returns the original x-coordinate of e.
* `e.y` returns the original y-coordinate of e.
* `e.xPos` returns the current x-coordinate of e.
* `e.yPos` returns the current y-coordinate of e.
* `e.size` returns the size of e.
* `e.colour` returns the colour of e.
* `e.saturation` returns the saturation of e.
* `e.brightness` returns the brightness of e.
* `e.alpha` returns the alpha of e.
* `e.velFactor` returns the velFactor of e.

### Methods
An ellipse e has the following methods associated with it:

#### `e.run(g)`

This method takes the optional parameter `g` which specifies a graphic to draw to - otherwise, it draws to a canvas. This method adds the velocity of the ellipse to its position and redraws it on the canvas or graphic, based on the parameters.

#### `e.draw(g)`

This method takes the optional parameter `g` which specifies a graphic to draw to - otherwise, it draws to a canvas. This method draws the ellipse on the canvas or graphic, based on the parameters.

## `sketch(penSize, colour, alpha, saturation, brightness, velFactor, alwaysDraw)`

This class utilises the class `ellipses` and is used to draw the sketch. It takes the following optional parameters:

* `penSize`: The diameter of the ellipses to be drawn in pixels. Takes non-negative values. Defaults to 50.
* `colour`: The hue component of the colour. Takes values from 0 to 255. Defaults to 0.
* `alpha`: The alpha component of the colour. Takes values from 0 (transparent) to 1. Defaults to 0.2.
* `saturation`: The saturation component of the colour of the ellipses to be drawn. Takes values from 0 to 255. Defaults to 100.
* `brightness`: The brightness component of the colour of the ellipses to be drawn. Takes values from 0 to 255. Defaults to 100.
* `velFactor`: The velocity factor of the ellipses to be drawn. Every ellipse has a random velocity in the x and y direction between `-velFactor` and `+velFactor`. A velFactor of 0 means that the ellipses do not move. Defaults to 2.
* `alwaysDraw`: If set to true, ellipses are drawn whenever the user has their cursor on the canvas, rather than only when the cursor is moved.

### Properties

This class contains a number of properties which affect the properties of the ellipses that have not yet been drawn to the canvas or graphic. The properties of a sketch newSketch can be set using the following:

* `newSketch.penSize = value;` sets the penSize of `newSketch` to `value`, if it is a non-negative number.
* `newSketch.colour = value;` sets the colour of `newSketch` to `value`, if it is a number between 0 and 255.
* `newSketch.alpha = value;` sets the alpha of `newSketch` to `value`, if it is a number between 0 and 1.
* `newSketch.saturation = value;` sets the saturation of `newSketch` to `value`, if it is a number between 0 and 255.
* `newSketch.brightness = value;` sets the brightness of `newSketch` to `value`, if it is a number between 0 and 255.
* `newSketch.velFactor = value;` sets the velFactor of `newSketch` to `value`, if it is a number.
* `newSketch.alwaysDraw = boolean;` sets the alwaysDraw of `newSketch` to `boolean`, if it is a boolean.

The properties of a sketch newSketch can be retrieved using the following:

* `newSketch.penSize` returns the current penSize.
* `newSketch.colour` returns the colour (hue) currently used to draw ellipses.
* `newSketch.alpha` returns the alpha component of the colour currently used to draw ellipses.
* `newSketch.saturation` returns the saturation component of the colour currently used to draw ellipses.
* `newSketch.brightness` returns the brightness component of the colour currently used to draw ellipses.
* `newSketch.velFactor` returns the current velFactor.
* `newSketch.alwaysDraw` returns alwaysDraw (true or false). If true, ellipses are drawn even if the user is not using the mouse.

### Methods

The following methods are associated with the sketch class:

#### `.setup(width, height, renderer)`

This method should be called in the `setup()` function of a program. It takes parameters `width` and `height`, which specify the size of the canvas, and optional parameter `renderer`. If `renderer` is specified, a p5.Renderer object `g` is generated in addition to the canvas, and the user draws onto this. This object is then used as the texture of a box. There is no need for the user to create their own graphics object in `setup()` as this is created by this method.

#### `.draw()`

This method takes no parameters and should be called in the `draw()` function of a program. If `g` was created by `.setup()`, the method draws ellipses on the face of a cube; otherwise, ellipses are drawn to a canvas. Ellipses are drawn where the user positions their mouse. If the user is not moving their mouse, ellipses are not drawn unless the `alwaysDraw` parameter of the sketch is true.

Each time `.draw()` is called, it resets the canvas (and graphic, if present) using `.reset()`. The method maintains an array containing ellipses - if an ellipse travels beyond the bounds of the box or canvas, it removed from the array and no longer drawn.

This method also handles keyboard inputs. If the up arrow is pressed, the value of parameter `colour` increases. If the down arrow is pressed, the value of parameter `colour` decreases. If the right arrow is pressed, the value of parameter `penSize` increases. If the left arrow is pressed, the value of parameter `penSize` decreases.

#### `.reset(g)`

This method is called by the `.draw()` method of this class. If `g` was created, this resets the colour of the canvas and `g`, setting the texture of a box to `g`. Otherwise, only the colour of the canvas is reset.

#### `.increaseColour(value)`

This method increases the parameter `colour` by `value`, if `value` is a number. If the resulting value of `colour` would be greater than 255, it is set to 0.

#### `.decreaseColour(value)`

This method decreases the parameter `colour` by `value`, if `value` is a number. If the resulting value of `colour` would be less than 0, it is set to 255.

#### `.increasePenSize(value)`

This method increases the parameter `penSize` by `value`, if `value` is a number.

#### `.decreasePenSize(value)`

This method decreases the parameter `penSize` by `value`, if `value` is a number and the resulting value of `penSize` is greater than 0.

### Example usage

With renderer parameter:

```
var newSketch = new sketch();

setup() {
  newSketch.setup(1000,600,WEBGL);
}

draw() {
  newSketch.draw();
}
```

Without renderer parameter:

```
var newSketch = new sketch();

setup() {
  newSketch.setup(1000,600);
}

draw() {
  newSketch.draw();
}
```

## Example

The example sketch creates a new object, `newSketch`, then calls `newSketch.setup(width, height)` inside the `setup()` function, which is called when the program runs. This sets up a canvas with a black background.

```
var newSketch = new sketch();

function setup() {
  newSketch.setup(800,500);
}
```

Each time the `draw()` function is called, index.js calls `newSketch.draw()`, which runs the draw method in the sketch class. This updates the positions of the ellipses according to their velocities and draws new ellipses if the mouse is being moved. It also handles keypress events; the user can control the colour with w and s and the ellipse size with the right and left arrows (right to increase size, left to decrease size).

```
function draw() {
  newSketch.draw();
}
```

The index.js file adds event listeners to the sliders and checkboxes for properties shown on the index.html page (which are arranged using Bootstrap). Changing the value of a slider or checked box causes a function to be called in index.js. These functions change the properties of `newSketch` (which itself ensures that each property is valid), which affect the properties of future ellipses. The following functions are implemented:

* `brightnessChange`: changes the brightness parameter of newSketch; future ellipses are drawn with this brightness
* `alphaChange`: changes the alpha parameter of newSketch; future ellipses are drawn with this alpha
* `saturationChange`: changes the saturation parameter of newSketch; future ellipses are drawn with this saturation
* `penSizeChange`: changes the penSize parameter of newSketch; future ellipses are drawn with this diameter
* `velFactorChange`: changes the velFactor parameter of newSketch; future ellipses are drawn with this velFactor
* `alwaysDrawChange`: changes the alwaysDraw parameter of newSketch; if true, ellipses are drawn even when the mouse is not moved


License: CC BY-SA 3.0. See LICENSE.md for more information.
