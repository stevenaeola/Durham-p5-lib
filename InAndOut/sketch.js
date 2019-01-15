var i;
var cnv;
function setup()
{
	cnv = createCanvas(window.innerWidth*0.75, window.innerHeight*0.95);
	cnv.parent("canvas");
	i = new InAndOut();
	frameRate(60);
}

function draw()
{
	// Clear screen
	cnv.background(255);
	// Draw box around canvas
	cnv.stroke(0);
	cnv.strokeWeight(1);
	rect(0, 0, window.innerWidth*0.75 - 1, window.innerHeight*0.95 - 1);
	i.draw(cnv); // Call object draw
}

function windowResized() {
	resizeCanvas(window.innerWidth * 0.75, window.innerHeight);
}

// Event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
	// Get element objects
	var xp = document.getElementById("x");
	var yp = document.getElementById("y");
	var len = document.getElementById("length");
	var lvl = document.getElementById("level");
	var col = document.getElementById("colour");
	var colf = document.getElementById("colour_fade");
	var lw = document.getElementById("line_weight");
	var at = document.getElementById("animation_time");
	var mt = document.getElementById("master_time");+

	// Event listener for each input field
	xp.addEventListener("input", function(event){i.set_x_pos(parseInt(document.getElementById("x").value));});
	yp.addEventListener("input", function(event){i.set_y_pos(parseInt(document.getElementById("y").value));});
	len.addEventListener("input", function(event){i.set_length(parseInt(document.getElementById("length").value));});
	lvl.addEventListener("input", function(event){i.set_level(parseInt(document.getElementById("level").value));});
	col.addEventListener("input", function(event){i.set_colour(col.value.split(",").map(function(_) {return parseInt(_);}));});
	colf.addEventListener("input", function(event){i.set_colour_fade(colf.value.split(",").map(function(_) {return parseInt(_);}));});
	lw.addEventListener("input", function(event){i.set_line_weight(parseInt(document.getElementById("line_weight").value));});
	at.addEventListener("input", function(event){i.set_animation_time(parseInt(document.getElementById("animation_time").value));});
	mt.addEventListener("input", function(event){i.set_master_rotate(parseInt(document.getElementById("master_time").value));});

	// Override default form submission behaviour
	var cf = document.getElementById("form");
	cf.addEventListener("submit", function(event){
		event.preventDefault();
	});
});