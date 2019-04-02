// https://www.openprocessing.org/sketch/654596

void setup() {
	size(600, 600);
	background(255);
	rectMode(CENTER); 
	smooth();			
}
void draw() {
	background(255);
    stroke(0,0,0);
    strokeWeight(4);
	fill(255);	
	float speed = frameCount/50;
	
	// this centers what is drawn 
    translate(width / 2, height / 2); 	
	
	// An ellipse with an equal width and height is a circle. 
	// ellipse(x, y, width, height)
	// Remember to set the origin to 0, 0 to draw a circle in the center!
	fill(0);
	ellipse(0, 0, 40, 40); 
	 		
    // First orbit	 		
	noFill();
	ellipse(0, 0, 450, 110);
	
	// First electron
	x = 225*cos(180 + speed);
	y = 55*sin(180 + speed);	
	fill(0);
	ellipse(x, y, 20, 20);		
	
	// Second orbit	
	noFill();
	rotate(PI/4.0);
	ellipse(0, 0, 450, 110);
	
	// Third orbit		
	noFill();	
	rotate(PI/4.0)
	ellipse(0, 0, 450, 110);

	// Second electron		
	x = 225*cos(-45 + speed);
	y = 55*sin(-45 + speed);	
	fill(0);
	ellipse(x, y, 20, 20); 	

	// Forth orbit	
	noFill();
	rotate(PI/4.0)
	ellipse(0, 0, 450, 110);	

	// Third electron	
	x = 225*cos(0 + speed);
	y = 55*sin(0 + speed);	
	fill(0);
	ellipse(x, y, 20, 20);		
}