# 'Perlin Noise' Particle Animation Object Documentation #
## Description ##
Animation in p5 that creates particles, of 3 different colours, on the canvas which moves around 
the screen. Optional parameters are RGB colours of each group, number and speed of particles.
---
## Arguments ##
#### constructor(a, b, c, n, s) 
Inititalises the Sketch class.
```
	a: An array of the RBG colour for particles in group A. Default = ["69", "33", "124"]
	b: An array of the RBG colour for particles in group B. Default = ["7", "153", "242"]
	c: An array of the RBG colour for particles in group C. Default = ["255", "255", "255"]
	n: Integer for the number of particles for each colour group. Default = 200
	s: Float for the speed of each particle. Default = 4 
```
#### draw()
Draws the particles.
---
## Example HTML page ##
The example page contains a control panel on the top of the page and a canvas below where the
sketch with the particular inputs specified by the control panel is run.

## License
```
"perlin noise" by yasai
http://www.openprocessing.org/sketch/494102
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/
```