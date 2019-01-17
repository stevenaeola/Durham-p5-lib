var point_list = [];
// var point_count;
// var tmp_count;
var mx, my;
var amp;
// var rad;
// var offset;
// var dragging;

class MyLine{
	constructor(point_count,tmp_count,rad,offset,dragging){
		this.point_count = point_count || 0;
		this.tmp_count = tmp_count || 0;
		this.rad = rad || 0.0;
		this.offset = offset || 0.0;
		this.dragging = dragging || false;
	}

	setProperties(point_count,tmp_count,rad,offset,dragging){
		this.point_count = point_count
		this.tmp_count = tmp_count
		this.rad = rad
		this.offset = offset
		this.dragging = dragging
	}

	getPointCount(){
		return this.point_count
	}

	getTmpCount(){
		return this.tmp_count
	}

	getRad(){
		return this.rad
	}

	getOffset(){
		return this.offset
	}

	getDragging(){
		return this.dragging
	}

	setPointCount(point_count){
		this.point_count = point_count
	}

	setTmpCount(tmp_count){
		this.tmp_count = tmp_count
	}

	setRad(rad){
		this.rad = rad
	}

	setOffset(offset){
		this.offset = offset
	}

	setDragging(dragging){
		this.dragging = dragging
	}

	draw(){
		if (this.dragging == true) {
			amp = map (noise (this.offset), 0.0, 1.0, 0.0, 200.0);
			mx = mouseX + amp * cos (this.rad);
			my = mouseY + amp * sin (this.rad);
			if (this.point_count > 0) {
				var p = point_list[this.point_count - 1];
				if (dist (mx, my, p.x, p.y) > 1) {
					point_list.push (new p5.Vector (mx, my));
				}
			} else {
				point_list.push (new p5.Vector (mx, my));
			}
			this.point_count = point_list.length;
			this.rad += 0.1;
			this.offset += 0.01;
		}
		strokeWeight (1);
		strokeCap (ROUND);
		noFill ();
		if (this.tmp_count < this.point_count) {
			for (var i = 0; i < this.point_count; i++) {
				var p01 = point_list[i];
				var p02 = point_list[this.point_count - 1];
				var distance = p5.Vector.dist (p01, p02);
				var alpha = pow (140.0 / (distance + 1.0), 1.5);
				if (distance < 150.0) {
					stroke (0, alpha);
					line (p01.x, p01.y, p02.x, p02.y);
				}
			}
			this.tmp_count += 1;
		}
	}
}
