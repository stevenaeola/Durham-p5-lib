//links html rgb sliders to js
let rSlider = document.getElementById("Red");
let Routput = document.getElementById("RedD");
let gSlider = document.getElementById("Green");
let Goutput = document.getElementById("GreenD");
let bSlider = document.getElementById("Blue");
let Boutput = document.getElementById("BlueD");

//performs live updates of r,g,b slider values
Routput.innerHTML = rSlider.value;
rSlider.oninput = function() {
	Routput.innerHTML = this.value;
};

Goutput.innerHTML = gSlider.value;
gSlider.oninput = function() {
	Goutput.innerHTML = this.value;
};

Boutput.innerHTML = bSlider.value;
bSlider.oninput = function() {
	Boutput.innerHTML = this.value;
};

//calls Particles class, intiialising it
function setup(){
	particles = new Particles(500,500,500,false);
	particles.init();
}

// draws particle effect
function draw(){
	particles.draw();
}
