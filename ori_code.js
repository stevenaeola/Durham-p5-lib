var point_list = [];
var point_count;
var tmp_count;
var mx, my;
var amp;
var rad;
var offset;
var dragging;
function setup () {
	pixelDensity (displayDensity ());
	createCanvas (windowWidth, windowHeight);
	background (255);
	colorMode (RGB, 255, 255, 255, 100);
	point_count = 0;
	tmp_count = 0;
	rad = 0.0;
	offset = 0.0;
	dragging = false;
	fill (0);
	textSize (12);
	textAlign (LEFT, TOP);
	text ("drag the screen", 20.0, 20.0);
}
function draw () {
	if (dragging == true) {
		amp = map (noise (offset), 0.0, 1.0, 0.0, 200.0);
		mx = mouseX + amp * cos (rad);
		my = mouseY + amp * sin (rad);
		if (point_count > 0) {
			var p = point_list[point_count - 1];
			if (dist (mx, my, p.x, p.y) > 1) {
				point_list.push (new p5.Vector (mx, my));
			}
		} else {
			point_list.push (new p5.Vector (mx, my));
		}
		point_count = point_list.length;
		rad += 0.1;
		offset += 0.01;
	}
	strokeWeight (1);
	strokeCap (ROUND);
	noFill ();
	if (tmp_count < point_count) {
		for (var i = 0; i < point_count; i++) {
			var p01 = point_list[i];
			var p02 = point_list[point_count - 1];
			var distance = p5.Vector.dist (p01, p02);
			var alpha = pow (140.0 / (distance + 1.0), 1.5);
			if (distance < 150.0) {
				stroke (0, alpha);
				line (p01.x, p01.y, p02.x, p02.y);
			}
		}
		tmp_count += 1;
	}
}
function mousePressed () {
	dragging = true;
}
function mouseReleased () {
	dragging = false;
}