class Wave {
	constructor (ysliderval, xsliderval, noiseF, ofs, h, waveH, colour1, colour2){
		this.ysliderval=ysliderval;
		this.xsliderval=xsliderval;
		this.noiseF= noiseF;
		this.ofs = ofs;
		this.h = h;
		this.waveH = waveH;
		this.colour1 = colour1;
		this.colour2 = colour2;
	}
	
	drawLine(){
    beginShape();
		stroke(this.colour1, this.colour2, map(this.h, this.ysliderval, height, 0, 255));
											
		var x = 0;
    var y = this.h + this.waveH * noise((mouseX/1000), (mouseY/100) + this.h * 0.01, this.noiseF + this.ofs);
    curveVertex(x, y);

		for (var w = 0; w <= width; w += 20) {
      x = w;
      y = this.h + this.waveH * noise((mouseX/1000) + w * 0.001, (mouseY/100) + this.h * 0.01, this.noiseF + this.ofs)
      curveVertex(x, y);
    }
		
		x = width;
    y = this.h + this.waveH * noise((mouseX/1000) + width, (mouseY/100) + this.h * 0.01, this.noiseF + this.ofs);
    curveVertex(x, y);
    endShape();
	
	}

}