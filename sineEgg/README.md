# SineEgg

## Constructor

```javascript
var i = new sineEgg(theta, stroke, weight, density, freq, length, overdrive);

function setup() {
	i.setup(target, size);
}

function draw() {
 	i.draw();
}
```

| Parameters     | Type          | Optional|Default| Purpose                                   |
| ------------- |:-------------:| :--------:|:-----: |:-----------------------------------------:|
| theta         | float         |    Yes   | 0.20  |Wave angle multiplier                     | 
| stroke        | string        |    Yes   | #2234C9|Stroke colour in hex value	              |
| weight        | int           |    Yes   |  2     |Stroke thickness                         |
| density       | int           |    Yes   |  235   |Wave density                             |
| freq          | int           |    Yes   |  3     |Wave frequency                           |
| length        | int           |    Yes   |  34    |Length of the wave                       |
| overdrive     | int           |    Yes   |  10    |Initial overdrive amount                 |

See a detailed explaination of the parameters further down in this readme.

## Methods

```javascript
setup(target, size)
draw()
```

### Setup

```javascript
setup(target, size)

```

To be called in the global p5.js `setup` function, accepts arguments for `target` and `size`. Sets up the canvas, size and binds to a HTML element if `target` parameter has been supplied, otherwise it falls back to default p5.js behaviour.

| Arguments     | Type          | Optional|Default| Purpose                                   |
| ------------- |:-------------:| :--------:|:-----: |:-----------------------------------------:|
| target        | string        |    Yes   |none (default p5.js behaviour)  |Class selector for div to render canvas in|
| size          | int           |    Yes   | 600   |Canvas size                               |

### Draw

```javascript
draw()
```

To be called in the global p5.js `draw` function, accepts no arguments. Draws the sketch and modifies the wave on each frame.

### Getters & setters
```javascript
get[Parameter]
set[Parameter](value)
```

Getters and setters exist for each parameter _except_ `theta` as the theta value can only be set on creation. Get and set methods follow the above format. They allow for inputs as specified by the table in the Constructor section, with one exception.

***Exception: Overdrive***
```javascript
i.setOverdrive(true);
```
`setOverdrive();` only accepts a boolean value to either enable or disable overdrive.

## Example

The example page lets you manipulate the parameters of the p5.js sketch with form controls. Using the default behaviour of p5.js `Loop()` function, the next frame is redrawn based on the updated parameters. It displays the current values under each input, and the sliders are stepped and limited to prevent the user from adjusting the arguments to a point where the simulation breaks or goes too crazy.

## Parameters

### Theta
Controls the angle used to calculate the wave. This can only be set when the sineEgg object is created for the first time.

### Stroke
Sets the colour of the stroke used to draw each wave. Only accepts colours in hexadecimal values.

### Weight
Controls the thickness of each stroke.

### Density
Controls the density of waves, and in turn the size of the egg. Yields some interesting results at higher values.

### Freq
Sets the frequency of each wave, higher values give the appearance of longer waves.

### Length
Determines when a wave is cropped, essentially "zooms in" on the waveform itself.

### Overdrive
Dramatically increases the multiplier of each wave.


## Suggested improvements
* Add modulated audio using P5.audio based on the `freq` variable
* Allow user to toggle between pre-set states through form controls
* Fetch the current values of each input using a getter instead of relying on HTML attributes

## License
```
"SineEgg" by cwmdo (this repo)
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/

"Wave Circle" by Alek & Co
http://www.openprocessing.org/sketch/427417
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/

"JScolor" by Jan Odvárko
http://jscolor.com
Licensed under GNU GPL licence v3
http://www.gnu.org/licenses/gpl-3.0.txt
```
