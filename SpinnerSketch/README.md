# Programming Summative - An extension of "Random Loader" by user "Λ B H I N Λ V . K R"

## Overview

The original Random Loader is a very simple octagonal spinner, the sides of which rotate 180 degrees clockwise every set time interval. Enamoured by its simplicity and enticed by the potential for its development, I chose this sketch to adapt, and enabled the dynamic changing of the main visual elements of the spinner.

### Constructor & Parameters

When creating a new instance of the spinner, the constructor can be provided with at most 11 parameter arguments to affect its appearance. Defaults for each parameter exist, such that no arguments are strictly necessary, if one desires a default look.

```javascript
s = new spinner(n,r,spd,rot,thk,ws,hs,red,grn,blu)
```

Parameter Name|Function
--------------|--------
n             |Amount of line segments in shape
r             |Radius of shape
spd           |Speed at which line rotation happens
rot           |Angle through which every rotation occurs
thk           |Thickness of line segments
ws            |Width-shift - how far across the canvas the spinner lies, as a proportion of the canvas (0-1)
hs            |Height-shift - how far down the canvas the spinner lies, as a proportion of the canvas (0-1)
red           |Red value of lines (0-255)
grn           |Green value of lines (0-255)
blu           |Blue value of lines (0-255)
rend*         |Boolean value that determines whether createCanvas() includes a WEBGL parameter, to enable 3D rendering

\*when rend is truthy, it should really be used in the context of a 3D element (likely combined with passing an optional argument to draw()), as WEBGL rendering makes a standard 2D canvas look rather bad.

### Methods

To maintain the elegant simplicity of the sketch, the amount of methods has been limited to the necessities. The constructor is necessary to create new instances, appropriate set and get functions for each parameter exist, and the draw method is the main event, where all the magic happens.

#### constructor()

Called when a new instance of the class is defined. Can be supplied with parameters to change appearance of spinner.

#### setParam() and getParam()

Pairs of functions that set and return one of the parameters of a specific instance, respectively.

#### draw()

The drawing of the sketch works by, for each line, first determining the interior angle of the shape, defined by dividing 360 by n, the amount of lines/sides.  It then trigonometrically decides the midpoint coordinates and length of a line. Next, it translates to the correct position, rotates the canvas by the required amount for tht frame, and draws a line. Once it has finished doing this for all the lines, it moves on to updating the rotation angle of all lines for use in the next draw() frame, and starts the process again. The rotation itself is slower at the beginning and end of the rotation, getting faster around the middle, giving the motion an aesthetically pleasing sense of acceleration and momentum.

When draw() receives an optional parameter in the form of a createGraphics() variable, it enables using this new graphical environment as a texture in other elements, such as 3D shapes. The methods used when this parameter is received draw onto the environment, as opposed to the canvas, and require the environment's use in another element to be displayed.

### HTML Example Pages

An example of the spinner and its changeable attributes has been embedded into two HTML pages, with DOM-interacting form controls to enable the dynamic changing of the spinner within the page. The parameters can be interacted with through a set of sliders and entry fields. One page contains a flat canvas, whereas the other contains a rotating cube with the spinner pasted as a texture, to demonstrate the use of WEBGL rendering and the optional draw() parameter/p5.Renderer functionality.

The demo_flat.js file, for use with the canvas demonstration example page, has 3 additional, non-controlled, spinners available to render, to showcase multiple instances rendered on the same canvas. To enable these, uncomment the relevant lines from the setup() and draw() functions.

Strict type or value controls are not included in the forms - any value will attempt to be cast as Number(). From my testing, incorrect types do not "break" the sketch so much as temporarily affect it, until correct types are submitted, and values outside of "sensible" ranges (eg. negative speeds, non-integer line amounts) introduce interesting and slightly unintended, but otherwise harmless, behaviour that can be freely explored.

### Setting Up Your Own Instance of the Spinner

The following code blocks illustrate a minimal code template to set up a working instance of the spinner.

index.html:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Your Webpage</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
        <script src="sketch.js"></script>
        <script src="index.js"></script>
    </head>
    <body>
    </body>
</html>
```

index.js:

```javascript
var s;
//Optionally:
//var spin;
function setup() {
    s = new spinner(10,70,2,90,10,0.5,0.5,0,150,255,0); //Last parameter being truthy enables WEBGL renderer
    //Optionally:
    //spin = createGraphics(w,h);
  }

function draw() {
    background(20,255);
    s.draw(); //Optionally: call with the createGraphics() variable (eg s.draw(spin);)
}
```

## Original Code & Licensing

For the original OpenProcessing sketch, visit: <https://www.openprocessing.org/sketch/319458>

The original sketch was provided under a Creative Commons Attribution-ShareAlike 3.0 Unported License. As per the terms of CC BY-SA 3.0, this modified sketch is also provided under the same license.

For more details, visit: <https://creativecommons.org/licenses/by-sa/3.0/>

For the full legal code of the license, visit: <https://creativecommons.org/licenses/by-sa/3.0/legalcode>