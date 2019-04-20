
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