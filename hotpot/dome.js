var Cos,Sin,U,w,j,d,c,W,H,X,Y,A,B,r,g,q,x,y,R, f,i,a,b ,e, T,D,d;

class dome {
	constructor() {
		this.x = 200;
		this.y = 300;
	}

	setXSpeed(xs) {
		this.x = xs;
	}

	setYSpeed(ys) {
		this.x = ys;
	}

	draw() {
		Cos = Math.cos; // cos and sin
		Sin = Math.sin;
		U = 0;
		w = window; //window and dome
		j = document;
		d = j.getElementById("c");//2-dimension sketch
		c = d.getContext("2d");
		W = d.width = w.innerWidth;//width and height
		H = d.height = w.innerHeight;
		c.fillRect(0, 0, W, H);
		c.globalCompositeOperation = "lighter"; // to define the width and round shape
		c.lineWidth = 0.2;
		c.lineCap = "round";
		var t = 0;
		d.onmousemove = function (e) {
			if (window.T) {
				if (D == 9) {
					D = Math.random() * 15;
					f(1);
				}
				clearTimeout(T);
			}
			X = e.pageX; // capture the movement of the mouse
			Y = e.pageY;
			a = 0; // current location, x and y
			b = 0;
			A = X, // original location, x and y
			B = Y;
			R = (e.pageX / W * 999 >> 0) / 999;
			r = (e.pageY / H * 999 >> 0) / 999;
			U = e.pageX / H * 360 >> 0;
			D = 9;
			g = 360 * Math.PI / 180;
			T = setInterval(f = function (e) { // spectrum cycle
				c.save();
				c.globalCompositeOperation = "source-over"; //
				if (e != 1) {
					c.fillStyle = "rgba(0,0,0,0.02)";
					c.fillRect(0, 0, W, H); //
				}
				c.restore();
				i = 25;
				while (i--) {
					c.beginPath();
					t += g; // increase theta
					D += 0.1; // increase radius
					q = (R / r - 1) * t; //
					x = (R - r) * Cos(t) + D * Cos(q) + (A + (X - A) * (i / 25)) + (r - R); //
					y = (R - r) * Sin(t) - D * Sin(q) + (B + (Y - B) * (i / 25));
					if (a) { // set two points to play
						c.moveTo(a, b);
						c.lineTo(x, y);
					}
					c.strokeStyle = "hsla(" + (U % 360) + ",100%,50%,0.75)"; // colour
					c.stroke();
					a = x; // set fore point
					b = y;
				}
				U -= 0.5; // change colour
				A = X; // set current coordinate location
				B = Y;
			}, 15);
		};
		j.onkeydown = function (e) {
			a = b = 0;
			R += 0.05;
		};
		d.onmousemove({pageX: this.x, pageY: this.y});
	}
}