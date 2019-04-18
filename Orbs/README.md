# p5.Orbs
## Class Description
A class to provide a reusable waveform component, specifically a sine wave comprised of four sub-waves made of individual particles.
The wave object has properties to control its dimensions, propagation speed , frequency and the size of the particles. In addition to this the colour of each particle stream can be customised individually or all the stream colours can be randomised at once.

### Constructor
An object of the class can be created using the constructor method and providing values for the speed, num, loLimit, hiLimit, size, frequency and initial palette.
speed: float
num: int
loLimit: int
hiLimit: int
size: int
frequency: float
palette: array of four colour objects
From these attributes the remaining data values can be calculated.

## Web Page Example Description
To demonstrate my sketch I have embedded it into an html web page and have provided controls to alter the variious properties of the object.
There are sliders present to control the speed, num, size, frequency, loLimit and hiLimit properties of the waveform which is rendered to the right of the controls.
The sketch is updated in real time using the various set methods within the class and a series of elemtent listeners to trigger these changes when the user interacts with the controls.
There are four colour picker elements assigned to the four individual particle streams within the wave which may be used to alter the colours of each stream.
A button labelled randomise colours is also present to enable the user to change the colours of all four particle streams to new, random values. 


### Fields
speed:
	The rate at which the wave propagates across the page.

num:
	The number of particles present in each stream.

loLimit:
	The limit for the greatest negative amplitude.
	
hiLimit:
	The limit for the greatest positive amplitude.

theta:
	The angle by which the wave position will be incremented each page.
	
size:
	The size of each particle.

edge:
	The distance between the wave and the left and right edges of the canvas.

step:
	The amount by which the x coordinate is increaesd each frame.
	
palette:
	An array containing the colour of each particle stream.
	
f:
	A colour variable used to store the colour of the stream currently being processed.

frequency:
	The rate at which the wave oscillates.
	
### Methods
get:
	Used to retrive the values of the speed, num, loLimit, hiLimit, size, palette and frequency attributes.
	Most get methods take no parameters.
	The get palette method takes a single parameter to determine which stream's colour will be returned.
	
set:
	Used to change the values of the speed, num, loLimit, hiLimit, size, palette and frequency attributes.
	Most methods take a single parameter of the new value for the attribute.
	The set palette method requires two parameters: One to set which stream's colour should be altereed and the second to store the value of the desired new colour.
	When changing some attributes the values of other properties must also be altered to reflec tthis change in the sketch. This is the case for the num attribute which affects the value of step which must be recalculated accordingly when the num value is set.
	
	
randomise:
	This method interates through the four streams within the wave and randomises the colour of each one.
	Individual values between 0 and 255 are generated for the red, green and blue components and are then converted into their corresponding hexadecimal components
	For single digit values an additional 0 is added at the start to ensure the format of the colour code is correct.
	These three values are then combined and a colour object is initialised using this data.
	The colour of the stream's corresponding html colour picker element is then adjusted to reflect this change.