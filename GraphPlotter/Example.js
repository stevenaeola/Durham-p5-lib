var canvas;
var graph_plotter;

function setup() {
    canvas = createCanvas(document.getElementById('content').scrollWidth, document.documentElement.clientHeight, WEBGL);
    canvas.parent('canvas_parent');

    graph_plotter = new GraphPlotter();
}

function draw() {
    graph_plotter.draw(canvas);

    const rounded_zoom_value = Math.round(graph_plotter.zoom * 100) / 100;
    const zoom_value_text = document.getElementById('zoom-value');
    zoom_value_text.innerHTML = rounded_zoom_value;
}


function mouseWheel(event) {
    const zoom_sensitivity = 0.05;
    const zoom_minimum = 1;
    const zoom_maximum = 100;

    graph_plotter.zoom += zoom_sensitivity * event.delta;
    graph_plotter.zoom = constrain(graph_plotter.zoom, zoom_minimum, zoom_maximum);
    graph_plotter.do_draw = true;

    return false;
}