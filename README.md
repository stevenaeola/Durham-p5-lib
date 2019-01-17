#### Sketch Original Author: Konstanin Makhmutov
#### License: Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
#### Link to the Original Sketch: https://www.openprocessing.org/sketch/529835
### Things that I've Modified: 
##### 1. Turned the Sketch in to reusable components using JavaScript
##### 2. Add a constructor 
##### 3. Included get and set functions
##### 4. Changed the Colour of the "Particles" in the sketch
##### 5. Experimented with different amounts of "Particles"
##### 6. Modified the Canvas size
##### 7. Added an input box for users to experiment with different parameters with Particles


### Programming Summative Assignment 
### hsrf78

### Project Description 
##### The goal of this assignment was to adapt an OpenProcessing Sketch into a reusable component using JavaScript classes, which contains, an appropriate constructor, multiple **get()** and **set()** methods for properties used in the project, as well as a **draw()** method using p5.renderer as a perameter. 
	
##### I have chosen a project named Stardust, it involves particles representing stardust in space. The particle moves away from your mouse upon mousemovement. There are many changables parameters in this project, which includes colour of the particles, the quantity of the particles, the velocity multiplier constant of the particles, and the distance the particles are from your mouse.

#### **Stardust.js**
### Parameters and Methods
#### Parameters
##### Colour R,G & B:
#####		The colour is controlled by a RGB scale, which is preset, and the user can select the colour they would like the particles to be. 

##### Quantity:
#####		The Quantity of the particles are expressed as integers, the ideal number of particles in the sketch range from 1800 to 10,000. 

##### VelocityMultiply:
#####		This is a constant which will be multiplied by the position of the particle along with the position of the mouse to change the velocity of which the particles will be moving at.

##### controlRange:
#####		This is a constant which controls how far away the particles will be from the mouse. This is a independent variable which will be used along the 

### **Methods**
#### **Set Methods**
#### SetColourR()
##### Updates the value for colour scale - Red, after user input
#### SetColourG()
##### Updates the value for colour scale - Green, after user input
#### SetColourB()
##### Updates the value for colour scale - Blue, after user input
#### SetQuantity()
##### Updates the amount of Particles on the page after user input
#### SetVelocityMultiplier()
##### Updates a value to the independent variable: Velocity Multiplier
#### SetcontrolRange()
##### Updates a value to the independent variable: controlRange, which alters the distance from the cursor to the mouse.
#### **Get Methods**
#### getPositionX()
##### returns the position of the particles in the X axis
#### getPositionY()
##### returns the position of the particles in the Y axis
#### getColourR()
##### returns the Red Colour scale of the particle
#### getColourG()
##### returns the Green Colour scale of the particle
#### getColourB()
##### returns the Blue Colour scale of the particle 

### **Functions**
#### Reset()
##### Resets the Canvas:
##### 1.this.reset is a variable that I've chosen to use to determine if the program need a reset. 
##### 2.This funtion makes the reset statement true. It will reset the canvas, particles and the colour to the original state.
##### 3.It is called below in the draw function in order to update the user inputs linked with HTML.

#### setup()
##### Sets up the Canvas
##### 1. retrives 3 values:(R, G, B) and then put them in the function: stoke() to determine the colour of the particle.
##### 2. Partiles are given 2 random numeric values, one in the x asix, one in the y axis.
##### 3. Then in the following function, it will tell the defined particle what to do. Depending on mouse movement, the particle can stay or it can move away from the cursor.

#### draw()
##### 1. First checks user has changed any parameters in the browser, if so, the this.reset will have a value of 1, which will trigger a reset of everything. 
##### 2. Calculates the path for particle
##### 3. Prints the particle (point with the calculated X,Y coordinates)


### **index.js**
### **DOM**
#### It constantly links the user imput from HTML to the JavaScript document, carrying out actions such as: moving particles around the page, receiving feedback and changing the colour of the particle.
#### addEventlistener: when we use this, the "Javascript is more readable as it is independent or separated from the HTML markup. It also allows for you to add in EventListeners when you do not control the HTML markup." 
#### setup()
##### 1.Creates Canvas
##### 2.Assign parameter values
##### 3.Finish Set up
#### draw()
##### Sets the background colour to 0, and starts the draw function.
#### function openClose(btn)
##### this function creates buttons to open and close the tabs that allows an user to change the parameters of the stardust.
#### stardust_resetPage = document.getElementById("reset");
##### Function to Reset page upon clicking a button, like mentioned above, the this.reset will equal to 1, which will reset the UI page.
It sets the parameters to their default values.
#### Possible Error: DOM's prioity is a bit messy, as it may not run the code in order like they have been wrote in.

### **index.html**
### **HTML**
#### In the HTML page, first, we call the p5 library to run the p5 functions. After, I included a BootSrap Library to make the Interface cleaner and easier to navigate through. Then, I call for the file with the class inside. Below that, I call for my index file, which contains the Eventlistener of which updates the content on the page upon changes being made.  
##### Following are form type inputs where one can put in their desired values for different parameters of the stardust class.  
##### They are: ColourR, ColourG, ColourB, quantity, velocityMultiply, controlRange. 
##### After that, to make the interface cleaner, I've put in a button to close the input menu. 