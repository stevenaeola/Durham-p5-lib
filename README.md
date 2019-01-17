# Author: IokTong Lei
# Original Sketch Author:Masaki Yamabe https://www.openprocessing.org/user/21764
## Original Sketch link:https://www.openprocessing.org/sketch/394718
## License:Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
## **The change author:IokTong Lei had made**
### The sketch had been adapted into reusable component as a javascript class with functions: constructor(), getMagnetism(), getRadius(),getGensoku(), getColorIn(), getNum(), getBright(), setMagnestism(), setRadius(), setGensoku(), setColorIn(), setNum(), Reset(), Stop(), Run(), setPressdrawOn(), setPressdrawOff(), galaxy_setup(), galaxy_draw(). Futhermore, the conditions of looping are changed. All these changes are used for control the process of the sketch.
***
***
***
# Galaxy
##### The target of this project is to adapt a sketch into an reusable component with javascript. 
***
***
## **methods in the galaxyClass.js**
***
### **constuctor**
#### There are six parameters in my constructor-
##### magnetism: the magnetism of stars, 
##### radius: the radius of stars 
##### gensoku: the speed of how fast the stars travel
##### colorIn: the background of the Galaxy
##### num: the number of star connect to the mouse
##### bright: the brightness of stars.From this order,
##### their default orders are 10,0.6,0.95,0(black),1000. 

### **access methods**
#### get methods:
##### getMagnetism(): return the value of this.magnetism
##### getRadius(): return the value of this.radius
##### getGensoku(): return the value of this.gensoku
##### getColorIn(): return the value of this.colorIn
##### getNum(): return the value of this.num
##### getBright(): return the value of this.bright
#### set methods():
##### setMagnetism(): renew the value of this.magnetism
##### setRadius(): renew the value of this.radius
##### setGensoku(): renew the value of this.gensoku
##### setColorIn(): renew the value of this.colorIn
##### setNum(): renew the value of this.num
##### setBright(): renew the value of this.bright

### **setup function**
#### galaxy_setup(): declare and initialize the velocity, accerlation and the (x,y) arrays. It also set up the background of the galaxy and mode of ellipses.

### **draw function**
#### galaxy_draw(colour): colour is used as a parameter for updating the value of this.colorIn. Then draw the galaxy with this.colorIn. There is a for loop within galaxy_draw(colour) for showing tracks of stars. Within the forloop, there are control flows:
##### if(this.stop == 1), then stop drawing the tracks
##### if(this.pressdraw == 1), then change the mode into pressdraw mode which means the user need to press the mouse to show the tracks.
##### if(bright<50), then stars with lower brightness are going to be shown
##### if(bright=50), then stars with normal brightness are going to be shown
##### if(bright>50), then stars with higher brightness are going to be shown

#### The remain codes in the for loop are used to show the tracks of stars with the arrays initialized in the galaxy_setup() function
***
***
***
## **methods in the index.js**

### **setup function**
#### In the setup function, there are only three lines of code which are used for:
##### create a canvas with the screen width as default and can be changed by user anytime they want
##### create a galasy1 by calling new galaxy()
##### run the galaxy_setup() function in galaxy1

### **draw function**
#### In the draw function, it is going to loop the galaxy_draw(Color) function in galaxy1.

### **DOM control**
#### Dom control is used to run the main content first. There are parts for different input fields and buttons:
##### 1.Control Button: It is used for changing the CSS in order to show and hide the control panel.
##### 2.Control the galaxy(canvas) size: It is used for changing the size of the galaxy.
##### 3.Control the process of the galaxy running: It is used for control when should it 
###### stop: run galaxy1.Stop()
###### run: run galaxy1.run()
###### reset: run galaxy1.Reset() and set all text fields blank.
##### 4.Control the galaxy mode: It is used to choose mode between pressdraw and not pressdraw.
##### 5.Control the galaxy elements: It is used to renew elements(magnestism, radius, gensoku, colour, num, bright) in galaxy1.
##### 6.Listeners: It is used to check the changes in the control panel and call the function upon.
##### 7.preventer: prevent the default function for form.

***
***
## **example**
### **HTML**
#### It is linked to galaxyClass.js, index.js and style1.css.
#### In the main body, there are the control panels and the licence staff. 8 input fields(width, length,magnetism, radius of star, speed(Gensoku), number of stars connected, brightness of star, background color) and and 5 buttons(pressdraw On, pressdraw Off, stop, run, reset) are used to do the control panel. Moreover, a nav like button on the right up corner is used for hide and show the control panel by clicking it. Below them, there is the sketch.
### **CSS**
#### It is used to declorate the UI of the example page and importantly the control panel. When the Nav like button is cliked, the javascript will change the class name of the html body and according to the CSS code, the control panel will be shown and hide.
### **How to play**
#### place your mouse on the galaxy to draw your own tracks of stars. You can try different combinations of magnetism, radius of star, speed(Gensoku), number of stars connected, brightness of star, background color and different modes.