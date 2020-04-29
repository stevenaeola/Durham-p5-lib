# Programming Summative Assessment 1


## Getting Started

The goal of this project was to learn more about interaction between JavaScript progams and the Document Object Model (DOM), to come to understanding of the OOP-style of imperative programming, and to practice good professional programming

### Task

The task was to build a page - adaptation of a sketch from [here](http://openprocessing.org) to a reusable component using JavaScript classes with:
- Appropriate constructor
- Get and set methods for properties
- `draw` method with optional p5.Renderer as parameter

Additionally, the task was to write *this* documentation

### Methods and parameters breakdown

`alive`

Alive is a Boolean parameter that indicates whether a particle appears on a sketch or doesn't

`size`

Size is a parameter that indicates ~~size~~ how big the partical is now

`theta`

Theta (also called `Angle` in HTML for better understanding) is showing towards what angle (in radians) the particles are moving after being created. By default it is random, but can be changed with a button and slider right next to it (**Don't forget to untoggle the button**)

`drag`

Drag is a distance which particles a going to when created. Think of it as an inner circle (see next)

`force`

Force dictates whether particles go outside this *inner circle* and how far should they go

`sizeScalar`

SizeScalar defines the ratio of initial size of a particle and the final one

`color`

Defines a color of particle. By default it is a random color - red, green, blue or white

`location`

Defines current coordinates of a particle

`velocity`

Defines current velocity of a particle

For every parameter above, there is a *getter* and *setter*, which a widely used across the code
For `location` and `velocity` there are also *getters* and *setters* separetely for X-coordinates and Y-coordinates

`move()`

Move method is responibile for every aspect of particles' movements from appearing till ~~death~~ disappearing

`draw()`

Draw method is responsible for the actial creation and visualisation of the particles. Has an optional p5.Renderer as parameter

`drawTheShape()`

drawTheShape defines the shape of the partical (see next)

Class Particles has 6 child classes - Circle, Triangle, Square, VerticalLine, HorizontalLine and **Potato**

Each of those child classes has `drawTheShape()` defined. Considering **Potato** class, is defines its shape using a preloaded picture of one potato


`MAX_PARTICLES` shows how many particles can coexist on a same sketch
`COLORS` is an array containing a white color, but red, green and blue are added by default later in code

`particles` contains all particles on the sketch
`pool` contains all particles that once were on the sketch

`preload()` in a method that is being called before the creating of the canvas. It loads the picture of potato and a song for **Country Roads Mode** (see below)

`setup()` creates canvas for our beautiful art 


`draw()` creates a black background and spawns the particles accroding to mouse movement
`drawingContext.globalCompositeOperation = 'normal'` is here to make sure that colliding particles coexist normally

`move()` method is responsible for the following:


* Creating particles upon mouse move
* Reading values from sliders and checkboxes that define particles' parameters
* Reading and manipulating values from checkboxes that defines colors of particles
* Reading value from menu that determines the shape of particles

`mouseMosed()` triggers `moved()` method

`mousePressed()` is responsible for **Country Roads Mode**. Obviously, it can be turned on and off with a mouse click. As soon as you turn it on, Take Me Home, Country Roads will start playing, as well as particles will become huge potatoes. As you eventually turn it off, values will come back to default.

## License

This project is licensed under the Creative Commons License - see the [LICENSE.md](LICENSE.md) file for details
