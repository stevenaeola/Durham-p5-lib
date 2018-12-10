# Class Particle

An object that has a colour, then moves around the screen a bit, then dies a very sad death.

## `constructor(x, y, xOfst, yOfst, h, lifeSpan = 90, decay = 0.75, sizeScalar = 1, velScalar = 0.25, minSizeRatio = 0.05, maxSizeRatio = 0.5)`
* x: The starting x position of the particle.
* y: The starting y position of the particle.
* xOfst: An initial x velocity direction.
* yOfst: An initial y velocity direction.
* h: The hue object. e.g. `{current: 100, minH: 50, maxH: 200, hIndex: 2}`
	* current: The current hue of the particle.
	* minH: The minimum hue the particle can have.
	* maxH: The maximum hue the particle can have.
	* hIndex: The index of the hue mode we're currently in. Used primarily by the Helper.
* lifeSpan: The number of frames this particle will last.
* decay: The scalar for how much the velocity decreases each frame.
* sizeScalar: The scale factor for the particle's size.
* velScalar: The scale factor for the particle's velocity.
* minSizeRatio: The minimum size ratio of the particle during it's oscillation in size.
* maxSizeRatio: The minimum size ratio of the particle during it's oscillation in size.

## `update()`

Advance the particle's position, size, and age by 1 frame.

## `draw()`

Draw the particle using p5 functions.

## `getLifeSpan()`

Get the life span of the particle as a number of frames.

## `getDecay()`

Get the velocity decay of the particle.

## `getVelScalar()`

Get the velocity scalar of the particle.

## `setLifeSpan(lifeSpan)`

Set the life span of the particle to `lifeSpan` frames.

## `setDecay(decay)`

Set the velocity decay of the particle to `decay`.

## `setVelScalar(velScalar)`

Set the velocity scalar of the particle to `velScalar`.



# Class NoiseTurbulanceHelper

A helper class that stores and organises a list of particles.
It has functions for updating and drawing the particles.

## `constructor(hModes = [[100, 220], [0, 55], [20, 100], [110, 180], [150, 255]], numParticlesPerFrame = 10, pLifeSpan = 90, pDecay = 0.75, pSizeScalar = 1, pVelScalar = 0.25, pMinSizeRatio = 0.05, pMaxSizeRatio = 0.5)`

* hModes: An array of length-2 arrays containing minimum and maximum hues. Must have at least one element. You can switch modes with `changeHue(index=-1)`.
* numParticlesPerFrame: When creating particles (by holding down left click), this defines how many particle objects to create per frame.

The following arguments are all passed to the constructor of `Particle`:

* pLifeSpan: The life span of the particles we create in frames.
* pDecay: The velocity decay of the particles we create.
* pSizeScalar: The size scalar of the particles we create.
* pVelScalar: The velocity scalar of the particles we create.
* pMinSizeRatio: The minimum size ratio of the particles we create.
* pMaxSizeRatio: The maximum size ratio of the particles we create.

## `getNumParticlesPerFrame()`

Get the number of particles that spawn per frame when the left mouse button is held down.

## `getParticleLifeSpan()`

Get the particle's life span in number of frames.

## `getParticleDecay()`

Get the particle's velocity decay.

## `getParticleSizeScalar()`

Get the particle's size scalar.

## `getParticleVelScalar()`

Get the particle's velocity scalar.

## `getParticleMinSizeRatio()`

Get the particle's minimum size ratio of it's oscillation.

## `getParticleMaxSizeRatio()`

Get the particle's maximum size ratio of it's oscillation.

## `getHueModes()`

Get the hue modes currently set. Look at `setHueModes(hueModes)` for the format of the output.

## `setNumParticlesPerFrame(numParticlesPerFrame)`

Get the number of particles that spawn per frame when the left mouse button is held down.

## `setParticleLifeSpan(pLifeSpan)`

Set the particle's life span in number of frames.

## `setParticleDecay(pDecay)`

Set the particle's velocity decay. This should be a float over 0, and under 1.

## `setParticleSizeScalar(pSizeScalar)`

Set the particle's size scalar.

## `setParticleVelScalar(pVelScalar)`

Set the particle's velocity scalar.

## `setParticleMinSizeRatio(pMinSizeRatio)`

Set the particle's minimum size ratio of it's oscillation, this should be between 0 and 1, and under the maximum size scalar.
It will automatically detect if you are setting a ratio higher than the maximum, and will instead set it equal to the maximum.

## `setParticleMaxSizeRatio(pMax)`

Set the particle's maximum size ratio of it's oscillation, this should be between 0 and 1, and over the minimum size scalar.
It will automatically detect if you are setting a ratio lower than the minimum, and will instead set it equal to the minimum.

## `setHueModes(hueModes)`

Set the hue modes currently set.
The input should be an array of length-2 arrays, where each of the length-2 arrays should hold integers between 0 and 255.
The array should not be empty.
You can then cycle through these modes with `changeHue(index=-1)` or `keyPressed()`.

## `clear()`

Clear the canvas, and destroy all particle objects.
The shortcut for running this method is the `c` key.

## `keyPressed()`

This is a helper method from p5, that should be run when the global `keyPressed()` is run.
By default, `c` clears the screen, and any other key will increment the hue mode.

## `changeHue(index=-1)`

Go to the next hue mode. This can be called by pressing any key (except `c`).
If index is -1, it will go to the next hue mode. Otherwise, it will attempt to set it to the hue mode at the given index.
If the index is out of range, it will have no effect.

## `getHueIndex()`

Get the hue mode index the helper is currently on, as an integer.

## `setup(width, height, renderer)`

This is a helper function from p5, which should be run when the global `setup()` is run.
This function creates the canvas for you with the correct parameters.
You can set the size using `width` and `height`, and optionally set the p5.Renderer of the canvas with the `renderer` argument.

## `draw()`

Draw the current state of particles, and update them once per frame.
If the mouse is pressed, create new particles at a rate of `getNumParticlesPerFrame()`.
Since this is a helper function from p5, this function should be called in a global function called `draw()`.