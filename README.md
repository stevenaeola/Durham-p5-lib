# Programming Coursework Documentation
**Please open it by FIREFOX or IE**

**You also can open it by localhost on chrome or Safari**

## Explain Method
#### reload()
Called directly before setup(), the preload() function is used to handle asynchronous loading of external files in a blocking way. If a preload function is defined, setup() will wait until any load calls within have finished. 
#### setup()
The setup() function is called once when the program starts. It's used to define initial environment properties such as screen size and background color and to load media such as images and fonts as the program starts. 
#### draw()
Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.
#### push() & pop()
The push() function saves the current drawing style settings and transformations, while pop() restores these settings. 

## Explain with example
### index.js

	var sp
	var par
* `var sp` is the variable used for setup
* `var par` is the variable used for create a new particle
 
```
function setup(){
	sp=new setpp();
 	sp.drawSetpp();
}
```
`function setup` is the function to set up the graph. In this function, `sp=new setpp()` create a new variable and use `sp.drawSetpp` to invoking class in setup.js.

```
function draw() {
	par.drawRun();
}
```
`function draw` is the function to draw the graph. `par.drawRun` is the methond to call class in first.js.

```
document.addEventListener("DOMContentLoaded", function(){
    var cc = document.getElementById("colour");
    function changeColour(event){
	    let colour = document.getElementById("colour").value;
	    sp.setColor(colour);
    }

    cc.addEventListener("change", changeColour);
    
    var cf = document.getElementById("colour_form");
    
    cf.addEventListener("submit", function (event){
    
	event.preventDefault()});
});
```
`document.addEventListener` add a dom to the html file. `var cc` is a variable of changing color. `function changeColour(event) {}` is a function letting the background color in the class equal to the color input on the wedsite. `var cf` and following code are aimed to submit the action and finallt execute. 
	
### setpp.js
```
var bgColour;

class setpp {
  constructor() {         
		bgColour= "black";
	}
	
	drawSetpp(){
		background(bgColour);
		setp()
	}
	
	setColor(colour){
		bgColour = colour;
	}
}
```
`var bgColor` is a variable of background color. `class setpp` is creating a class named setpp to control the setup. In constructor, `bgColour= "black"` let the initial background color be black. `drawSetpp` is a inner function. it is used to call `function setp` in first.js. `setColour(color)` is use set method to give property for the parameter.
### particle.js
```
class Particle{
	constructor(l,n,r,o,rotation) {
    this.l = l || 1;
    this.n = random(1, width/2);
    this.r = random(0, TWO_PI);
    this.o = random(1, random(1, width/this.n));
    this.rotation= rotation || 0;
  } // continue next
}
```
`class particle {}` is creating a class named particle.

* `constructor() {}` is construct a class with some variables. 
* `this.l = 1` is the value that represents the transparency and it is assigned the value of 1.
* `this.n = random(1, width/2)` is the random value bwtween 1 and width of canvas divides 2 that reprensents wander.
* `this.r = random(0, TWO_PI)` means the angle of theta which is random value between 0 and 2PI. 
* this.o = random(1, random(1, width/this.n))` is the random value between 1 and canvas width divides this.n. 
* `this.rotation` is the value of rotate angle and it is assigned the value of 0 that represents wander. 
* `this.o`and `this.n` both control the wander. 

```
draw() {
    this.l++;
    push();
    rotate(this.r);
    translate(this.drawDist(), 0);
    fill(255, min(this.l, 255));
    imageMode(CENTER);
    image(imageP, 0, 0, width/this.o/8, width/this.o/8);
    pop();

    this.o-=0.07;
  }
```
`draw() {}` is the inner method in class particle. `this.l++` means the value of this.l will gradually increase. `push` will start a new drawing state. `translate(this.drawDist(), 0)` means left/right translation is this.drawDist (which will be write later) and no up/down tranlation. `fill(255, min(this.l, 255))` means the color of particle is white and min(this.l, 255) control the saturation  `imageMode(CENTER)` means the center of image used by particle will be allocated at the coordinate. `image(imageP, 0, 0, width/this.o/8, width/this.o/8)` is the method to draw particles. 0 and 0 represents the x and y coordinate; width/this.o/8 and width/this.o/8 represent the radius of particles.  `pop()`restore original state. And `this.o-=0.07` this.o equal to this.o - 7 which means the radius of particle is changed. . 

```
drawDist() {
    return atan(this.n/this.o)*width/HALF_PI;
  }
```
`drawDist() {}` is the inner method to calculate the distance that particle will experience which is the arctangent of (this.n/this.o) * width/HALF_PI. 

```
drawrun(){
  background(bgColour);

  translate(width/2, height/2);
  this.rotation-=0.002;
  rotate(this.rotation);

  for (i = 0; i<particle.length; i++) {
    particle[i].draw();
    if (particle[i].drawDist()>diagonal) {
      particle[i] = new Particle();
    }
  }
}
```
`drawRun() {}` is a inner method to run the program. `background(bgColour)` means the color of background is the color you input on the website. `translate(width/2, height/2)` means the whole graph's left/right translation is width/2 and up/down tranlation is height/2. `this.rotation-=0.002` the value to rotation is equal to this.rotation minus 0.002 and the whole graph will rotate by this angle. Statement for means when the number of particles less or equal to the length of particle it will run function`draw`. Statement if means if the distance that particle will experience (function`drawDist`) is larger than diagnoal, new particle will abe push. This is because diagnoal is the larges distance that the particle will experience, if it is larger than diagnoal, the particle will diasppear. 

```
var song;
var imageP;
function preload() {
  par=new Particle(); 
  song = loadSound('YKZZLDX.mp3');
  imageP = loadImage("particle.png");
}
```
* `var song` is the background music. 
* `var imageP` is the image of particle.

`function proload` is a funtcion to download the image and music in the same file at first. `par=new Particle` is instantiation of a class. 

```
var particle = new Array(800);
var diagonal;

function setp(){
	createCanvas(1440, 900);
  	frameRate(30);
	for (i = 0; i<particle.length; i++) {
    particle[i] = new Particle();
    particle[i].o = random(1, random(1, width/particle[i].n));
  }
	
  diagonal = sqrt(width*width + height * height)/2;
  song.play();
}
```
`var particle` and `var diagnoal` are two variable which will used next. `function setp` is used for set up the graph and will be call in setup.js. `createCanvas(1440, 900)` means create a 1440*900 canva. `frameRate(30)` means frame rate is 30. Statement for means when the number of particle is less than 800, i gradually increase, new particle will be push and the tell what particle[i].o should be (which is the same as how this.o be calculated in constructor). `diagnoal=` define how diagnoal be calculated. `song.play` means play the bachkground music. 

### index.html
```
	<script src="p5.min.js"></script>
    <script src="p5.dom.min.js"></script>
    <script src="p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8">
```
Call external script file and link with style.css file. 

```
	<style>
		#introPanel {
			display: block;
			height: auto;
          	width: 400px;
          	position: fixed;
            visibility: visible;
            /* opacity: 0; */
            background: #333;
            left: 50%;
            text-align: left;
            padding: 0 15px 15px 15px;
            color: #333;
            transform: translate(-50%);
            color: #f5f5f5;
            font-family: 'Source Sans Pro', 'Helvetica';
            font-weight: 400;
            font-size: 16px;
            line-height: 1.3;
       }
	</style>
```

The text style of instruction be used.

```
 	<form id = "colour_form">
	<input id = "colour"/>
	</form>
```
Set up a form name colour_form which is related to the code in index.js. And you can put the color in the blank. 

```
	<div id="introPanel" class="panel active">
	<hr class="white">
	Don't do anything. Just relax.(Okay, if you really want to do something, input the color in the box to change the color of background)     
	</div>
```
Create a intro panel to write the instruction.

```
	<script src="index.js"></script>
    <script src="setpp.js"></script>
    <script src="particle.js"></script>
```
Call external script js file. 

## Liscense
"Wandering in Space" by R.Mhttp://www.openprocessing.org/sketch/492680Licensed under Creative Commons Attribution ShareAlikehttps://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/