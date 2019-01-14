class Wave {
	constructor (yVal, noiseVal, waveSpeed, waveNum, waveH, colour1, colour2){
		this.yVal=yVal;
		this.noiseVal= noiseVal;
		this.waveSpeed = waveSpeed;
		this.waveNum = waveNum;
		this.waveH = waveH;
		this.colour1 = colour1;
		this.colour2 = colour2;
	}
	
	drawLine(){
    beginShape();
		stroke(this.colour1, this.colour2, map(this.waveNum, this.yVal, height, 0, 255));
											
		var x = 0;
    var y = this.waveNum + this.waveH * noise((mouseX/1000), (mouseY/100) + this.waveNum * 0.01, this.noiseVal + this.waveSpeed);
    curveVertex(x, y);

		for (var w = 0; w <= width; w += 20) {
      x = w;
      y = this.waveNum + this.waveH * noise((mouseX/1000) + w * 0.001, (mouseY/100) + this.waveNum * 0.01, this.noiseVal + this.waveSpeed)
      curveVertex(x, y);
    }
		
		x = width;
    y = this.waveNum + this.waveH * noise((mouseX/1000) + width, (mouseY/100) + this.waveNum * 0.01, this.noiseVal + this.waveSpeed);
    curveVertex(x, y);
    endShape();
	
	}
  

}