var graph_plotter;

function setup() {
	graph_plotter = new GraphPlotter()
	graph_plotter.add_equation("y = x")
}

function draw() {
	graph_plotter.draw()
}