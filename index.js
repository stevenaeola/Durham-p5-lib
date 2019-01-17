var time = 0;
let circle1;
let circle2;
let circle3;
var circles = []
var colourSlider;
var sizeSlider;
var speedNumber;
var canvas;

class Circle{
  constructor(x,y,i) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.i = i;
    this.brightness = 255;
    this.circledirectionx = 2;
    this.circledirectiony = -2;
    this.bouncing = false;
  }
  
  move(){
    if (this.i < 360){
      this.i = this.i + speedNumber;
    }
    else{
      this.i = 0
    }    
    this.x = cos(radians(this.i)) * sizeSlider + 900 / 2;
    this.y = sin(radians(this.i)) * (sizeSlider*2) + 750 / 2;
    this.w = (sin(radians(time + this.i)) * (sizeSlider*4));
    this.w = abs(this.w);
  }

  show(colourSlider) {
    stroke(colourSlider, 255, this.brightness);
    fill(colourSlider, 255, this.brightness, 127);
    ellipse(this.x,this.y,this.w,this.w);
  }

  hover(x,y){
    let d = dist(x,y,this.x,this.y)
    if (d < this.w/2) {
      this.brightness = 180
      this.show()
    }
  }

  clicked(x,y){
    let d = dist(x,y,this.x,this.y)
    if (d < this.w/2) {
      this.bouncing = true;
      this.bounceagain()
    }
  }
  
  bounce(){
    this.x = this.x + (this.circledirectionx * speedNumber);
    this.y = this.y + (this.circledirectiony * speedNumber);
    this.w = sizeSlider*4;
    this.w = abs(this.w);
    if (this.x < 0) { //off the left of the screen
      this.circledirectionx = this.circledirectionx * -1;
    }
    if (this.x > 900) { //off the right of the screen
      this.circledirectionx = this.circledirectionx * -1;
    }
    if (this.y < 0) { //off the top  of the screen
      this.circledirectiony = this.circledirectiony * -1;
    }
    if (this.y > 750) { //off the bottom of the screen
      this.circledirectiony = this.circledirectiony * -1;
    }
  }

  bounceagain(){
    var random = [1, -1]
    var randomItem = random[Math.floor(Math.random()*random.length)]
    if (randomItem == 1){
      this.circledirectionx = this.circledirectionx * -1;
    }
    else {
      this.circledirectiony = this.circledirectiony * -1;
    }
  }
}

function addcircles() {
  var number = document.getElementById("addnew").value;
  var circle = new Circle(0,0,0);
  for (var i = 0; i < number; i++) {
    var randomx = Math.floor(Math.random() * 900);
    var randomy = Math.floor(Math.random() * 750);
    circle[i] = new Circle(randomx,randomy,0);
    circle[i].bouncing = true;
    circles.push(circle[i]);
  }
}

function reset() {
  circles = []
  setup()
}  

function speedFunction() {
  speed = document.getElementById("myNumber").value;
  document.getElementById("demo").innerHTML = x;
}

function setup(){
  canvas = createCanvas(900, 750);
  // Move canvas so it’s inside <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  background(255, 0, 200);

  colorMode(HSB, 255);
  //creating 3 circle objects and adding them to an array
  circle1 = new Circle(0,0,0);
  circles.push(circle1);
  circle2 = new Circle(100,0,100);
  circles.push(circle2);
  circle3 = new Circle(100,0,200);
  circles.push(circle3);
}

function draw(){
  background(242);
  colourSlider = document.getElementById('colour').value;
  sizeSlider = document.getElementById("size").value;
  speedNumber = (document.getElementById("speed").value)/2;

  for (let i = 0; i < circles.length; i++) {
    circles[i].hover(mouseX,mouseY);
    circles[i].show(colourSlider);
    if (circles[i].bouncing == true) {
      circles[i].bounce()
    }
    else {
      circles[i].move();
    }
  }  
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].clicked(mouseX,mouseY);
  }
}