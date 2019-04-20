class InAndOut {
	constructor(x_pos=40, y_pos=460, length=460, level=100, colour=[0,0,0], colour_fade=[0,0,0], line_weight=1, animation_time=6000, master_rotate=0) {
		/*
        InAndOut.constructor() arguments:
        x_pos = x position of bottom left corner of triangle. Default = 40
        y_pos = y position of bottom left corner of triangle. Default = 460
        length = Size of one side of triangle. Default = 460
        level = Recursion Depth of Triangles. Default = 100
        colour = Triangle Line colour. Default = [0, 0, 0]
        colour_fade = Add value to colour elementwise every recursive call. Default = [0, 0, 0]
        line_weight = Thickness of drawn line. Default = 1
        animation_time = Time for one complete loop of the animation in milliseconds. Default = 6000
        master_rotate = Rotational speed for entire object. Default = 0
      */
		this.x_pos = x_pos;
		this.y_pos = y_pos;
		this.length = length;
		this.level = level;
		this.colour = colour;
		this.colour_fade = colour_fade;
		this.line_weight = line_weight;
		this.animation_time = animation_time;
		this.master_rotate = master_rotate;
	}

	draw(r=undefined)
	{
		/*
      	Call this function in the p5 draw() master function in order to draw and update the InAndOut object every frame.
    	*/
		let colour = this.colour; 
		w_strokeWeight(this.line_weight, r); // Set thickness of the line
		let animation_ratio = 2*PI/this.animation_time; // Determine value to multiply ratio by. PI/time

		// Translate to centre of screen and then rotate before then translating back to origin.
		// Only rotate if master rotate enabled to save time
		if (this.master_rotate > 0) {
			w_translate(this.x_pos+this.length/2, this.y_pos - 0.5*(this.length/2 * tan(PI/3)), r);
			w_rotate(2*PI/this.master_rotate*millis(), r);
			w_translate(-(this.x_pos+this.length/2), -this.y_pos + 0.5*(this.length/2 * tan(PI/3)), r);
		}

		// Get starting values at start of frame
		let ax = this.x_pos + this.length;
		let ay = this.y_pos;
		let bx = this.x_pos;
		let by = this.y_pos;
		let ratio = (sin(animation_ratio*millis()%(2*PI))+1)/2; // Calculate ratio to multiply by each iteration

		for (var l = 0; l < this.level; l++) { // Loop for "recursion depth"
			w_stroke(colour, r); // Set stroke colour to new value (for colour fade updating)

			// Calculate c point coordinates
			let vx=bx-ax;
			let vy=by-ay;
			let nx=cos(PI/3)*vx-sin(PI/3)*vy;
			let ny=sin(PI/3)*vx+cos(PI/3)*vy;
			let cx=ax+nx;
			let cy=ay+ny;

			// Draw triangle
			w_line(ax,ay,bx,by, r);
			w_line(ax,ay,cx,cy, r);
			w_line(cx,cy,bx,by, r);

			// Store ratio applied cooridnates in temporary values
			let _ax = ax*ratio+cx*(1-ratio);
			let _ay = ay*ratio+cy*(1-ratio);
			let _bx = ax*(1-ratio)+bx*ratio;
			let _by = ay*(1-ratio)+by*ratio;

			// Place temp in variable
			ax = _ax;
			bx = _bx;
			ay = _ay;
			by = _by;

			// Update colour
			let n_colour = [0,0,0]; // For some reason I cannot add directly to array so create temp
			for (var rgb = 0; rgb < 3; rgb++) {
				n_colour[rgb] = colour[rgb] + this.colour_fade[rgb];
			}
			colour = n_colour;
		}
	}

	// Getters for class attributes
	get_x_pos() {return this.x_pos;}
	get_y_pos() {return this.y_pos;}
	get_length() {return this.length;}
	get_level() {return this.level;}
	get_colour() {return this.colour;}
	get_colour_fade() {return this.colour_fade;}
	get_line_weight() {return this.line_weight;}
	get_animation_time() {return this.animation_time;}
	get_master_rotate() {return this.master_rotate;}

	// Setters for class attributes
	set_x_pos(_) {if (!Number.isNaN(_)) {console.log(_); this.x_pos = _;}}
	set_y_pos(_) {if (!Number.isNaN(_)) {this.y_pos = _;}}
	set_length(_) {if (!Number.isNaN(_) && _ >= 1) {this.length = _;}}
	set_level(_) {if (!Number.isNaN(_) && _ >= 1) {this.level = _;}}
	set_colour(_) {if (!Number.isNaN(_[0]) && !Number.isNaN(_[1]) && !Number.isNaN(_[2]) && _[0] >= 0 && _[1] >= 0 && _[2] >= 0) {this.colour = _;}}
	set_colour_fade(_) {if (!Number.isNaN(_[0]) && !Number.isNaN(_[1]) && !Number.isNaN(_[2])) {this.colour_fade = _;}}
	set_line_weight(_) {if (!Number.isNaN(_) && _ >= 1) {this.line_weight = _;}}
	set_animation_time(_) {if (!Number.isNaN(_) && _ >= 1) {this.animation_time = _;}}
	set_master_rotate(_) {if (!Number.isNaN(_) && _ >= 1) {this.master_rotate = _;}}
}