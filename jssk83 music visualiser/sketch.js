const r = 85, dr = 40;	//constants for the visualisers
const buttonX = 345, buttonWidth = 115, buttonY = 75, buttonHeight = 140;  //constants for the play/pause button
const optionX = 25, optionWidth = 200, optionY = 600, optionHeight = 100, optionSep = 75;  //constants for the song buttons
var vis, vis1, vis2;  //variables to hold the visualiser objects
var Interstellar, BellaCiao, CountryRoads;  //variables to hold the song files
var sound, fft, amplitude, canv;  //general variables


function preload(){
  //loading the songs to memory
  Interstellar = loadSound("Interstellar mashup.mp3");
	BellaCiao = loadSound('Steve Aoki & MARNIK - Bella Ciao (Money Heist).mp3');
  CountryRoads = loadSound('Country Roads.mp3');
}

function setup(){
  canv = createCanvas(800,800);
  sound = BellaCiao  //default song
	setupsong();
  sound.play();
  canv.mouseClicked(checkmouseclick);
}

//appropriate setup for when a song is loaded (sound variable is updated)
function setupsong(){
	fft = new p5.FFT();  //used for isolating individual audio frequencies
	fft.setInput(sound); //sets the audio input to the selected song
  amplitude = new p5.Amplitude(); //doing the same for amplitude values
	amplitude.setInput(sound); 
}
 
function draw(){
  background(50,30);
  
  //music visualisers
  vis = new Visualiser(r, dr, 150, 400, "bass");
  vis1 = new Visualiser(r, dr, 400, 400, "mid");
  vis2 = new Visualiser(r, dr, 640, 400, "treble");
  vis.display();
  vis1.display();
  vis2.display();
  
  //play/pause button
  stroke(60, 80);
  //drawing pause button
  getplayfill(false); //decides whether the pause button is visible or not based on if a song is playing
  rect(buttonX+15, buttonY+10, 25, buttonHeight-20);  //first bar
  rect(buttonX+70, buttonY+10, 25, buttonHeight-20);	//second bar
  //drawing play button
  getplayfill(true);
  triangle(buttonX, buttonY, buttonX, buttonY + buttonHeight, buttonX+115, buttonY + (buttonHeight/2));
  
  //song buttons
  textSize(26);
  let songarray = ["Country Roads - Steven Aeola", "Interstellar Vs. Starboy remix", "Bella Ciao - Steve Aoki"]
  for (let i = 0; i < 3; i+=1){
    //drawing the button
    fill(120, 60);
    rect(optionX + (optionSep + optionWidth)*i ,optionY, optionWidth, optionHeight);
    //adding text to the button
    fill(255,105);
    text(songarray.pop(), 5 + optionX + (optionSep + optionWidth)*i, optionY+10, optionWidth-10, optionHeight-20);
  }
}

function Visualiser(r, dr, x, y, freq){
  //setting object variables
  this.r = r;
  this.dr = dr;
  this.x = x;
  this.y = y;
  this.freq = freq;
  
  this.display = function() {
    //Setting up/initialising
    let waveform = fft.waveform();	//waveform is an array of amplitude values over a short time period
    fft.analyze();		//this analyses the sound to get an array of energy levels across the audio frequency spectrum, this is needed  for the getEnergy function to work
    let energy = fft.getEnergy(this.freq) / 255;  //getting the volume level of the frequency (as a multiplier between 0 and 1)
    let waveenergy = min(energy+0.65, 1);		//adapting the multiplier for the outer wave of the visualiser  
  
    //Creating the inner circle
    //setting it to a colour according to the frequency
    if (this.freq == "bass"){		//red
      fill(255, 255-(255*energy), 255-(255*energy)); //intensity of the colour based on energy level
    }
    else if (this.freq == "mid"){		//green
      fill(255-(255*energy), 255, 255-(255*energy));
    }
    else{		//blue
      fill(255-(255*energy), 255-(255*energy), 255)
    }
    //size proportional to the amplitude at the moment this is drawn multiplied by the energy multiplier
    ellipse(this.x,this.y,150*amplitude.getLevel()*energy,150*amplitude.getLevel()*energy);
    
    
    //Creating the outer waveform line
    noFill();
    beginShape(); //this function allows creating custom shapes by specifying vertices (with vertex function)
    stroke(255,100);
    strokeWeight(1);
    //generating plots of a circle based on the waveform
    for (let i = 0; i< waveform.length; i+=15){
      let ang = i*360/waveform.length;
      //all values multiplied by waveenergy to have this outer circle also proportional to the energy at this visualisers frequency
      let x = (this.r)*cos(radians(ang))*waveenergy;
      let y = (this.r)*sin(radians(ang))*waveenergy;		//setting x and y of points of a circle
      //mapping amplitude values to a value inside the radius, and getting it to form a circle (with cos and sin)
      let a = map( waveform[i], -1, 1, this.r-this.dr, this.r+this.dr)*cos(radians(ang))*waveenergy;
      let b = map( waveform[i], -1, 1, this.r-this.dr, this.r+this.dr)*sin(radians(ang))*waveenergy;
      vertex(a+this.x,b+this.y);  //plotting the waveform iteration as a vertex
      
      push(); //starts a new drawing state
      strokeWeight(1);
      stroke(255,100);
      line(x+this.x, y+this.y, a+this.x, b+this.y);		//drawing lines from the constant cirlce (given by x and y) to the waveform value
      pop();  //end drawing state
      
      //drawing the points on the outer circle
      push(); //new drawing state
      stroke(255);
      strokeWeight(2);
      point(a+this.x, b+this.y);
      pop(); //end drawing state
    }
    endShape();
  }
}

function checkmouseclick() {
  
  //play button clicked
  if(mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight){
    if (sound.isPlaying()) {
      sound.pause();
    } else {
      sound.play();
    }
  }
  
  //song option clicked
  if(mouseY > optionY && mouseY < optionY+optionHeight){
    //first song clicked
    if(mouseX > optionX && mouseX < optionX+optionWidth){
      sound.pause();
      sound = BellaCiao;
      setupsong();
    }
    //second song clicked
    else if(mouseX > (optionX + optionSep + optionWidth) && mouseX < (optionX + optionSep + optionWidth + optionWidth)){
      sound.pause();
      sound = Interstellar;
      setupsong();
    }
    //third song clicked
    else if(mouseX > (optionX + optionSep + optionWidth)*2 && mouseX < (optionX + optionSep + optionWidth)*2 + optionWidth){
      sound.pause();
      sound = CountryRoads;
      setupsong();
    }
  }
}

//get the fill of the play/pause button
function getplayfill(Play){
  //Invisible for the play button if a song is playing and invisible for the pause button if a song is not playing
  if ((sound.isPlaying() && Play) || (!sound.isPlaying() && !Play)){
      return noFill();
  }
  //otherwise the passed button (play/pause) is visible
  return fill(255, 80);
}
