# Webby Chars
This documentation is for webbychar.js, a library for displaying 'webbed' text using the [P5.js](https://p5js.org) graphics library.
This library is based off of a Processing sketch by Jerome Herr. The original sketch can be found here: [https://www.openprocessing.org/sketch/149337](https://www.openprocessing.org/sketch/149337) and is licensed under [Creative Commons Attribution ShareAlike (CC BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/).
This library and all examples provided with it are also licensed under: [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) unless otherwise specified.
The file webbychars.min.js was created using UglifyJS 3.

## Object Definitions
### WebbyChars
#### Constructor
- [WebbyChars()](#webbychars-1)

#### Properties
- webbedTexts
- canvas (only when not in graphicsOnly mode)
- background

#### Methods
- [add()](#webbycharsadd)
- [remove()](#webbycharsremove)
- [getCanvas()](#webbycharsgetcanvas)
- [getWebbedTexts()](#webbycharsgetwebbedtexts)
- [draw()](#webbycharsdraw)

### WebbedText
#### Constructor
- [WebbedText()](#webbedtext-1)

#### Properties
- [text](#webbedtexttext)
- [x](#webbedtextx)
- [y](#webbedtexty)
- [numVertices](#webbedtextnumvertices)
- [fontName](#webbedtextfontname)
- [fontSize](#webbedtextfontsize)
- [theta](#webbedtexttheta)
- [vertices](#webbedtextvertices)
- [options](#webbedtextoptions)

#### Methods
- [setup()](#webbedtextsetup)
- [draw()](#webbedtextdraw)

### WebbedTextVertex
#### Constructor
- [WebbedTextVertex()](#webbedtextvertex-1)

#### Properties
- [origin](#webbedtextvertexorigin)
- [position](#webbedtextvertexposition)
- [movementRadius](#webbedtextvertexmovementradius)
- [direction](#webbedtextvertexdirection)
- [offset](#webbedtextvertexoffset)
- [alpha](#webbedtextvertexalpha)
- [numConnections](#webbedtextvertexnumconnections)
- [maxConnectableDistance](#webbedtextvertexmaxconnectabledistance)
- [connections](#webbedtextvertexconnections)
- [radius](#webbedtextvertexradius)
- [color](#webbedtextvertexcolor)
- [lineColor](#webbedtextvertexlinecolor)

#### Methods
- [run()](#webbedtextvertexrun)
- [move()](#webbedtextvertexmove)
- [lineBetween()](#webbedtextvertexlinebetween)
- [draw()](#webbedtextvertexdraw)

### WebbedTextColor
#### Constructor
- [WebbedTextColor()](#webbedtextcolor-1)

#### Properties
- [flags](#webbedtextcolorflags)
- [c1](#webbedtextcolorc1)
- [c2](#webbedtextcolorc2)
- [maxTime](#webbedtextcolormaxtime)

#### Methods
- [clone()](#webbedtextcolorclone)
- [getColor()](#webbedtextcolorgetcolor)
- [hasFlag()](#webbedtextcolorhasflag)
- [updateDeltaColor()](#webbedtextcolorupdatedeltacolor)
- [setDeltaDefaults()](#webbedtextcolorsetdeltadefaults)
- [getRandomColor()](#webbedtextcolorgetrandomcolor)

### Time
##### Constructor
- [Time()](#time-1)

##### Properties
- [currentTime](#timecurrenttime)

#### Methods
- [getDelta()](#timegetdelta)

## Enum Definitions
### WebbedTextColorType
#### Properties
- FIXED
- RANDOM_FIXED
- RANDOM_DYNAMIC
- DELTA_SMOOTHED
- TWINKLE

***
## Objects
### WebbyChars()
The `WebbyChars()` constructor returns a newly created `WebbyChars` object defined by the parameters.

#### Syntax
	wc = new WebbyChars(graphicsOnly, cWidth, cHeight, cParent, background)

#### Parameters
- graphicsOnly
	- Defines whether this `WebbyChars` object should create the default canvas, or whether it must draw to a `p5.Renderer` in the `WebbyChars.draw()` method
- cWidth [optional]
	- Width of the canvas if it is to be created. If not specified, it defaults to `1000`.
- cHeight [optional]
	- Height of the canvas if it is to be created. If not specified, it defaults to `1000`.
- cParent [optional]
	- The parent any created canvas should have in the HTML DOM. If not specified, it defaults to `null` so no parent is set.
- background [optional]
	- The background to set for any canvas or `p5.Renderer` in each call to the `WebbyChars.draw()` method. If not specified, it defaults to `null`. Leave blank to specify background manually.
	
### WebbyChars.add()
Setup a `WebbedText` object and add it to the array of webbed text for drawing.

#### Syntax
	wc.add(webbedText)
	
#### Parameters
- webbedText
	- A `WebbedText` object to setup.
	
### WebbyChars.remove()
Remove a `WebbedText` object from the array of webbed text so it will no longer be drawn. This does not destroy external object references.

#### Syntax
	wc.remove(webbedText)
	
#### Parameters
- webbedText
	- A `WebbedText` object to remove from the drawing array.

### WebbyChars.getCanvas()
Return the canvas if it exists.

### WebbyChars.getWebbedTexts()
Return the array of webbed text that will be drawn.
	
### WebbyChars.draw()
Draw all of the webbed texts in the webby chars object

#### Syntax
	wc.draw(p5Graphics)
	
#### Parameters
- p5Graphics [optional]
	- A `p5.Renderer` to draw to. If not specified, it defaults to `null`.

### WebbedText()
The `WebbedText()` constructor returns a newly created `WebbedText` object defined by the parameters.

#### Syntax
	text = new WebbedText(text, [x], [y], [numVertices], [fontName], [fontSize], [options])
	
#### Parameters
- text
	- A `String` with the text to be displayed
- x [optional]
	- The x coordinate at which to place the text. If not specified, it defaults to `0`.
- y [optional]
	- The y coordinate at which to place the text. If not specified, it defaults to `0`.
- numVertices [optional]
	- The number of vertices to attempt to place onto this text. If not specified, it defaults to `2000`.
- fontName [optional]
	- The name of the font to use for the text. If not specified, it defaults to `Helvetica`.
- fontSize [optional]
	- The font size to use for the text. If not specified, it defaults to `100`.
- options [optional]
	- An object with properties representing the desired settings. All specified properties will overwrite the defaults (see below). If not specified, it defaults to:
	
			{
				'minVertexMovementRadius':5,
				'maxVertexMovementRadius':10,
				'vertexRadius':5,
				'maxVertexConnectableDistance':20,
				'vertexMovementSpeed':0.05,
				'vertexColor':new WebbedTextColor(WebbedTextColorType.FIXED, color(255, 0, 0, 255)),
				'lineColor':new WebbedTextColor(WebbedTextColorType.FIXED, color(255, 255, 255, 255)),
				'globalVertexColor':false,
				'globalLineColor':false
			}
		- `minVertexMovementRadius`: The minimum distance a vertex must move. Passed as the lower bound in a random number generator.
		- `maxVertexMovementRadius`: The maximum distance a vertex can move. Passed as the upper bound in a random number generator.
		- `vertexRadius`: The radius of each vertex
		- `maxVertexConnectableDistance`: The maximum distance between two vertices for them to connect
		- `vertexMovementSpeed`: The movement speed of every vertex
		- `vertexColor`: A `WebbedTextColor` representing the color definition for this vertex
		- `lineColor`: A `WebbedTextColor` representing the color definition for lines between this vertex and others
		- `globalVertexColor`: A boolean value representing whether vertices use individual colors or all use the same. Must hold value `true` for all vertices to have same color.
		- `globalLineColor`: A boolean value representing whether lines between vertices use individual colors or all use the same. Must hold value `true` for all lines between vertices to have same color.

### WebbedText.text
The text this object will draw using points and lines.

### WebbedText.x
The x coordinate of the text.

### WebbedText.y
The y coordinate of the text.

### WebbedText.numVertices
The number of vertices this text will try to place.

### WebbedText.fontName
The name of the font to use for the text.

### WebbedText.fontSize
The size of the font to use for the text.

### WebbedText.theta
A value stored to determine where in the movement each vertex is.

### WebbedText.vertices
An array of all the vertices used to draw the text.

### WebbedText.options
An object with properties representing the settings used to draw the text.

### WebbedText.setup()
Setup the `WebbedText` object, ready for drawing the text. Creates the randomly placed vertices which will represent the text.

#### Example
	let text;
	function setup(){
		text = new WebbedText("S", 100, 100, 1000);
		text.setup();
	}
	
### WebbedText.draw()
Draw the webbed text. Must be called each frame.

#### Syntax
	text.draw(g);
	
#### Parameters
- g [optional]
	- A `p5.Renderer` to draw to. If not specified, it defaults to `null`.

#### Example
	let text;
	let g;
	function setup(){
		text = new WebbedText("S", 100, 100, 1000);
		g = createGraphics(2000,2000);
		text.setup();
	}
	
	function draw(){
		g.background(20);
		text.draw(g);
	}
	
### WebbedTextVertex()
The `WebbedTextVertex()` constructor returns a newly created `WebbedTextVertex` object defined by the parameters.

#### Syntax
	vertex = new WebbedTextVertex(origin, position, movementRadius, direction, offset, vColor, lineColor, [radius], [maxConnectableDistance])
	
#### Parameters
- origin
	- A `p5.Vector` representing the original location at which the vertex is placed.
- position
	- A `p5.Vector` representing the current location of the vertex.
- movementRadius
	- The radius of movement the vertex undertakes about its origin.
- direction
	- The movement direction of the vertex.
- offset
	- The offset in movement of the vertex. (Between 0 and 2 PI).
- vColor
	- A `WebbedTextColor` representing the color definition of the vertex.
- lineColor
	- A `WebbedTextColor` representing the color definition of lines connected to this vertex.
- radius
	- The radius of the vertex. If not specified, it defaults to `5`.
- maxConnectableDistance
	- The maximum distance another vertex can be from this one to connect. If not specified, it defaults to `20`.
	
### WebbedTextVertex.origin
A `p5.Vector` representing the original location at which the vertex is placed.

### WebbedTextVertex.position
A `p5.Vector` representing the current location of the vertex.
	
### WebbedTextVertex.movementRadius
The radius of movement the vertex undertakes about its origin.

### WebbedTextVertex.direction
The movement direction of the vertex.

### WebbedTextVertex.offset
The offset in movement of the vertex. (Between 0 and 2 PI).

### WebbedTextVertex.alpha
The transparency that connections to this vertex will have.

### WebbedTextVertex.numConnections
The number of connections the vertex currently has.

### WebbedTextVertex.maxConnectableDistance
The maximum distance another vertex can be from this one to connect.

### WebbedTextVertex.connections
An `Array` of connections this vertex has to other vertices.

### WebbedTextVertex.radius
The radius of this vertex.

### WebbedTextVertex.color
A `WebbedTextColor` representing the color definition of the vertex.

### WebbedTextVertex.lineColor
A `WebbedTextColor` representing the color definition of connections to this vertex.

### WebbedTextVertex.run()
Perform all actions for this vertex. These include drawing the vertex, drawing its connections and applying its movement. This should be called every frame.

#### Syntax
	vertex.run(theta, vertices, g)

#### Parameters
- theta
	- A value used for movement in the current frame. (The displacement along the sine/cosine graph).
- vertices
	- An array of all possible vertices for connections.
- g [optional]
	- A `p5.Renderer` to draw to. If not specified, it defaults to `null`.

#### Example
Called inside a drawing loop.

	theta += 0.05;
	for(vertex in vertices){
		vertex.run(theta, vertices);
	}
	
### WebbedTextVertex.move()
Move the vertex.

#### Syntax
	vertex.move(theta)

#### Parameters
- theta
	- The displacement along the sine/cosine graph used for moving the vertex.
	
### WebbedTextVertex.lineBetween()
Draw the connections between this vertex and other vertices in the text.

#### Syntax
	vertex.lineBetween(vertices, g)

#### Parameters
- vertices
	- An array of all other vertices that are part of the same text. (Or all vertices that the vertex should connect to).
- g [optional]
	- A `p5.Renderer` to draw to. If not specified, it defaults to `null`.
	
### WebbedTextVertex.draw()
Draws the vertex itself using the stored position and radius.

#### Syntax
	vertex.draw(g)

#### Parameters
- g [optional]
	- A `p5.Renderer` to draw to. If not specified, it defaults to `null`.

### WebbedTextColor()
The `WebbedTextColor()` constructor returns a newly created `WebbedTextColor` object defined by the parameters.

#### Syntax
General

	webbedTextColor = new WebbedTextColor(flags, [c1], [c2], [maxTime])

Draw Mode: FIXED
	
	webbedTextColor = new WebbedTextColor(WebbedTextColorType.FIXED, fixedColor)
	
Draw Mode: RANDOM_FIXED
	
	webbedTextColor = new WebbedTextColor(WebbedTextColorType.RANDOM_FIXED, start, end)

Draw Mode: RANDOM\_DYNAMIC (can be OR combined with DELTA\_SMOOTHED so maxTime can be used).
	
	webbedTextColor = new WebbedTextColor(WebbedTextColorType.RANDOM_DYNAMIC, start, end, [maxTime])
	
Draw Mode: TWINKLE (can be OR combined with DELTA_SMOOTHED so maxTime can be used)
	
	webbedTextColor = new WebbedTextColor(WebbedTextColorType.TWINKLE, colorA, colorB, [maxTime])
	
	
#### Parameters
- flags
	- Flags representing the draw mode this color will use. Flags can be combined using BitWise OR. Use `WebbedTextColorType` properties for easy flag setting.
- c1 [optional]
	- A `p5.Color`. If not specified, it defaults to `null`.
- c2 [optional]
	- A `p5.Color`. If not specified, it defaults to `null`.
- maxTime [optional]
	- The maximum time for a transition to occur in delta smoothed draw modes. If not specified, it defaults to `1000`.
- start
	- A `p5.Color` representing the starting point for random color generation.
- end
	- A `p5.Color` representing the ending point for random color generation.
- colorA
	- A `p5.Color` representing the first color which will be switched between.
- colorB
	- A `p5.Color` representing the second color which will be switched between.
	
### WebbedTextColor.flags
A number which represents the set flags for the color draw mode.

### WebbedTextColor.c1
A `p5.Color`. Meaning differs depending on draw mode. See `WebbedTextColor()`.

### WebbedTextColor.c2
A `p5.Color`. Meaning differs depending on draw mode. See `WebbedTextColor()`.

### WebbedTextColor.currentColor
A `p5.Color` representing the current RGB color of the colored object. Useful when the color varies based on c1 and c2.

### WebbedTextColor.maxTime
The maximum time a transition can go on for before it reaches its end.

### WebbedTextColor.timeLeft
The time left on the current color transition.

### WebbedTextColor.targetColor
The color which the current transition is moving towards.

### WebbedTextColor.time
A `Time` object used to store and calculate delta time for the colored object.

### WebbedTextColor.clone()
Creates and returns a new `WebbedTextColor` object with all the properties of the current WebbedTextColor object except for a unique new `Time` object so the clone has its own delta time and not a reference.

#### Example
	wtColor = new WebbedTextColor(WebbedTextColorType.FIXED, color(255, 0, 0, 255));
	newColor = wtColor.clone();
	
### WebbedTextColor.getColor()
Returns a `p5.Color` representing the current color of the colored object. Result will depend on the draw mode.

### WebbedTextColor.hasFlag()
Check if the color has a specific draw mode flag.

#### Syntax
	wtColor.hasFlag(flag)
	
#### Parameters
- flag
	- A number representing the draw mode(s). Flags can be combined using BitWise OR.

#### Example
	wtColor.hasFlag(WebbedTextColorType.RANDOM_DYNAMIC | WebbedTextColorType.DELTA_SMOOTHED);
	
### WebbedTextColor.updateDeltaColor()
Run the delta transition for the color.

#### Syntax
	wtColor.updateDeltaColor(delta, newTarget)
	
#### Parameters
- delta
	- Delta time
- newTarget
	- A `p5.Color` representing the new target color once the transition has completed.
	
### WebbedTextColor.setDeltaDefaults()
Set defaults for colors if they have null values. Should be called before any delta-time based transition is attempted to ensure nothing is left undefined.

#### Example
	wtColor.setDeltaDefaults();
	if(wtColor.currentColor === wtColor.c1){
		wtColor.updateDeltaColor(delta, wtColor.c2);
	}
	
### WebbedTextColor.getRandomColor()
Get a random color between the two given colors' RGBA values.

#### Syntax
	wtColor.getRandomColor(c1, c2)
	
#### Parameters
- c1
	- A `p5.Color` representing the starting RGBA values to use in random number generator.
- c2
	- A `p5.Color` representing the ending RGBA values to use in random number generator.
	
### Time()
The `Time()` constructor returns a newly created `Time` object.

### Time.currentTime
The currently stored time in milliseconds.

### Time.getDelta()
Returns the difference between what was the currentTime up until now and the actual current time.

## Enums
### WebbedTextColorType
Enum storing the following values for use as flags in `WebbedTextColor` constructor:

	"FIXED":		0b0000,
	"RANDOM_FIXED": 	0b0001,
	"RANDOM_DYNAMIC":	0b0010,
	"DELTA_SMOOTHED": 	0b0100,
	"TWINKLE":		0b1000

***

## Example Code
The following sample code can be used to draw a letter "S" at (50, 50) on a canvas of size 1000x1000 in a DOM element with id `canvas-container`.

	let wc;
	function setup(){
		wc = new WebbyChars(false, 1000,1000,'canvas-container',0);
		let test = new WebbedText("S", 50, 50, 1000, "Helvetica", 500, {
			'vertexColor':new WebbedTextColor(WebbedTextColorType.RANDOM_DYNAMIC | WebbedTextColorType.DELTA_SMOOTHED, color(255, 0, 0, 255), color(0, 0, 255, 255)),
			'lineColor':new WebbedTextColor(WebbedTextColorType.RANDOM_DYNAMIC | WebbedTextColorType.DELTA_SMOOTHED, color(255, 0, 0, 255), color(0, 0, 255, 255)),
		});
		wc.add(test);
	}

	function draw() {
		wc.draw();
	}
	
## Using the HTML example page
Follow the on-screen instructions to create, save and delete Webbed Text.
- Max Vertex Connectable distance is the maximum distance allowed between two vertices for them to connect.
- Vertex Movement Speed is the speed of the vertex movement and should be a small decimal number for reasonable speeds.
- Global vertex and line colors define whether all vertices and lines respectively will use the same color at any given time. Color effects still apply, but for the whole Webbed Text rather than individually.
- Delta smoothing will make a smooth transition between colours occur, but has no effect on Fixed or Random Fixed Color Modes.
- Color Max Time represents the time taken for a complete transition between 2 colors to occur.
