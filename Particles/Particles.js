class Particles {
    //Constructor for the creation of Particles
    constructor(stuck, bgcol, txtcol, render) {

        //Initialising Variables
        this.stars = [];
        this.smokes = [];
        this.ashes = [];

        this.cube = render;

        this.rval = 220;
        this.gval = 220;
        this.bval = 220;

        this.stuck = stuck || false;
        this.bgcol = bgcol || 0;
        this.txtcol = txtcol || 220;

        //Creating Canvas
        if(this.cube) {
          createCanvas(windowWidth, windowHeight, WEBGL);
          this.g = createGraphics(windowWidth, windowHeight);
        } else {
          createCanvas(windowWidth, windowHeight);
        }

        //Creating new stars/smoke/ashes when required
        for (var i = 0; i < this.stars.length; i++) {
            this.stars[i] = new Star();
        }
        for (i = 0; i < this.smokes.length; i++) {
            this.smokes[i] = new Smoke();
        }
        for (i = 0; i < this.ashes.length; i++) {
            this.ashes[i] = new Ash();
        }
    }

    //Getters and Setters
    get stuck() {
        return this._stuck;
    }

    set stuck(stuck) {
        this._stuck = stuck;
    }
    get bgcol() {
        return this._bgcol;
    }

    set bgcol(bgcol) {
        this._bgcol = bgcol;
    }

    get txtcol() {
        return this._txtcol;
    }

    set txtcol(txtcol) {
        this._txtcol = txtcol;
    }

    get cube() {
        return this._cube;
    }

    set cube(cube) {
        this._cube = cube;
    }

    //Draw function
    draw(g) {

      if (this.g) {
          g = this.g;
          background(0);
      }
      if (g) {
          g.background(this.bgcol);
      } else {
        fill(this.bgcol,10);
        rect(0,0,windowWidth,windowHeight);
      }

        //Getting RBG Values from HTML Sliders with Getters
        this.rval = document.getElementById('rslide').value;
        this.gval = document.getElementById('gslide').value;
        this.bval = document.getElementById('bslide').value;

        //Updating and showing all currently existing stars/smokes/ash
        for (var i = 0;i<this.stars.length;i++) {
            this.stars[i].update();
            this.stars[i].show();
            if (this.stars[i].pos.y>windowHeight) {
                this.stars.splice(i,1);
            }
        }
        for (i = 0;i<this.smokes.length;i++) {
            this.smokes[i].update();
            this.smokes[i].show();
            if (this.smokes[i].pos.y>windowHeight) {
                this.smokes.splice(i,1);
            }
        }
        for (i = 0;i<this.ashes.length;i++) {
            this.ashes[i].update();
            this.ashes[i].show();
            if (this.ashes[i].pos.y>windowHeight) {
                this.ashes.splice(i,1);
            }
        }

        //Generating stars when the mouse is pressed.
        if (mouseIsPressed == true) {
            this.stars.push(new Star());
        }

        //When stars are stuck to canvas start generating smoke and occasionally ash
        if (Particles.stuck == true) {
            this.smokes.push(new Smoke());
            if (random(1,10) > 9) {
                this.ashes.push(new Ash());
            }

            //Lightening the background once smoke starts generating
            if (this.bgcol < 220) {
                this.bgcol += 0.2;
            } else {
              //Displaying HTML On-screen instructions
                document.getElementById('boldh2').innerHTML = 'Hit restart to go again!';
            }

            //Displaying text through the smoke
            if (this.bgcol > 50) {
                textSize(120);
                textAlign('center');
                fill(this.txtcol);
                //Default text for if nothing inputted
                if (this.fullName.firstName == '') {
                    if (this.fullName.surname == '') {
                        text('Bruce Wayne', (windowWidth / 2), 270);
                        this.txtcol -= 0.1;
                    } else {
                        text(this.fullName.firstName + ' ' + this.fullName.surname, (windowWidth / 2), 270);
                    }
                } else {
                    text(this.fullName.firstName + ' ' + this.fullName.surname, (windowWidth / 2), 270);
                    this.txtcol -= 0.1;
                }
            }

        }

        if(this.g) {
          rotateX(frameCount * 0.005); 
          rotateY(frameCount * 0.005);
          texture(this.g);
          if (this.cube) {
            box(windowWidth/3)
          }
        }

        //Event listener to reset the smoke colour
        document.getElementById('resetcol').addEventListener('click', resetsmoke);

        function resetsmoke() {
            document.getElementById('rslide').value = 220;
            document.getElementById('gslide').value = 220;
            document.getElementById('bslide').value = 220;
        }

        //Retreiving text input values of first name and surname
        this.firstName = document.getElementById('firstName').value,
        this.surname = document.getElementById('surname').value,

        //Testing validity of Name and assigning properties
        this.fullName = {
            firstName : document.getElementById('firstName').value,
            surname : document.getElementById('surname').value,
            //Detecting numbers in the name input - indicating incorrect input
            verifyFirst : function (firstName) {
                var reg = new RegExp(/\d+/);
                if (reg.test(firstName)) {
                    this.firstName = '[INVALID]';
                    document.getElementById('warning').innerHTML = 'Names cannot have numbers in';
                }
                else {
                    this.firstName = firstName;
                    return true;
                }
            },
            //Detecting numbers in the name input - indicating incorrect input
            verifySecond : function (surname) {
                var reg = new RegExp(/\d+/);
                if (reg.test(surname)) {
                    this.surname = '[INVALID]';
                    document.getElementById('warning').innerHTML = 'Names cannot have numbers in';
                }
                else {
                    this.surname = surname;
                }
            },
        };

        //Hiding the error message when inputs are valid again
        if (this.fullName.verifyFirst(this.firstName)) {
            document.getElementById('warning').innerHTML = '';
        }
        this.fullName.verifySecond(this.surname);

        //Default name for if no text has been inputted using setter
        var sendtxt = {
            message: '\'Bruce Wayne\'',
            set msg(value) {
                this.message = value;
            }
        };
        if (this.firstName != '') {
            sendtxt.msg = '\'' + this.fullName.firstName + ' ' + this.fullName.surname + '\'';
        }
        document.getElementById('settxt').innerHTML = 'The name that will be displayed is: ' + sendtxt.message;

    }
}

//Class for the everything to do with star particles
class Star {

  //Creation of Particles
    constructor() {
        this.col = color(random(255),random(255),random(255));
        this.pos = new p5.Vector(mouseX,mouseY);
        this.velocity = new p5.Vector((mouseX-pmouseX)/5+random(-1,1),(mouseY-pmouseY)/5+random(-1,1));
        this.size = random(2,10);
    }

    //Updating current star particles
    update() {

        //Updating position with velocity and canvas boundaries
        this.pos.x+=this.velocity.x;
        this.pos.y+=this.velocity.y;
        if (this.velocity.x != 0) {
            this.velocity.y += 0.05;
            if (this.pos.x < 0) {
                this.pos.x = 0;
                this.velocity.x = this.velocity.x * -1;
            }
            if (this.pos.x > windowWidth) {
                this.pos.x = windowWidth;
                this.velocity.x = this.velocity.x * -1;
            }
            if (this.pos.y > windowHeight) {
                if (this.velocity.y > 2) {
                    this.pos.y = height;
                    this.velocity.y = this.velocity.y * -0.5;

                //Once vertical velocity is low enough sticking occurs
                } else {
                    this.velocity.y = 0;
                    this.velocity.x = 0;
                    this.pos.y = height;
                    this.size = random(20, 25);
                    Particles.stuck = true;
                }
            }
        }
    }
    //Displaying star particles
    show(g) {
      if (g) {
        g.noStroke();
        g.fill(this.col);
        g.ellipse(this.pos.x,this.pos.y,this.size,this.size);
      } else {
        noStroke();
        fill(this.col);
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
      }
    }

    //Getters and Setters
    get stuck() {
        return this._stuck;
    }

    set stuck(stuck) {
        this._stuck = stuck;
    }
    get bgcol() {
        return this._bgcol;
    }

    set bgcol(bgcol) {
        this._bgcol = bgcol;
    }
    get txtcol() {
        return this._txtcol;
    }

    set txtcol(txtcol) {
        this._txtcol = txtcol;
    }

}

//Generating smoke particles
class Smoke {
//Creation of particles
    constructor() {
        //creating particles based off slider inputs
        Particles.rval = document.getElementById('rslide').value;
        Particles.gval = document.getElementById('gslide').value;
        Particles.bval = document.getElementById('bslide').value;
        this.col = color(Particles.rval, Particles.gval, Particles.bval);
        this.pos = new p5.Vector(random(0,windowWidth), windowHeight);
        this.velocity = new p5.Vector(0, 5);
        this.size = random(2, 10);

        //Maintaining text in front of the smoke
        if (Particles.bgcol > 50) {
            textSize(120);
            textAlign('center');
            fill(Particles.txtcol);

            text(Particles.fullName.firstName + ' ' + Particles.fullName.surname, (windowWidth / 2), 270);
            Particles.txtcol -= 0.1;
        }

    }
    //Updating the position and size of the particles
    update() {
        this.pos.y -= 2.7;
        this.size -= 0.5;
    }
    //Displaying the particles
    show(g) {
      if (g) {
        g.noStroke();
        g.fill(this.col);
        g.ellipse(this.pos.x,this.pos.y,this.size,this.size);
      } else {
        noStroke();
        fill(this.col);
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
      }
    }
}

//Generating Ash Particles
class Ash {
//Creating the particles
    constructor() {
        this.col = color(220, 20, 60);
        this.pos = new p5.Vector(random(0, windowWidth), windowHeight);
        this.size = 5;
    }

    //Updating the position of the particles
    update() {
        this.pos.y -= 2.7;
        this.size -= 0.25;
    }

    //Displaying the particles on the canvas
    show(g) {
        //Allowing particles to travel to random and not uniform heights on the canvas
        var ranint = random(50, 100);
        if (this.pos.y > (windowHeight - ranint)) {
          if (g) {
            g.noStroke();
            g.fill(this.col);
            g.ellipse(this.pos.x, this.pos.y, this.size, this.size);
          } else {
            noStroke();
            fill(this.col);
            ellipse(this.pos.x, this.pos.y, this.size, this.size);
          }
        }
    }
}
