

class Shape
{
    //constructor for the class
    //this sets the variables that are needed to draw shapes on the canvas
    constructor()
    {
        
        this.s=1;
        this.choices = "Circles";
        this.cubes = [];
        this.spheres = [];
        this.ellipses = [];
        this.D = 2;
        this.enable2Dclick = false;
        this.mic = new p5.AudioIn();
        this.mic.start();
        this.vol = this.mic.getLevel()
        
        colorMode(HSB,255);
        var canvas = createCanvas(1000,600,WEBGL);
        canvas.parent('sketch');
    }
    
    //resets the canvas
   resetcanvas()
    {
        //arrays that hold the shape objects, such as cubes spheres and ellipses
        this.cubes = [];
        this.spheres = [];
        this.ellipses = [];
        
        
    }
    //sets the shape that will be drawn when the mouse is clicked
    setshape(x)
    {
        //resets the canvas before drawing
        resetcanvas();
        
        //enables interaction with the 2D shape
        this.enable2Dclick = false;
        //sets the shape
        this.choices = x;
    }
    //enables interaction with the 2D objects
    enable2D(x)
    {
        //sets the variable to whatever x is
        this.enable2Dclick = x;
        
    }
    //changes the dimension of the shape
    changeD(x)
    {
        //sets the variable to whatever x is
        this.D = x;
        //resets the canvas
        resetcanvas();
    }
    //sets the colour of the shape
    setcolour(hue, saturation, brightness)
    {
        //checks the value of 'choices'
        switch(this.choices)
        {
            //checks if the value is 'Balls'
            case "Balls":
            //for each item in the spheres array, change the colour
            for(let i = 0; i < this.spheres.length; i++)
            {   
                this.spheres[i].c = color(hue,saturation,brightness);
                
            }
            
            break;
            //check if the value is 'Circles'
            case "Circles":
            //for each item in the ellipses array, change the colour
            for(let i = 0; i < this.ellipses.length; i++)
            {   
                this.ellipses[i].c = color(hue,saturation,brightness);
                
            }
            
            
            break;
            //if the value is none of the above, do:
            default:
            for(let i = 0; i < this.cubes.length; i++)
            {   
                this.cubes[i].c = color(hue,saturation,brightness);
                
            }
        }
    }
    //freezes all the objects on the screen
    
    freeze(x)
    {
        
        //checks the value of 'choices'
        switch(this.choices)
        {
            //checks if the value is 'Balls'
            case "Balls":
            //for each item in the 'spheres' array
            
            for(let i = 0; i < this.spheres.length; i++)
            {   
                this.spheres[i].move = x;
                this.spheres[i].freeze();
            }
            break;
            //checks if the value is 'Circles'
            case "Circles":
            //for each item in the 'ellipses' array
            
            for(let i = 0; i < this.ellipses.length; i++)
            {   
                this.ellipses[i].move = x;
                this.ellipses[i].freeze();
            }
            break;
            //if the value is none of the above, do:
            default:
            //for each item in the 'cubes' array
            
            for(let i = 0; i < this.cubes.length; i++)
            {
                this.cubes[i].move = x;
                this.cubes[i].freeze();
            }
        }
    }
    //makes the objects on the canvas fall
    fall()
    {

        //check the value of 'choices'
        switch(this.choices)
        {
            //checks if the value is 'Balls'
            case "Balls":
            //for each item in the 'sphere' array
            
            for(let i = 0; i < this.spheres.length; i++)
            {   
                //calls the fall function for every sphere
                ThreeD.fall(true,this.spheres[i]);
            }
            break;
            //checks if the value is 'Circles'
            case "Circles":
            //for each item in the 'ellipses' array
            for(let i = 0; i < this.ellipses.length; i++)
            {   
                //calls the fall function for every ellipse
                this.ellipses[i].fall(true)
                
            }
            break;
            //if the value is none of the above, do:
            default:
            //for each item in the 'cubes' array
            for(let i = 0; i < this.cubes.length; i++)
            {
                //calls the fall function for every cube
                ThreeD.fall(true,this.cubes[i]);
            }
        } 
    }

    //the draw function that is called many times per second
    //this functions updates the status of the objects and checks for events
    draw(g)
    {
        //changes the value of variables that are used to change the camera perspective
        let cameraX = map(mouseX,0,width,-1000,1000);
	    let cameraY = map(mouseY,0,height,-1000,1000);
        
        //refreshes the background 
        background(0);
        
        if(typeof(g)=='object')
        {
            rotateX(frameCount*0.001);
            rotateY(frameCount*0.001);
            texture(g);
            box(400);
        }
        
        
        
        //this.s = map(this.vol,0,0.5,1,3);

        //for each item in 'cubes', update the status of the objects
        for(let i = 0; i < this.cubes.length; i++)
        {
            
            this.cubes[i].update(this.s);
        }
        //for each item in 'spheres', update the status of the objects
        for(let i = 0; i < this.spheres.length; i++)
        {
            
            this.spheres[i].update(this.s);
        }
        //for each item in 'ellipses', update the status of the objects
        for(let i = 0; i < this.ellipses.length; i++)
        {
            
            
            this.ellipses[i].update(this.s,g);
            this.ellipses[i].boundary();
        }

        //zooms the camera perspective if 'SHIFT' is pressed, and if the shapes being drawn on the canvas is 3D
        if(keyIsDown(SHIFT) && this.D == 3)
	    {
		
		    camera(cameraX, cameraY, (height/2)/tan(PI/6), cameraX, cameraY, 0, 0, 1,0)

        }
        //moves the camera perspective if 'SHIFT' is pressed, and if the shapes being drawn on the canvas is 3D
	    if(keyIsDown(CONTROL) && this.D == 3)
	    {
		    let fovy = map(mouseY,0,width,0,PI)
		    perspective(fovy, width/height,(height/2)/tan(PI/6)/10,(height/2)/tan(PI/6)*10)
        }
        //if mouse is pressed, add a new object to the array
        if(mouseIsPressed)
	    {
            //checks if the mouse position is correct
		if(mouseX <= (1000) && mouseY <= (600) && this.enable2Dclick == false)
		{
            //checks the dimension of the shape being drawn on the canvas
			switch(this.D)
			{
                case 2:
                //adds new circle object
				if(this.choices == "Circles")
				{
					
					this.ellipses.push(new Circle(mouseX,mouseY));
				}
				break;
                default:
                //adds new cube object
				if(this.choices == "Cubes")
				{
                    
					this.cubes.push(new Cube(mouseX,mouseY));
                }
                //adds new sphere object
				else if(this.choices == "Balls")
				{
					this.spheres.push(new Sphere(mouseX,mouseY));
				}
			}
        }
        else if(this.enable2Dclick == true && this.choices =="Circles")
        {
            for(let i = 0; i < this.ellipses.length; i++)
        {
            
            //calculates distance of cursor to circle
            let d = dist(mouseX-500,mouseY-300,this.x,this.y);
		
		
		    //erases the clicked circle
		    if(d < this.ellipses[i].size/2)
		    {
			    this.ellipses[i].c = color(0,0,0);
			    this.ellipses[i].selected = true;
			
			
		    }
            
            //this.ellipses[i] = this.ellipses.filter(x => x !== this);
        }
        }
        
        
    }
    
    
} 
}
class TwoD
{
    //constructor of the class
    //this sets the variables used to draw 2D shapes
    constructor()
    {
        //position
        this.x = mouseX-width/2;
        this. y = mouseY-height/2;
        //speed
        this.dx = random(-5,5);
        this.dy = random(-5,5);
        this.dxx = this.dx;
        this.dyy = this.dy;
        //colour
        this.c = color(random(255),random(255),random(255),random(255));
        //size
	    this.size = random(25,60);
	    this.selected = true;

    }
    /*get x()
    {
        return this.x;
    }
    set x(x)
    {
        this.x = x;
    }
    get y()
    {
        return this.y;
    }
    set y(y)
    {
        this.y = y;
    }
    get dx()
    {
        return this.dx;
    }
    set dx(dx)
    {
        this.dx = dx;
    }
    get dy()
    {
        return this.dy;
    }
    set dy(dy)
    {
        this.dy = dy;
    }
    get dxx()
    {
        return this.dxx;
    }
    set dxx(dxx)
    {
        this.dxx = dxx;
    }
    get dyy()
    {
        return this.dyy;
    }
    set dyy(dyy)
    {
        this.dyy = dyy;
    }
    get c()
    {
        return this.c;
    }
    set c(c)
    {
        this.c = c;
    }
    get size()
    {
        return this.size;
    }
    set size(size)
    {
        this.size = size;
    }
    get selected()
    {
        return this.selected;
    }
    set selected(selected)
    {
        this.selected = selected;
    }*/
    

    //freezes the 2D object
    freeze(x)
    {
        //changes speed to zero
        if(x == true)
        {
            this.dx = 0;
            this.dy = 0;
        }
        //changes speed to previous value
        else
        {
            this.dx = this.dxx;
            this.dy = this.dyy;
        }
        

    }
    //makes the 2D objects fall
    fall(x)
    {
        //sets horizontal velocity to zero and vertical velocity to its absolute value
        if(x == true)
        {
            this.dx = 0;
            this.dy = Math.abs(this.dy);
        }
        //sets both velocity to its previous values
        else
        {
            this.dx = this.dxx;
            this.dy = this.dyy;
        }
    }
    

}
class ThreeD
{
    //constructor of the class
    //this contains the variables used to draw 3D shapes
    constructor()
    {
        
		this.x=mouseX-width/2;
		this.y=mouseY-height/2;
		this.z=random(-30,30);
		this.dx=random(-5,5);
		this.dy=random(-5,5);
		this.dz=random(-10,4);
		this.c=color(random(255),random(255),random(255));
		this.size=random(20,50);
		this.rotX = random(-10,11);
		this.rotY = random(-10,11);
		this.move = true;

		this.xx = this.x;
		this.yy = this.y;
		this.zz = this.z;
		this.rotXX = frameCount * 0.01 * this.rotX;
		this.rotYY = frameCount * 0.01 * this.rotY;
		this.dxx = this.dx;
		this.dyy = this.dy;
        this.dzz = this.dz;
        this.fall = false;

    }
    
    /*get x()
    {
        return this.x;
    }
    set x(x)
    {
        this.x = x;
    }
    get y()
    {
        return this.y;
    }
    set y(y)
    {
        this.y = y;
    }
    get z()
    {
        return this.z;
    }
    set z(z)
    {
        this.z = z;
    }
    get dx()
    {
        return this.dx;
    }
    set dx(dx)
    {
        this.dx = dx;
    }
    get dy()
    {
        return this.dy;
    }
    set dy(dy)
    {
        this.dy = dy;
    }
    get dz()
    {
        return this.dz;
    }
    set dz(dz)
    {
        this.dz = dz;
    }
    get c()
    {
        return this.c;
    }
    set c(c)
    {
        this.c = c;
    }
    get size()
    {
        return this.size;
    }
    set size(size)
    {
        this.size = sizes;
    }
    get rotX()
    {
        return this.rotX;
    }
    set rotX(rotX)
    {
        this.rotX = rotX;
    }
    get rotY()
    {
        return this.rotY;
    }
    set rotY(rotY)
    {
        this.rotY = rotY;
    }
    get move()
    {
        return this.move;
    }
    set move(move)
    {
        this.move = move;
    }
    get xx()
    {
        return this.xx;
    }
    set xx(xx)
    {
        this.xx = xx;
    }
    get yy()
    {
        return this.yy;
    }
    set yy(yy)
    {
        this.yy = yy;
    }
    get zz()
    {
        return this.zz;
    }
    set zz(zz)
    {
        this.zz = zz;
    }
    get rotXX()
    {
        return this.rotXX;
    }
    set rotXX(rotXX)
    {
        this.rotXX = rotXX;
    }
    get rotYY()
    {
        return this.rotYY;
    }
    set rotYY(rotYY)
    {
        this.rotYY = rotYY;
    }
    get dxx()
    {
        return this.dxx;
    }
    set dxx(dxx)
    {
        this.dxx = dxx;
    }
    get dyy()
    {
        return this.dyy;
    }
    set dyy(dyy)
    {
        this.dyy = dyy;
    }
    get dzz()
    {
        return this.dzz;
    }
    set dzz(dzz)
    {
        this.dzz = dzz;
    }
    get fall()
    {
        return this.fall;
    }
    set fall(fall)
    {
        this.fall = fall;
    }*/

    //freezes the 3D objects
    freeze()
    {
        
        //freezes the objects
        if(this.move == false)
		{
			
		this.dx = 0
		this.dy = 0
		this.dz = 0
		this.rotXX = frameCount * 0.01 * this.rotX
		this.rotYY = frameCount * 0.01 * this.rotY

        }
        //sets the movement of the objects to its previous value
		else
		{
            
			this.dx = this.dxx
			this.dy = this.dyy
			this.dz = this.dzz
		}
    }
    //makes the objects fall
    static fall(x,obj)
    { 
        
        //makes the objects fall
        if(x == true)
		{
            
			obj.dx = 0
		    obj.dz = 0
            obj.dy = Math.abs(obj.dy)
            

        }
        //sets the movement of the objects to its previous value
		else
		{
			obj.dx = obj.dxx
			obj.dy = obj.dyy
			obj.dz = obj.dzz
		}
    }
}

class Circle extends TwoD
{
    //updates the status of the objects (moves the object)
    update(s,g)
    {
        //changes the direction
        this.x+=this.dx
		this.y+=this.dy
		
		
		push()
        //makes the objects drawn into a texture
        if(g)
        {
            //sets colours to the objects
            g.fill(this.c);
            
            //draws the ellipses
            g.ellipse(this.x,this.y,this.size*s,this.size*s);
            //limits the movement of the objects
            this.boundary();
            
            
        }
        //draws the objects on a canvas
        else
        {
            //sets colours to the objects
            fill(this.c)
            //draws the ellipses
            ellipse(this.x,this.y,this.size*s,this.size*s);
        }
		
	  	
		pop()
    }
    
    //bounds the circles so that it can't go outside of the canvas
    boundary()
	{
        //condition for boundary
		if(this.x <(-(width/2)+(this.size)/2) || this.y <(-(height/2)+(this.size)/2) || this.x > (500-(this.size)/2) || this.y > (300-(this.size)/2))
		{
			//bounces back the cricle
			this.dx = -this.dx;
			this.dy = -this.dy;
		}
    }
    freeze()
    {
        
        
        //freezes the objects
        if(this.move == false)
		{
			
		this.dx = 0
		this.dy = 0
		
		

        }
        //sets the movement of the objects to its previous value
		else
		{
            
			this.dx = this.dxx
			this.dy = this.dyy
			
		}
    }
    
}

class Cube extends ThreeD
{  
    //updates the status of the cubes (moves the cubes)
    update(s)
    {
        //changes the direction
        this.x+=this.dx
		this.y+=this.dy
		this.z+=this.dz
		//this.c=color(random(255),random(255),random(255), 255)
		push()
        //moves the cube 
		translate(this.x,this.y, this.z)
		//rotates the cube	
		if(this.move == true)
		{
		rotateX(frameCount * 0.01 * this.rotX);
		rotateY(frameCount * 0.01 * this.rotY );
        //stops the rotation of the cubes
		}
		else
		{
		rotateX(this.rotXX)
		rotateY(this.rotYY)
        }
        //sets colours to the cubes
        fill(this.c);
        //changes the size of the cubes depending on the volume
        box(this.size*s, this.size*s, this.size*s);
            
        pop()
            
    
    }
    
}
class Sphere extends ThreeD
{
    //updates the status of the spheres (moves the spheres)
    update(s)
    {
        //moves the spheres
        this.x+=this.dx
		this.y+=this.dy
		this.z+=this.dz
		
        push()
        //moves the sphers
        translate(this.x,this.y, this.z)
        //gives colours to the spheres
		fill(this.c)
	    sphere(this.size, 24, 16);
		pop()
    }
}





