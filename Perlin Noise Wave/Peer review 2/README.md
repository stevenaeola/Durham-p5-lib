# Class Spirograph

inherits from object

### Description
A class to draw spirographs. Mathematically any centred trochoid can be constructed from this class, that is some tracing some point fixed realative to a circle that is rolling along some other circle. That point does not have to lie in either circle which is where this differes from the spirograph toy.

### Constructor
Spirograph(R, r, rho)
Creates a spirograph with static circle of radius R, moving circle with size r and pen placed rho from the centre of the moving circle.

### Fields
Field | Description | Type
----- | ----------- | ----
R | The size of the static circle | int
r | The size of the moving circle | int
rho | The distance of the pen from the centre of the moving circle | float
rendsize | The desired dimensions of the spirograph, defaults to 500 | int


### Methods
Method | Description | Returns
------ | ----------- | -------
draw(g) | Draws the spirograph on the canvas or the p5 renderer g | null
setr(r) | Sets the field r | null
setR(R) | Sets the field R | null
setRBG(r, g, b) | Sets the brush colour based on RGB values ranging from 0-255 | null

# Example
The image produced below is the result of the draw() method. The form changed the realavent paramaters. If left blank there will be no change for that variable.

