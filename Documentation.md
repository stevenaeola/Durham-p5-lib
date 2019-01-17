<font color=brown size=72>Documentation Of Assignment</font>

# Introduction

This assignment is aimed to grasp the ability to apply principles of abstraction and modeling. 
Implement: Choose a sketch from [openprocessing.org](openprocessing.org) and adapt it into a reusable component using JavaScript classes with appropriate constructor, get and set methods for properties, draw method via. p5.Renderer. Finally, build an example page with properties controlled by form controls.

# Explanation of Code

## line.js

Define class

> class lines

Class defined method

> constructor

Parameters defined
> x,y,r,a,av, colour

Set method 
> setColour(colour) to set the colour of background

Set method

> setFills(fills) to set the numbers of fills

Set method

> setFrameRate(frameRate) to set the rate of frame

Write method

> draw() method to establish the pattern

Construct  ellipse

> ellipse(tx, ty, 3, 3)

## index.js

Define global variable b

> used to run class method

Function setup()

> used to create Canvas, the field showed on the browser

Function randomSeed()

> randomly select starting seed of pattern

Function draw()

> main function to run pattern creation by var b

DOM function

> type-set format of codes

## line.html

Head setting

> normative reference from p5.library and person files

Body setting

> fills and frameRate settings
> use numbers to control elements

# File Zip

> line.js

> index.js

> line.html

> README.md

> LICENSE.md

# Explanation of Example

> The example is re-write from openprocessing.org in JavaScript and HTML. Open the HTML file by the browser and you will see two "fills settings" and "frameRate settings" input field in sections. These are used to change fills and framerate you execute in the pattern. The pattern will be showing at the bottom in 600*600 pixels.


# Source of initial Code Acknowledged

> "Bezier trace 02" by Polyminoteshttp://www.openprocessing.org/sketch/469986
>  Licensed under Creative Commons Attribution 
>  ShareAlikehttps://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/
>  License: <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
>  *This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.






