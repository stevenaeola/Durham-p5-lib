
var myline;

function setup () {
	pixelDensity (displayDensity ());
	createCanvas (windowWidth, windowHeight);
	background (255);
	colorMode (RGB, 255, 255, 255, 100);
	myline = new MyLine()
	fill (0);
	textSize (12);
	textAlign (LEFT, TOP);
	text ("drag the screen", 20.0, 20.0);
}

function draw () {
	myline.draw()
}

function mousePressed () {
	myline.dragging = true;
}

function mouseReleased () {
	myline.dragging = false;
}

window.onload = function(){
	document.getElementsByClassName("submit")[0].addEventListener("click", function(){
		point_count = parseInt(document.getElementsByClassName('point_count')[0].value)
		tmp_count = parseInt(document.getElementsByClassName('tmp_count')[0].value)
		rad = parseFloat(document.getElementsByClassName('rad')[0].value)
		offset = parseFloat(document.getElementsByClassName('offset')[0].value)
		dragging = document.getElementsByName('dragging')[0].checked == true
		myline.setProperties(point_count,tmp_count,rad,offset,dragging)
		console.log('getPointCount:', myline.getPointCount())
		console.log('getTmpCount:',myline.getTmpCount())
		console.log('getRad:',myline.getRad())
		console.log('getOffset:',myline.getOffset())
		console.log('getDragging:',myline.getDragging())
	});
}

