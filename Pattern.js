class Pattern{
	
	constructor(appearanceConstant, thickness, colour, radiusConstant,width){
		this.appearanceConstant = appearanceConstant || 0.2;
		this.thickness =thickness || 30;
		this.colour = colour || 'black';
		this.radiusConstant = radiusConstant|| 2.1;
		this.width = width || 600;
		
	}
	
	get appearanceConstant(){
		return this._appearanceConstant;
	}
	
	set appearanceConstant(val){
		this._appearanceConstant = val;

	}
		
	
	
	
	
	get width(){
		return this._width;
	}
	
	set width(val){
		if(val > 0){
		
			this._width = val;
		}
		else{
			throw new error('Wrong value');
		}

	}
	setRadiusConstant(radiusConstant){
		background(this.colour);
		this.radiusConstant = radiusConstant;
	}
		
	
	setColour(colour){
		
		this.colour = colour || 'black';
		return background(this.colour);
		
	}
	
	setAppearanceConstant(appearanceConstant){
		background(this.colour);
		this.appearanceConstant = appearanceConstant;
	}


	draw(){
		
		var pathPoints = [];
	
		
		var radius = this.width / this.radiusConstant;
		var theta1 = randomGaussian(0,	PI/4);
		var theta2 = theta1 + randomGaussian(0,PI/3);
		var v1 = createVector(this.width/2 + radius*cos(theta1), this.width/2 + radius * sin(theta1));
		var v2 = createVector(this.width/2 + radius*cos(theta2), this.width/2 + radius * sin(theta2));
		
		pathPoints = [v1,v2];
		
		
		for(var j=0;j<6;j++){
			var newPath = [];
			
			
			
			for(var i=0;i<pathPoints.length-1;i++){
				
				
				
				var h1 = pathPoints[i];
				var h2 = pathPoints[i+1];
				var midPoint =  p5.Vector.add(h1, h2).mult(0.5);
				var distance =  h1.dist(h2);
				
				var deviation = this.appearanceConstant * distance;
				var v = createVector(randomGaussian(midPoint.x,deviation),randomGaussian(midPoint.y,deviation));
				
				append(newPath,h1);
				append(newPath,v);
			}
			append(newPath,pathPoints[pathPoints.length-1]);
			pathPoints = newPath;
		}
		stroke(255,this.thickness);
		for (var a=0;a<pathPoints.length-1;a++){
			var v1 = pathPoints[i];
			var v2 = pathPoints[i+1];
			line(v1.x,v1.y,v2.x,v2.y);
			
		}
	
	}
}
			
			