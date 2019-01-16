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
```
```
---
## Example HTML page ##
```
The example page contains a control panel on the top of the page and a canvas below where the sketch with the particular inputs specified by the control panel is run.

In the control panel each paricle group has a set of 3 sliders to customise the colour for the particles in that particular group.
A box next to the sliders for each group shows the RGB colour that has been created.

There is a slider to control the number of particles for each colour group that increments in a step of 10 (Min: 10, Max: 1000).
There is a slider to control the speed of each particles that increments in a step of 0.1 (Min: 0.1, Max: 3).

There is a Reload button which will take the user inputs and pass them through as parameters to the Sketch class and will then reload the canvas.
```

## License
```
"perlin noise" by yasai
http://www.openprocessing.org/sketch/494102
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/
```