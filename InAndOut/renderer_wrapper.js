// Wrapper functions to enable use of optional renderer in sketch.js
function w_strokeWeight(weight, r=undefined) {
	if (r==undefined) {
		strokeWeight(weight);
	}
	else {
		r.strokeWeight(weight);
	}
}

function w_translate(d_x, d_y, r=undefined) {
	if (r==undefined) {
		translate(d_x, d_y);
	}
	else {
		r.translate(d_x, d_y);
	}
}

function w_rotate(theta, r=undefined) {
	if (r==undefined) {
		rotate(theta);
	}
	else {
		r.rotate(theta);
	}
}

function w_stroke(colour, r=undefined) {
	if (r==undefined) {
		stroke(colour);
	}
	else {
		r.stroke(colour);
	}
}

function w_line(s_x, s_y, e_x, e_y, r=undefined) {
	if (r==undefined) {
		line(s_x, s_y, e_x, e_y);
	}
	else {
		r.line(s_x, s_y, e_x, e_y);
	}
}