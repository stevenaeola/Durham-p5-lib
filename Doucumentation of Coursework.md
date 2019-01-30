# Doucumentation of Coursework
## Ⅰ. Introduction

In my coursework, I have selected a skectch from [openprocessing.org](https://www.openprocessing.org/) and adapt it into a reusable component based on **Javascript** and **p5.js**. What 's more, it is necessary to build an example page with properties controlled by form control. My targeted sketch is a [moon](https://www.openprocessing.org/sketch/389855) which looks like a moon and it is made by a lot of lines . The process is a little complicated and I will explain it detailedly later.

##  Ⅱ . Explaination of Methods and  parameters
 
First, I will explain the parameters. I do four parameterisations including defaults.
+ The parameter which is named appearanceConstant controls the speed of showing up of the pattern.  This parameter doesn't control the speed directly. It is just related to the speed.  I default it in 0.125. The best value for this parameter is between 0.1 and 0.2. If the value is too big, the pattern will show up directly and you can't enjoy this process. It is also related to the quality of the pattern.

+ The parameter named colour controlled the colour of background. I default it as string 'black' because the moon made by a lot of white lines stands out with black background.

+ The parameter named width is related to lines and the radius of the circle. I default the width as 600.

+ The parameter named radiusConstant controls the radius of circle. The radiusConstant doesn't control the radius directly. It just affects the radius. I default this parameter as 2.1.

Then, I will explain the methods in my class.

+ These two methods **get appearanceConstant()** and **set appearanceConstant(val)** are set for change the value of the parameter appearanceConstant by using set and get method. The reason why these two methods use this._appearanceConstant but not this.appearanceConstant is using this.appearanceConstant will result in **Uncaught RangeError: Maximum call stack size exceeded**. Everytime the process run **this.radiusConstant = radiusConstant** will use the method **set radiusConstant()**. In the method **set radiusConstant()**,    **this.radiusConstant = radiusConstant** will be implemented again. It will be an endless process so it will result in error.
+ These two methods **get width()** and **set width(val)** are in same functions with that two methods above. However, if you change the width into a negative value. It will throw an error and tell you **Wrong value**.
+ The method **setColour(colour)** is a method for setting background colour. 
+ The method **setRadiusConstant(radiusConstant)** is used for changing the radius of the abstract circle. The reason for setting an extra line for **background(this.colour)**  is for refreshing the page other wise the pattern has been created won't disappear.
+  The method **setAppearanceConstant(appearanceConstant)** is same with **setRadiusConstant(radiusConstant)**.
+ The method **draw()** is the main method in the class. Combined draw function in p5.js and this method, pattern will show up.

## Ⅲ On -page Control

I set an on-page control in my HTML page. Changing the form will will adjust the parameter in the object and the sketch will be visually adjusted.

+ The colour of background:
    You can change the colour of background in HTML page by selecting the colour you want. This is insipired by the programming class of DOM.

+ The radius of the abstract circle.
	 You can select what the size of the abstract circle by selecting the mode.

+ The quality of pattern.
	You can select the quality of this pattern by selecting the mode.

## Ⅳ Explaination of code

In this part, I will explain each line of code if it is necesary. Totally, I use three files. Two of javascript files and one of html files. They are **index.html**, **Operation.js** and **Pattern.js**.
### index.html
In this part, I will explain the code which is necessary in my first file. (**index.html**). 
You can see basic HTML structure. In the head part, I use three <script> to import. The first one imports the content in p5.js library such as the functions and variables in p5.js. The second one imports **Pattern.js** file which is a class I have rewrtten from the code in openprocessing. The third one imports **Operation.js** file which is used for control the html page.

In the body part, I set ID for form which is used for the interaction between the javascript file and the Doucumentation Object Model(DOM). It 's an 
on-page control.

### Operation.js

In this part, I will explain the code in the second file (**operation.js**).
In the first line, I define a variable named b to copy a sample of my class.

Then I set **function setup(){}** which is a necessary part in p5.js. It is used to make preparation of the pattern you want to draw. I import my class from the third file and set up the size of canva. Finally, I use a method in class for setting the colour of background.

The other necessary part of p5.js is **draw()**. I use a parameter named graphic as optional p5 renderer. If you set up a background pattern and define it as graphic(name). You can draw the pattern based on the background pattern. If you don't define it, you can get the original pattern.

The last part is creating a interaction between javascript file and HTML file. I have set three ID in HTML page and parameters in the other . Then use the document function to finish it.

### Pattern.js

In this part, I will explain the code in the last file but the most important file (**Pattern.js**).

First, I set up a class named Pattern by using a class declarations. Then I set up a constructor method which is an important part of class in javascript. I do parameterisation for five properties of this pattern which means you can change the parameters in the class to get a visually adjust of the content of HTML page. I also do encapsulation and default value for parameters in the constructor method such as **this.colour = colour || 'black'**. **||** is used for defaulting value.

I have explained all the methods except **draw()** in the **Explaination of Methods and  parameters**. Let's see the code in **draw()**.

First, I define an array named pathPoints to store the vectors I will use to draw that abstract moon which are made by a lot of lines. Then I define the radius of a circle which is a scope for lines to appear, which means most of lines should appear in the area of that circle. I also define two angles use the function **randomGauian** in p5.js to make sure all of the line will appear in a random order. Then I define that two vector. **(This.width/2,this.width/2)** is the centre of the circle. By using of math knowledge, you can know that two vectors starts from the centre of the circle. Finally, I store these two vectors in the array (pathPoints) for further use.  Compared with the original code, I  break the **function complexifyPath(pathPoints)** and rewrite the code to fit the method.
Then, there is a for loop in for loop for creating points. This is a recursive part, which means this programming with create endless points and lines to fill the circle. In this part, I create an empty array named **newPath** to store vectors.
Then define some useful variables and create two vectors. Repeating this process. Finally, append the last vector and use line function to make points become lines.

##V Source of initial code acknowledged 
Online licence:
"Electric Sphere" by David Crooks
http://www.openprocessing.org/sketch/389855
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/





 

