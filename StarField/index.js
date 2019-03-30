var s;

function setup(starDensity, planetDensity, maxSpeed, objectLabelling, drawCube, drawSphere) {
    s = new StarField(starDensity, planetDensity, maxSpeed, objectLabelling, drawCube, drawSphere);
}

function draw(g) {
    s.draw(g);
}
