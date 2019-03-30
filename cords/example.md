# Example Page
Must be run on a server or a browser with relaxed CORS policy like FireFox.
This page uses the p5 dom library so images can be loaded outside of the p5 `preload` function.

This example has no options while the sketch is running as there isn't much you can change without needing to restart the drawing process, so it would be best to just restart if you want to change anything. I was going to add a speed slider which would call the draw function multiple times each animation frame, instead of it being faster, it took the same amount of time, but it looks more like a powerpoint.

## handleFile
Sets global variable `imageLocation` to the name of the file.
### Parameters
* `file` **file** file selected

## submit
Sets up the Cord Drawing class once the user has entered thier values. Also replaces the form with messages to the user to keep them informed on what is happening. 

## setup
The setup function called by p5. The class is not setup here as it needs to wait for the user's input before it is initialised. This function contains a p5 dom function `createFileInput` that uses the `handleFile` function. This function creates the file picker button and uses the `handleFile` when the input is changed.

## draw
The draw function called by p5. First it checks that an instance of the class has been created and then it checks if it has been fully setup, otherwise it would create errors.

## Attribution
The css was made by Codepen user [Uziel Almeida Oliveira](https://codepen.io/uzielweb/pen/vyXqpx)