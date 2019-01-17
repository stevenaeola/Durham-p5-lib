var b;
function setup() {
    createCanvas(windowWidth-50, windowHeight-50);
    noStroke();
    fill(random(255), random(255), random(204));
    rectMode(CENTER);
    b = new Game();
}

function draw() {
    background(204,255, 229);
    b.draw();
}

document.addEventListener("DOMContentLoaded", function() {
    var x = document.getElementById("xspeed");
    function changeXSpeed(event){
        let xspeed = parseFloat(document.getElementById("xspeed").value);
        b.setXSpeed(xspeed);
    }

    x.addEventListener("change", changeXSpeed);


    var y = document.getElementById("yspeed");
    function changeYSpeed(event){
        let yspeed = parseFloat(document.getElementById("yspeed").value);
        b.setYSpeed(yspeed);
    }

    y.addEventListener("change", changeYSpeed);



});