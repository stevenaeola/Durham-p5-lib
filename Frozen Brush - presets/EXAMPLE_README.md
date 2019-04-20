# Example implementation documentation

example.js contains several methods for interacting with the DOM and passing these values from the HTML file to the FrozenBrush class. This example implementation of the component creates a canvas and a brush which follows the mouse, as well as a form to set the properties of the brush. "Thick" and "Fade" are presented as checkboxes to the user, but are actually used to set discrete values to the maxLevel and fadeSpeed of the brush respectively.

All of the preset buttons in the HTML file have event listeners attached to them which call their respective methods. In addition to this, the inputs in the HTML file have an onchange attribute which tells them to run the updateBrush method whenever they are edited, allowing for immediate updates to the brush's properties.

The preset methods work by using the DOM to set the values of all the inputs, and then calling the updateBrush method manually in case this does not automatically trigger an update.

Other than that, the example is self-explanatory. Internal CSS is used.