'Wobbly Swarm'
======
## Description
I have adapted a sketch originally created using the p5.js library into a reusable component using JavaScript classes. The sketch makes use of arrays to store the position, size and velocity of each ellipse which can be drawn onto either a canvas or graphics area. The velocity of each ellipse is calculated by looking at the distance between each particle and the size (mass) of each particle which is used to calculate force and acceleration.

I have included an example page to demonstrate how the class can be used. The example draws the sketch onto a 3d rotating cube using the WebGL API by including an optional p5 renderer as a parameter of the draw method. I have also added additional controls to change the colour and size of each ellipse by using HTML sliders and buttons which interacts with the JavaScript code using the Document Object Model.
## particle.js (class)

`constructor()`
The constructor method is used to initialise objects created with the class. The following parameter are passed through the method: x, y, m, r, g, b, o and s. 'x' and 'y' passes the position of where the ellipse will be created. 'm' passes the radius of each ellipse. It is called mass in the class as it is used to calculate force, acceleration and velocity. 'r', 'g', 'b' and 'o' are all used to change the colour of the ellipse (red, green, blue and opacity) and s is used as a size multiplier so the user can change the size of all of the ellipses. All default values are set at this stage. I have used the `this` keyword to refer to the class itself. This means that whenever I call a property of the class inside of the class, I can use the `this` keyword. I have also created several empty arrays in the constructor to store the mass, position and velocity of each ellipse in the sketch.

`setRed()`
This method is called from index.js and is used to change the value of the red property. A parameter called red is passed through the method which is the value of the red slider in my example. The default value of red is 64.

`setGreen()`
This method is called from index.js and is used to change the value of the green property. A parameter called green is passed through the method which is the value of the green slider in my example. The default value of green is 255.

`setBlue()`
This method is called from index.js and is used to change the value of the blue property. A parameter called blue is passed through the method which is the value of the blue slider in my example. The default value of blue is 255.

`restart()`
This method is used to refresh the page when the method is called from index.js. Inside of this method, I am using the `location.reload()` method which reloads the page from the cache by default.

`larger()` and `smaller()`
These methods are called from index.js are are used to either multiply or divide the value of the size property by 2. In my example, these methods are called when buttons are clicked by the user.

`addNewParticle()`
This method is used to add new values to the array when the mouse is pressed. These values will make up properties that will be needed to create each ellipse. The number of values in each list is therefore the number of ellipses on the sketch. I use the `.push` method to add the values stored in the corresponding properties to the end of array. I also call the `resetmouseposition()` method which replaces the values in the X and Y properties with the current position of the mouse before adding the values to the array. This method therefore has parameters mouseX and mouseY. When adding a value to the mass array, I have used the `random()` method which in my code returns a random number between 0.003 and 0.03.

`draw()`
The draw method in my class is called when the draw() function is run in the index.js file. This runs the code continuously until the program is stopped. I have included an **optional p5 renderer** as a parameter to this method. Before using methods that draw to the canvas, I have included an if statement to say that if the parameter 'g' exists, draw the code into the graphics area rather than on the canvas. The position of each ellipse is also calculated in this method. The distance between each particle is calculated using Pythagoras' Theorem which is used to calculate the force which is used to calculate the acceleration each particle. Finally, this can be used to calculate the velocity of each particle.

`fill()`
This is a p5 method which is used to set the colour used to fill each ellipse. In my program the format is `fill(r,g,b,o)` which r,g,b,o are red, green, blue and opacity respectively. Each value can be in the range from 0 to 255.

`noStroke()`
This is a p5 method which disables the drawing of the outline of each ellipse.

`ellipse()`
This is a p5 which draws an ellipse to the screen. The first two parameters set the location (x and y coordinates respectively) and the final two set the width and height of the ellipse which is the mass property in my sketch. I have multiplied the value of the width of height by the size property if the user uses the larger and smaller buttons to change the size of the particles.

## index.js (example)
`function setup()` The setup function is called when the program is first run. In my example, this is used to initialise the canvas and graphics area as well as create a new instance of the particle class stored in particle.js.

`function draw()` The draw function is called repeatedly throughout the run time of the program. In my example, it is used to repeatedly call the draw method inside of the class particle which the parameter g which is a value returned by the createGraphics() function. This is therefore used to display different positions of each ellipse. This is also where I have included the code to sketch a 3d cube, where the sketch drawn with createGraphics() is used as the texture for each face.

`function mouseClicked()` and `function mouseDragged()`. The mouseClicked() function is called after a mouse button has been pressed and then released. The mouseDragged() function is called after a mouse has been pressed and is moved before it is released.

`createCanvas()`
This is a p5 function is creates a canvas element where the parameters are the width and height of the canvas respectively. I have also passed `WEBGL` are a parameter which is used to enable WebGL features.

`createGraphics()`
This function creates a new graphics area where the sketch could be drawn. This also returns a value which is passed through the draw method in the class as a parameter.

`background()` This is a p5 function which sets the colour of the background of the canvas. In my example, I have also used `g.background()` which is used to change the background colour of the graphics area.

`rotateX()` and `rotateY()` These are p5.js functions that are used to rotate the sketch around the X and Y axis respectively. They accept the angle of rotation as a parameter which in my sketch is `(framecount * 0.01)`. frameCount is a system variable which holds the number of frames that have been displayed since the code had started.

`box()` This is a p5 function which draws a box which the width as a parameter.

`changeRed()`, `changeGreen()`, `changeBlue()`, `restart()`, `smaller()`, `larger()` All of these functions work with the DOM and when called, gets the value of the slider/button using `getElementById().value`. They also call the function to update in the particle class.

`addEventListener()` This sets up a function to be called whenever a specific event happens. The first parameter is the type of event. In my example, this is either change or click. Change is called when the value of the form element is changed and click is called when the mouse is pressed and released. The second parameter is the listener which are the functions in the paragraph above. Essentially, this function calls the above functions when a specific event happens.

`getElementById()` This function returns an element representing the element whose Id matches the string. These Ids are defined in index.html.

`preventDefault()` The function event.preventDefault() prevents the form element from carrying out what is would normally do.


## Original Code

"Wobbly Swarm" by Konstantin Makhmutov

http://www.openprocessing.org/sketch/492096  

Licensed under Creative Commons Attribution ShareAlike

https://creativecommons.org/licenses/by-sa/3.0

https://creativecommons.org/licenses/GPL/2.0/

## CSS

I have used BootstrapCDN to format my HTML.

It is Licensed under the MIT License.

https://github.com/twbs/bootstrap/blob/v4.0.0/LICENSE
