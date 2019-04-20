# Wave Sphere
Example constructor
```javascript
var ws = new WaveSphere();

function setup(){    
    createCanvas(700, 700);
    ws.setup(1000, 200, 300, 300);
}

function draw(){
    background(0, 0, 0);
    ws.draw();
}

function mousePressed(){
       ws.mousePressed();
}
```

Using optional p5.Renderer

```javascript
var ws = new WaveSphere();
var sphereGraphic;

function setup(){ 
    createCanvas(700, 700);
    sphereGraphic = createGraphics(700, 700) ;
    ws.setup(100,200, 350, 350, sphereGraphic);
}

function draw(){P
    sphereGraphic.background(0,0,0) ;
    ws.draw(sphereGraphic);
    image(sphereGraphic, 0, 0);
}

function mousePressed(){
       ws.mousePressed(sphereGraphic);
}
```



## Methods
----------
```javascript
setup(nPoints, radius, x, y, [optional] renderObject)
draw([optional] renderObject)
mousePressed([optional] renderObject)
collision([int] x, [int] y, [int] z)
```
### Setup
```javascript
setup(nPoints, radius, x, y, [optional] renderObject)
```
Call to set up the object. To align with the flow of a p5 program most the variable initiation is done here rather than the constructor. This function must be called before any other function calls to ensure everything is set up. Calling setup also sets all the variable to their default value. Setup can be called again after its initial call however it will remove and recreate all the points that are used in the sphere and reset all the values to their default. 

### Draw
```javascript
draw([optional] renderObject)
```
This function should be called every time the canvas/p5.Renderer draw call is made. It redraws the sphere and animates it. 

### Mouse pressed
```javascript
mousePressed([optional] renderObject)
```
This function should be called every time the canvas/p5.Renderer mousePressed() is called. If mouse behaviour is not required see the Mouse Activity parameter

### Collision
```javascript
collision([int] x, [int] y, [int] z)
```
This function will send the point closest the the (x,y,z) argument towards the middle of the sphere. The sphere is in its own coordinate space centered around the origin. Note that this coordinate space is independent of the canvas coordinates of the sphere. Hence calls to this function should be made with the argument point (x,y,z) in the sphere coordinate space for the desired behaviour. The size of the collision can be set using setClickMagnitude().



## Parameters
---------
### Colour
```javascript
    setColour([int] r, [int] g, [int] b)
```
Sets the whole colour of the sphere to rgb value specified, all values should be between 0-255.
Default colour: white (255,255,255)
```javascript
    setFrontBackColour([int] red_front, [int] green_front, [int] blue_front, [int] red_back, [int] green_back, [int] blue_back)
```
Sets the colour at the front and the back of the sphere all values should be between 0-255.
```javascript
    [int array length=6] getFrontBackColour()
```
returns the colour currently being displayed at the front and the back of the sphere.<br/>
returns array: [red_front, green_front, blue_front, red_back, green_back, blue_back]
all values will be between 0-255.

----

### Click Magnitude
```javascript
setClickMagnitude([float] size)
[float] getClickMagnitude()
```
Sets and gets the size of effect a mouse click has on the surface of the sphere.<br/>
&lt;0.5 - Smaller reaction.<br/>
&gt;0.5 - Larger reaction.<br/>
Default: 0.5

----

### FPS
```javascript
setShowFPS([bool] show)
```
If set to true will show FPS in the bottom left corner.<br/>
Default: false

----
### Output scale
```javascript
setOutputScale([float] scale)
[float] getOutputScale()
```
Sets and Gets the scale of the output. This parameter can be changed without effecting the current dynamics of the sphere.<br/>
&lt;1.2 - smaller outputted sphere.<br/>
&gt;1.2 - larger outputted sphere. <br/>
Default: 1.2

----
### Radius
```javascript
setRadius([int] r)
[int] getRadius()
```
Sets and Gets the radius of sphere. Will effect physics of sphere as it changes, see output scale if this isn't a desirable effect.

----
### Number of points
```javascript
getNumberOfPoints()
```
Returns the number of points in the circle.<br/>
NOTE: points cannot be changed once set. To change the number of points setup() must be called again.

----
### Surface reactivity
```javascript
setSurfaceReactivity([float] m)
[float] getSurfaceReactivity()
```
Gets and sets the reactivity of the surface.<br/>
Default: 50

----
### Surface tension
```javascript
setSurfaceTension([float] h)
[float] getSurfaceTension()
```
Gets and sets the surface tension of the sphere.<br/>
Default: 0.99

----
### Viscosity
```javascript
setViscosity([float] hh)
[float] getViscosity()
```
Gets and sets the viscosity of the air (mostly).<br/>
Default: 0.01

----
### Position
```javascript
    setX([int] x)
    setY([int] y)
```
Sets the X and Y coordinates of the center of the sphere.
```javascript
    [int] getX()
    [int] getY()
```
Gets the X and Y coordinates of the center of the sphere. 

----
### Mouse activity
```javascript
setMouseActive([bool] active)
[bool] getMouseActive()
```
Gets and sets wether the sphere should react to to the mouse.<br/>
Default: true

----
### Mouse activity
```javascript
setMouseActiveRegion([int array] [Xmin, Xmax, Ymin, Ymax])
[int array] [Xmin, Xmax, Ymin, Ymax] getMouseActiveRegion()
```
Gets and sets the active region of the mouse. This is the region where the mouse will be acknowledged for clicks and rotation. Outside this region it will be ignored.<br/>
Default: size of canvas/p5.render object is in.

----
### Mouse sensitivity
```javascript
setMouseSensitivity([float] sensitivity)
[float] getMouseSensitivity()
```
Gets and sets the sensitivity of the sphere rotation to the mouse.<br/>
&lt;1 - less sensitive<br/>
&gt;1 - more sensitive<br/>
Default: 1<br/>

----
### Spin Mode
```javascript
setSpinMode([int 0,1,2 only] x)
[int 0,1,2 only] getSpinMode()
```
Gets and set the sphere spin mode.<br/>
The sphere has 3 different spin modes:<br/>
Mode 0: No spin<br/>
Mode 1: Mouse reactive spin<br/>
Mode 2: Constant spin (set Constant Spin for more details)

----
### Constant Spin
```javascript
setConsSpinX([int] x)
setConsSpinY([int] y)
[int] getConsSpinX()
[int] getConsSpinY()
```
Sets and gets the (x,y) coordinate that the sphere spins towards. The coordinates are in the sphere coordinate space not the canvas space (for more info read "Collision" method). The further away from the origin the faster the sphere will spin.<br/>
For constant spin to take place the sphere must be in the correct Spin Mode.<br/>
Default: 100, 100 



## Changes from original
-------------
- Generalisation: Removed all hard coded variables and replaced them with real variables (position, radius, click magnitude, constants that depended on the radius). 
- Added new colour model, allowing the colour to be set to different colours at the front and back.
- Added optional FPS counter.
- Added collision method.
- Added ability to apply constant spin. 
- A large emphasis on increasing the speed, there is approximately a 2x framerate increase from the original.
- Added the ability for the mouse to be ignored, either by being out of a useful region (the screen) or it can be turned off.
- Parameterization: added getters and setters for all useful parameters including all the variables that were hard coded.


## Licence
-----------
Current Object:<br/>
"WaveSphere"<br/>
 under Creative Commons Attribution ShareAlike<br/>
 https://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/
 
Original Sketch:<br/>
"WavesOnSphere_1.0" by ashley fong<br/>
http://www.openprocessing.org/sketch/638487Licensed<br/>
 under Creative Commons Attribution ShareAlike<br/>
 https://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/<br/>