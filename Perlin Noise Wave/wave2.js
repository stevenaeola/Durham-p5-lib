// Set default values in constructor
class Wave2 {
    constructor(sliderxValue) {
        this.step = 80;
        this.noiseScale = 0.02;
        this.offset = 300;
        this.sliderxValue = sliderxValue;
    }

    // Drawline2 selects either renderer or canvas
    drawLine2(y0, colour1, colour2, g) {
    
        if (g){
            this.renderer(y0, colour1, colour2, g);   
        }
        else {
            this.canvas(y0, colour1, colour2, g);
        }
    }

    renderer(y0, colour1, colour2, g){
        this.render = createGraphics(windowWidth, windowHeight);
        this.render.fill(255, 4);
        this.render.beginShape();
        this.render.curveVertex(-50, y0);
        for (var i = 0; i < (width / this.step) + 5; i += 1) {
            var noiseVal = noise(i * this.noiseScale * y0 * 0.06, frameCount * this.noiseScale);
            this.render.stroke(colour1, colour2, map(5, mouseY, height, 0, 255));
            this.render.curveVertex( (i * this.step) - 10, y0 + ((noiseVal * this.offset) * (this.sliderxValue/1000)));
        }
        this.render.curveVertex(width + 10, height + 200);
        this.render.curveVertex(0, height + 210);
        this.render.curveVertex(0, height + 210);
        this.render.endShape();
      
        // Create image of render
        g.image(this.render, 0, 0); 
    }

    canvas(y0, colour1, colour2, g){
        fill(255, 4);
        beginShape();
        curveVertex(-50, y0);
        for (var i = 0; i < (width / this.step) + 5; i += 1) {
            var noiseVal = noise(i * this.noiseScale * y0 * 0.06, frameCount * this.noiseScale);
            stroke(colour1, colour2, map(5, mouseY, height, 0, 255));
            curveVertex( (i * this.step) - 10, y0 + ((noiseVal * this.offset) * (this.sliderxValue/1000)));
        }
        curveVertex(width + 10, height + 200);
        curveVertex(0, height + 210);
        curveVertex(0, height + 210);
        endShape();
    }
}

