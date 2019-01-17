var b;


function setup(){
    b = new line();
    createCanvas(600, 600);

    b.setColour();
    b.setFills();
    b.setFrameRate();

    randomSeed(99);

    blendMode(ADD);



}

function draw(){
        b.draw();

}

document.addEventListener("DOMContentLoaded", function(){

    var cc = document.getElementById("colour");
    function changeColour(event){
        let colour = document.getElementById("colour").value;
        b.setColour(colour);
    }

    var r1 = document.getElementById("fills");
    function changeFills(event){
        let fills = document.getElementById("fills").value;
        b.setFills(fills);
    }

    r1.addEventListener("input", changeFills);

    var r2 = document.getElementById("frameRate");
    function changeFrameRate(event){
        let frameRate = document.getElementById("frameRate").value;
        b.setFrameRate(frameRate);
    }

    r2.addEventListener("input", changeFrameRate);



    cc.addEventListener("change", changeColour);


    var cf = document.getElementById("colour_form");

    cf.addEventListener("submit", function (event){
        event.preventDefault()});
});