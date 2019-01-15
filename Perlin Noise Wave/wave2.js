class Wave2 {
  constructor(step, noiseScale, offset, ofs, ofs_v, colour1, colour2, yVal) {
    this.step = step;
    this.noiseScale = noiseScale;
    this.offset = offset;
    this.ofs = ofs;
    this.ofs_v = ofs_v;
    this.colour1 = colour1;
    this.colour2 = colour2;
    this.yVal = yVal;
  }

  drawLine2(y0, colour1, colour2) {
    fill(255, 4);
    beginShape();
    curveVertex(-50, y0);
    for (var i = 0; i < width / this.step + 3; i += 1) {
      var noiseVal = noise(i * this.noiseScale * (y0 * 0.06), frameCount * this.noiseScale);
      stroke(color('blue'), color('black'), map(5, this.yVal, height, 0, 255));
      curveVertex(i * this.step - 10, y0 + noiseVal * this.offset);
    }
    curveVertex(width + 10, height + 200);
    curveVertex(0, height + 210);
    curveVertex(0, height + 210);
    endShape();
  }
}