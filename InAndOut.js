class InAndOut {
	/* No Set or Get methods in this class as they are redundant in this use case */
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

		//var faf = 42; use this thing
	}

	draw(r=null) // TODO: p5 optional renderer
	{
		/*
      Call this function in the p5 draw() master function in order to draw and update the InAndOut object every frame.
    	*/
		let colour = this.colour; // Place this.colour in a local variable so to avoid changing original value if colour_fade enabled
		let level = this.level; // Likewise, place this.level in a local variable so original value is remembered.
		w_strokeWeight(this.line_weight, r); // Set thickness of the line
		let animation_ratio = 2*PI/this.animation_time; // Determine value to multiply ratio by. PI/time

		// Translate to centre of screen and then rotate before then translating back to origin.
		w_translate(this.x_pos+this.length/2, this.y_pos - 0.5*(this.length/2 * tan(PI/3)), r);
		w_rotate(2*PI/this.master_rotate*millis(), r);
		w_translate(-(this.x_pos+this.length/2), -this.y_pos + 0.5*(this.length/2 * tan(PI/3)), r);

		// Call harom function
		this.harom(this.x_pos + this.length, this.y_pos, this.x_pos, this.y_pos, level, (sin(animation_ratio*millis()%(2*PI))+1)/2, colour, this.colour_fade, r);
	}

	harom(ax, ay, bx, by, level, ratio, colour, colour_fade, r=null)
	{
		w_stroke(colour, r); // Set colour of line
		if(level!=0) // If level > 0 then continue recursive operation
		{
			// Calculate new coordinates of triangle points
			let vx=bx-ax;
			let vy=by-ay;
			let nx=cos(PI/3)*vx-sin(PI/3)*vy;
			let ny=sin(PI/3)*vx+cos(PI/3)*vy;
			let cx=ax+nx;
			let cy=ay+ny;
			// Draw lines from point to point
			w_line(ax,ay,bx,by, r);
			w_line(ax,ay,cx,cy, r);
			w_line(cx,cy,bx,by, r);

			// Add colour_fade to colour elementwise
			let n_colour = [0, 0, 0];
			n_colour[0] = colour[0] + colour_fade[0];
			n_colour[1] = colour[1] + colour_fade[1];
			n_colour[2] = colour[2] + colour_fade[2];

			// Call harom recursively with updated arguments
			this.harom(ax*ratio+cx*(1-ratio),ay*ratio+cy*(1-ratio),ax*(1-ratio)+bx*ratio,ay*(1-ratio)+by*ratio,level-1,ratio, n_colour, colour_fade, r);
		}
	}
}