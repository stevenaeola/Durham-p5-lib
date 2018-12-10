/*
Noise turbulence doodles

Changed how it renders to feel more stylized.

Author:
  Raven Kwok aka Guo, Ruiwen
  ravenkwok.com
  twitter.com/ravenkwok
  vimeo.com/ravenkwok
  ravenkwok.tumblr.com
  flickr.com/photos/ravenkwok

Forked by:
  Jason Labbe

Site:
  jasonlabbe3d.com
*/

ArrayList<Particle> pts;
boolean onPressed, showInstruction = true;
PFont f;

void setup() {
  fullScreen();
  smooth();
  colorMode(HSB);
  rectMode(CENTER);

  pts = new ArrayList<Particle>();

  f = createFont("Calibri", 24, true);

  background(0);
}

void draw() {
  if (showInstruction) drawInstruction();
  
  if (onPressed) {
    for (int i=0;i<10;i++) {
      Particle newP = new Particle(mouseX, mouseY, i+pts.size(), i+pts.size());
      pts.add(newP);
    }
  }

  for (int i=pts.size()-1; i>-1; i--) {
    Particle p = pts.get(i);
    if (p.dead) {
      pts.remove(i);
    }else{
      p.update();
   	  p.display();
    }
  }
}

void drawInstruction(){
  background(0);
  fill(128);
  textAlign(CENTER, CENTER);
  textFont(f);
  textLeading(36);
  text("Drag and draw." + "\n" +
       "Press 'c' to clear the stage." + "\n" +
       "Press any other key to change its hue."
       ,width*0.5, height*0.5);
}