var b; 


function setup() {
	b =new Pattern();
	createCanvas(600,600);
	b.setColour();

}

function draw(graphic){
	if(graphic){
		graphic.b.draw();
	}
	else{
		b.draw();
	}
}
	

document.addEventListener("DOMContentLoaded", function(){

    var va1 = document.getElementById("colour");

    function changeColour(event){

	var colour = document.getElementById("colour").value;

	b.setColour(colour);

    }

    

    va1.addEventListener("change", changeColour);



    var va2 = document.getElementById("colour_form");



    va2.addEventListener("submit", function (event){

	event.preventDefault()});

});

document.addEventListener("DOMContentLoaded", function(){

    var va3 = document.getElementById("radiusConstant");

    function changeRadiusConstant(event){

	var radiusConstant = document.getElementById("radiusConstant").value;

	b.setRadiusConstant(radiusConstant);

    }

    

    va3.addEventListener("change", changeRadiusConstant);



    var va4 = document.getElementById("radiusConstant_form");



    va4.addEventListener("submit", function (event){

	event.preventDefault()});

});
document.addEventListener("DOMContentLoaded", function(){

    var va5 = document.getElementById("appearanceConstant");

    function changeAppearanceConstant(event){

	let appearanceConstant = document.getElementById("appearanceConstant").value;

	b.setAppearanceConstant(appearanceConstant);

    }

    

    va5.addEventListener("change", changeAppearanceConstant);



    var va6 = document.getElementById("appearanceConstant_form");



    va6.addEventListener("submit", function (event){

	event.preventDefault()});

});
	