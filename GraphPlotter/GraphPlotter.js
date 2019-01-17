// === === Include math.js for safe literal eval (to replace built-in unsafe eval()) === ===
const mathjs_script = document.createElement('script');  
mathjs_script.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/mathjs/5.4.0/math.js');
document.head.appendChild(mathjs_script);
// === ===

class Equation {
    constructor(graph_plotter, equation_string) {
        this.graph_plotter = graph_plotter;
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

        for (let x_val = -width / 2; x_val <= width / 2; x_val += this.graph_plotter.precision / 100) {
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

            graphic.curveVertex((this.graph_plotter.zoom * this.points[index][0]) + (width / 2), 
                (this.graph_plotter.zoom * this.points[index][1]) + (height / 2));
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

        this.graph_graphic = createGraphics(width, height);
        this.axis_text = createGraphics(width, height);
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
        this.equation_object = new Equation(this, equation_string);
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
            this.graph_graphic.clear();
            this.axis_text.clear();
            
            // Draw the numbers that the axis represent
            this.graph_graphic.textSize(10);
            for (let x_val = 0; x_val <= max(width / 2, height / 2); x_val += this.axis_text_increment) {
                this.axis_text.text(x_val, (this.zoom * x_val) + width / 2, height / 2);
                this.axis_text.text(-x_val, (this.zoom * -x_val) + width / 2, height / 2);

                this.axis_text.text(-x_val, width / 2, (this.zoom * x_val) + height / 2);
                this.axis_text.text(x_val, width / 2, height / 2 - (this.zoom * x_val));
            }

            this.graph_graphic.copy(this.axis_text, 0, 0, width, height, 0, 0, width, height);

            // Draw x-axis
            this.graph_graphic.strokeWeight(1);
            this.graph_graphic.line(0, height / 2, width, height / 2);

            // Draw y-axis
            this.graph_graphic.line(width / 2, 0, width / 2, height);

            //Draw equations
            strokeWeight(2);
            if (this.equation_object !== undefined) {
                this.equation_object.draw(this.graph_graphic);
            }

            if (renderer) {
                renderer.background(255);		
            } else {
                background(255);
            }

            // Texture and plane have no method within p5.Renderer
            texture(this.graph_graphic);
            plane(width, height);
			
            this.do_draw = false;
        }
    }
}