// javascript page that uses the sketch as a p5.Renderer
var rlet;
var ring;
// creates a new Ringlet object then creates the sketch as a Graphic called ring which will be used as the texture
function setup(){
    rlet = new Ringlet;
    var canvas = createCanvas(windowWidth*0.5, windowHeight, WEBGL);
    canvas.parent('holder');
    ring = createGraphics(700,700);
    rlet.createRings(rlet.NumberOfRings,ring);
}
// calls the draw function of the Ringlet object
function draw(){
    rlet.draw(ring);
}
// if the window is resized change the size of the canvas to fit
function windowResized() {
    resizeCanvas(windowWidth*0.5, windowHeight);
}
// handles all of the forms
document.addEventListener('DOMContentLoaded', function () {

    var numberOfRings = document.getElementById('number_of_rings');
    function changeRingNumber(event){
        let numberOfRings = document.getElementById('number_of_rings').value;
        rlet.setRingNumber(numberOfRings);
        rlet.createRings(numberOfRings);
    }
    numberOfRings.addEventListener('change', changeRingNumber);
    var numberOfRingsForm = document.getElementById('number_of_rings_form');
    numberOfRingsForm.addEventListener('submit', function (event){event.preventDefault();});

    var diameterOfRings = document.getElementById('diameter_of_rings');
    function changeDiameter(event){
        let diameterOfRings = document.getElementById('diameter_of_rings').value;
        rlet.setDiameter(diameterOfRings);
    }
    diameterOfRings.addEventListener('change', changeDiameter);
    var diameterOfRingsForm = document.getElementById('diameter_form');
    diameterOfRingsForm.addEventListener('submit', function (event){event.preventDefault();});

    var tiltOfRings = document.getElementById('tilt_of_rings');
    function changeTilt(event){
        let tiltOfRings = document.getElementById('tilt_of_rings').value;
        rlet.setTilt(tiltOfRings);
    }
    tiltOfRings.addEventListener('change', changeTilt);
    var tiltOfRingsForm = document.getElementById('tilt_form');
    tiltOfRingsForm.addEventListener('submit', function (event){event.preventDefault();});

    var numberOfSets = document.getElementById('number_of_sets');
    function changeNumberOfSets(event){
        let numberOfSets = document.getElementById('number_of_sets').value;
        rlet.changeNumberOfSets(numberOfSets);
    }
    numberOfSets.addEventListener('change', changeNumberOfSets);
    var numberOfSetsForm = document.getElementById('number_of_sets');
    numberOfSetsForm.addEventListener('submit', function (event){event.preventDefault();});

    var speedOfRings = document.getElementById('speed_of_rings');
    function changeSpeed(event){
        let speedOfRings = document.getElementById('speed_of_rings').value;
        rlet.setSpeed(speedOfRings);
    }
    speedOfRings.addEventListener('change', changeSpeed);
    var speedOfRingsForm = document.getElementById('speed_of_rings_form');
    speedOfRingsForm.addEventListener('submit', function (event){event.preventDefault();});

    var backgroundColour = document.getElementById('bkg_colour');
    function changeBackColour(event){
        let backgroundColour = document.getElementById('bkg_colour').value;
        rlet.setBackgroundColour(backgroundColour);
    }
    backgroundColour.addEventListener('change', changeBackColour);
    var backgroundColourForm = document.getElementById('bkg_colour_form');
    backgroundColourForm.addEventListener('submit', function (event){event.preventDefault();});

    var insideColour= document.getElementById('colour_inner');
    function changeInnerColour(event){
        let insideColour = document.getElementById('colour_inner').value;
        rlet.setInnerColour(insideColour);
    }
    insideColour.addEventListener('change', changeInnerColour);
    var insideColourForm = document.getElementById('colour_inner_form');
    insideColourForm.addEventListener('submit', function (event){event.preventDefault();});

    var outsideColour = document.getElementById('colour_outer');
    function changeOuterColour(event){
        let outsideColour = document.getElementById('colour_outer').value;
        rlet.setOuterColour(outsideColour);
    }
    outsideColour.addEventListener('change', changeOuterColour);
    var outsideColourForm = document.getElementById('colour_outer_form');
    outsideColourForm.addEventListener('submit', function (event){event.preventDefault();});
});
