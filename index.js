
class center_point{
    //x and y represent the position of the center point
    //r represents radius and colour defines its colour
    constructor(x,y,r,colour){
        this.x = x;
        this.y = y;
        this.radius = r;
        this.colour = colour || "red";
    }
    
    //change the colour of the center point
    setColour(colour){
	this.colour = colour;
    }
    
    draw(){
        fill(this.colour);
        ellipse(this.x, this.y, this.radius, this.radius);
    }    
} 
class first_orbit{
    //x and y represent the position of the orbit
    //an ellipse with an equal width and height is a circle. 
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    draw(){
        noFill();
        ellipse(this.x, this.y, this.width, this.height);
    } 
}

class first_electron{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    //a circle must have an equal width and height.
    draw(){
        fill(0);
        ellipse(this.x, this.y, this.radius, this.radius);
    } 
}

class second_orbit{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    draw(){
        noFill();
        rotate(PI/4.0);
        ellipse(this.x, this.y, this.width, this.height);
    } 
}

class second_electron{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    draw(){
        fill(0);
        ellipse(this.x, this.y, this.radius, this.radius);
    } 
}

class third_orbit{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    draw(){
        noFill();
        rotate(PI/4.0);
        ellipse(this.x, this.y, this.width, this.height);
    } 
}

class third_electron{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    draw(){
        fill(0);
        ellipse(this.x, this.y, this.radius, this.radius);
    } 
}

class forth_orbit{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }
    draw(){
        noFill();
        rotate(PI/4.0);
        ellipse(this.x, this.y, this.width, this.height);
    } 
}

class forth_electron{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.radius = r;
    }
    draw(){
        fill(0);
        ellipse(this.x, this.y, this.radius, this.radius);
    } 
}

var c;
var d;
var e;
var f;
var g;
var h;
var i;
var j;
var k;

function setup(){
    //set up the size of the canvas
	createCanvas(1500,700); 
    //define the parameter for center point
    c = new center_point (0, 0, 40,);
}

function draw(){
	background(255);
    //set the empty space of all the orbit to be white
    fill(255);
    rectMode(CENTER);
    //improve image quality
	smooth();
        //the colour and the size of the stroke for all orbits
        stroke(0);
        strokeWeight(4);

        //set the center for what is drawn
        translate(width/2, height/2);
    
    
        c.draw();
    //define the parameters for orbit
    d = new first_orbit (0, 0, 450, 110);
        d.draw();
    //define the parameters for electron
    e = new first_electron (225*cos(180 + frameCount/50), 55*sin(180 + frameCount/50), 20);
        e.draw();
    f = new second_orbit (0, 0, 450, 110);
        f.draw();
    g = new second_electron (225*cos(90 + frameCount/50), 55*sin(90 + frameCount/50), 20);
        g.draw();
    h = new third_orbit (0, 0, 450, 110);
        h.draw();
    i = new third_electron (225*cos(-45 + frameCount/50), 55*sin(-45 + frameCount/50), 20);
        i.draw();
    j = new forth_orbit (0, 0, 450, 110);
        j.draw();
    k = new forth_electron (225*cos(0 + frameCount/50), 55*sin(0 + frameCount/50), 20);
        k.draw();
}

document.addEventListener("DOMContentLoaded", function(){
    var cc = document.getElementById("colour");
    function changeColour(event){
	   let colour = document.getElementById("colour").value;
	   c.setColour(colour);
    }
    
    cc.addEventListener("change", changeColour);
    
    var cf = document.getElementById("colour_form");
    
    cf.addEventListener("submit", function (event){
	event.preventDefault()});
})