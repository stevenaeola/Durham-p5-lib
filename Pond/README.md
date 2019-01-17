# Fish
#### Description
A class that allows the user to draw and modify fish-shaped 2D objects.
#### Arguments
|Name|Type|Description|Default|
|:---|:---|:----------|------:|
|colour|p5.Color|The colour of the fish. The alpha value of this colour is transferred to the body of the fish, but only the raw RGB values are used for the outline.|Blue|
|mag|Number|The amount the size of the fish is scaled by|1|
|speed|Number|The amount the velocity of the fish is scaled by|1|
|big|Number|The initial size of the fish|A random number between 0.1 and 0.3.|
|vel|p5.Vector|The velocity of the fish. Also determines the heading of the fish.|A vector with random x and y components between -1 and 1.|
|loc|p5.Vector|The current location of the fish on a screen|A random position on the screen.|
|wiggle|Number|Adds some individuality to the wiggle of the fish|A random number between -90 and 90|
Note: Fish also has a property called *dim* which returns *mag* multiplied by *big* to get the resultant size of the fish.
#### Methods
|Name|Arguments|Description|
|:---|:--------|:----------|
|draw|g (OPTIONAL p5.Graphics object)|Draws the fish to the viewing area|
|boundaries|g (OPTIONAL p5.Graphics)|Puts the fish back inside the viewing area if it goes outside.|
|fadeColour|c (p5.Color), frames (Integer, default=100)|Fades the fish from the current colour to *c* in *frames* frames.|
|fadeMag|m (Number), frames (Integer, default=100)|Smoothly changes the scale of the fish from the previous scale to *m* in *frames* frames.|
|fadeSpeed|s (Number), frames (Integer, default=100)|Smoothly accelerates the fish from the previous speed to *s* in *frames* frames.|

# Pond
#### Description
A class that allows the user to easily create and manage many fish objects.
#### Arguments
|Name|Type|Description|Default|
|:---|:---|:----------|------:|
|number|Number|The number of fish to be generated.|10|
|pondColour|p5.Color|The colour of the background of the pond.|Black|
|fishColour|p5.Color|The colour of the fish.|Blue, with an alpha value of 20.|
|fishMag|Number|The amount by which to scale up the fish.|1|
|fishSpeed|Number|The amount by which to increase the velocity of the fish.|1|
#### Methods
|Name|Arguments|Description|
|:---|:--------|:----------|
|getFish|index (Integer)|Returns the fish at the specified *index* in the pond's fish array.|
|draw|g (OPTIONAL p5.Graphics)|Draws each fish in the pond to the viewing area.|
|add|f (Fish)|Adds a fish object *f* to the pond.|
|trawl|numberToKill (Number)|'Removes' *numberToKill* fish from the pond.|
|fadeColour|c (p5.Color), frames (Integer, default=100)|Fades every fish from its current colour to *c* in *frames* frames.|
|fadeMag|m (Number), frames (Integer, default=100)|Smoothly changes the scale of every fish from its previous scale to *m* in *frames* frames.|
|fadeSpeed|s (Number), frames (Integer, default=100)|Smoothly accelerates every fish from its previous speed to *s* in *frames* frames.|

# Example
The example provides a tutorial demonstrating some of the major functionality of the component. The user can also pass in an optional p5.Graphics object to the draw functions of Fish and Pond to allow drawing as textures on 3D shapes. The velocity, location, initial size and wiggle of a fish can also be accessed using get/set, but fade functions for these properties don't exist as they are usually randomly generated and not intended to be modified.

# Licencing
The Pond code is derived from [Michael Pinn's](https://www.openprocessing.org/user/39442) sketch ['Fish Tank'](https://www.openprocessing.org/sketch/162912) on OpenProcessing.org which is published under the [Creative Commons Attribution Non-Commerical No Derivatives](https://creativecommons.org/licenses/by-nc-nd/3.0/) licence. The Pond code is published under the same licence.

This directory includes the unchanged Fish Tank code which was originally written in Processing. Changes have been made in creating the Pond code, but as this work is only for academic purposes, it falls under Fair Dealing in the United Kingdom, making it an applicable exception to the licence and therefore able to be distributed.

The project uses p5.js and Bootstrap which are referenced in the HTML rather than including them in the project directory.
