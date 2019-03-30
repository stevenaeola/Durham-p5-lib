/*
	adapted from
	"Game 1" by Joshua Rohweder
	http://www.openprocessing.org/sketch/421818
	Licensed under Creative Commons Attribution ShareAlike
	https://creativecommons.org/licenses/by-sa/3.0
	https://creativecommons.org/licenses/GPL/2.0/
*/
/*
	The class is to create a game, in which a moving ball bounces on coloured tiles.
	Red tile reduces a life, yellow is combo bonus, cyan doubles height and pink reduces height. 
	The class includes 5 functions: draww, toreset, drawtiles, drawball and checklife.
	draww calls the other functions. It contains two parts: gameover and !gameover. In gameover part, toreset is called if clicked, in !gameover part, other functions are called.
	toreset is also called in the constructor to initialize the game. This function gives each tile a number 0-5 representing its attributes. According to the number, drawtiles function colours the tiles. 
	checklife is called when the ball hits the ground. Other than check how many lives are left, it also changes the score and combo. 
*/
class mygame{
	constructor()
	{		
	//setup canvas
		this.mycanvas=createCanvas(1000,500,WEBGL);
		this.mycanvas.position(100,100);
		this.mycanvas.style('z-index','-1');
		frameRate(30);
		
	//variables for backgroundmusic
		this.backgroundmusic=loadSound("backgroundmusic.mp3");
		this.slider=createSlider(0,1,0.5,0.01);
		this.slider.position(100,320);
		this.musicpointer=1;
		
	//variables for ball features
		this.ballR=20;
		this.bounceH=70;
		this.bounceS=20;
		this.posX=0;
		this.posY=0;
		this.posZ=0;
		
	//variable for tiles
		this.tilesX=0;
		this.tilesY=0;
		this.tiles=[];
		this.t=0;
		
	//variables for the game
		this.times=0;
		this.score=0;
		this.combo=0;
		this.pointer;
		this.gameover=false;
		
	//initialization
		this.toreset();
	}


//this.draw
	draww() 
	{
	//if not gameover, draw
		if (!this.gameover)
		{		
			background(0);
		//move forward each frame
			this.march=-frameCount;
			
		//change camera parameters
			camera(0,0,400+this.march,0,0,this.march,0,1,0);
			
		//variables for ball position
			this.posX = (mouseX-500)*0.6+5; 
			if (this.posX>155)
			{
				this.posX=155;
			}
			if (this.posX<-145)
			{
				this.posX=-145;
			}////left-right
			this.posY = -(this.bounceH*abs(sin(frameCount/this.bounceS)))+100-this.ballR/2-30; // up-down  
			this.posZ = mouseY/3+this.march; // front-back		

		//draw the ball and tiles
			this.drawtiles();
			this.drawball()

		//when the ball hits the ground, check the color of the tile it hits. 
			if (abs(sin(frameCount/this.bounceS))<abs(sin((frameCount+1)/this.bounceS))
				&&abs(sin(frameCount/this.bounceS))<abs(sin((frameCount-1)/this.bounceS)))
			{
				this.checklife();
			}
		//Below is to play the background music. 
			//By trial and error, this is currently the best way I can deal with this problem.
			//Using 'isLoaded' will lead to the whole class to be undefined.
			//Before trying 'isLoaded' I tried the callback way this.backgroundmusic=loadSound("backgroundmusic.mp3",function), which also leads to this problem.
			if (this.backgroundmusic.isLoaded())
			{
				this.musicpointer=this.musicpointer-1;
				if (this.musicpointer>-1)
				{
					this.backgroundmusic.loop();					
				}
				this.backgroundmusic.setVolume(this.slider.value());
			}
		}	
	//if gameover, show the scores
		else
		{
			background(0);
			document.getElementById("gameover").innerHTML='GAME OVER';
			document.getElementById("yourscore").innerHTML='your score:'+String(this.score);
			document.getElementById("click").innerHTML='click mouse to restart';
			if (mouseIsPressed)
			{
				this.toreset();
			}
		}
	}


//function to reset
	toreset()
	{
	//remove gameover words
		document.getElementById("gameover").innerHTML='';
		document.getElementById("yourscore").innerHTML='';
		document.getElementById("click").innerHTML='';
		
	//reset the counters
		this.times=5;
		this.score=0;
		this.combo=0;		
		this.gameover=false;
		frameCount=200;

	//change the counters
		document.getElementById("life").innerHTML=this.times;
		document.getElementById("combo").innerHTML=this.combo;
		document.getElementById("score").innerHTML=this.score;	
		
	//reset the tiles	
		for (this.tilesY=1;this.tilesY<1000;this.tilesY++) 
		{
			for (this.tilesX=1;this.tilesX<6;this.tilesX++) 
			{
				this.t=this.tilesX+6*this.tilesY;
				if (random(10)>8&&this.t>24) 
				{
					this.tiles[this.t]=0;
				}      
				else if (random(100)>95) 
				{
					this.tiles[this.t]=2;
				}
				else if (random(100)>98&&this.t>36) 
				{
					this.tiles[this.t]=3;
				}
				else if (random(100)>98&&this.t>36) 
				{
					this.tiles[this.t]=4;
				}
				else 
				{
					this.tiles[this.t]=1;
				} 
			}	
		}
	}


//function to draw tiles
	drawtiles()
	{
		for (this.tilesY=1;this.tilesY<1000;this.tilesY++) 
		{
			this.y=-50*this.tilesY;
			if (this.y>this.march && this.y<this.march+500) 
			{
				for (this.tilesX=1;this.tilesX<=6;this.tilesX++) 
				{
					this.x=-170+(50*this.tilesX);
					this.t=this.tilesX+6*this.tilesY;
				//to see which tile(s) is/are the ball on
					this.on=false
					if (this.posX>=(this.x-25)&&this.posX<=(this.x+25)&&this.posZ>=(this.y-25)&&this.posZ<=(this.y+25))
						{
							this.on=true;
						}					
					push();			
					this.alpha=(this.y-this.march)*0.9;
				//color the tiles 
					if (this.on==true)//ball is over with alpha 255
					{
						this.alpha=255;this.pointer=this.tiles[this.t];
					}
					if (this.tiles[this.t]==0)//red avoid
					{
						fill(255,0,0,this.alpha);
					}
					else if (this.tiles[this.t]==2)//yellow
					{
						fill(255,255,0,this.alpha);
					}
					else if (this.tiles[this.t]==3)//cyan
					{
						fill(0,255,255,this.alpha);
					}
					else if (this.tiles[this.t]==4)//pink
					{
						fill(255,105,180,this.alpha);
					}
					else//white, this.d==1
					{
						fill(255,255,255,this.alpha);
					}
					noStroke();
					translate(this.x,100,this.y);
					box(50);
					pop();
				}
			}
		}
	}


//function to draw the ball
	drawball()
	{
		push();
		translate(this.posX,this.posY,this.posZ);
		noStroke();
		fill(255,250,205);
		sphere(this.ballR);
		pop();		
	}


//function to check how many lives are left, called when the ball hit the tiles
	checklife()
	{	
	//if the ball hits the ground
		if (abs(sin(frameCount/this.bounceS))<abs(sin((frameCount+1)/this.bounceS))
			&&abs(sin(frameCount/this.bounceS))<abs(sin((frameCount-1)/this.bounceS)))
		{
		
			switch(this.pointer)
			{
				case 0://red tile
				this.times=this.times-1;
				background(255,0,0);
				break;
				case 1://white tile
				this.score=this.score+10;
				this.combo=this.combo+1;
				break;			
				case 2://yellow combo bonus
				this.score=this.score+this.combo*50;
				this.combo=0;
				break;
				case 3://cyan double height
				this.bounceH=this.bounceH*2;
				this.combo=this.combo+2;
				break;	
				case 4://pink half height
				this.bounceH=this.bounceH/2
				this.combo=0;
			}			
		//change the counters
			document.getElementById("life").innerHTML=this.times;
			document.getElementById("combo").innerHTML=this.combo;
			document.getElementById("score").innerHTML=this.score;	
			if (this.times==0)
			{
				this.gameover=true;
			}
		}
	}
}	
