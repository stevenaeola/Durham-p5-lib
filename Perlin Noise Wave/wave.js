class Wave {
// Constructor is receives all values passed from Control.js when object is created

    constructor(yVal, noiseVal, waveSpeed, waveNum, waveH, colour1, colour2) {
        this.yVal = yVal;
        this.noiseVal = noiseVal;
        this.waveSpeed = waveSpeed;
        this.waveNum = waveNum;
        this.waveH = waveH;
        this.colour1 = colour1;
        this.colour2 = colour2;
    }

    // DrawLine picks either the renderer or the canvas if g is present or not
    drawLine(g) {

        if (g) {
            this.render = createGraphics(windowWidth, windowHeight);
            this.render.beginShape();
            this.render.stroke(this.colour1, this.colour2, map(this.waveNum, this.yVal, height, 0, 255));

            this.x = 0;
            this.y = this.waveNum + (this.waveH * noise( mouseX / 1000, (mouseY / 100) + (this.waveNum * 0.01), this.noiseVal + this.waveSpeed));
            this.render.curveVertex(this.x, this.y);

            for (this.w = 0; this.w <= width; this.w += 20) {
                this.x = this.w;
                this.y = this.waveNum + (this.waveH * noise( (mouseX / 1000) + (this.w * 0.001), (mouseY / 100) + (this.waveNum * 0.01), this.noiseVal + this.waveSpeed));
                this.render.curveVertex(this.x, this.y);
            }

            this.x = width;
            this.y = this.waveNum + (this.waveH * noise( (mouseX / 1000) + width, (mouseY / 100) + (this.waveNum * 0.01), this.noiseVal + this.waveSpeed));
            this.render.curveVertex(this.x, this.y);
            this.render.endShape();
      
            // Render an image once the waves are drawn
            g.image(this.render, 0, 0);
        }
    
        else {
            beginShape();
            stroke(this.colour1, this.colour2, map(this.waveNum, this.yVal, height, 0, 255));

            this.x = 0;
            this.y = this.waveNum + (this.waveH * noise( mouseX / 1000, (mouseY / 100) + (this.waveNum * 0.01), this.noiseVal + this.waveSpeed));
            curveVertex(this.x, this.y);

            for (this.w = 0; this.w <= width; this.w += 20) {
                this.x = this.w;
                this.y = this.waveNum + (this.waveH * noise( (mouseX / 1000) + (this.w * 0.001), (mouseY / 100) + (this.waveNum * 0.01), this.noiseVal + this.waveSpeed));
                curveVertex(this.x, this.y);
            }

            this.x = width;
            this.y = this.waveNum + (this.waveH * noise( (mouseX / 1000) + width, (mouseY / 100) + (this.waveNum * 0.01), this.noiseVal + this.waveSpeed));
            curveVertex(this.x, this.y);
            endShape();
        }
    }

}
