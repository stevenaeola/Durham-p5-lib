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

