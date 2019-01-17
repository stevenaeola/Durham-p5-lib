class galaxy{
//constructor########################################################################################################
	constructor(magnetism, radius, gensoku,colorIn,num,bright){
		this.magnetism = magnetism || 10;
		this.radius = radius || 0.6;
		this.gensoku = gensoku || 0.95;
		this.colorIn = colorIn || 0;
		this.num = num || 1000;
		this.bright = bright || 50;
		
		}
	
		
//access methods##########################################################################################
    getMagnetism(){
    	return this.magnetism;
    }
    getRadius(){
    	return this.radius;
    }
    getGensoku(){
    	return this.gensoku;
    }
    getColorIn(){
    	return this.colorIn;
    }
    getNum(){
    	return this.num
    }
    getBright(){
    	return this.bright;
    }
    setMagnetism(magnetism){
		this.magnetism = magnetism;
	}	
	setRadius(radius){
		this.radius = radius;
	}
	setGensoku(gensoku){
		this.gensoku = gensoku;
	}
	setColorIn(colorIn){
		this.colorIn = colorIn;

	}
	setNum(num){
		this.num = num;
	}
	setBright(bright){ 
		this.bright = bright;
		//console.log("brightchange"+bright);
	}
//other functions###################################################
	Reset(){
		this.reset = 1;
	}
	Stop(){
		
	    this.stop = 1;
	}
	Run(){
		this.stop = 0;
	}
	setPressdrawOn(){
    	this.pressdraw = 1;	
    }
    setPressdrawOff(){
    	this.pressdraw = 0;	
    }

	
    
//setup function###############################################################################
	galaxy_setup(){
		this.vx = new Array(this.num);
		this.vy = new Array(this.num);
		this.x = new Array(this.num);
		this.y = new Array(this.num);
		this.ax = new Array(this.num);
		this.ay = new Array(this.num);
		this.stop = 0;
		this.reset = 0;
		this.pressdraw = 0;
		 
		noStroke(); 
		fill(this.colorIn);
		ellipseMode(RADIUS);
		background(this.colorIn);
		blendMode(ADD);
		for(var i =0; i< this.num; i++){
		    this.x[i] = random(width);
		    this.y[i] = random(height);
		    this.vx[i] = 0;
		    this.vy[i] = 0;
		    this.ax[i] = 0;
		    this.ay[i] = 0;
		 }
				
	}
//draw function###############################################################################
	galaxy_draw(colour){
		//console.log("start drawing")      
        //console.log(this.magnetism);
		//console.log(this.radius);
		//console.log(this.gensoku);
		//console.log(this.colorIn);
		//console.log(this.num);
		//console.log(this.bright);
		this.colorIn = colour;
		fill(this.colorIn);
		rect(0,0,width,height);
		if(this.reset == 1){
			setup();
		}	
		for(var i=0; i<this.num; i++){
		    if(this.stop == 1){
		     break;
		    }
		    if(this.pressdraw == 1){
			    if(mouseIsPressed){
			     var touchX = mouseX;
			     var touchY = mouseY;
			    }
			}
			else{
			 var touchX = mouseX;
		     var touchY = mouseY;
			}	
		  
		    var distance = dist(touchX, touchY, this.x[i], this.y[i]); //dist(x1,y1,x2,y2) distance between atoms
		    if(distance > 3){ //accerlation update
		      this.ax[i] = this.magnetism * (touchX - this.x[i]) / (distance * distance); 
		      this.ay[i] = this.magnetism * (touchY - this.y[i]) / (distance * distance);
		    }
		    this.vx[i] += this.ax[i]; //x accerlation increase
		    this.vy[i] += this.ay[i]; //y accerlation increase
		    
		    this.vx[i] = this.vx[i]*this.gensoku;
		    this.vy[i] = this.vy[i]*this.gensoku;
		    
		    this.x[i] += this.vx[i];  // x axis increase
		    this.y[i] += this.vy[i];  // y axis increase
		    
		    var sokudo = dist(0,0,this.vx[i],this.vy[i]); //find speed
		    if(this.bright<50){
				var r = map(sokudo, 50, 5, 0, 255); //color
			    var g = map(sokudo, 50, 5, 64, 255);
			    var b = map(sokudo, 50, 5, 128, 255);
			    fill(r, g, b, 32);
			    ellipse(this.x[i],this.y[i],this.radius,this.radius);
			}
			else if(this.bright==50){
				var r = map(sokudo, 0, 5, 0, 255); //color
			    var g = map(sokudo, 0, 5, 64, 255);
			    var b = map(sokudo, 0, 5, 128, 255);
			    fill(r, g, b, 32);
			    ellipse(this.x[i],this.y[i],this.radius,this.radius);
			}
			else{
				var r = map(sokudo, 0, 25, 0, 255); //color
			    var g = map(sokudo, 0, 25, 64, 255);
			    var b = map(sokudo, 0, 25, 128, 255);
			    fill(r, g, b, 32);
			    ellipse(this.x[i],this.y[i],this.radius,this.radius);
			}
		    
	  	}

	}

}
