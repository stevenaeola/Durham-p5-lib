# GraphPlotter
## Description
`GraphPlotter.js` is a class that can be used to draw equations in the form `y = f(x)` using [`p5.js`](https://p5js.org/).

Example usage can be seen in `Example.html`, `Example.js`, or further down in this page at [Usage](#Usage) or [Example](#Example).

## `GraphPlotter` Class Documentation
### Properties
* `zoom`
	* Defines the scale of the graph.
	* Can be used to look at a graph closely or from further away.
	* Holds a rational value.
	* Example usage: `graph_plotter.zoom = 75.25`.
* `equation`
	* Defines which graph will be drawn.
	* Must only use `x` as a variable.
	* The result of the equation produces a y-value, that is to say if the equation represents `f(x)` then `y = f(x)`.
	* Takes a string value as input but then converts that into an instance of `Equation` defined in `GraphPlotter.js`.
	* If a given equation is invalid, errors are handled and not thrown, the graph will not be drawn.
	* Example usage: `graph_plotter.equation = "cos(x^2) + 5x"`.
* `precision`
	* Defines how closely the drawn graph is to the actual graph.
	* A precision value approaching 0 increasingly represents the true look of the graph.
	* Must exist as no computer can compute an infinite number of points.
	* Represents 100 times the increment between points on the graph, for example a value of 200 would draw a graph that has had a point evaluated every 2 integers. A value of 50 would evaluate a point every 0.5, etc.
	* Example usage: `graph_plotter.precision = 100`.
* `do_draw`
	* Forces the sketch to update.
	* It is implemented so that the graph is not drawn every single frame but is only drawn when there has been a change.
	* `do_draw` doesn't really need to be used outside `GraphPlotter` however it may be useful in certain cases.
	* Takes a Boolean value with `True` representing that the graph *should* update.

### Methods
* `constructor()`
	* Is the class constructor, takes no values and prepares the class to be used.
	* Should be called before the `p5.js` `draw()` function, an instance is created in `GraphPlotter.js` using the name `graph_plotter`.

* `draw([renderer])`
	* Draws the graph and axis to a canvas or graphic defined by the optional parameter `renderer` of type `p5.Renderer`.
	* Contains logic to not update the graph unless something has changed as to reduce latency.
	* Should be called in `p5.js`'s `draw()` function.

## Usage
To use `GraphPlotter.js`, create a base `p5.js` javascript file (something that includes a `setup()` and `draw()`).

In the `.html` file, the following order of javascript references must be made:

1. `p5.js`
2. `GraphPlotter.js`
3. Your custom implementation of `p5.js`

For example (in `Example.html`):

```html
<!-- p5 JS CDN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"></script>

<!-- Usage of GraphPlotter.js -->
<script src="GraphPlotter.js"></script>
<script src="Example.js"></script>
```

 Nothing special must be done in `setup()` as an instance of `GraphPlotter` is created in `GraphPlotter.js`. To use this instance in your `draw()` function, simply do `graph_plotter.draw([renderer])`.
 
 For example (in `Example.js`):
 
 ```javascript
 function draw() {
    graph_plotter.draw(canvas);
    
    ...
 }
 ```

## Example
This directory contains an example usage: `Example.html`, `Example.js`, and `Example.css`. 

The GraphPlotter object is created in `Example.js` and is then drawn to the canvas (also created in `Example.js`) using it's draw function.

In the example, you can vary the graph's properties by changing the function to be drawn, zooming in or out by scrolling, or adjusting the level of precision.


