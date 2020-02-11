/* eslint no-undef: 0 */
// Most of this is by Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// I added the functionality to make the particles change into another text and changed the positioning of the text to always be in the middle of the canvas

//Variable used to saved default font
var fnt;

//Loading the default font in preload so that it is already loaded by the time
//it is needed
function preload()
{
    fnt = loadFont('https://punrad.github.io/SteeringBehaviorTextModified/SketchFolder/TTWPGOTT.ttf');
}

//Point Text class
class PointText
{
    //Constructor of the class
    constructor(x, y, text, fontSize, density, pointSize, type, color, font, renderer)
    {
        //Temporary variable to check whether setup is done or not
        this.setup = false;

        //Variable that determines whether to have point physics or not
        this.active = true;

        //Variable that determines whether to hide the text or not
        this.hidden = false;

        //Contains all of the points that make up the text
        this.vehicles = [];

        //Position variables
        this.x = x || 0;
        this.y = y || 0;

        //Text to draw
        this.text = text || 'Default Text';

        //Customization of size variables
        this.fontSize = fontSize || 64;
        this.density = density || 0.3;
        this.pointSize = pointSize || 3;

        //Extra customization variables
        this.type = type || 'point';
        this.color = color || '#ffffff';

        //Font to draw in
        this.font = font || fnt;

        //optional p5.Renderer
        this.renderer = renderer || false;

    }

    //This function updates each particle drawn so that it behaves as expected
    draw()
    {
    //Here starts the section of the function that is responsible for the
    //updating of the particles every frame.
        for(var i = 0; i < this.vehicles.length; i++)
        {
            var v = this.vehicles[i];
            if(this.active == true)
            {
                v.behaviors();
                v.update();
            }

            if(this.hidden == false)
            {
                v.show();
            }
        }

        //This section of the function only runs once when draw() is first called.
        //The point of this is to initialize everything once when draw() is called
        if(this.setup == false)
        {
            //Immediately set this.setup to true, so that the PointText doesn't
            //initialize a second time
            this.setup = true;

            //Here all of the particles are created and their target position
            //is set depending on the bounds of the font
            var bounds = this.font.textBounds(this.text, 0, 0, this.fontSize);
            var posx = this.x - bounds.w / 2;
            var posy = this.y + bounds.h / 2;

            var points = this.font.textToPoints(this.text, posx, posy, this.fontSize, { sampleFactor: this.density });

            for(i = 0; i < points.length; i++)
            {
                var pt = points[i];
                var vehicle = new Vehicle(pt.x, pt.y, this.pointSize, this.type, this.color, this.renderer);
                this.vehicles.push(vehicle);
            }
        }

        //This only runs if there is a renderer, since it is to draw it. Also,
        //clears at every frame since otherwise the text would animate
        if(this.renderer != false)
        {
            image(this.renderer, 0, 0);
            this.renderer.clear();
        }
    }

    //If particles are being animate, stop, else, do animate
    toggleFreeze()
    {
        this.active = !this.active;
    }

    //This function resets the points that make up the text. This is necessary
    //to update the look
    reset()
    {
        this.setup = false;
        this.vehicles = [];
    }

    //////Setters

    //Sets text to hidden or not hidden
    setHidden(state)
    {
        //Data type check
        if(typeof state !== 'boolean')
        {
            console.error('Error, not a boolean. Hidden set to false');
            this.hidden = false;
            this.active = true;
        }
        else
        {
            //I also de-activate the object when it is hidden to better performance
            if(state == true)
            {
                this.hidden = true;
                this.active = false;
            }
            else
            {
                this.hidden = false;
                this.active = true;
            }
        }
    }

    //Setter for text
    setText(txt)
    {
        //Data type check
        if(typeof txt !== 'string')
        {
            console.error('Error, not a string. Text set to "Default text"');
            this.text = 'Default text';
        }
        else
        {
            this.text = txt;
        }
        this.reset();
    }

    //Setter for particle type
    setType(tpe)
    {
        //No need for checking typeof since if the strings aren't of the 3 categories,
        //then it will default anyways later
        this.type = tpe;
        this.reset();
    }

    //Setter for font size
    setFontSize(sze)
    {
        //Data type check
        if(typeof sze !== 'number')
        {
            console.error('Error, not a number. FontSize set to 64');
            this.fontSize = 64;
        }
        else
        {
            this.fontSize = sze;
        }
        this.reset();
    }

    //Setter for particle size
    setParticleSize(sze)
    {
        //Data type check
        if(typeof sze !== 'number')
        {
            console.error('Error, not a number. ParticleSize set to 3');
            this.pointSize = 3;
        }
        else
        {
            this.pointSize = sze;
        }
        this.reset();
    }

    //Setter for particle density
    setParticleDensity(dens)
    {
        //Data type check
        if(typeof dens !== 'number')
        {
            console.error('Error, not a number. density set to 0.3');
            this.density = 0.3;
        }
        else
        {
            this.density = dens;
        }
        this.reset();
    }

    //Setter for color of particles
    setColor(col)
    {
        //Data type check
        if( (typeof col !== 'string') || (col.includes('#') == false) || (col.length > 7) )
        {
            console.error('Error, not in correct format. Color set to "#FFFFFF"');
            this.color = '#FFFFFF';
        }
        else
        {
            this.color = col;
        }
        this.reset();
    }

    setCoordinates(x,y)
    {
        //Data type check
        if(typeof x !== 'number')
        {
            console.error('Error, x is not a number. x set to 0');
            this.x = 0;
        }
        else
        {
            this.x = x;
        }

        //Data type check
        if(typeof y !== 'number')
        {
            console.error('Error, y is not a number. y set to 0');
            this.y = 0;
        }
        else
        {
            this.y = y;
        }

        this.reset();
    }

    //////Getters

    //Getter for whether text is hidden or not
    getHidden()
    {
        return(this.hidden);
    }
    //Getter for text
    getText()
    {
        return(this.text);
    }

    //Getter for particle type
    getType()
    {
        return(this.type);
    }

    //Getter for font size
    getFontSize()
    {
        return(this.fontSize);
    }

    //Getter for particle size
    getParticleSize()
    {
        return(this.pointSize);
    }

    //Getter for particle density
    getParticleDensity()
    {
        return(this.density);
    }

    //Getter for color of particles
    getColor()
    {
        return(this.color);
    }

    //Getter for color of particles
    getCoordinates()
    {
        return([this.x, this.y]);
    }

    //Getter for array of particles that make up the PointText
    getParticles()
    {
      return(this.vehicles);
    }

}

//Vehicle class and functions
class Vehicle
{
    //Constructor of the class
    constructor(x, y, size, type, color, renderer)
    {
        //Non-constructor variables necessary for the point
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.maxspeed = 10;
        this.maxforce = 1;

        //Where the point should be
        this.target = createVector(x, y);

        //Size/radius of point
        this.r = size || 4;

        //Additional customization
        this.type = type || 'point';
        this.color = color || '#ffffff';

        //P5.Renderer
        this.renderer = renderer;
    }

    //This function decides how a particle moves depending on the position of the
    //mouse.
    behaviors()
    {
        //This decides how the particle should behave depending on where the
        //mouse is
        var arrive = this.arrive(this.target);
        var mouse = createVector(mouseX, mouseY);
        var flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);
    }

    //This function applies a force f to modify the acceleration of a particle in
    //some way
    applyForce(f)
    {
        this.acc.add(f);
    }

    //This function updates the position of a particle
    update()
    {
        //updates position based on velocity and velocity based on acceleration
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    //This function draws each particle according to how it should look
    show()
    {
        //This is default drawing, no renderer
        if(this.renderer == false)
        {
            stroke(this.color);
            strokeWeight(this.r);

            //Different way of drawing the particle depending on point type
            if(this.type == 'square')
            {
                rect(this.pos.x, this.pos.y, this.r, this.r);
            }
            else if(this.type == 'triangle')
            {
                strokeWeight(1);
                fill(this.color);
                triangle(this.pos.x, this.pos.y, this.pos.x+this.r, this.pos.y-this.r, this.pos.x-this.r, this.pos.y-this.r);
            }
            else
            {
            //By default the particle is drawn as a point
                point(this.pos.x, this.pos.y);
            }
        }
        else //if there is a renderer (basically exactly the same but taking
        //renderer into account)
        {
            this.renderer.stroke(this.color);
            this.renderer.strokeWeight(this.r);

            //Different way of drawing the particle depending on point type
            if(this.type == 'square')
            {
                this.renderer.rect(this.pos.x, this.pos.y, this.r, this.r);
            }
            else if(this.type == 'triangle')
            {
                this.renderer.strokeWeight(1);
                this.renderer.fill(this.color);
                this.renderer.triangle(this.pos.x, this.pos.y, this.pos.x+this.r, this.pos.y-this.r, this.pos.x-this.r, this.pos.y-this.r);
            }
            else
            {
            //By default the particle is drawn as a point
                this.renderer.point(this.pos.x, this.pos.y);
            }
        }
    }

    //This function steers the particle so that it arrives at its desired location
    arrive(target)
    {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        var speed = this.maxspeed;

        if(d < 100)
        {
            speed = map(d, 0, 100, 0, this.maxspeed);
        }

        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        return steer;
    }

    //This function makes the particle move away from the mouse when it is close
    flee(target)
    {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();

        if(d < 50)
        {
            desired.setMag(this.maxspeed);
            desired.mult(-1);
            var steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxforce);
            return steer;
        }
        else
        {
            return createVector(0, 0);
        }
    }
}
