class Spirograph {
	constructor(R, r, rho){
		this.R = R;
		this.r = r;
		this.rho = rho;
		this.y;
		this.x;
		this.colourR = 255;
		this.colourG = 0;
		this.colourB = 0;
		this.weight = 4;
		this.scale = Math.abs(this.R - this.r) + Math.abs(this.rho)+2;
		this.loopc;
		this.updateloopc();
		this.rendsize = 500;
		this.changed = false;
	}
	
	
	draw(g){
		//Sets up brush
		if(g != null){
			g.colorMode(RGB, 255);
			g.noFill();
			g.strokeWeight(this.weight);
			g.stroke(this.colourR, this.colourG, this.colourB);
			g.beginShape();
		}else{
			colorMode(RGB, 255);
			noFill();
			strokeWeight(this.weight);
			stroke(this.colourR, this.colourG, this.colourB);
			beginShape();
		}
		for (var t = 0; t <=(2*PI*this.loopc); t += PI/40) {//draws the spirograph
			//calculates the coordinates of the spiral at t
			this.x = ((this.R-this.r) * cos(t) + this.rho * cos(((this.R-this.r)/this.r)*t));
			this.y = ((this.R-this.r) * sin(t) - this.rho * sin(((this.R-this.r)/this.r)*t));
			//converts from the graph coords to the screen coords
			var x1;
			var y1;
			x1 = map(this.x, -this.scale, this.scale,0,this.rendsize);
			y1 = map(this.y, -this.scale, this.scale,0,this.rendsize);
			//draws a line from last coord to next coord
			if(g != null){
				g.vertex(x1,y1);
			}else{
				vertex(x1,y1);
			}
		}
		if(g != null){
			g.endShape();
		}else{
			endShape();
		}
	}
		

	updateloopc() {
		if (Number.isInteger(this.R) && Number.isInteger(this.r)) {
		this.loopc = lcm(this.R, this.r);
		}
		else {
			this.loopc = this.r * this.R;
		}
	}
	
	setr(r){
		this.r = r;
		this.scale = Math.abs(this.R - this.r) + Math.abs(this.rho)+2;
		
		updateloopc();
	}
	
	setR(R){
		this.R = R;
		this.scale = Math.abs(this.R - this.r) + Math.abs(this.rho)+2;
		
		updateloopc();
		this.changed = true;
	}
	
	setRGB(r, g, b){
		this.colourR = r;
		this.colourG = g;
		this.colourB = b;
	}

}



function lcm(a, b){
	return (a/gcd(a,b)) * b
}

function gcd(a, b){
	if (b == 0){
		return a;
	}
	return gcd(b, a % b);
}