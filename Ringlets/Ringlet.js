class Ringlet{
// constructor for the ringlet class
  constructor(Diameter,Tilt,Thickness,NumberOfRings,Sets,Speed,BackgroundColour,InnerColour,OuterColour){
    this.Diameter = Diameter || 30;
    this.Tilt = Tilt || 10;
    this.Thickness = Thickness || 20;
    this.NumberOfRings = NumberOfRings || 5;
    this.Sets = Sets|| 1;
    this.ringX = [];
    this.ringY = [];
    this.ringK = [];
    this.Speed = Speed || 0.2;
    this.BackgroundColour = BackgroundColour|| '#111122';
    this.InnerColour = InnerColour || '#663333';
    this.OuterColour = OuterColour || '#448888';
  }
// function which sets initial x, y and k values for rings, must be called when changing number of sets or number of rings
  createRings(num,r){
    if(r){
      this.ringX = [];
      this.ringY = [];
      this.ringK = [];
      for (var i = 0; i < num * this.Sets; i++) {
        this.ringX[i] = 360;
        this.ringY[i] = 360;
        this.ringK[i] = i%this.NumberOfRings + 1;
      }
    }else{
      this.ringX = [];
      this.ringY = [];
      this.ringK = [];
      for (var i = 0; i < num * this.Sets; i++) {
        this.ringX[i] = 0.5 * width;
        this.ringY[i] = 0.5 * height;
        this.ringK[i] = i%this.NumberOfRings + 1;
      }
    }
  }
// creates the curves that make the rings
  drawCurl (x,y,r,s,t,r2) {
    if(r2){
      r2.push();
      r2.translate(x, y);
      r2.beginShape();
      r2.vertex(-r, -t);
      r2.bezierVertex(-r, s - t, +r, s - t, +r, -t);
      r2.vertex(+r, +t);
      r2.bezierVertex(+r, s + t, -r, s + t, -r, +t);
      r2.endShape(CLOSE);
      r2.pop();
    }else{
      push();
      translate(x, y);
      beginShape();
      vertex(-r, -t);
      bezierVertex(-r, s - t, +r, s - t, +r, -t);
      vertex(+r, +t);
      bezierVertex(+r, s + t, -r, s + t, -r, +t);
      endShape(CLOSE);
      pop();
    }
  }
// draw method for ringlets with the option to use as p5.Renderer by passing in as r
  draw(r) {
    if(r){
      r.background(this.BackgroundColour);
      r.stroke('#111122');
      r.strokeWeight(2);
      for (var i = 0; i < this.NumberOfRings; i++) {
        this.ringY[i] += this.Speed * (this.NumberOfRings - i) * (mouseY - this.ringY[i]) / this.NumberOfRings;
      }
      // switch statement to change the number of sets of rings
      switch(this.Sets){
        case '2':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
          }
          break;
        case '3':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
            this.ringY[this.NumberOfRings*2 + i] = height*0.5;
          }
          break;
        case '4':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
            this.ringY[this.NumberOfRings*2 + i] = (height*0.5 - this.ringY[i])* (0.3333) + height*0.5
            this.ringY[this.NumberOfRings*3 + i]=height*0.5 - ((height*0.5 - this.ringY[i]) * 0.3333)
          }
          break;
        case '5':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
            this.ringY[this.NumberOfRings*2 + i] = (height*0.5 - this.ringY[i])* (0.5) + height*0.5
            this.ringY[this.NumberOfRings*3 + i]=height*0.5 - ((height*0.5 - this.ringY[i]) * 0.5)
            this.ringY[this.NumberOfRings*4 + i] = height*0.5;
          }
          break;
        }
        // draws curves for each ring
        for(var k = 1; k<=this.Sets; k++){
          for (i = this.NumberOfRings*k - 1; i >= this.NumberOfRings*(k-1); i--) {
            r.fill(this.InnerColour);
            this.drawCurl(this.ringX[i], this.ringY[i], this.Diameter * this.ringK[i], - this.Tilt * this.ringK[i], this.Thickness,r);
          }
          for (var i = this.NumberOfRings*(k-1); i < this.NumberOfRings*k; i++) {
            r.fill(this.OuterColour);
            this.drawCurl(this.ringX[i], this.ringY[i], this.Diameter * this.ringK[i], + this.Tilt * this.ringK[i], this.Thickness,r);
          }
        }
      //draws box and uses r as a texture on box
      background(0);
      rotateX(frameCount* 0.01);
      rotateY(frameCount* 0.01);
      texture(r)
      box(400)
    }else{
      background(this.BackgroundColour);
      stroke('#111122');
      strokeWeight(2);
      for (var i = 0; i < this.NumberOfRings; i++) {
        this.ringY[i] += this.Speed * (this.NumberOfRings - i) * (mouseY - this.ringY[i]) / this.NumberOfRings;
      }
      // switch statement to change the number of sets of rings
      switch(this.Sets){
        case '2':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
          }
          break;
        case '3':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
            this.ringY[this.NumberOfRings*2 + i] = height*0.5;
          }
          break;
        case '4':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
            this.ringY[this.NumberOfRings*2 + i] = (height*0.5 - this.ringY[i])* (0.3333) + height*0.5
            this.ringY[this.NumberOfRings*3 + i]=height*0.5 - ((height*0.5 - this.ringY[i]) * 0.3333)
          }
          break;
        case '5':
          for (var i = 0; i < this.NumberOfRings; i++) {
            this.ringY[this.NumberOfRings*1 + i] = height*0.5 - this.ringY[i] + height*0.5;
            this.ringY[this.NumberOfRings*2 + i] = (height*0.5 - this.ringY[i])* (0.5) + height*0.5
            this.ringY[this.NumberOfRings*3 + i]=height*0.5 - ((height*0.5 - this.ringY[i]) * 0.5)
            this.ringY[this.NumberOfRings*4 + i] = height*0.5;
          }
          break;
        }
        for(var k = 1; k<=this.Sets; k++){
          for (var i = this.NumberOfRings*k - 1; i >= this.NumberOfRings*(k-1); i--) {
            fill(this.InnerColour);
            this.drawCurl(this.ringX[i], this.ringY[i], this.Diameter * this.ringK[i], - this.Tilt * this.ringK[i], this.Thickness);
          }
        for (var i = this.NumberOfRings*(k-1); i < this.NumberOfRings*k; i++) {
            fill(this.OuterColour);
            this.drawCurl(this.ringX[i], this.ringY[i], this.Diameter * this.ringK[i], + this.Tilt * this.ringK[i], this.Thickness);
        }
      }
    }
  }
//function used to set the number of rings in a set
  setRingNumber(ringNumber,r){
    this.NumberOfRings = ringNumber;
    if (r){
      this.createRings(this.NumberOfRings,r);
    }else{
      this.createRings(this.NumberOfRings)
    }
  }
// function used to set diameter of rings
  setDiameter(diameter){
    this.Diameter = diameter;
  }
// function used to set tilt of rings
  setTilt(tilt){
    this.Tilt = tilt;
  }
// function to change the number of sets
  changeNumberOfSets(numberOfSets,r){
    this.Sets = numberOfSets;
    if (r){
      this.createRings(this.NumberOfRings,r);
    }else{
      this.createRings(this.NumberOfRings)
    }
  }
// function to change the speed of the rings
  setSpeed(speed){
    this.Speed = speed;
  }
// function to change the background colour
  setBackgroundColour(colour){
    this.BackgroundColour = '#' + colour;
  }
// function to change the inner colour of the rings
  setInnerColour(colour){
    this.InnerColour = '#' + colour;
  }
// function to change the outer colour of the rings
  setOuterColour(colour){
    this.OuterColour = '#' + colour;
  }

}
