/* eslint no-undef: 0 */
// Most of this is by Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// I added the functionality to make the particles change into another text and changed the positioning of the text to always be in the middle of the canvas

//Temporary variable used to contain the text string
var hello;

//Temporary for tests
function setup()
{
    canvas = createCanvas(300, 300);
    canvas.parent('sketch-holder');
    hello = new PointText(width/2, height/2, 'Edit Me!', 80, 0.2, 3, 'point', '#FE5F55');
}

//Temporary for tests
function draw()
{
    background(0);
    hello.draw();
}

function changeAll()
{
    hello.setText(document.getElementById('text').value);
    hello.setType(document.getElementById('particleType').value);
    hello.setFontSize(document.getElementById('fontSize').value*1.3);
    hello.setParticleSize(document.getElementById('particleSize').value/50);
    hello.setColor(document.getElementById('color').value);
    hello.setParticleDensity(document.getElementById('particleDensity').value/100);
}
