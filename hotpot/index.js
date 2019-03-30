var a;

alert("Input both X, Y-axis value, and press the button to start. Have fun playing around!:)");
function setup() {
	createCanvas(windowWidth, windowHeight);

}

function draw2() {
	a = new dome();
	//x-axis value of original point
	var x = document.getElementById("colour");
	a.setXSpeed(parseInt(x.value));
	//y-axis value of original point
	var y = document.getElementById("radius");
	a.setYSpeed(parseInt(y.value));
	a.draw();
}