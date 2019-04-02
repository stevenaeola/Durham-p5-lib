class Control {

    // Set default values required by objects created
    constructor() {
        this.sunX = 400;
        this.sunY = 100;
        this.offset = 300;
        this.waveSpeed = 0.0;
        this.sun = new Sun(this.sunX, this.sunY);
        this.noiseVal = random(200);
        this.bgColour = 'white';

        this.ofs = 0;
        this.ofsV = 1;
    }

    // Set value of colours from sliders
    setColours(colour1, colour2) {
        this.sliderColour1 = colour1;
        this.sliderColour2 = colour2;
    }

    // Get value of Wave fluctuation slider 
    getSlidervalue(sliderxValue) {
        this.sliderxValue = sliderxValue;
    }

    // Get value of background colour from HTML form
    setColour() {
        this.bgColour = document.getElementById('colour').value;
    }

    // Get value of flag to choose which wave to draw
    getFlagValue(flag) {
        this.flag = flag;
    }

    // Draw either renderer or canvas
    draw(g) {
        if (g) {
            this.drawRender(g);
        } 
        else {
            this.drawCanvas();
        }
    }

    // Renderer is called by draw()
    drawRender(g) {
        this.render = createGraphics(windowWidth, windowHeight);
        if (this.flag == 1) {
            this.render.background(this.bgColour);

            this.render.strokeWeight(0);
            this.sun.createSun(g);


            this.render.noFill();
            this.render.strokeWeight(1.5);

            this.waveSpeed += 0.015;
            this.waveH = map(this.sliderxValue, 0, width, 100, 500);

            for (this.waveNum = this.sun.sunY + 10; this.waveNum < height; this.waveNum += 3) {
                this.wave1 = new Wave(this.sun.sunY + 10, this.noiseVal, this.waveSpeed, this.waveNum, this.waveH, this.sliderColour1, this.sliderColour2);
                this.wave1.drawLine(g);
            }
        }

        if (this.flag == 2) {
            this.render.translate(0, -200);

            this.ofs += this.ofsV;
            if (this.ofs == this.offset || this.ofs == 0) {
                this.ofsV = 0 - this.ofsV;
            }
            this.render.strokeWeight(6);
            this.wave2 = new Wave2(this.sliderxValue);
            this.wave2.drawLine2(212 + this.ofs, this.sliderColour1, this.sliderColour2, g);
            this.wave2.drawLine2(215 + this.ofs, this.sliderColour1, this.sliderColour2, g);
            this.render.strokeWeight(1);
            this.wave2.drawLine2(210 + this.ofs, this.sliderColour1, this.sliderColour2, g);

        }

        // Create a texture and place it on a 3D box
        texture(g);
        box(300);
        rotateX(frameRate * 0.02);

    }

    // DrawCanvas is called by draw()
    drawCanvas() {

        if (this.flag == 1) {
            background(this.bgColour);
            strokeWeight(0);
            this.sun.createSun();
            noFill();
            strokeWeight(1.5);
            this.waveSpeed += 0.015;
            this.waveH = map(this.sliderxValue, 0, width, 100, 500);

            for (this.waveNum = this.sun.sunY + 10; this.waveNum < height; this.waveNum += 3) {
                this.wave1 = new Wave(this.sun.sunY + 10, this.noiseVal, this.waveSpeed, this.waveNum, this.waveH, this.sliderColour1, this.sliderColour2);
                this.wave1.drawLine();
            }
        }

        if (this.flag == 2) {
            translate(0, -200);
            this.ofs += this.ofsV;
            if (this.ofs == this.offset || this.ofs == 0) {
                this.ofsV = 0 - this.ofsV;
            }
            strokeWeight(6);
            this.wave2 = new Wave2(this.sliderxValue);
            this.wave2.drawLine2(212 + this.ofs, this.sliderColour1, this.sliderColour2);
            this.wave2.drawLine2(215 + this.ofs, this.sliderColour1, this.sliderColour2);
            strokeWeight(1);
            this.wave2.drawLine2(210 + this.ofs, this.sliderColour1, this.sliderColour2);

        }
    }
}
