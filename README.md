# re-write sketch base on openprocessing.

## origin code

URL：http://www.openprocessing.org/sketch/422446
Licensed under Creative Commons Attribution ShareAlike
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/


original code：

```js
var circle = 200;
var rot;
var col;
var freq = 0.000005; 
var cont = 0;
var r;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(242);
  translate(300, 300);
  rotate(radians(rot));

 ellipseMode(RADIUS);
  for (var i=0; i<500; i ++) {
    circle= 200 + 50*sin(millis()*freq*i);
    col=map(circle,150,250,255,60);
    r=map(circle,150,250,5,2);
    fill(col,0,74);
    noStroke();
    ellipse(circle*cos(i), circle*sin(i),r,r);    
    rot=rot+0.00005;
  }
}
```

after re-writing

```js
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
```

expect .js document, re-writing document also includes .html .css document and so on 


## parameter

```js
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
```

Canvas class is used to store the data of canvas including style, colour and so on.

```
-w: width and height of the canvas
-r: red colour of rgb
-g: green colour of rgb
-b: blue colour of rgb
using get and set method
```



```js
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
```

item class is used to encapsulate the element of animation including movement and frequency

```
-f: the frequency of movement
-m: the mode of changing
using get and set method
```



```js
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
```

```

-vari.dom: use to store dom element being used in the html
-mode: change the mode of the movement.
-freq: change the frequency of changing 
```



```js
function setup() {
    createCanvas(canvasInstance.w, canvasInstance.h);
}
```

p5.js function used to create canvas



```js
function setup() {
    createCanvas(canvasInstance.w, canvasInstance.h);
}
```



```js
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
```

draw function: p5.js function used to run continuously from top to bottom until the program is stopped.