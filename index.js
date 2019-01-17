class Canvas {
    constructor (w = 600, r = 105, g = 176, b = 172) {
        this.w = w;
        this.h = w;
        this.r = r;
        this.g = g;
        this.b = b;
    }
    get red() {
        return this.r;
    }
    set red(value) {
        this.r = value;
    }
    get green() {
        return this.g;
    }
    set green(value) {
        this.g = value;
    }
    get blue() {
        return this.b;
    }
    set blue(value) {
        this.b = value;
    }
}

class item {
    constructor (f, m) {
        this.f = f;
        this.m = m;
    }
    get freq () {
        return this.f;
    }
    set freq (value) {
        this.f = value;
    }
    get module () {
        return this.m;
    }
    set module(value) {
        this.m = value;
    }
}

let vari = {
    dom: {
        canvasSize: $('#canvasSize'),
        bgR: $('#bgR'),
        bgG: $('#bgG'),
        bgB: $('#bgB'),
        freq: $('#frequency'),
        mode: $('input:radio[name="mode"]:checked')
    }
}
var circle = 200,
    rot,
    col,
    r,
    mode,
    freq = parseInt(vari.dom.freq.val());

let canvasInstance = new Canvas(vari.dom.canvasSize.val(), vari.dom.bgR.val(), vari.dom.bgB.val(), vari.dom.bgB.val());

function setup() {
    createCanvas(canvasInstance.w, canvasInstance.h);
}

function draw() {
    canvasInstance.r = parseInt(vari.dom.bgR.val());
    canvasInstance.g = parseInt(vari.dom.bgG.val());
    canvasInstance.b = parseInt(vari.dom.bgB.val());
    background(canvasInstance.red, canvasInstance.green, canvasInstance.blue);
    translate(300, 300);
    rotate(radians(rot));

    // mode
    mode = vari.dom.mode.val();
    ellipseMode(mode);

    // freq
    freq = vari.dom.freq.val();
    // console.log(freq);

    for (var i = 0; i < 500; i++) {
        circle = 200 + 50 * sin(millis() * freq * i);
        col = map(circle, 150, 250, 255, 60);
        r = map(circle, 150, 250, 5, 2);
        fill(col, 100, 100);
        noStroke();
        ellipse(circle * cos(i), circle * sin(i), r, r);
        rot = rot + 0.00005;
    }
}