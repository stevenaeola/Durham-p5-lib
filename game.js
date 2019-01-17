class Game{
    constructor(xs,ys) {
        this.x = 255;
        this.y = 25;
        this.xspeed = xs||0;
        this.yspeed = ys||0;
        this.xhand;
    }
    setXSpeed(speed){
        this.xspeed = speed;
    }
    setYSpeed(speed){
        this.yspeed = speed;
    }

    draw() {
        ellipse(this.x, this.y, 40, 40); //ball

        //rectangle to not exit

        if (mouseX >= 40 && mouseX <= width - 40) {
            this.xhand = mouseX;
        } else if (mouseX < 40) {
            this.xhand = 40;
        } else if (mouseX > width - 40) {
            this.xhand = width - 40;
        }
        rect(this.xhand, height - 15, 140, 20,10,10);
        //rect(this.xhand,height - 550,140,20,10,10);
        //moving ellipse
        this.x += this.xspeed;
        this.y += this.yspeed;

        //bouncing of ball
        if (this.x <= 25 || this.x >= width - 25) {
            if (this.xspeed < 1 && this.xspeed > -1) { // speed
                this.xspeed = this.xspeed * (15.2);
            } else {
                this.xspeed = this.xspeed * (-1.01);
            }
        }
        if (this.y <= 25) {
            if (this.yspeed < 1 && this.yspeed > -1) {
                this.yspeed = this.yspeed * (10.2);
            } else {
                this.yspeed = this.yspeed * (-1.01);
            }
        }
        //ellipse bounce off rect
        if (this.y >= height - 25) {
            if (this.x <= this.xhand + 65 && this.x >= this.xhand - 65) {
            if (this.yspeed < 10 && this.yspeed > -10) {
                this.yspeed = this.yspeed * (-1.2);
            } else {
                this.yspeed = this.yspeed * (-1.01);
            }
            } else {
            textAlign(CENTER);
            textFont("Avenir Next");
            textStyle(BOLD);
            text("Try Again Bro", width / 4, height / 4);
            noLoop();
            }
        }
    }
}