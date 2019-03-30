# Demo Explained

To start with, here is the full JS code for the demonstration. Don't be spooked; I'll be explaining it below.

```javascript
// -------- P5 FUNCTIONS --------
var pNoise, seed = 759, numParticles = 250, mode, minLife, maxLife = 25, noiseScale, simulationSpeed, paddingY, paddingX, defaultColour, colourL, colourR, submit;

function setup() {
    canvas = createCanvas(windowWidth * 0.4, windowHeight);
    canvas.parent('canvascontainer');
    pNoise = new PerlinNoise(undefined, seed, numParticles, mode, minLife, maxLife, noiseScale, simulationSpeed, paddingY, paddingX, defaultColour, colourL, colourR);
}
function draw() {
    pNoise.draw();
}
function windowResized() {
    canvas.resizeCanvas(windowWidth * 0.4, windowHeight);
}

// -------- SKETCH UPDATING FUNCTIONS --------
/**
 * Update the (live) sketch with new values from the form
 */
function updateSketch() {
    for (i = 0; i < inputs.length; i++) {
        // for every input
        if (inputs[i].className.indexOf('number') !== -1) {
            // for numbers
            if (!isNaN(eval('Number(form.' + inputs[i].name + '.value);'))) {
                // if it's a valid number
                eval('pNoise.setParameter("' + inputs[i].name + '", Number(form.' + inputs[i].name + '.value));');
            }
        }
        else if (inputs[i].className == 'colour') {
            // for colours
            eval('pNoise.setParameter("' + inputs[i].name + '", color(form.' + inputs[i].name + '.value));');
        }
        else if (inputs[i].className !== 'submit-button') {
            // for strings (none implemented in the demo at the moment)
            eval('pNoise.setParameter("' + inputs[i].name + '", form.' + inputs[i].name + '.value);');
        }
    }
}

/**
 * Restart sketch with new values from the form
 */
function restartSketch() {
    for (i = 0; i < inputs.length; i++) {
        // for every input
        if (inputs[i].className.indexOf('number') !== -1) {
            // for numbers
            if (!isNaN(eval('Number(form.' + inputs[i].name + '.value);'))) {
                // if it's a valid number
                eval(inputs[i].name + ' = Number(form.' + inputs[i].name + '.value);');
            }
        }
        else if (inputs[i].className == 'colour') {
            // if it's a colour
            eval(inputs[i].name + ' = color(form.' + inputs[i].name + '.value);');
        }
        else if (inputs[i].className !== 'submit-button') {
            // if it's a string (not used in the current demo)
            eval(inputs[i].name + ' = form.' + inputs[i].name + '.value;');
        }
    }
    setup();
}

/**
 * Add listeners for form submission
 */
document.addEventListener('DOMContentLoaded', function() {
    // once the page is fully loaded
    form = document.getElementById('parameterform');
    inputs = form.getElementsByTagName('input');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        updateSketch();
    });
    document.getElementById('restart-btn').addEventListener('click', function() {
        restartSketch();
    });
});
```

Now, here it is broken down:

## p5 implementation
```javascript
var pNoise, seed = 759, numParticles = 250, mode, minLife, maxLife = 25, noiseScale, simulationSpeed, paddingY, paddingX, defaultColour, colourL, colourR, submit;
```
First of all, I needed to initialise some variables with some values that I found to suit the demonstration. I chose to specify the seed, number of particles and maximum life because the canvas on the demonstration is quite large (hence large number of particles and particle life) and I liked seed `759`.

&nbsp;

```javascript
function setup() {
    canvas = createCanvas(windowWidth * 0.4, windowHeight);
    canvas.parent('canvascontainer');
    pNoise = new PerlinNoise(undefined, seed, numParticles, mode, minLife, maxLife, noiseScale, simulationSpeed, paddingY, paddingX, defaultColour, colourL, colourR);
}
```

When p5 is loaded I need to create a canvas to fill the 40% of the window width, put it in my canvascontainer div so I can place it precisely using CSS, and initialise the `PerlinNoise` class with the values I'd set at the start. I'm using the global p5 canvas so there's no need to pass in a renderer, hence the `undefined` the first parameter.

&nbsp;

```javascript
function draw() {
    pNoise.draw();
}
function windowResized() {
    canvas.resizeCanvas(windowWidth * 0.4, windowHeight);
}
```
Every frame, p5 runs everything in the `draw()` function. The `pNoise` class needs to have its `draw()` function run every frame to update itself, so that's placed inside the global p5 `draw()` function.

As I want to keep this sketch within the left 40% of the window, I also add `resizeCanvas()` to the p5 `windowResized()` function that runs whenever the size of the browser window changes.

&nbsp;

That's the core p5 implementation explained. Read on if you are also interested in how I implemented the form.

&nbsp;

## Form implementation

### updateSketch()
This function is designed to run when the 'Update' button is pressed, or the user submits the form by pressing enter. It reads all the inputs from the form (stored in a list called `inputs`) and applies them using `setParameter`, which is described in `README.md`.

The form (without all the fluff) looks something like this:
```html
<form>
    <input type="text" class="number" name="seed" value="759">
    <input type="text" class="number" name="numParticles" value="250">
    <input type="radio" class="number radio" name="mode" value="0" checked>
    <input type="radio" class="number radio" name="mode" value="1">
    <input type="text" class="number" name="minLife" value="0">
    <input type="text" class="number" name="maxLife" value="20">
    <input type="text" class="number" name="noiseScale" value="200">
    <input type="text" class="number" name="simulationSpeed" value="0.2">
    <input type="text" class="number" name="paddingY" value="30">
    <input type="text" class="number" name="paddingX" value="30">
    <input type="text" class="colour" name="defaultColour" value="#ffffff">
    <input type="text" class="colour" name="colourL" value="#00ffff">
    <input type="text" class="colour" name="colourR" value="#800080">

    <!-- BUTTONS - IRRELEVANT AT THE MOMENT -->
    <input type="submit" class="submit-button" name="submit" value="Update">
    <input type="button" class="submit-button" id="restart-btn" name="restart" value="Restart">
</form>
```
Each form input contains the expected data type in its HTML `class` and the variable name in its `name`. This means that, for each input, I can tell which variable I am dealing with and what type it should be.

So:
```javascript
function updateSketch() {
    for (i = 0; i < inputs.length; i++) {
        // for every input
        if (inputs[i].className.indexOf('number') !== -1) {
            // for numbers
            if (!isNaN(eval('Number(form.' + inputs[i].name + '.value);'))) {
                // if it's a valid number
                eval('pNoise.setParameter("' + inputs[i].name + '", Number(form.' + inputs[i].name + '.value));');
            }
        }
        else if (inputs[i].className == 'colour') {
            // for colours
            eval('pNoise.setParameter("' + inputs[i].name + '", color(form.' + inputs[i].name + '.value));');
        }
        else if (inputs[i].className !== 'submit-button') {
            // for strings (none implemented in the demo at the moment)
            eval('pNoise.setParameter("' + inputs[i].name + '", form.' + inputs[i].name + '.value);');
        }
    }
}
```

So, for every input in `inputs`, we check the `className` to work out what type of value we are dealing with.

&nbsp;
  
If it's a number, we check that the value actually is a number. If it is, we run the following line of code:
```javascript
eval('pNoise.setParameter("' + inputs[i].name + '", Number(form.' + inputs[i].name + '.value));');
```
What this does is create a line of code inside an `eval()` function using the input's name. The code that's being written looks something like, using the `seed` input as an example:
```javascript
pNoise.setParameter("seed", Number(form.seed.value));
```
The code inside `eval()` then gets run by the JavaScript interpreter.\
So, we're running `setParameter` on the `seed` variable, passing in the value contained in the `seed` input from the form.

&nbsp;

Similarly, for colour:
```javascript
eval('pNoise.setParameter("' + inputs[i].name + '", color(form.' + inputs[i].name + '.value));');
```
This is essentially the same as for numbers, except that
- We use `color()` instead of `Number()`
- We don't need to check if what's being passed in is a valid colour. If it's not valid then the p5 `color()` function we're using just returns white, which is acceptable behaviour for this simple demonstration.

&nbsp;

And finally, for other values that just get passed in as strings:
```javascript
eval('pNoise.setParameter("' + inputs[i].name + '", form.' + inputs[i].name + '.value);');
```
The difference here is that the value is just passed straight in without being converted, since form inputs return strings anyway.\
This code actually isn't used in the current version of the demo since all inputs are either `number` or `colour`, but in past versions I had needed this and there was no reason not to leave it in, in case I expanded it in the future.

&nbsp;

### restartSketch()
This function grabs all the values from the inputs, and restarts the sketch with the new values. This is useful when you're changing things like the seed: these changes may take a while to be fully visible after updating because the old value will still be represented in the fading past trails.

Put simply, it updates all the variables that were declared in the first line and then runs `setup()` again, recreating the canvas and re-initialising the class.

```javascript
function restartSketch() {
    for (i = 0; i < inputs.length; i++) {
        // for every input
        if (inputs[i].className.indexOf('number') !== -1) {
            // for numbers
            if (!isNaN(eval('Number(form.' + inputs[i].name + '.value);'))) {
                // if it's a valid number
                eval(inputs[i].name + ' = Number(form.' + inputs[i].name + '.value);');
            }
        }
        else if (inputs[i].className == 'colour') {
            // if it's a colour
            eval(inputs[i].name + ' = color(form.' + inputs[i].name + '.value);');
        }
        else if (inputs[i].className !== 'submit-button') {
            // if it's a string (not used in the current demo)
            eval(inputs[i].name + ' = form.' + inputs[i].name + '.value;');
        }
    }
    setup();
}
```

The structure is similar to [`updateSketch()`](###-updateSketch()) in that it iterates through `inputs`, and evaluates different statements depending on the type it's expecting.

For numbers, if the number is valid, it runs the following:
```javascript
eval(inputs[i].name + ' = Number(form.' + inputs[i].name + '.value);');
```
The expression inside the `eval()` function will return a value similar to the following (again, using seed as an example):
```javascript
seed = Number(form.seed.value);
```
So, in short, this line just sets the `seed` variable to the value of the seed input.

&nbsp;

Again, we do the same for colours and strings as outlined in the documentation for [`updateSketch()`](###-updateSketch()) (with the one change being that we're changing variables rather than calling `setParameter`).

Finally, we call `setup()` which will re-initialise the whole sketch. Since the initialisation of the class inside `setup()` uses the values of the variables we've just updated, it will pull in all the updated values when redrawing the canvas.

&nbsp;

### Setting event listeners
Finally, we need to set the listeners to actually run these functions when the form is submitted.

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // once the page is fully loaded
    form = document.getElementById('parameterform');
    inputs = form.getElementsByTagName('input');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        updateSketch();
    });
    document.getElementById('restart-btn').addEventListener('click', function() {
        restartSketch();
    });
});
```

So, when the `DOMContentLoaded` event fires, signifying that the page is fully loaded, we put the form (identified by the `parameterform` id) into the `form` variable and then get all the inputs inside it stored in the `inputs` array.

Then we set two event listeners:

- One for the form's `submit` event, which fires each time the 'Update' button is clicked or the user hits the Return key on an input
  - Prevent the `POST` request that forms submit by default
  - Run `updateSketch()`
- One for when the user clicks the button with id `restart-btn`
  - Run `restartSketch()`

Once those event listeners are set, the functions `updateSketch()` and `restartSketch()` will be attached to the 'Update' and 'Restart' buttons respectively.

And that's everything!