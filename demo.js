var particle;
function setup() {
    createCanvas(windowWidth, windowHeight); 
    
    colorMode(HSB, 360);
    
    textAlign(CENTER);
    
    background(0);
  } 

  
  function draw() {
    // Create fade effect.
    noStroke();
    fill(0, 30);
    rect(0, 0, width, height);
    
    // Move and spawn particles.
    // Remove any that is below the velocity threshold.
    for (var i = allParticles.length-1; i > -1; i--) {
      allParticles[i].move();
      
      if (allParticles[i].vel.mag() < 0.01) {
        allParticles.splice(i, 1);
      }
    }
    
    if (allParticles.length > 0) {
      // Run script to get points to create triangles with.
      data = Delaunay.triangulate(allParticles.map(function(pt) {
        return [pt.pos.x, pt.pos.y];
      }));
      
      strokeWeight(0.1);
      
      // Display triangles individually.
      for (var i = 0; i < data.length; i += 3) {
        // Collect particles that make this triangle.
        var p1 = allParticles[data[i]];
        var p2 = allParticles[data[i+1]];
        var p3 = allParticles[data[i+2]];
        
        // Don't draw triangle if its area is too big.
        var distThresh = 75;
        
        if (dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y) > distThresh) {
          continue;
        }
        
        if (dist(p2.pos.x, p2.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
          continue;
        }
        
        if (dist(p1.pos.x, p1.pos.y, p3.pos.x, p3.pos.y) > distThresh) {
          continue;
        }
        
        // Base its hue by the particle's life.
        if (useFill) {
          noStroke();
          fill(165+p1.life*1.5, 360, 360);
        } else {
          noFill();
          stroke(165+p1.life*1.5, 360, 360);
        }
        
        triangle(p1.pos.x, p1.pos.y, 
                 p2.pos.x, p2.pos.y, 
                 p3.pos.x, p3.pos.y);
      }
    }
    
    noStroke();
    fill(255);
    text("Click and drag the mouse\nPress any key to change to fill/stroke", width/2, height-50);
  }
  
  
  function mouseDragged() {
    particle= new Particle(mouseX, mouseY, maxLevel);
    allParticles.push(particle);
  }
  
  
  function keyPressed() {
    useFill = ! useFill;
  }

$(document).ready(function(){
    
    // setup = particle.setup
    // draw = particle.draw
    // keyPressed=particle.keyPressed
    // mouseDragged = particle.mouseDragged
	$('.submit').click(function(){
    maxLevel = ($('.maxLevel').val())
    useFill = $('input[name=fullfill]:checked').val() == 1 ? true:false
    console.log(useFill)
	})
})