int hIndex = 0;
float minH = 100;
float maxH = 220;
float h = minH;

// Uses presets as it feels better than making them random.
void changeHue() {
  hIndex++;
  if (hIndex > 4) {
    hIndex = 0;
  }
  
  switch(hIndex) {
    case 0: 
      minH = 100;
      maxH = 220;
      break;
    case 1: 
      minH = 0;
      maxH = 55;
      break;
    case 2: 
      minH = 20;
      maxH = 100;
      break;
    case 3: 
      minH = 110;
      maxH = 180;
      break;
    case 4: 
      minH = 150;
      maxH = 255;
      break;
  }
  
  h = minH;
}

class Particle{
  PVector loc, vel, acc;
  int lifeSpan, passedLife;
  boolean dead;
  float alpha, weight, weightRange, decay, xOfst, yOfst;
  color c;
  
  Particle(float x, float y, float xOfst, float yOfst){
    loc = new PVector(x, y);
    
    float randDegrees = random(360);
    vel = new PVector(cos(radians(randDegrees)), sin(radians(randDegrees)));
    vel.mult(random(5));
    
    acc = new PVector(0,0);
    lifeSpan = 90;
    decay = 0.75;
    
    this.h = h;
    h += 0.5;
    if (h > maxH) {
      h = minH+h-maxH;
    }
    
    c = color(h, 255, 255, 10);
    
    this.sizeMult = constrain(sin(frameCount*0.02), 0.05, 0.5);
    this.xOfst = xOfst;
    this.yOfst = yOfst;
  }
  
  void update(){
    if(passedLife>=lifeSpan){
      dead = true;
    }else{
      passedLife++;
    }
    
    alpha = float(lifeSpan-passedLife)/lifeSpan * 70+50;
    weight = float(lifeSpan-passedLife)/lifeSpan * weightRange;
    
    acc.set(0,0);
    
    float rn = (noise((loc.x+frameCount+xOfst)*.01, (loc.y+frameCount+yOfst)*.01)-.5)*TWO_PI*4;
    float mag = noise((loc.y-frameCount)*.01, (loc.x-frameCount)*.01);
    PVector dir = new PVector(cos(rn),sin(rn));
    acc.add(dir);
    acc.mult(mag);
    
    float randRn = random(TWO_PI);
    PVector randV = new PVector(cos(randRn), sin(randRn));
    randV.mult(.25);
    acc.add(randV);
    
    vel.add(acc);
    vel.mult(decay);
    vel.limit(3);
    loc.add(vel);
  }
  
  void display(){
    strokeWeight((lifeSpan-passedLife)*this.sizeMult);
    stroke(c);
    point(loc.x, loc.y);
  }
}