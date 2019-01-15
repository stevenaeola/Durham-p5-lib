class Control {

  constructor() {
    this.sunX = 400;
    this.sunY = 100;
    this.offset = 300;
    this.waveSpeed = 0.0;
    this.sun = new Sun(this.sunX, this.sunY);
    this.noiseVal = random(200);
    this.bgColour = 'white';

    this.step = 80;
    this.noiseScale = 0.02;
    this.offset = 300;
    this.ofs = 0;
    this.ofs_v = 1;
  }

  setColours(colour1, colour2) {
    this.sliderColour1 = colour1;
    this.sliderColour2 = colour2;
  }

  getSlidervalue(sliderxValue) {
    this.sliderxValue = sliderxValue;
  }

  setColour() {
    this.bgColour = document.getElementById("colour").value;
  }
  getFlagValue(flag) {
    this.flag = flag;
  }


  draw() {

    if (this.flag == 2) {
      this.ofs += this.ofs_v;
      if ((this.ofs == this.offset) || (this.ofs == 0)) {
        this.ofs_v = 0 - this.ofs_v;
      }
      strokeWeight(6);
      this.line2 = new Wave2(this.step, this.noiseScale, this.offset, this.ofs, this.ofs_v, this.colour1, this.colour2, this.sun.sunY);
      this.line2.drawLine2(212 + this.ofs, this.sliderColour1, this.sliderColour2);
      this.line2.drawLine2(215 + this.ofs, this.sliderColour1, this.sliderColour2);
      strokeWeight(1);
      this.line2.drawLine2(210 + this.ofs, this.sliderColour1, this.sliderColour2);

    }
    if (this.flag == 1) {
      background(this.bgColour);
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

  setup() {
    background(this.bgColour);
  }

}