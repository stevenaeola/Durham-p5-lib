## Licence
"Waves_practice" by Wenjhttp://www.openprocessing.org/sketch/611317Licensed under Creative Commons Attribution ShareAlikehttps://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/

# Explanation about index.html
*The entire starting part*

Declare the document as html type so that it can be read, language as English.
```
<!DOCTYPE html>
<html lang="en">   
```

---------
## Head part
Declare page title as "Programming assignment".
```
<head>
      <title>Programming assignment</title>
```
Link to the p5.js library.
```
		<script type="text/javascript" 
src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>
```
Link to the index.js file.
```
		<script src="index.js"></script>
```
Link to the wave.js file.
```
		<script src="wave.js"></script>
    </head>
```
The "head" part is over. Next start the "body" part.
## Body part
Setup a form in html file, and the id for the form is "color_form" which is related to the function in index.js file.
```
 <body>
	 <form id="color_form">
```
Setup a label which says "Change the color of the wave", relating to the dropdown with the id "color".  The property of of the label is 20px font-size.
```
          <label for="color" style="font-size: 20px">Change the color of the wave.</label>
```
Establish a dropdown list to change the color of the wave. One important thing is that the id "color" for the dropdown list connects the color to the other two files (index.js and class.js) as a changeable variable.
```
          <select id="color" name="color">
```
To populate the dropdown list, I have added multiple <option> elements, each with a value attribute. By default, only one of these options can be selected. The text rendered is the text included between the opening and closing <option> tags.
```
              <option value="white">white</option>
              <option value="red">red</option>
              <option value="orange">orange</option>
              <option value="yellow">yellow</option>
              <option value="green">green</option>
              <option value="blue">blue</option>
              <option value="purple">purple</option>     
              <option value="black">black</option>
          </select>
      </form>
```
And I also created a paragraph to reminder people to click the mouse so that they can see the wave stopping and changing. The property of the paragraph is 15px  font-size.
```
      <p style="font-size: 15px">Then try to click the mouse.</p>
```
```
    </body>
```
The body part is over.
```
</html>
```
The entire html file is over.


# Explanation about index.js
## Connected with class
Definite a global variable named wave.
```
var wave;
```
_______
*Function Setup()*
The setup() function is called once when the program starts. It's used to define initial environment properties.
```
function setup() {
```
Create a canvas with 1000 pixels width and 700 pixels height.
```
    createCanvas(1000,700);
```
Set the color used for background of the canvas to black.
```
    background(0);  
```
Set the variable as a new class. 
```
    wave = new Wave;
}
```
That is all for the function setup() part. 
_______
*Function draw()*
The draw() function continuously executes the lines of code contained inside its block until the program is stopped, just like a loop.
The meaning of the next two line is to get the draw and click methods inside the class. Because the property of the draw() function, the draw and click methods will execute over and over again.
```
function draw() {
    wave.draw();
    wave.click();
}
```

## Connected with html
Add DOM to the html.

```
document.addEventListener("DOMContentLoaded", function(){
```
Set a variable to execute the changeColor event.
```
    var cc = document.getElementById("color");
```
Create a function named changeColor. This function is like a callback function. As soon as there is a right syntax for "changeColor" outside the function, it will calls back to this function.
```
    function changeColor(event){
```
This line means that the value of the variable color in the constructor of the class() will equals to the value which the user have chosen in the dropdown list of the html page. The id "color" for the dropdown list is the same as  the color variable inside the constructor.
```
	   let color = document.getElementById("color").value;
```
After getting the color value, turn to the setColor() method inside the class() to change the color of the wave.
```
	   wave.setColor(color);
    }
```
Then get the changeColor function.
```
    cc.addEventListener("change", changeColor);
```
Furthermore, we need another variable so as to submit the action and finally execute.
``` 
    var cf = document.getElementById("color_form");
    cf.addEventListener("submit", function (event){
    event.preventDefault()});
});
```
# Explanation about class.js
Class in p5.js
```
class Wave {
```
*constructor()*
The constructor (note no variable declarations above the constructor). Wave has 3 arguments, ypos, num and color. The constructor() is like the function setup().
The argument color is used for color change, relating to another two index files.
```
    constructor(ypos, num, color){
```
"this" refers to the variables in the class. Need to use this in front of all variables.
--ypos : the starting y coordinate of the wave with original value "450".

--num: the number of the ranges of the wave with the original value "10". The bigger the value of num is, the closer the wave will be.

--color: change the color of the wave with original value "white". 

--fra: controls the number of frames that have been displayed and also the z-coordinate in noise space. The bigger the value of fra is, the faster the wave will change. 

--noisex: control the x-coordinate in noise space

--noisey: control the y-coordinate in noise space

--mapstop1: the upper bound of the value's current range, used in map().

The first three arguments has been defaulted. They all have original values. In addition, when new values are given to them, the original ones will be ignored.
```
        this.ypos = ypos || 450;
        this.num = num || 10;
        this.color = color || "white";
        this.fra = 0.02;
        this.noisex = 0.001;
        this.noisey = 0.01;
        this.mapstop1 = 0.4
    }
```
____
*draw()*

The draw() function begins with a for() loop, which is used to draw the aimed number of ranges.
```
    draw() {
        for (let i = 0; i < this.num; i++) {
```
Then re-map i from the wave range to the grey color range. Thus, there are many different shades for the wave, like the color of real "wave".
```
            let paint = map(i, 0,this.num, 0,255);
            stroke(paint);
```
Using the beginShape() and endShape() functions allows creating the more complex forms below. beginShape() begins recording vertices for a shape and endShape() stops recording.
```
            beginShape();
```
Inside the beginShape(), there is an another for() loop. This loop is used to draw more specific parts of the wave and also make it "waving". 
The entire width of the wave is the same as the width of the canvas. The starting x-coordinate of the ellipse is -10 and the gap between each ellipse is 20 pixels.
```
            for (let x = -10; x < width+11; x+=20) {
```
By using the noise() function, p5.js can compute the 3D noise depending on the number of coordinates given.  The noise value can be animated by moving through the noise space.
--x*this.noisex equals to the x-coordinate in noise space
Draw the ellipses in the x-axis, relating to the current value of i.
	
--i*this.noisey equals to y-coordinate in noise space
Draw the ellipses in the y-axis, relating to the current value of x.

--frameCount*this.fra equals to z-coordinate in noise space.
Make it waving in z-axis. Because the system variable frameCount contains the number of frames that have been displayed. The bigger the value is, the faster wave will be.

--r equals to the noise value. It is a Perlin noise value (between 0 and 1) at specified coordinates.
```
                let r = noise(x*this.noisex, i*this.noisey, frameCount*this.fra);
```
Re-map the range of noise value with the range of y-coordinates.
```
                let y = map(r, 0,this.mapstop1,0,this.ypos);
```
No outline for every ellipse.
```
                noStroke();
```
Fill each ellipse with changeable color, relating to the chosen value of dropdown list on the page.
```
                fill(this.color);
```
Draw ellipse in position(x,y), and the radius of the circle is 1 pixel. 
```
                ellipse(x,y,1,1);
```
End the loop inside the beginShape() and endShape().
```
            }
```
End shaping.
```
            endShape();
```
End the loop outside the beginShape() and endShape().
```
        }
```
End draw()
```       
    }
```
____
*click()*

Begin click() function.
```
    click() {
```
The boolean system variable mouseIsPressed is true if the mouse is pressed and false if not. If mouse is pressed, then execute the following actions, else, execute other actions.
```
        if (mouseIsPressed) {
```
Change the x-coordinate in noise space.
```
            this.noisex = 0.01;
```
Change the y-coordinate in noise space.
```
            this.noisey = 2;
```
Change the range of noise value.
```
            this.mapstop1 = 1;
```
Change the number of frames displayed to 0, that is, when you clicked mouse, the wave will stop waving.
```
            this.fra = 0;
```
If mouse is released, the value of frameCount will change back to it original value, waving again. But the values of this.noisex, this.noisey, and this.mapstop1 won't turn back.
```

        } else{
            this.fra = 0.02;
```
End if()
```
        }
```
End draw () function
```
    }
```
____
*setColor()*

This function is related to the DOM used in the page, in order to change the color of wave.
```  
    setColor(color) {
        this.color = color;
        fill(this.color);
    }  
```
End class()
```
}
```



