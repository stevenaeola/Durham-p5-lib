# Frozen Brush component documentation

Adapted from [Frozen Brush](https://www.openprocessing.org/sketch/413567) by Jason Labbe. This component requires the Delaunay script, which can be found [here](https://cdn.rawgit.com/ironwallaby/delaunay/master/delaunay.js).

The component is actually split into two classes.

### FrozenBrush

The first class is named FrozenBrush, and this represents the actual component which should be used by people wishing to implement it. Multiple instances of FrozenBrush with unique properties can exist at once. They should be constructed within a p5 canvas.

The constructor of this class takes five parameters:

* **_useFill_** determines whether or not the brush strokes will be filled in as opposed to just a wireframe-like rendering.
* **_distThresh_** determines the maximum distance over which two particles will connect to form a triangle. This affects how fast the brush can be moved without "breaking up". Recommended is 75.
* **_brushColour_** obviously determines the colour of the brush, and should be given as a hexadecimal RGB string in the format "#RRGGBB".
* **_fadeSpeed_** determines the alpha value (transparency) of a constantly refreshing rectangle which causes the brush to appear to fade away over time. Set to 0 to disable the fading effect. Recommended is 30. Maximum is 255.
* **_maxLevel_** is the number of times a particle will "propagate" and spread. Effectively, it is the thickness of the brush. To disable propagation altogether, set this to 0. Recommended is 0 to 5. There is no hard coded maximum, but each additional level has an **exponential effect on performance** so do **NOT** set this too high or your page will crash.

The constructor also initialises two empty lists named *allParticles* and *data* which are used later, and sets a value called *spawnRate*. The spawn rate is not set by the parameters since it makes very little graphical difference to the brush, but it, as well as all five other properties, can be changed and read using the getters and setters within this class. *fadeSpeed* and *maxLevel* cannot be set to negative values and *fadeSpeed* cannot be set higher than 255. As previously discussed, there is no limit on *maxLevel*, but proceed with caution.

The addParticle method is an accessor method so that the Particle class can add its own instances to the *allParticles* list without accessing it directly, just as good practice. This should not be used by human users without good reason.

**The draw method should be called from a p5 draw method**. First, it draws a translucent rectangle over the whole canvas to produce the fade effect. Next, all of the tracked particles are looped through and their move methods are called. They are also removed from the tracker if they are moving at a velocity below a certain threshold. After that, the Delaunay library is used to load up the *data* list. This is what produces the crystalline effect of the brush. The data is looped through and used to construct a series of triangles. The maximum size of these triangles is determined by *distThresh*. If a triangle is too large, it is skipped using a continue. The triangles are drawn using the p5 triangle method.

**The mouseDragged method must be provided with an x and y coordinate**. For standard behaviour, use mouseX and mouseY from p5, but other sources of coordinates can be used if the component is to be rendered independently from the mouse. Whenever this method is called, particles are spawned at its position, producing the brush effect.

### Particle

The second class is named Particle. Within the component, particles are objects holding the positions and velocities of the vertices of the brush. This class is automatically used by the FrozenBrush class and as such should not be directly accessed by users of the component. Nevertheless, the documentation for its methods follows.

The constructor of this class takes four parameters:

* **_x_** and **_y_** correspond to the particle's position on the canvas.
* **_level_** determines the number of propagations that the particle will perform.
* **_frozenBrush_** stores the instance of FrozenBrush so that its methods can be accessed from within this instance.

The constructor uses the coordinates to construct a p5 Vector holding its position, and also initialises another p5 Vector holding its velocity. It also initialises a variable called *life* to 0.

The class has a method named move. This is called from the brush's draw method. It increments the life of the particle and applies friction by multiplying its velocity by an amount less than one. The velocity is then used to update the position. After that, the method checks to see if this is a "spawn tick", i.e. if the life of the particle is a multiple of the brush's spawn rate (10 by default). If so, and if the particle's level is greater than 0, then a new particle is created with a level one lower and added to the brush's tracker. This particle's own level is also decremented.

Finally, there is a getter for retrieving the position vector of the particle. There is no setter since the position is determined exclusively from within the class. No other attributes need to be accessed outside the class so there are no other getters.