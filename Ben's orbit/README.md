_Author:_ Ben Harries

Adapted from Orbits by **Santiago Fiorino** https://www.openprocessing.org/sketch/567018

_Licence:_ Creative Commons Attribution ShareAlike https://creativecommons.org/licenses/by-sa/3.0/legalcode

# Methods and Parameters in my sketch 'Orbits'

(my original code began with one class already for just the 'Planet's I went on to make the whole 'Solar' system a class)

## In my `class Solar`

- `constructor`: It takes the parameters width, height, traceOrbit, traceOrbit2 and rSun with their respective values as defaults to be referenced by the methods below. It then sets up 3 arrays (planets, planetsB and planets T) for the object (in this case 'solar') which will contain the planets which are created by the user.

- `setup`: Takes no arguments and defines the starting environment:
  - A canvas of width and height 500
  - An optional graphic/texture of the same dimension
  - A first 'Planet object 'planet'' which has parameters of colour: "red", radius: 40, speed: 0.002
- `draw`: is a method that performs all the displaying of the solar system as well as the 'noise' that is on top of the canvas (it may take the _parameter_ `g` in which case it draws onto the graphic/texture called `g` instead of the canvas). This `draw` is called by the `function draw` in main.js so that when draw is constantly rendering my draw in the class solar is always being called.

- `printTrace`: Takes no arguments and creates the 'orbit ring'

- `reset`: Takes no arguments and makes the array 'planets' for that solar system back to empty therefore deleting all planets that were previously in it

- `makeNoise`: Takes no arguments and makes the sytle of the sketch have an old feel to it by putting lots of small white and grey particles over the canvas

- `newPlanet`: retrieves via `getElementbyId('colour') ... /('radius')` the value of form control labelled in the sketch as 'Colour' and 'Radius' respectively and sets them to `planet_colour` and `planet_radius` respectively. It then makes a `new Planet` with these as two of the parameters. This `Planet` is my next `class`
  The other parameters are `speed` (set elsewhere as a value between 0.0004 and 0.0007) and `x` and `y` both set to 0.

- `printHalfSun`: Takes the argument top in which case and makes a black arc as one half of the sun at the top. Else it makes a black arc at the bottom of the sun

## In `class Planet`

- `constructor`: takes the parameter `x, y, radius, speed, colour` which are the x and y coordiates, the speed and colour of the planet object defined by the class Planet
- `getColour` and `setColour`: defines my computed property 'colour' and then allows planet.colour to have this colour. Checks this is right kind of property.

- `getRadius` and `setRadius`: " " " " 'radius' and then allows planet.radius to have this radius. Checks this is right kind of property.

- `getSpeed` and `setSpeed`: " " " " 'speed' and then allows planet.speed to have this speed. Checks this is right kind of property.

(property returned by get... and becomes argument for set...)

- `setChords`: gives the coordinates for every planet in the Solar system and is called by draw. It takes the parameters (millis, rOrbit, rOrbit2).

- `display`: global method that is the most important as it creates the actual circle with the right this.colour from the constructor

- `overLapping`: checks whether there are two Planets overlapping and send them to a different array so they swapp arrangements

# Explanation of Example

_Check the explanatory gif_

![](Explanation.gif)
