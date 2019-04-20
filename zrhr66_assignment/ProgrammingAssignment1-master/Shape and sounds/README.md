

# Sounds and cubes

  - Cubes and sound is a program that draws objects if the user clicks on the screen. If the microphone is enbaled, the objects will be enlarged if there is a lound noise. There are multiple functionalities that are available that can be looked up in the 'examples' section. 
The original code can be found [here](https://www.openprocessing.org/sketch/569405)

# Tutorial
- click on the canvas to draw a shape
- to change a shape click the dimension of the shape and click the shape name
- press freeze to freeze
- press fall to make the objects fall
- before pressing freeze or fall press resume first
- use the sliders and the 'set colour' button to change the colour
- press reset canvas to reset the entire canvas
- pressing enable 2d click will disable drawing any kind of shape
- to manipulate the perspective of the camera press SHIFT while moving the mouse to go left, right, up or down. press CTRL and move the mouse up or down to zoom in or out.


Shape:
```sh
class Shape
```
The class that is used to create an object that will control the behaviour of the shapes and contain the necessary variables to do so.

Constructor:
```sh
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
        this.width = w;
        this.height = h;
        colorMode(HSB,255);
        var canvas = createCanvas(1000,600,WEBGL);
        canvas.parent('sketch');
    }
```
The class that is used to create an object that will control the behaviour of the shapes and contain the necessary variables to do so.

resetcanvas:
```sh
resetcanvas()
    {
        //arrays that hold the shape objects, such as cubes spheres and ellipses
        this.cubes = [];
        this.spheres = [];
        this.ellipses = [];
        
    }
```
This function will set the arrays that contain the objects into an empty array. Takes no arguments.

setshape:
```sh
setshape(x)
    {
        //resets the canvas before drawing
        resetcanvas();
        
        //enables interaction with the 2D shape
        this.enable2Dclick = false;
        //sets the shape
        this.choices = x;
    }
```
Sets the shape of the object that is to be drawn on the canvas. This is done by changing the field inside the Shape class

enable 2D:
```sh
 enable2D(x)
    {
        //sets the variable to whatever x is
        this.enable2Dclick = x;
        
    }
    Changes the value of a field inside the class that would enable interaction with the 2D
```
Fields:
```sh
x
```
True or false

 object.

change D:
```sh
changeD(x)
    {
        //sets the variable to whatever x is
        this.D = x;
        //resets the canvas
        Shape.resetcanvas();
    }
```
Fields:
```sh
x
```
Dimension of the shape

setcolour:
```sh
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
```
A function that will set the colour for all the shapes displayed on the canvas. The function will check the shape that is displayed (by using the switch statement) and will change the colours accordingly. The switch statement will check the value of 'this.choices' and will apply the colour for each object within an array

Fields:
- hue: hue of the colour
- saturation: saturation of the colour
- brightness: brightness of the colour
- this.choices: shape of the objects on the canvas

freeze:
```sh
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
```
A function that freezes all objects on the canvas by changing the values of the variables involved in translating the objects.
Fields:
- x: True or false
If false, then freeze. If true, then resume.

Fall:
```sh
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
```
draw:
```sh
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
            
            
            //this.ellipses[i].erase();
            this.ellipses[i] = this.ellipses.filter(x => x !== this);
        }
        }
        
        
    }
```
The draw function updates the status of the objects on the canvas, and it also checks for events.  'cameraX' and 'cameraY' are variables that are used to change the camera perspective. The camera perspective can be changed by pressing 'SHIFT' to move the camera around at a certain depth and by pressing 'CTRL' to zoom in and out. The position of the cursor on the canvas determines the camera perspective. Scrool up/down while pressing 'CTRL' to zoom in and out. Move the mouse around the canvas while pressing 'SHIFT' to move the camera perspective. The 'mouseIsPressed' value is used to add objects (shapes) to the arrays. 

Fields:
- this.choices: shape selected

TwoD:
```sh
class TwoD
```
The class that serves as the parent class of the 'Circle' class.
constructor:
```sh
 constructor()
    {
        //position
        this.x = mouseX-width/2;
        this. y = mouseY-height/2;
        //speed
        this.dx = random(-5,5);
        this.dy = random(-5,5);
        //speed
        this.dxx = this.dx;
        this.dyy = this.dy;
        //colour
        this.c = color(random(255),random(255),random(255),random(255));
        //size
	    this.size = random(25,60);
	    this.selected = true;

    }
```
contains the fields that will be used to draw and manage the 2D objects

Getters and setters:
```sh
get x()
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
    }
```
Freeze:
```sh
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
```
Freezes the 2D object by setting the speed to zero. This can also be used to resume to object by setting the speed to the previous value.

Fields:
- x: if true, then freeze object. If false, then resume object movement

fall:
```sh
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
```
Makes the 2D object move vertically.

Fields:
- x: If x is true, then object will fall. If x is false, then object will move normally again.

ThreeD:
```sh
class ThreeD
```
A class that becomes the parent class of 3D objects.

Constructor:
```sh
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
```
The constructor takes no argument and is used to define the variables needed to create and manage the behaviour of 3D objects, such as cubes and spheres.

Getters and setters:
```sh
    get x()
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
    }
```
Freeze:
```sh
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
```
Freezes the 3D object by changing the value of its speed and rotation.

Fields:
- this.move: If false, then the object will be frozen in place. Otherwise, it will continue its initial movement

fall:
```sh
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
```
Makes the 3D objects fall by changing their velocities.
Fields:
- x: If true, then make objects fall. Otherwise, object will move normally again.
- obj: The object affected is the object passed as the parameter

Circle:
```sh
class Circle
```
A class that will be used to create circle objects

update:
```sh
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
```
Updates the status of the circles (moving the circles). If the parameter g is a createGraphics object, then the circles will be drawn on a cube surface. Otherwise, it is drawn on a regular canvas.

Fields:
- s: a size that is determined by the volume surrounding the mic
- g: a createGraphics object that is used so that the circles can be drawn on a cube.

boundary:
```sh
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
```
The boundary function doesn't let the circle objects to go beyond the canvas. Therefore, it will stay within it. The circles will bounce back instead with the same speed.

Freeze:
```sh
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
```
Freezes the circle objects

Cube:
```sh
class Cube
```
Creates a cube object. This class contains a function to draw cubes. This class inherits from ThreeD.

update:
```sh
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
```

Updates the status of the cube (draws the cubes). If this.move is true, then the cubes will rotate. Othwerise, it weill not rotate.

Fields:
- s: A number that will increase in size as the sound surrounding the microphone increases

Sphere:
```sh
class Sphere
```
A class that inherites from TwoD. This class will be used to create sphere objects on the canvas.

update:
```sh
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
```
Updates the sphere objects (moves the sphere around). 

Fields:

- s: a number that varies in size depending on the volulme surrounding the microphone


