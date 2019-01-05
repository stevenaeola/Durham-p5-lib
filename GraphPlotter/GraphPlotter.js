// === === Include math.js for safe literal eval (to replace built-in unsafe eval()) === ===
const mathjs_script = document.createElement('script');  
mathjs_script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.4.0/math.js');
document.head.appendChild(mathjs_script);
// === ===

class Equation {
    constructor(equation_string) {
        this.equation_string = equation_string;
        this.calc_points();
    }

    calc_points() {
        this.points = [];
        const banned_functions = ['abs', 'ceil', 'floor'];

        for (let index = 0; index < banned_functions.length; ++index) {
            if (this.equation_string.includes(banned_functions[index])) {
                return;
            }
        }

        for (let x_val = -width / 2; x_val <= width / 2; x_val += graph_plotter.precision / 100) {
            let y_value = undefined;

            // Test if the equation is valid
            try {
                y_value = -math.eval(this.equation_string, {x : x_val});
            } catch (error) {
                // Ignore the error, as doing so will simply not draw anything on the screen
                // This is the desired result
                continue;
            }

            if (y_value !== undefined) {
                const point = [x_val, y_value];
                this.points.push(point);
            }
        }
    }

    draw(graphic) {
        if (this.points.length <= 2) {
            return;
        }

        graphic.noFill();
        graphic.beginShape();
        for (let index = 0; index < this.points.length; ++index) {
            if ((this.points[index][0] === undefined) || (this.points[index][1] === undefined)){
                continue;
            }	

            graphic.curveVertex((graph_plotter.zoom * this.points[index][0]) + (width / 2), (graph_plotter.zoom * this.points[index][1]) + (height / 2));
        }

        graphic.endShape();
    }
}

class GraphPlotter {
    // Constructor
    constructor() {
        this.zoom_value = 50;
        this.equation_precision = 100;
        this.equation_object = undefined;
        this.do_draw_value = true;

        this.do_draw = true;
        this.axis_text_increment = 1;
    }

    // Getters / Setters
    // Zoom
    get zoom() {
        return this.zoom_value;
    }

    set zoom(value) {
        this.zoom_value = value;
        this.do_draw = true;

        if (value >= 30) {
            this.axis_text_increment = 1;
        } else if (value >= 5) {
            this.axis_text_increment = 10;
        } else {
            this.axis_text_increment = 50;
        }
    }

    // Equation
    get equation() {
        if (this.equation_object === undefined) {
            return undefined;
        }

        return this.equation_object.equation_string;
    }

    set equation(equation_string) {
        this.equation_object = new Equation(equation_string);
        this.do_draw = true;
    }

    // Precision
    get precision() {
        return this.equation_precision;
    }

    set precision(new_precision) {
        this.equation_precision = new_precision;

        if (this.equation_object !== undefined) {
            this.equation_object.calc_points();
            this.do_draw = true;
        }
    }

    // Do Draw
    get do_draw() {
        return this.do_draw_value;
    }

    set do_draw(value) {
        this.do_draw_value = value;
    }

    // Draw function
    draw(renderer) {
        if (this.do_draw_value) {
        	// Draw the numbers that the axis represent
            let axis_text = createGraphics(width, height);
            for (let x_val = 0; x_val <= max(width / 2, height / 2); x_val += this.axis_text_increment) {
                axis_text.textSize(10);

                axis_text.text(x_val, (this.zoom * x_val) + width / 2, height / 2);
                axis_text.text(-x_val, (this.zoom * -x_val) + width / 2, height / 2);

                axis_text.text(-x_val, width / 2, (this.zoom * x_val) + height / 2);
                axis_text.text(x_val, width / 2, height / 2 - (this.zoom * x_val));
            }

            // Draw x-axis
            axis_text.strokeWeight(1);
            axis_text.line(0, height / 2, width, height / 2);

            // Draw y-axis
            axis_text.line(width / 2, 0, width / 2, height);

            //Draw equations
            strokeWeight(2);
            if (this.equation_object !== undefined) {
                this.equation_object.draw(axis_text);
            }

            if (renderer) {
                renderer.background(255);				
            } else {
                background(255);
            }

            // Texture and plane have no method within p5.Renderer
            texture(axis_text);
            plane(width, height);
			
            this.do_draw = false;
        }
    }
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

var graph_plotter = new GraphPlotter();