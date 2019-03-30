var wave;

function setup() {
    createCanvas(1000,700);
    background(0);  
    wave = new Wave;
}

function draw() {
    wave.draw();
    wave.click();
}

document.addEventListener("DOMContentLoaded", function(){
    var cc = document.getElementById("color");
    
    function changeColor(event){
	   let color = document.getElementById("color").value;
	   wave.setColor(color);
    }
    
    cc.addEventListener("change", changeColor);
    
    
    var cf = document.getElementById("color_form");
    cf.addEventListener("submit", function (event){
    event.preventDefault()});
});