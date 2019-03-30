# p5.js Circuit Component
## About
This is a reusable graphical element created using p5.js. It consists of a
number of "photons" moving around in the cardinal and intercardinal directions
a set area. These photons will randomly turn left or right and leave fading
trails.   
This code is adapted from ["Circuit" by Gabriel](http://www.openprocessing.org/sketch/398992).   
Licensed under Creative Commons Attribution ShareAlike.  
https://creativecommons.org/licenses/by-sa/3.0  
https://creativecommons.org/licenses/GPL/2.0/

## Code documentation
### Class Circuit
This is the main class associated with the project. It manages a list of
photons and can draw them to the screen. It also is responsible for
drawing the background and creating the photon's fading trail.

```javascript
constructor(photon_number=30)
```   
Creates a new circuit component with a given number of photons.

```javascript
draw(renderer, x=mouseX, y=mouseY)
```   
Draws the circuit component to the screen. If a p5.renderer is passed the 
component will be drawn to it, otherwise it will be draw directly to the 
canvas (creating one of size 100x100 pixels if one does not exist).
The component will always fill the space given to it. To have it occupy a 
smaller space use p5.js's ```createGraphics()``` function to create a
p5.renderer of desired dimensions and pass this to this draw function.
This function can also be passed x and y values for the photon to orbit
if the component has been set to orbit mode. These values should be relative
to the space the photons are being drawn to. After drawing the photons to the
screen it will then update their positions, passing the renderer on if it has 
been supplied.  

```javascript
pulse(x, y, redraw_background=true)
```   
Sets the photons locations to the given coordinates, gives them all random 
directions and resets the background. Any photons that are currently invisible 
will be made visible again. The x and y directions should be given relative 
to the space the photons are being drawn to. By default the background will be
redrawn, removing any photon trails. The behaviour can be disabled by passing
false for redraw_background.   
Throws an error if the values passed for x or y are not numbers.

```javascript
resetBackground()
```   
Redraws the background, removing all photon trails.

```javascript
addPhoton(x, y, direction="N")
```   
Creates a new photon at the given coordinates travelling in the given direction.
Direction must be a string from the list ```[N, NE, E, SE, S, SW, W, NW]```.   
Throws an error if the values passed for x or y are not integers or if direction 
is not a value from the list above.

```javascript
removePhoton()
```   
Removes the last created photon from the circuit.

```javascript
setPhotonSpeed(speed)
```   
Sets the speed the photons should move at. A negative number will cause the photons
to move in the opposite direction.   
Throws an error if the value passed for speed is not an integer.

```javascript
getPhotonSpeed()
```   
Returns the current speed of the photons.

```javascript
setFadeSpeed(fade_speed)
```   
Sets the speed which the photon trails should fade away at.   
Throws an error if the value passed for fade_speed is not an integer or if it is 
not in the range 0 < fade_speed < 256. 

```javascript
getFadeSpeed()
```   
Returns the current fade speed of the circuit.

```javascript
setBackgroundColour(background_RGB, reset_background=true)
```   
Sets the RGB value of the background. If reset_background is set the background will
redrawn in the new colour. Setting this to false will cause the old background colour 
to fade into the new one.   
Throws an error if the value passed for background_RGB is not an array of three 
integers.

```javascript
getBackgroundColour()
```   
Returns the current background colour as an array containing three integers.

```javascript
setPhotonColour(photon_RGB)
```   
Sets the RGB value of the photons.   
Throws an error if the value passed for photon_RGB is not an array of three integers.

```javascript
getPhotonColour()
```   
Returns the current photon colour as an array containing three integers.

```javascript
setMinTurnTime(time)
```   
Sets the number of draw cycles until a photon can turn in the same direction again.
Throws an error if the value passed for photon_RGB is not an integer.

```javascript
getMinTurnTime()
```   
Returns the current minimum turn time of the photons.

```javascript
setPhotonOrbit(photons_orbit)
```   
Sets whether the photons should orbit around a set of coordinates (by default the 
mouse).

```javascript
getPhotonOrbit()
```   
Returns whether the photons are currently set to orbit mode.

```javascript
setPhotonOneHit(photons_one_hit)
```   
Sets whether the photons should disappear completely upon hitting an edge.

```javascript
getPhotonOneHit()
```   
Returns whether the photons are in one hit mode.

```javascript
setPhotonReflection(photon_reflection)
```   
Sets whether the photons should reflect upon hitting an edge. By default photons 
reflect but turn invisible until they hit another edge. By setting the photons to
reflection mode they will always stay visible.

```javascript
getPhotonReflection()
```   
Returns whether the photons are in reflection mode.

### Class Photon
This class creates a photon, a small line that moves around the screen.

```javascript
constructor(pos, dir)
```   
Creates a photon at the position specified by the p5.vector pos and going in the 
direction specified by the p5.vector dir.

```javascript
update(renderer)
```   
Updates the position of the photon. It will detect if the photon is at an edge
and will decide what to do based on the current mode (OneHit, Reflection, Default).
It also handles photon orbits and turns. It takes the p5.renderer that the photon is
to be drawn to so it can calculate the width and height of the space available. If
no renderer is passed it will use the width and height of the canvas.

```javascript
draw(renderer)
```      
Draws the photon to the screen. If a p5.render is passed they will be drawn to that,
otherwise they will be drawn to the canvas.

```javascript
resetTurnCount()
```
Resets the number of updates since last turning in either direction to 0

```javascript
getTurnCount()
```
Returns the number of updates since turning in the form of an array of the format:
\[updates since turned left, updates since turned right\]

```javascript
setSpeed(speed)
```   
Used to modify the photon's speed.

```javascript
getSpeed()
```
Returns the speed of the photon.

```javascript
setPosition(x, y)
```
Sets x and y coordinates of the photons location.

```javascript
getPosition()
```
Returns the photons current position as a p5 vector.

```javascript
setOldPosition(x, y)
```
Sets the x and y coordinates of the photons previous location.

```javascript
getOldPosition()
```
Returns the photons previous position in the form of a p5 vector.

```javascript
setColour(colour)
```
Sets the RGB value of the photon.

```javascript
getColour()
```
Returns the RGB value of the photon.

```javascript
setVisible(visible)
```
Sets whether the photon is visible or not. Takes a boolean value.

```javascript
getVisible()
```
Returns a boolean value corresponding to whether the photon is visible or not.

```javascript
setOrbit(orbit)
```
Sets whether the photon is in orbit mode or not. Takes a boolean value.

```javascript
getOrbit()
```
Returns a boolean value corresponding to whether the photon is in orbit mode
or not.

```javascript
setOneHit(one_hit)
```
Sets whether the photon is in one hit mode or not. Takes a boolean value.

```javascript
getOneHit()
```
Returns a boolean value corresponding to whether the photon is in one hit mode
or not.

```javascript
setReflect(reflect)
```
Sets whether the photon is in reflect mode or not. Takes a boolean value.

```javascript
getReflect()
```
Returns a boolean value corresponding to whether the photon is in reflect mode
or not.

```javascript
setDirection(direction)
```
Sets the direction of the photon. Takes a p5 vector.

```javascript
setFocus(focus)
```
Sets the coordinates to orbit around in orbit mode. Takes a p5 vector.

```javascript
getFocus()
```
Returns the p5 vector coordinates it will orbit around in orbit mode.

```javascript
setMinTurnTime(time)
```
Sets the minimum number of updates between turns of the same direction.

```javascript
getMinTurnTime()
```
Gets the minimum turn time.


## Documentation of example
The example page (index.html) demonstrates how a circuit component can be set up and
manipulated. The page is stylised using bootstrap so you must be connected to the 
internet for the page to load correctly. The numbered buttons at the top show different
ways of rendering the component and show how many components can be used on the same 
page. The lower buttons allow the user to manipulate the component (when multiple
components are being rendered it will control the centre one). The user can also 
click on the circuit to pulse at the mouse location.

The javascript code controlling the page is all within the file index.js. This shows 
how to create, render and manipulate one or more sketches. The rest of this document
will show how a circuit component can be created and manipulated. You should 
already be familiar with the basics of p5.js, such as the setup and draw functions, 
in order to follow it.

### Setting up a circuit component
Setting up a circuit component is very easy. You simply create a new circuit component
and save it to a variable as follows. You can also set *n*, the number of photons in
the circuit. By default this value is 30.

```javascript
circuit_1 = new Circuit(n);
```

Normally you would want to set up your component within your setup function along with
your `createCanvas`. If you are only drawing the circuit you can simply create a canvas
with the desired dimensions and draw directly to that. However if you don't want you
circuit to fill the entire canvas you should use `createGraphics` to create a new 
p5.renderer to draw your component to. For example, if you wished to create and later
draw two circuit components you code would look similar to the following:
```javascript
function setup() {
    createCanvas(1000, 500);
    
    pg_1 = createGraphics(500, 500);
    pg_2 = createGraphics(500, 500);
    
    circuit_1 = new Circuit();
    circuit_2 = new Circuit();
}
```

### Drawing a circuit component
To draw your circuit component you simply call the draw function on your circuit component.
You have the option of passing a p5.renderer to draw the circuit to, if nothing is passed 
the circuit will be drawn directly to the canvas. It will always fill the space available.
The code calling this function should be placed withing the main draw function of your code.
Following on from our example above, the two circuits can be drawn to the two p5.renderers,
which can in turn be drawn to the canvas as follows:
```javascript
function draw() {
  circuit_1.draw(pg_1);
  circuit_2.draw(pg_2);
  
  image(pg_1, 0, 0);
  image(pg_2, 500, 0);
}
```
The code to draw directly to the canvas would be much simpler:
```javascript
function draw() {
  circuit_1.draw();
}
```

### Modifying a circuit component
To modify a circuit component you simply call the relevant function on it. For example, 
if you wanted to set the speed of a circuit to 10:
```javascript
circuit_1.setSpeed(10);
```
If you wanted to add a basic way to interact with the component you could create a pulse
wherever the user clicks. In order to do this you can simply take advantage of p5.js'
`mouseClicked()` function and the global variable `mouseX` and `mouseY`:
```javascript
function mouseClicked() {
  circuit_1.pulse(mouseX, mouseY);
}
```