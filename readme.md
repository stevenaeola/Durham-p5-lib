# Steering Behaviour Text Reusable Component

# Table of contents
[Introduction](#Introduction) \
[Methods](#Methods) \
[Miscellaneous Methods](#Miscellaneous-Methods) \
[Constructor](#Constructor) \
[Setters](#Setters) \
[Getters](#Getters)
# Introduction
The **Steering Behaviour Text Reusable Component** is a library created for P5.js that facilitates the creation of text made up of points that react to your mouse (awfully specific, but still rather cool)! This is made possible through having a PointText class. The code was adapted from [Martine Hage](https://www.openprocessing.org/sketch/593221)'s work, although that code was a modification of [Daniel Shiffman](https://thecodingtrain.com/)'s code! The idea is that I modified the code originally created by these two people, developped it, and then created a JavaScript reusable component out of it. If you want to test out an interactable example, you can follow [this](https://conradian.github.io/Steering-Behaviour-Text-Reusable-Component) link.

Here's an example (you can't interact with it here though)!

![Potato](https://i.ibb.co/BP7HCT6/Capture.png)

# Methods
The following sections will be related to the several methods that can be used. Please note that "text" is some arbitraty object pertaining to the PointText class.
# Miscellaneous Methods
### Constructor
##### How to call
``` javascript
var text = new PointText(x, y, text, fontSize, density, pointSize, type, color, font, renderer);
```
##### Parameter Explanation
**x:** x-coordinate of where to draw the text (calculated from the very right).
**_Default = 0_**

**y:** y-coordinate of where to draw the text (calculated from the very top).
**_Default = 0_**

**text:** the string corresponding to what text to draw.
**_Default = 'Default Text'_**

**fontSize:** the number corresponding to the size of the text drawn. Note that this isn't how large the particles are, but rather how large the text itself is.
**_Default = 64_**

**density:** the number corresponding to the density of the particles making up the text. The higher the number, the more tighly packed the particles will be. Note that the higher the density the more particles will be drawn, which can have a negative impact on performance.
**_Default = 0.3_**

**pointSize:** the number corresponding to the size of the particles making up the drawn text.
**_Default = 3_**

**type:** a string that corresponds to the particle type. The current       options are: 'square', 'point', or 'triangle'. If a parameter other than one of these is input, then it will simply default to 'point'.
**_Default = 'point'_**

**color:** the hexadecimal number in the form of a string corresponding to the color of the drawn text. For example, '#FFFFFF'.
**_Default = '#FFFFFF'_**

**font:** the font to draw the text in.
**_Default = loadFont('https://punrad.github.io/SteeringBehaviorTextModified/SketchFolder/TTWPGOTT.ttf');_**

**renderer:** a P5.renderer object to draw the component to. Must enable WEBGL in the P5.js-speific draw function for this to work.
**_Default = no renderer_**

##### Note
Default values will be used if the parameter is left unspecified. However, to unspeficy it, you won't be able to specify any of the parameters that come after it. For instance, if you don't want to specify the fonSize, then the following parameters will also have to use their default variables: density, pointSize, type, color, font, and renderer.
### draw
``` javascript
//How to call
text.draw();
```
**Note**
This function doesn't output anything, or take in any values. It's simply used  to draw the text. This function should be called in the P5.js draw function so  that it can be updated at every frame and react to the mouse. In the case that  you want to stop drawing the text, you can code the following:
``` javascript
//Example code for not drawing
text.setHidden(true);
```

### toggleFreeze
``` javascript
//How to call
text.toggleFreeze();
```
**Note**
When a PointText object is frozen, it will no longer react to the mouse and each particle will stay fixed in its position (even if they are out of place due to  moving away from the mouse). If the text this function is performed is unfrozen, then it will freeze it. If it is frozen then it will unfreeze it.

### reset
``` javascript
//How to call
text.reset();
```
**Note**
This function resets the PointText object and re-draws it. This is normally not used, since the primary use of this is to reset the object after setters are used. However, it might be useful in some circumstances.


# Setters
Below you will find a list of all setters along with an explanation regarding how they function. Note that all of these functions don't return anything, they simply set an object's variable to the inserted parameter. Note that if you attempt to set a variable to a data type that it should not be, then it will automatically changed
#### setHidden
``` javascript
//How to call
text.setHidden(state);
```
**Inputs** \
state: a boolean represeting whether the text is shown (true) or not (false).

#### setText
``` javascript
//How to call
text.setText(stringText);
```
**Inputs** \
stringText: the string to be drawn out of the points.

#### setType
###### Important Note: Possible parameters are "square", "point", or "triangle"
``` javascript
//How to call
text.setType(particleType);
```
**Inputs** \
particleType: a string that corresponds to the particle type. The current options are: 'square', 'point', or 'triangle'. If a parameter other than one of these is input, then it will simply default to "point".

#### setFontSize
``` javascript
//How to call
text.setFontSize(size);
```
**Inputs** \
size: the number corresponding to the size of the text drawn. Note that this    isn't how large the particles are, but rather how large the text itself is.

### setParticleSize
``` javascript
//How to call
text.setParticleSize(size);
```
**Inputs** \
size: the number corresponding to the size of the particles making up the drawn text.

### setParticleDensity
``` javascript
//How to call
text.setParticleDensity(density);
```
**Inputs** \
density: the number corresponding to the density of the particles making up the text. The higher the number, the more tighly packed the particles will be. Note that the higher the density the more particles will be drawn, which can have a negative impact on performance.

### setColor
``` javascript
//How to call
text.setColor(color);
```
**Inputs** \
color: the hexadecimal number in the form of a string corresponding to the color of the drawn text. For example, '#FFFFFF'.

### setCoordinates
``` javascript
//How to call
text.setColor(x,y);
```
**Inputs** \
x: the x coordinate at which the object is drawn.
y: the y coordinate at which the object is drawn.


# Getters
All of the getters can be called by doing the following:

```javascript
//getterFunction is only an example function to illustrate a point
text.getterFunction();
```
This is given that the getterFunction is, for instance, getHidden, or getText.

Below you will find the full list detailing all of the getters.
### getHidden
``` javascript
//How to call
text.getHidden();
```
**Outputs** \
A boolean representing whether the object is hidden or not.

### getText
``` javascript
//How to call
text.getText();
```
**Outputs** \
The string the object is drawing.

### getType
``` javascript
//How to call
text.getType();
```
**Outputs** \
The string corresponding to the name of the drawn particle's shape.

### getFontSize
``` javascript
//How to call
text.getFontSize();
```
**Outputs** \
The number corresponding to the font size of the drawn text.


### getParticleSize
``` javascript
//How to call
text.getParticleSize();
```
**Outputs** \
The number corresponding to the particle size of the drawn text.


## getParticleDensity
``` javascript
//How to call
text.getParticleDensity();
```
**Outputs** \
The number corresponding to the density of the drawn text.


## getColor
``` javascript
//How to call
text.getColor();
```

## getColor
``` javascript
//How to call
text.getColor();
```
**Outputs** \
The hexadecimal number in the form of a string corresponding to the color of the drawn text. For example, '#FFFFFF'.

## getCoordinates
``` javascript
//How to call
text.getCoordinates();
```
**Outputs** \
An array in the form of [x,y], where x is the x coordinate of the object, and y is the y coordinate of the object.

## getParticles
``` javascript
//How to call
text.getParticles();
```
**Outputs** \
An array containing all of the particles making up the PointText.
