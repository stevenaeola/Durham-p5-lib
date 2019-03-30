# Example Code
```javascript
var ws = new WaveSphere();
var x = 100;
var y = 100;
var x_speed = 3;
var y_speed = 1;
var radius = 50;
var canvas_size = 700;
var spinX = 100;
var spinY = 100;
var spinChange = 175;

function setup(){
    createCanvas(canvas_size, canvas_size) ;
    background(0,0,0) ;
    ws.setup(200, radius, x, y);
    ws.setOutputScale(1.0)
    ws.setFrontBackColour(255,255,255, 50,0,50);
    ws.setClickMagnitude(0.25);
    ws.setSpinMode(2);
}

function draw(){
    // Clear canvas
    background(0,0,0);

    // Collided with right wall
    if (x+radius >= canvas_size){
        ws.collision(radius,0,0)
        x_speed = -x_speed;
        spinY -= Math.sign(y_speed)*spinChange;
        ws.setConsSpinY(spinY)
    }

    // Collided with left wall
    if (x-radius <= 0){
        ws.collision(-radius,0,0)
        x_speed = -x_speed;
        spinY -= Math.sign(y_speed)*spinChange;
        ws.setConsSpinY(spinY)
    }

    // Collided with bottom wall
    if (y+radius >= canvas_size){
        ws.collision(0, radius,0)
        y_speed = -y_speed;
        spinX -= Math.sign(x_speed)*spinChange;
        ws.setConsSpinX(spinX)
    }

    // Collided with top wall
    if (y-radius <= 0){
        ws.collision(0, -radius,0)
        y_speed = -y_speed;
        spinX -= Math.sign(x_speed)*spinChange;
        ws.setConsSpinX(spinX)
    }
    x=x+x_speed;
    y=y+y_speed;
    ws.setX(x);
    ws.setY(y);
    ws.draw();
}

function mousePressed(){
       ws.mousePressed();  
}
```