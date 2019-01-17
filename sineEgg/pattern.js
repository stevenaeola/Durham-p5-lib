var theta = 0;

class sineEgg {

  constructor(theta = 0.20, stroke = '#2234C9', weight = 2, density = 235, freq = 3, length = 34, overdrive = 10) {
    this.theta = theta;
    this.stroke = stroke;
    this.weight = weight;
    this.density = density;
    this.freq = freq;
    this.length = length;
    this.overdrive = overdrive;

  }

  setup(target, size = 600) {
    this.target = target;
    this.size = size;

    var canvas = createCanvas(this.size, this.size);

    if (this.target != 'none') {  // Allow the user to specify 'none' as a target to invoke default p5.js behaviour (in addition to not supplying and argument at all)
      canvas.parent(this.target);
    }
  }

  draw() {

    clear('');
    translate(width/2, height/2); // Center the sketch on the canvas
    noFill();

    stroke(this.stroke);
    strokeWeight(this.weight);
    theta += this.theta;
    let r = this.density;

    for (var i=-0.5*PI;i<PI+0.5*PI;i+=0.01*PI) {
      beginShape();
      for (var j=-sin(i)*r;j<sin(i)*r+sin(i);j+=sin(i)*this.length) {
        curveVertex(j, cos(i)*r+sin(theta-(j/this.freq))*abs(i*this.overdrive));
      }
      endShape();
    }

  }

  getStroke() {
    return this.stroke;
  }

  getWeight() {
    return this.weight;
  }

  getZoom() {
    return this.zoom;
  }

  getFreq() {
    return this.freq;
  }

  getLength() {
    return this.length;
  }

  getDensity() {
    return this.density;
  }

   getOverdrive() {
    return this.overdrive;
  }

  setStroke(stroke) {
   this.stroke = stroke;
  }

  setWeight(weight) {
    this.weight = weight;
  }

  setDensity(density) {
    this.density = density;
  }

  setFreq(freq) {
    this.freq = freq;
  }

  setLength(length) {
    this.length = length;
  }

  setOverdrive(overdriveState) {
    if (overdriveState == true) { // Switch between predfined overdrive states depending on whether checkbox is ticked or not
      this.overdrive = 30;
    }
    else {
      this.overdrive = 10;
    }
  }

}