class Sketch {
  constructor () {
    this.sides = 3;
    this.delay = 50;
    this.bg;
    this.fg;
    this.targetFps = 30;
    this.primes = [2, 3, 5, 7, 11, 13];
    this.nowSide = 0;
    this.remain = 0;
    this.xs = [];
    this.ys = [];
    this.x = 0;
    this.y = 0;
    this.ptx = this.x;
    this.pty = this.y;
    this.tx = this.x;
    this.ty = this.y;
    this.number = 0;
    this.rot = 0;
    this.zoom = 0;
    this.width = 1000;
    this.height = 1000;
  }

  GetSides () {
    return this.sides;
  }

  SetSides (s) {
    this.sides = s;
  }

  GetDelay () {
    return this.delay;
  }

  SetDelay (d) {
    this.delay = d;
  }

  GetBackground () {
    return this.bg;
  }

  SetBackground (b) {
    this.bg = b;
  }

  GetForeground () {
    return this.fg;
  }

  SetForeground (f) {
    this.fg = f;
  }

  GetChangeCanvasWidth () {
    return this.width
  }

  SetChangeCanvasWidth (w) {
    this.width = w;
    resizeCanvas(this.width, this.height)
  }

  GetChangeCanvasHeight () {
    return this.height
  }

  SetChangeCanvasHeight (h) {
    this.height = h;
    resizeCanvas(this.width, this.height)
  }

  // creating a default canvas with default drawing operators
  setup () {
    this.SetBackground(color(255, 0, 0));
    this.SetForeground(color(255, 255, 255));
    createCanvas(this.width, this.height)
    strokeWeight(5);
    frameRate(this.targetFps);
  }

  draw () {
    if (mouseIsPressed) {
      this.zoom += (0.6 - this.zoom) / 16;
    } else {
      this.zoom += (1 - this.zoom) / 16;
    }
    // finding the next point
    this.ptx += (this.x - this.ptx) / 64;
    this.pty += (this.y - this.pty) / 64;
    this.tx += (this.ptx - this.tx) / 64;
    this.ty += (this.pty - this.ty) / 64;
    background(this.GetBackground());
    this.rot += 0.0005;

    // making sure it is always in the centre of the canvas
    translate(width / 2, height / 2);
    rotate(this.rot);
    scale(this.zoom);

    translate(-this.tx, -this.ty);
    this.number += (this.xs.length - this.number) / 16;
    stroke(lerpColor(this.GetBackground(), this.GetForeground(), 0.8));
    for (var i = 0; i < this.xs.length - 1; i++) {
      line(this.xs[i], this.ys[i], this.xs[i + 1], this.ys[i + 1]);
    }

    stroke(this.GetForeground());
    var last = this.xs.length - 1;
    if (last >= 0) {
      var v = 1 - this.remain / this.GetDelay();
      // smooth motion
      line(this.xs[last], this.ys[last],
        lerp(this.xs[last], this.x, v),
        lerp(this.ys[last], this.y, v));
    }

    this.remain--;
    if (this.remain <= 0) {
      this.SetDelay(this.GetDelay() + (5 - this.GetDelay()) / 32);
      // faster every time!
      for (i = 0; i < this.xs.length - 1; i++) {
        this.xs[i] = this.xs[i + 1];
        this.ys[i] = this.ys[i + 1];
      }

      // finding the length of the next line
      this.xs.push(this.x)
      this.ys.push(this.y)
      var index = floor(random(this.primes.length))
      var magnitude = this.primes[index] * 30;
      this.nowSide = (this.nowSide + 1) % this.GetSides();
      if (this.nowSide < 0.1) {
        magnitude += 60;
  	}
      this.x += cos(TWO_PI * this.nowSide / this.GetSides()) * magnitude;
      this.y += sin(TWO_PI * this.nowSide / this.GetSides()) * magnitude;
      this.remain = this.GetDelay();
    }
  }
}
