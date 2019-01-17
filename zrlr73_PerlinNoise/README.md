# Perlin Trails
Based on [this sketch](https://www.openprocessing.org/sketch/566877) by [Tony R](https://www.openprocessing.org/user/77286), licensed under [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0). Full GitHub repo with development history [here](https://github.com/barnstorm3r/p5coursework).

Perlin Noise is a concept invented by Ken Perlin in 1983. It is a method of generating random textures that appear natural, with adjacent inputs giving similar outputs. It is used in many places, from the Minecraft terrain generator to digital art installations.

![An example of Perlin Noise](https://flafla2.github.io/img/2014-08-09-perlinnoise/raw2d.png)

This p5js sketch, at its core, uses Perlin Noise to direct the particles moving around the canvas, causing them to follow organic shapes (as well as each other) without any communication between particles. The shapes generated can be changed by providing a numeric 'seed' from which the Perlin Noise derives its structure.

#### Files included in this package
- `demo.html`: Webpage demonstrating the sketch with the option to change parameters.
    - Contents of `demo-assets`: Stylesheet and JS code for `demo.html`.
    - `demo_explained.md`: Full explanation of how the demonstration was implemented.
- `LICENSE.txt`: a copy of the [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) license associated with this project.
- `original.js`: The original sketch code, from [the openprocessing sketch](https://www.openprocessing.org/sketch/566877).
- `perlinNoise.js`: The class itself: this is what you want to add to projects that use the sketch.
- `README.md`: This readme.

#### Changes made to the original
- Fix seed: originally was a string (p5js produces the same noise for all strings)
- Refactor sketch into class:
  - Move code from `setup()` & anonymous variable declarations into constructor
  - Remove canvas creation
  - Rename variables more appropriately (eg `nums` -> `numParticles`, `color_from` -> `colourL`)
  - Add support for `p5.Graphics` parameter so sketch can be used as a texture
  - Add parameters:
    - `paddingX`, `paddingY`
    - `minLife`
    - `mode`
    - Colours
  - Parameterise existing variables declared at the start of the function (`noiseScale`, padding, `maxLife`)
- Add new optional mode: particles spawn all over canvas
- Associate all variables with their respective classes so that multiple instances of `PerlinNoise` can run in parallel without interfering with each other
- Add `setParameter()` and `getParameter()` including ability to change parameters (including number of particles) on the fly without restarting
- Refactor particle class:
  - Consolidate `respawn()` and `respawnTop()` into a single `respawn()` function that will decide its behaviour based on parent class's mode
  - Remove unused variables
  - Add `minLife` and made particles have random life lengths in that range outside of first life
    - Adjust early and late-life fading to accommodate these changes

&nbsp;

## A basic implementation
A simple implementation of this sketch would look like the following:

```javascript
var pNoise;

function setup() {
    createCanvas(800, 800);
    pNoise = new PerlinNoise();
}

function draw() {
    pNoise.draw();
}
```

Alongside this code you'd also need to import [p5js](https://p5js.org/) and the sketch yourself using HTML `<script>` tags, for example:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="perlinNoise.js"></script>
```

In the `setup()` function we call `createCanvas(800, 800)` so the sketch has somewhere to draw (specifically a p5js canvas with dimensions of 800px by 800px). We then initialise the class, with no parameters. This means it will resort to its defaults, as described below.

Then, we add to the p5 `draw()` function (which runs every frame) the `draw()` function associated with the sketch. This allows the sketch to generate animated graphics frame-by-frame.

&nbsp;

## Parameters

Below is the parameter order for a `PerlinNoise` definition.

`PerlinNoise(`[`renderer`](###-`renderer`)`,`[`seed`](###-`seed`)`,`[`numParticles`](###-`numParticles`)`,`[`mode`](###-`mode`)`,`[`minLife`](###-`minLife`)`,`[`maxLife`](###-`maxLife`)`,`[`noiseScale`](###-`noiseScale`)`,`[`simulationSpeed`](###-`simulationSpeed`)`,`[`paddingY`](###-`paddingY`)`,`[`paddingX`](###-`paddingX`)`,`[`defaultColour`](###-`defaultColour`)`,`[`colourL`](###-`colourL`)`,`[`colourR`](###-`colourR`)`);`

All parameters are optional. To omit a parameter, simply put `undefined` in its place if you need to use a parameter that appears later in the definition.\
All of these parameters (except `renderer`) can be played with in the HTML demo page included with the script.

&nbsp;

### `renderer`
**Used to pass in an object for the sketch to render to.**\
Type: [p5.Graphics](https://p5js.org/reference/#/p5.Graphics)\
Default: p5 global default canvas\
Recommended range: Existing [p5.Graphics](https://p5js.org/reference/#/p5.Graphics) objects

Passing no value will cause the sketch to render to the global p5 canvas (ie the one created with a simple `createCanvas()` statement) if one has been defined.

&nbsp;

### `seed`
**The seed for use by the Perlin Noise generator.**\
Type: Number\
Default: 1337\
Recommended range: Any number

&nbsp;

### `numParticles`
**The number of particles to show.**\
Type: Number\
Default: 100\
Recommended range: 50-1000

More particles looks prettier but will perform slower. Using a larger canvas, shorter particle lifespan or [mode](###-`mode`) 1 may benefit from more particles to properly fill the drawing area.

&nbsp;

### `mode`
**The mode to use when spawning particles.**\
Type: Number\
Default: 0\
Recommended range: 0-1

Mode 0 will spawn particles only at the top of the sketch (as in the [original project](https://www.openprocessing.org/sketch/566877)) but 1 will spawn them anywhere in the top 70% of the canvas. As the particles tend to travel downwards, weighting their spawnpoints upwards in this way provides an even coverage of the canvas.

&nbsp;

### `minLife`
**The minimum life for a particle, measured in seconds.**\
Type: Number\
Default: 0\
Recommended range: 0-30, less than or equal to [`maxLife`](###-`maxLife`)

### `maxLife`
**The maximum life for a particle, measured in seconds.**\
Type: Number\
Default: 10\
Recommended range: 10-30, more than or equal to [`minLife`](###-`minLife`)

Specifying longer lives may help to fill the canvas more evenly (especially in [mode](###-`mode`) 0) as particles get more time to explore away from their spawnpoints.

&nbsp;

### `noiseScale`
**The scale of the Perlin Noise relative to the pixels on your screen.**\
Type: Number\
Default: 200\
Recommended range: 100-500

A smaller scale will produce more intricate patterns, where a larger one will result in larger, less detailed patterns.

&nbsp;

### `simulationSpeed`
**The speed that particles should travel at.**\
Type: Number\
Default: 0.2\
Recommended range: 0.05-0.3

Higher speeds will cause particle trails to look less consistent, and extremely high speeds make the sketch into an incoherent mess of dots (which, while lovely, is not really the effect that this sketch is going for).

&nbsp;

### `paddingY`
**The padding to put around the inside of the top and bottom of the canvas in pixels.**\
Type: Number\
Default: 30\
Recommended range: 10-100

### `paddingX`
**The padding to put around the inside of the left and right sides of the canvas in pixels.**\
Type: Number\
Default: 30\
Recommended range: 10-100

&nbsp;

### `defaultColour`
**The colour that non-coloured particles should have.**\
Type: [p5.Color](https://p5js.org/reference/#/p5.Color)\
Default: White\
Recommended range: Light colours

Each time a particle spawns, it has a 1/3 chance to be a coloured particle. This is the colour to use for 'default' non-coloured particles.

&nbsp;

### `colourL`
**The colour that coloured particles should have when going left.**\
Type: [p5.Color](https://p5js.org/reference/#/p5.Color)\
Default: Cyan\
Recommended range: Bright colours that complement [`colourR`](###-`colourR`) and [`defaultColour`](###-`defaultColour`)

### `colourR`
**The colour that coloured particles should have when going right.**\
Type: [p5.Color](https://p5js.org/reference/#/p5.Color)\
Default: Purple\
Recommended range: Bright colours that complement [`colourL`](###-`colourL`) and [`defaultColour`](###-`defaultColour`)

&nbsp;

&nbsp;

## Functions

The `PerlinNoise` class comes with three non-constructor functions:
- [`draw(renderer)`](###-`draw(renderer)`)
- [`setParameter(name, value)`](###-`setParameter(name,-value)`)
- [`getParameter(name)`](###-`getParameter(name)`)

They can all be called using `objectName.functionName(parameters)`.\
For example, the `noiseScale` of a `PerlinNoise` object called `pNoise` would be returned by `pNoise.getParameter('noiseScale')`.

&nbsp;

### `draw(renderer)`
**Runs every frame; updates the sketch.**
- `renderer`: The renderer to render the sketch on.
    - Type: [p5.Graphics](https://p5js.org/reference/#/p5.Graphics)
    - Requirement: Optional

This function needs to be placed inside the `draw()` function associated with your p5js sketch. See the [example implementation](##-A-basic-implementation) for a demonstration of how to do this.

If a renderer is given in the constructor, it is not necessary to pass it into `draw()` as well, though that implementation is supported and will work fine. If no renderer is given at all, across both locations, the sketch will be rendered on the default canvas. This is the default behaviour for the class.\
It is not recommended to only pass the renderer into the `draw()` function (ie not pass it into the constructor as well): while the code will still work, this will omit the setup procedures in the class constructor and may cause the sketch to misbehave.

&nbsp;

### `setParameter(name, value)`
**Setter for all parameters.**
- `name`: The name of the parameter to set.
    - Type: String
    - Requirement: Required<br><br>
- `value`: The value to set that parameter to.
    - Type: Dependent on `name` (see below)
    - Requirement: Required

This function allows all parameters that are set in the constructor, except [`renderer`](###-`renderer`), to be changed on the fly. Changes should take effect instantly, without any need to restart the sketch.

Variables that can be changed:

| `name`              | Type expected in `value`                            |
| ------------------- | --------------------------------------------------- |
| `'seed'`            | Number                                              |
| `'numParticles'`    | Number                                              |
| `'mode'`            | Number                                              |
| `'minLife'`         | Number                                              |
| `'maxLife'`         | Number                                              |
| `'noiseScale'`      | Number                                              |
| `'simulationSpeed'` | Number                                              |
| `'paddingY'`        | Number                                              |
| `'paddingX'`        | Number                                              |
| `'defaultColour'`   | [`p5.Color`](https://p5js.org/reference/#/p5.Color) |
| `'colourL'`         | [`p5.Color`](https://p5js.org/reference/#/p5.Color) |
| `'colourR'`         | [`p5.Color`](https://p5js.org/reference/#/p5.Color) |

&nbsp;

### `getParameter(name)`
**Getter for all parameters.**
- `name`: The name of the parameter to get.
    - Type: String
    - Requirement: Required

This function will return the value in the parameter given in `name`. Unlike [`setParameter()`](###-`setParameter(name,-value)`) it also can deal with the [`renderer`](###-`renderer`) variable.

Variables that can be got:

| `name`              | Type returned                                             |
| ------------------- | --------------------------------------------------------- |
| `'renderer'`        | [`p5.Graphics`](https://p5js.org/reference/#/p5.Graphics) |
| `'seed'`            | Number                                                    |
| `'numParticles'`    | Number                                                    |
| `'mode'`            | Number                                                    |
| `'minLife'`         | Number                                                    |
| `'maxLife'`         | Number                                                    |
| `'noiseScale'`      | Number                                                    |
| `'simulationSpeed'` | Number                                                    |
| `'paddingY'`        | Number                                                    |
| `'paddingX'`        | Number                                                    |
| `'defaultColour'`   | [`p5.Color`](https://p5js.org/reference/#/p5.Color)       |
| `'colourL'`         | [`p5.Color`](https://p5js.org/reference/#/p5.Color)       |
| `'colourR'`         | [`p5.Color`](https://p5js.org/reference/#/p5.Color)       |