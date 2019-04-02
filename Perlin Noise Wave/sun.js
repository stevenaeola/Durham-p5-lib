
class Sun {
// Set this.sunX and this.sunY as values passed in from Control.js
    constructor(sunX, sunY) {
        this.sunX = sunX;
        this.sunY = sunY;
    }

    // Create render of the sun or a canvas for wave 1 only
    createSun(g) {

        if (g) {
            this.render = createGraphics(windowWidth, windowHeight);
            for (this.i = 10; this.i > 0; --this.i) {
                this.size = map(this.i, 10, 0, 100, 0);
                this.render.fill(lerpColor(color(255, 245, 200), color(255, 255, 250), (1 - this.i) / 10));
                this.render.ellipse(this.sunX, this.sunY, this.size, this.size);

                if (dist(this.sunX, this.sunY, mouseX, mouseY) < this.size / 2 && mouseIsPressed) {
                    this.sunX = mouseX;
                    this.sunY = mouseY;
                }
            }
            g.image(this.render, 0, 0);

        } 
        else {
            for (this.i = 10; this.i > 0; --this.i) {
                var size = map(this.i, 10, 0, 100, 0);
                fill(lerpColor(color(255, 245, 200), color(255, 255, 250), (1 - this.i) / 10));
                ellipse(this.sunX, this.sunY, size, size);

                if (dist(this.sunX, this.sunY, mouseX, mouseY) < size / 2 && mouseIsPressed) {
                    this.sunX = mouseX;
                    this.sunY = mouseY;
                }
            }
        }
    }

}
