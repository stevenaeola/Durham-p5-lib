function setup(){
    createCanvas(windowWidth,windowHeight);
    fill(240);
    noStroke();
}

ofs =0;
ofs_v =1;

function draw() {
    background('black');
    ofs+=ofs_v;

    if((ofs==offset) || (ofs==0))
    {
        ofs_v=0-ofs_v;
    }

    strokeWeight(6);
    drawLine(212+ofs,to = color('#DB028C'),from = color('#FFAE34'));
    strokeWeight(1);

}

var step = 80;
var noiseScale = 0.02;
var offset = 300;


function drawLine(y0,to,from){
    fill(255,4);
    beginShape();
    curveVertex(-50,y0);

    for (var i =0 ; i<width/step+3;i++){
        var noiseVal = noise(i*noiseScale*(y0*0.06), frameCount*noiseScale);
        stroke(lerpColor(from,to,noiseVal));
        curveVertex(i*step-10,y0+noiseVal*offset);
    }

    curveVertex(width+10, height+200);
    curveVertex(0, height+210);
    curveVertex(0, height+210);
    endShape();

}