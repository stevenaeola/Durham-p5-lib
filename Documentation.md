Important note
============
Running the index.html (and by extension the javascript program) should be done in Firefox. Based on my tests this cannot run in chrome (as accessing the files is blocked by CORS policy) or Internet Explorer (as it does not support (at least) importing the P5 sound library). There is also poor performance in Microsoft Edge, so it would strongly recommend not using that.

Methods and their parameters
==================
**Global variables & Constants**
Constants:
- Visualiser:
	- r: the radius of the outer circle
	- dr: the 'width' of the outer circle, this represents the visual amplitude of the waveform and its (audio) amplitude
- Play/pause button:
	- ButtonX and ButtonY are the x and y coordinates of the button
	- buttonWidth and buttonHeight are the width and height of the button
- Song choice buttons
	- optionX and optionY are the x and y coordinates of the first (left most) button
	- optionSep is the x seperation between each button (they all have the same y value)
	- optionWidth and optionHeight are the width and heights of the buttons.

Global variables:
- Visualiser
	- vis, vis1, and vis2 are variables to hold objects from the Visualiser class
- Song files
	- Each variable is used to hold a song file so it is in memory
- General
	- sound is used hold the selected song. 
	- fft: used to instantiate the FFT algorithm - used for isolating individual audio frequencies within a waveform.
	- amplitude: same as fft, but for isolated amplitude values.
	- canv: variable to hold the canvas.

**preload**
This is a default P5 JS function, it is used to handle asynchronous loading of external files in a blocking way and is executed before `setup()`.
I am using this to load the songs into memory - each song in it's own variable.

**setup**
This is also a default P5 JS function and it's called once when the program starts and never again in the program runtime.
I use it to create and setup (handle when it is clicked) the canvas, and also setup and play the default song.

**setupsong**
This is a function I created to simply setup the song which is assigned to the sound variable. It updates the audio frequency levels and amplitudes so they match the song being played.

**draw**
This is a default P5 JS function and is called directly after setup() and continuously executes until the program is stopped.
This is the main program and it does the following:
1. Create objects of the visualiser class, each with their own assigned frequency (bass, mid or treble)
2. Draws these visualisers with the class's `display()` function
3. Checks if the pause function should be visable or not by calling the `getplayfill` function and passing `false` (meaning it is *not* the play button). This returns a certain fill or `noFill()`
4. Draws 2 rectangles to represent the pause button in the fill found in the previous step
5. Finds the fill of the play button in the same way as step 3, but passes `true`
6. Draws a triangle to represent the play button in the returned fill.
7. Draws the buttons representing the song choices: for each song it creates a rectangle (representing a button) and adds the text of the song name inside it.

**Visualiser [class]**
This class is the extended music visualiser code found on openprocessing.
This is technically a function, but has functions and variables assigned to each implementation of it (using `this` calls) so it acts as a class.

*Parameters:*
All these parameters are instantiated to the object by using `this`, e.g. `this.r = r` so it could be referenced in other functions belonging to Visualiser. The parameters of this class are:
- r: TO DO & FIX
- dr: TO DO & FIX
- x: the x coordinate of the object
- y: the y coordinate of the object
- freq: the frequency of the object ("bass", "mid", or "treble")


*display:*
This is a function of the visualiser to actually display the visualiser in the form of shapes on the canvas. It does this in the following steps:
1. Getting latest values from `fft`:
	1. Updating the waveform - an array of amplitude values over a short time period
	2. Updating the energy level of the frequency of the visualiser and adjusting it to multipliers `energy` (between 0 and 1) and `waveenergy` (between 0.65 and 1)
2. Drawing the inner circle of the visualiser - size and colour intensity proportional to energy at the objects frequency. (The colours are red for bass, green for mid, and blue for treble)
3. Creating the outer circle:
	1. This is setup as a complex shape with no fill.
	2. For every 15th value of the waveform array, values x, y, a, and b are found. The values of a and b depend on the waveform value and `waveenergy` and are plotted as a vertex. x and y are found just depending on `waveenergy` and a line is drawn from x to a and from y to b. a and b are then marked as points. These all form a circle by using `cos` and `sin` functions.

**checkmouseclick**
This is the function called when the mouse is clicked on the canvas. It checks the position of the mouse click and if the position is on a button it performs the appropriate actions.
- Play/pause button clicked:
	- Pauses the sound if it is playing, otherwise it plays it
	- (The display of the play/pause is then updated in `draw`)
- Song option button clicked:
	- In this condition, the sound is paused, set to the selected song, and `setupsong()` is called.

**getplayfill**
This function returns the fill of the play button or the pause button. `Play` is the only parameter, and is `true` for the play shape and `false` for the pause shape(s).
This function returns `noFill()` either if `Play` is true and the sound is playing, or if the sound is not playing and `Play` is false. Otherwise it will return `fill(255, 80)` as the fill value.


Explanation of example
===================
The original code I used consisted of a single visualiser representing a song which automatically played with no controls on the screen.
I adapted this so that there are three music visualiser objects; one for each bass, mid range, and treble frequencies. The colour of the inner circle was changed to represent this: red for bass, green for mid, and blue for treble.
The song that was automatically played was changed, and there is now a choice of songs to play. This represents the dynamic nature of the visualisers and gives a comparison of how different looks in terms of amplitude waveform and the energy levels across the frequency spectrum.
I also added a play/pause button at the top for user convenience.

Initial code
=========
The original code was from: https://www.openprocessing.org/sketch/571695.
