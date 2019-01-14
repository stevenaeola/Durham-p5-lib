class Control {

  constructor() {
    this.sunX = 400;
    this.sunY = 100;
    this.offset = 300;
		this.waveSpeed = 0.0;
    this.sun = new Sun(this.sunX, this.sunY);
    this.noiseVal = random(200);
  }
  
  setColours(colour1, colour2) {
    this.sliderColour1 = colour1;
    this.sliderColour2 = colour2;
  }
  
  getSlidervalue(sliderxValue){
    this.sliderxValue = sliderxValue;
  }
  

  draw() {
    background(bgColour);
    strokeWeight(0);
    this.sun.createSun();

    noFill();
    strokeWeight(1.5);
    this.waveSpeed += 0.015;
    this.waveH = map(this.sliderxValue, 0, width, 100, 500);

    for (this.waveNum = this.sun.sunY + 10; this.waveNum < height; this.waveNum += 3) {
      this.line = new Wave(this.sun.sunY + 10, this.noiseVal, this.waveSpeed, this.waveNum, this.waveH, this.sliderColour1, this.sliderColour2);
      this.line.drawLine();
    }

  }




}