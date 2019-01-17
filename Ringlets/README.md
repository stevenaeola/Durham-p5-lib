Adapted from https://www.openprocessing.org/sketch/105410 by Michael Groufsky
Used under the license
https://creativecommons.org/licenses/by-sa/3.0/legalcode
# Ringlet
##### This class can be used to create a sketch on a canvas or to use as a texture on an object
This sketch creates a set of rings which will then follow the mouse at you move it up and down. To initialise the sketch you must create a new Ringlet object and then call .createRings((yourobject).NumberOfRings) in the setup function to create the rings.

## constructor(Diameter,Tilt,Thickness,NumberOfRings,Sets,Speed,BackgroundColour,InnerColour,OuterColour)
The constructor can take 9 variables as arguments which allows the sketch to be fully customised as it is created.
* Diameter
  * This attribute controls the width of the rings in the sketch, the default value is 30. Increasing the value will spread the rings further out and decreasing will bunch the rings together and decrease the overall width of the sketch
* Tilt
  * This attribute changes the rotation of the set of rings, the default value is 10. Increasing the value will tilt the set towards the user and decreasing will tilt it away.
* Thickness
  * This attribute changes the thickness of the set of rings, the default value is 20. Increasing the value increases the thickness and decreasing the value decreasing the thickness of each ring.
* NumberOfRings
  * This attribute changes the number of rings that make up a set of rings, the default value is 5.
* Sets
  * This attribute changes the number of sets of rings, this class can support any number of sets between 1 and 5. With 1 the set will follow the mouse, when there are 2 sets one will follow the mouse and the other will in the opposite direction. 3 means that there will be one set on the middle of the screen, 4 means there is the same setup as 2 however with a set in between the old set and the middle and 5 is the same as 4 only with a set in the middle.
* Speed
  * This attribute changes the speed at which the outer rings follow the inner ring, the default value is 0.2. The more the value is increased the closer the outer rings will follow.
* Background Colour
  * This attribute changes the background colour of the sketch, the original value is #111122.
* Inside Colour
  * This attribute changes the colour of the inside of the ring, the original value is #663333.
* Outer Colour
  * This attribute changes the colour of the outside of the ring, the original value is #448888.

## createRings(num,r)
This function must be called if you want to change the number of rings in a set or the number of sets. It takes the values num, which is the number of rings in a set, and r, which is passed in when the sketch is being used as a texture. r must be passed in so the correct value for the middle of the cube is used when drawing whereas when r is not passed in the middle of the canvas is used as the x value.

createRings(num,r){
  if(r){
  this.ringX = [];
  this.ringY = [];
  this.ringK = [];
  for (var i = 0; i < num * this.Sets; i++) {
    this.ringX[i] = 360;
    this.ringY[i] = 360;
    this.ringK[i] = i%this.NumberOfRings + 1;
  }
  }else{
    this.ringX = [];
    this.ringY = [];
    this.ringK = [];
    for (var i = 0; i < num * this.Sets; i++) {
      this.ringX[i] = 0.5 * width;
      this.ringY[i] = 0.5 * height;
      this.ringK[i] = i%this.NumberOfRings + 1;
    }
  }
}

## drawCurl(x,y,r,s,t,r2)
This function created the shapes that make up the rings, the first 5 parameters are used in the drawing process whereas r2 is passed in only when the sketch is being used as a texture. The if statement checks if you have passed in a p5.Renderer then either draws to there or straight onto the canvas.

drawCurl (x,y,r,s,t,r2) {

    if(r2){
      r2.push();
      r2.translate(x, y);
      r2.beginShape();
      r2.vertex(-r, -t);
      r2.bezierVertex(-r, s - t, +r, s - t, +r, -t);
      r2.vertex(+r, +t);
      r2.bezierVertex(+r, s + t, -r, s + t, -r, +t);
      r2.endShape(CLOSE);
      r2.pop();
    }else{
      push();
      translate(x, y);
      beginShape();
      vertex(-r, -t);
      bezierVertex(-r, s - t, +r, s - t, +r, -t);
      vertex(+r, +t);
      bezierVertex(+r, s + t, -r, s + t, -r, +t);
      endShape(CLOSE);
      pop()
    }  
}

## draw(r)
The main function which should be called every frame, r is again only passed in when the sketch is going to be used as a texture. The draw functions created the values that are then passed into drawCurl which actually does the literal drawing. It contains a case select statement which creates the y value for each of the sets of rings once the number of sets is larger than 1. All of the y values are based of the position of the original set which is controlled by the mouse.

## setRingNumber(ringNumber,r)
This function changes the attribute NumberOfRings, r must be passed in as it must also call createRings() using the new value for NumberOfRings. ringNumber is the new value for NumberOfRings and r is passed in if it is going to be used as a texture. This function changed the NumberOfRings value as well as calling createRings which is needed to change the number of rings.

setRingNumber(ringNumber,r){

    this.NumberOfRings = ringNumber;
    if (r){
      this.createRings(this.NumberOfRings,r);
    }else{
      this.createRings(this.NumberOfRings)
    }
}

## setDiameter(diameter)
This function changes the attribute Diameter of the object. diameter is the new value for the attribute.

setDiameter(diameter){

    this.Diameter = diameter;
}

## setTilt(tilt)
This function changes the attribute Tilt of the object. tilt is the new value for the attribute.

setTilt(tilt){

    this.Tilt = tilt;
}

## changeNumberOfSets(numberOfSets,r)
This function changes the attribute Sets, r must be passed in as it must also call createRings() using the new value for NumberOfRings. numberOfSets is the new value for Sets and r is passed in if it is going to be used as a texture. createRings must be called as you are changing the overall number of rings in the sketch.

changeNumberOfSets(numberOfSets,r){

    this.Sets = numberOfSets;
    if (r){
      this.createRings(this.NumberOfRings,r);
    }else{
      this.createRings(this.NumberOfRings)
    }
}

## setSpeed(speed)
This function changes the attribute Speed of the object. speed is the new value for the attribute.

setSpeed(speed){

    this.Speed = speed;
}

## setBackgroundColour(colour)
This function changes the attribute BackgroundColour of the object. colour is the new value for the attribute. It adds a '#' in front of the six digit hexadecimal number so it is used as a rgb value. By default if a unsupported value is entered it will display white.

setBackgroundColour(colour){

    this.BackgroundColour = '#' + colour;
}

## setInnerColour(colour)
This function changes the attribute InnerColour of the object. colour is the new value for the attribute. It adds a '#' in front of the six digit hexadecimal number so it is used as a rgb value. By default if a unsupported value is entered it will display white.

setInnerColour(colour){

    this.InnerColour = '#' + colour;
}

## setOuterColour(colour)
This function changes the attribute OuterColour of the object. colour is the new value for the attribute. It adds a '#' in front of the six digit hexadecimal number so it is used as a rgb value. By default if a unsupported value is entered it will display white.

setOuterColour(colour){

    this.OuterColour = '#' + colour;
}

# Example
There are two html pages which act as an example of how the Ringlet class can be implemented and modified. One shows just the sketch and the other shows the sketch on all sides of a cube.

The forms on each page have the same function and take the same values.

## Number of Rings
This form takes an integer with a default value of 5. When a value is entered the functions setRingNumber and createRings are called passing the entered value as a parameter.

## Diameter of Rings
This form takes an integer with a default value of 30. When a value is entered the function setDiameter is called passing the entered value as a parameter.

## Tilt of Rings
This form takes an integer with a default value of 10. When a value is entered the function setTilt is called passing the entered value as a parameter.

## Number of Sets
This selection box has a default value of 1. When a different option is chosen the function numberOfSets is called passing the chosen value as a parameter.

## Speed of Rings
This form takes an decimal with a default value of 0.2. When a value is entered the function setSpeed is called passing the entered value as a parameter.

## Background Colour
This form takes a six digit hexadecimal number which represents a rgb value. When a value is entered the function setBackgroundColour is called passing the entered value as a parameter.

## Colour of Inner Ring
This form takes a six digit hexadecimal number which represents a rgb value. When a value is entered the function setInnerColour is called passing the entered value as a parameter.

## Colour of Outer Ring
This form takes a six digit hexadecimal number which represents a rgb value. When a value is entered the function setOuterColour is called passing the entered value as a parameter.

## Change to 3D/2D
This button loads the other example page which will either show just the sketch or the sketch on a rotating cube.
