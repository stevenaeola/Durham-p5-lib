var x = Array(4);
var y = Array(4);
var r = Array(4);
var a = Array(4);
var av = Array(4);

function setup()
{
  createCanvas(windowHeight*0.7, windowHeight*0.7);
  
  randomSeed(99);
  for(var i = 0; i < 4; i++) {
    r[i] = height/(i+1);
    av[i] = random(-1.0,1.0);
    a[i] = random(0,6.283);  
  }
  
  background(0);
  frameRate(60);    
  blendMode(ADD);
  fill(2);
}

function draw()
{
  for(var k = 0; k < 10; k++) {
    for(var i = 0; i < 4; i++) {
    x[i] = r[i]*cos(a[i]) + width/2;
    y[i] = r[i]*sin(a[i]) + height/2;
    a[i] += av[i];
    if(a[i] > 6.283) a[i] -= 6.283;
    else if(a[i] < 0) a[i] += 6.283;
	} 
  
 for(var t = 0; t < 1.0; t += 0.001) {

    var tx = bezierPoint(x[0],x[1],x[2],x[3],t);  
    var ty = bezierPoint(y[0],y[1],y[2],y[3],t);  
    
    ellipse(tx,ty,3,3);
  }
  }
}