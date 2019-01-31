class Wave {
    constructor(ypos, num, color){
        this.ypos = ypos || 450;
        this.num = num || 10;
        this.color = color || "white";
        this.fra = 0.02;
        this.noisex = 0.001;
        this.noisey = 0.01;
        this.mapstop1 = 0.4;      
    }
    
    draw() {
        for (let i = 0; i < this.num; i++) {
            let paint = map(i, 0,this.num, 0,255);
            stroke(paint);
            
            beginShape();
            for (let x = -10; x < width+11; x+=20) {
                let r = noise(x*this.noisex, i*this.noisey, frameCount*this.fra);
                let y = map(r, 0,this.mapstop1,0,this.ypos);
                noStroke();
                fill(this.color);
                ellipse(x,y,1,1);
            }
            endShape();
        }
    }
    
    click() {
        if (mouseIsPressed) {
            this.noisex = 0.01;
            this.noisey = 2;
            this.mapstop1 = 1;
            this.fra = 0;
        } else{
            this.fra = 0.02;
        }
    }
    
    setColor(color) {
        fill(this.color);
        this.color = color;
    }
    
}