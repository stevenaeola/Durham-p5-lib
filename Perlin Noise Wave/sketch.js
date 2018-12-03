var line1;
var ofs =0;
var ofs_v =1;
var step = 80;
var noiseScale = 0.02;
var offset = 300;

function setup(){
    createCanvas(windowWidth,windowHeight);
    fill(240);
    noStroke();
		line1 = new Line(212+ofs,to = color('#DB028C'),from = color('#FFAE34'));
}


function draw() {
	background('black');
	ofs+=ofs_v;
	if((ofs==offset) || (ofs==0)){ofs_v=0-ofs_v;}
	strokeWeight(5);
	line1.drawLine();

}

//Class to create Lines
class Line {
	constructor (y0, to, from){
		this.y0=y0;
		this.to=to;
		this.from=from;
	}
	
	
	drawLine(){
    fill(255,4);
    beginShape();
    curveVertex(-50,this.y0);

    for (var i =0 ; i<width/step+3;i++){
        var noiseVal = noise(i*noiseScale*(this.y0*0.06), frameCount*noiseScale);
        stroke(lerpColor(this.from,this.to,noiseVal));
        curveVertex(i*step-10,this.y0+noiseVal*offset);
    }

    curveVertex(width+10, height+200);
    curveVertex(0, height+210);
    curveVertex(0, height+210);
    endShape();
	}
	
}
