var graph_plotter
var canvas

function setup() {
	canvas = createCanvas(document.getElementById("content").scrollWidth, document.documentElement.clientHeight, WEBGL)
	canvas.parent("canvas_parent")

	// This and graph_plotter.draw() are the only required lines
	graph_plotter = new GraphPlotter()
}

function draw() {
	graph_plotter.draw(canvas)

	const rounded_zoom_value = Math.round(graph_plotter.zoom * 100) / 100
	const zoom_value_text = document.getElementById("zoom-value")
	zoom_value_text.innerHTML = rounded_zoom_value
}