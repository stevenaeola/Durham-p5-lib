var sp;
var par;

function setup() {
	sp=new setpp();
 	sp.drawSetpp(); 
}

function draw() {
 	par.drawrun(); 
}

document.addEventListener("DOMContentLoaded", function(){

    var cc = document.getElementById("colour");

    function changeColour(event){

	    let colour = document.getElementById("colour").value;

	    sp.setColor(colour);

    }

    

    cc.addEventListener("change", changeColour);



    var cf = document.getElementById("colour_form");



    cf.addEventListener("submit", function (event){

	event.preventDefault()});

});