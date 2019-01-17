# Something you may want to know about the code


## Description

Two code files, *line.js* and *mySketch.js*, are used to support *index.html* to enable users to draw spiral curves by dragging the screen, clicking the screen and entering some numbers. More details are shown below. 

## Codes

### *line.js*

#### Methods and Parameters

* Method (to define a class) - *constructor*.
* Parameters - *point_count, tmp_count, rad, offset, dragging*.
  > It creats new objects and sets required member variables.

* Method - *setProperties*.
* Parameters - *point_count, tmp_count, rad, offset, dragging*.
  > It sets properties for later use.

* Methods - *getPointCount*, *getTmpCount*, *getRad*, *getOffset*, *getDragging*.
* Parameters - NULL.
  > They get properties to get elements at DOM part.

* Methods - *setPointCount*; *setTmpCount*; *setRad*; *setOffset*; *setDragging*.
* Parameters - *point_count*; *tmp_count*; *rad*; *offset*; *dragging*.
  > They get the access of the properties set in the method *constructor*.

* Method - *draw*.
* Parameters - NULL.
  > It sets what will happen when getting different inputs and operations. 
  
#### Use of this class
* This class is a reusable component. The way using it is shown in *mySketch.js*.
  
### *mySketch.js*

#### Functions

* Function - *setup*.
  > It creates an object *myline* and sets its *__proto__*, and initializes the background, text on screen, etc.

* Function - *draw*.
  > It active method *draw* in class *MyLine*.

* Function - *mousePressed, mouseReleased*.
  > The change *dragging* in class *MyLine*.

## Explanation of example

* Click when "dragging" is false - draw curves and lines around the point clicked automatically.

* Change "dragging" to be "true" and click "submit" - draw curves and lines around the pointer automatically.

* Input numbers of "point_count", "tmp_count", "rad" and "offsct" - the style of curves and lines drawn after will change.

## Source of initial code acknowledged
"Line Drawing 01" by Atsushi Tanakahttp://www.openprocessing.org/sketch/589689Licensed under Creative Commons Attribution ShareAlikehttps://creativecommons.org/licenses/by-sa/3.0https://creativecommons.org/licenses/GPL/2.0/

