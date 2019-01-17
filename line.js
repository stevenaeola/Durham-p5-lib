class line{
    constructor(x, y, r, a, av, colour,fills,frameRate) {
        this.x = [4];
        this.y = [4];
        this.r = [4];
        this.a = new Array(4);
        this.av = new Array(4);
        this.colour = colour || 'green';
        this.fills = fills || 10;
        this.frameRate = frameRate || 20;
    }

    setColour(colour){
        this.colour = colour || 'green';
        return background(this.colour);
    }

    setFills(fills){
        this.fills = fills || 10;
        return fills;
    }

    setFrameRate(frameRate){
        this.frameRate = frameRate || 20;
        return frameRate;
    }




    draw() {
        fill(this.fills);
        frameRate(this.frameRate);

        for(var i = 0; i < 4; i++) {
            this.r[i] = height/(i+1);
            this.av[i] = random(-1.0, 1.0);
            this.a[i] = random(0, 6.283);
        }

        for (var k = 0; k < 10; k++) {
            for (var i = 0; i < 4; i++) {
                this.x[i] = this.r[i] * cos(this.a[i]) + width / 2;
                this.y[i] = this.r[i] * sin(this.a[i]) + height / 2;
                this.a[i] += this.av[i];
                if (this.a[i] > 6.283) this.a[i] -= 6.283;
                else if (this.a[i] < 0) this.a[i] += 6.283;
            }

            for (var t = 0; t < 1.0; t += 0.001) {

                var tx = bezierPoint(this.x[0], this.x[1], this.x[2], this.x[3], t);
                var ty = bezierPoint(this.y[0], this.y[1], this.y[2], this.y[3], t);

                ellipse(tx, ty, 3, 3);
            }
        }
    }


}
