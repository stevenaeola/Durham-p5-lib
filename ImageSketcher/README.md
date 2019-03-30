# Programming Summative

This project is my updated version of this sketch on open processing https://www.openprocessing.org/sketch/486307.  The 
sketch is a simulation designed to recreate an image in an artistic way.  The principe behind this is that particles (
in the simulation) feel various forces which influence the way they move across the canvas.  As the particles move they
trace a line behind them.  The main force on the particles is the attractive force of the particle to the near areas of 
the image which are dark.  I call this simulation the 'Image Sketcher'

My version of the original sketch expands on the functionality of the original while also refactoring the simulation 
to a more reusable form. 

## Usage Guide
The component usage guide can be found in reference.html
The code **must** be hosted over a http server, otherwise browsers may block access to the image files needed.

## Licence

If this were to be published it would be published under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
The original work can be found at this here https://www.openprocessing.org/sketch/486307.

To comply with the MIT licences of Bootstrap, jQuery and Prism the MIT licence is included in the file named LICENCE
## Design

The first step to this assignment is to try and understand what an ideal 'reusable component' would look like.  So I set
out to make a list of objectives for the end result.

*Future Author: In retrospect, this design section turned out more like a design story rather than a specification*

### Goals for the abstraction of a 'reusable component'

Firstly, it should be possible to create a reusable component that fully encapsulates another component.  In other words
a good model for such a component would allow for a component to take the role of calling all the event handlers of 
another component.  Meaning that layout manger alike component should be possible in such a model.  This would also 
allow for the example where a component is projected onto a 3d shape.  Thus it should be an objective to make both of 
those components in the same model as validation of the model.

Secondly, while studying the p5 library I found that p5 has two different ways for creating sketches, global mode (the 
mode that we were taught) and instance mode (https://github.com/processing/p5.js/wiki/Global-and-instance-mode).

Here is an example of how an instance mode sketch is created,
```javascript
let seed = function(sketch) {
    let x = 100; 
    let y = 100;    
    sketch.setup = function() {
        sketch.createCanvas(200, 200);
    };    
    sketch.draw = function() {
        sketch.background(0);
        sketch.fill(255);
        sketch.rect(x, y, 50, 50);
    };
};
let myp5 = new p5(seed, document.getElementById('id'));
```

A functional advantage of instance mode is that it allows you to create several p5 sketches (canvases) in the same html 
page, which seems like an obvious necessity for a *reusable* component.  Besides this, instance mode offers the ability 
for greater encapsulation and thus abstraction, resulting in *hopefully* nicer code.

Finally, the code written to implement a reusable component and to instantiate it should be clean, concise and safe.

To summarise, a good model should:
* Allow for nested components
* Allow for instantiating straight to a p5 sketch
* Clean, concise and safe

### Thoughts and preliminary implementations of a good model

Ideally, you should be able to instantiate a p5 sketch solely containing the reusable component.  The best conceivable 
implementation of this that matches the marking criteria of using ECMA 6 classes is to make components inherit from p5. 
This is in fact problematic not because p5 isn't an ESMA 6 class. 

For clarity, I am describing the issues with this example,
```javascript
class Component extends p5 {
    constructor(args, node) {
        super(function () {
        }, node)
        // use args to init object
    }
    setup() {}
    draw() {
        this.canvas.rect(20, 20, 40, 40)
    }
}
```
The problem with this example is that the p5 code doesnt't call the draw method (this method in particular) on the 
component object, resulting in `this` always being `undefined`.
The example shows what can be found in the p5 source code, illustrating the issue.
```javascript
var context = this._isGlobal ? window : this; // this being the p5 sketch
// ...
var userDraw = context.draw;
// ...
    userDraw();
// ...
```

We can fix this by binding `draw`, `setup` and `preload`(the methods that can be overridden) in the constructor as such,
```javascript
this.draw = this.draw.bind(this);
this.setup = this.setup.bind(this);
this.preload = this.preload.bind(this);
```

The main issue with inheriting from p5 is that you lose control over the calls to setup and draw, which is needed for 
nested components. The main issue being that p5 will by default create a canvas if one isn't created by the component.
Of course all of this can be worked around, leaving the question of whether the work around will result in nicer code
than a different work around which doesn't inherit from p5.

Since any model will somehow need to implement a work around to this issue, which will sacrifice either code cleanliness
or it's conciseness.  The obvious next step is to find the best compromise. My opinion being that I should prioritise
making any work around code (particularly the code for interfacing with p5) modular and forward compatible with ES6 
classes.  The goal being to have the interface between the `P5Component` class contain any unclean code, such that the 
implementation of my particular sketch and it's usage to only uses good practices. 

A possible solution to this would be a `P5Component` class which has a method which creates a seed(refer to the example 
of instance mode) or to make a static function which creates a seed from any component.
```javascript
class P5Component {
    get seed(){
        const component = this;
        const originalPrototype = this;
        // to remove the ambiguity from what 'this' is referring to
        return function(sketch){
            component.sketch = sketch;
            sketch.setup = function () {
                originalPrototype.setup.call(component);
            };
            // attach other methods to the sketch
        }
    }
    draw(){
        this.sketch.rect(20, 20, 40, 40)
    }
}
class CustomComponent extends P5Component {}
```
The problem with this is that is that a component can't exist on it's own without being attached to a sketch. 
Conceivably a user could call draw before setup which is symptomatic of a badly modeled OOP design.  It would be 
possible for the constructor of `P5Component` to hide these methods such that they throw an error before the 
object's seed is called, though this would be a gross misuse of prototypal inheritance.  This could be resolved through
careful visibility modifiers on overloads of visible methods, which I discuss later.

The other significant issue would be that the component itself needs to have access to the p5 sketch methods, such as 
those for drawing to the canvas or other utilities such as `noise()`. Ideally, the component has access to the sketch 
through inheritance, though simply inheriting from p5 is not an option.  This could be done by abusing prototypal 
inheritance.

The first idea is to replace the prototype with the sketch. This would result in the loss of all methods defined in the 
`CustomComponent` class.  It is notable that `draw` and `setup` must be 'attached' to the sketch to get around the 
`this = undefined` issue, meaning that only none-override methods would be lost. 

One solution is to hack around this by copying all keys from the `CustomComponent`'s prototype that don't conflict to 
the sketch.  This could result in some truly awful bugs if there are any naming conflicts.  This was my first idea, and
an implementation can be found in `.preliminaryImplementations/test1.html`.  As can be seen, the implementation of `ExampleComponent` 
and its usage looks like nice ES6 code.  The compromise being that the implementation of P5Component is very hacked 
together and quite frankly awful.

This is one solution to instantiating a component straight to a sketch.  The problem is that this solution isn't very
compatible with the first point I made (nested components). The main issue being that every instance of a component 
must have its methods added to sketch.  Of course, there is the idea that I could keep track of methods for each class 
and then throw an error if the methods with the same name exist in multiple classes.  After great hesitation I explored
this idea, only to reach a dead end (as can be found in `.preliminaryImplementations/test2.html`).  The insight I found 
being that it is just not possible for multiple objects to share a prototype and not encounter conflicts (duhh...).

Other ideas for combining the prototypes of `CustomComponent` and the p5 sketch have their own issues. 
For example, we might instead try change the second prototype (of `CustomComponent`) in the chain. The first issue is 
that the inheritance chain might be longer, thus we would have to find the end of the chain and attach the sketch there. 
Though this would by implication make it so that every instance of `CustomComponent` (and any instance of any of it's 
superclasses) has access to the same sketch.  In this case the sketch would effectively be a static field, which 
wouldn't work

A different work around would be to clone the whole prototype chain, and then add sketch to the end of the chain.
This would add all the methods of the sketch to the component but not alter any other component or break any instance.
The main downside to this is that instances of the same class no longer share the same prototype.  This isn't too bad
because editing the prototype of these classes would be a bad practice to avoid anyway.

It is possible to reach a working solution with this idea and here is my preliminary implementation,
```javascript
class P5Component {
    get seed() {
        const component = this;
        const originalProto = this.__proto__;
        return function (sketch) {
            component.initPrototype(sketch);
            sketch.setup = function () {
                originalProto.setup.call(component);
            };
            sketch.draw = function () {
                originalProto.draw.call(component, sketch);
            };
        }
    }

    initPrototype(sketch) {
        this.__proto__ = P5Component.deepClone(this.__proto__);
        // deep clone the prototype, this is so that the other instances
        // are not affected by adding the sketch to the chain

        let lastPrototype = this; // add sketch to the end of the prototype chain.
        while (lastPrototype.__proto__ !== Object.prototype) {
            lastPrototype = lastPrototype.__proto__;
        }
        lastPrototype.__proto__ = sketch;
    }
    static deepClone(obj) {
        const clone = {};
        Object.getOwnPropertyNames(obj).forEach(key => {
            if (typeof obj[key] == "object" && obj[key] != null) {
                clone[key] = this.deepClone(obj[key])
            } else {
                clone[key] = obj[key]
            }
        });
        return clone;
    }
}
```

This code is still not very nice, but is defiantly cleaner and less destructive than the previous example 
(`.preliminaryImplementations/test1.html`).  The main disadvantage of this (other than the fact that it's a bad practice) is the fact 
that it almost certainly hinders with browser javascript optimisation.  The next step is to design a class model.

### Javascript OOP features and thoughts on good abstraction

A good observation is that `P5Component` ought to be an abstract class (for better abstraction, but primarily for 
making this code safer), which can also be hacked in ES6 as shown in the following example 
(from https://ilikekillnerds.com/2015/06/abstract-classes-in-javascript/).
```javascript
class Widget {
    constructor() {
        if (this.constructor === Widget) {
            throw new TypeError('Abstract class "Widget" cannot be instantiated directly.'); 
        }
    }
}
```
In other languages with richer OOP features I would have `setup` and `draw` (and the other methods such as `preload`) as
abstract methods.  Another feature which makes developing a safe and developer friendly interface is tight control over 
visibility (which doesn't exist in js), such as package or module only visibility. In combination with features such as 
final methods would allow me to write a `P5Component` class that is truly fail safe.  I could implement abstract methods
by introducing a similar check to the one in the example above.

For example, `setup` could have a final and hidden overload which is only called by the p5 class, a private `isSetup` 
field could be used to disallowing multiple calls the user defined setup from the p5 class.  This would make it safe to 
make multiple sketches of the same component and hide all that complexity from the developer using the `P5Component` 
class.

### User input issues with p5

While trying to implement the P5Component's listeners I found a couple problems.  The first issue that I found was that
key listeners don't work when there were two instances of a component that uses a key listener. The second issue is that
mouse listeners bound to the sketch get triggered even when something other than the sketch is pressed.  The other way 
of implementing this that I found allows for adding mouse listeners to canvas object itself.  This is a good solution
for mouse presses but doesn't work have an alternative for key presses.  At this point in working on the project I'm
running out of time so I decided to remove any implementation of listeners in P5Component.

The two work around for adding a mouse listener is to add it directly to the canvas when it is created, for example:
```javascript
const canvas = this.createCanvas(100, 100);
canvas.mousePressed(someFunction);
```
The work around that could be used to add key listeners would involve adding a listener directly to the window.

This is only refering to the listeners.  The object do have access to properties such as `mouseX` or ` mouseIsPressed` 
and functions such as `keyIsPressed`.

### Making a model for `P5Component`

We already have a solution for instantiating a component to a sketch, now we must consider what a good model which 
allows for easy nesting of components looks like.  I think that writing a specification would result in an unnecessarily
complex model, so instead I will implement a nested component to see what needs to be added to the model.  This 
implementation can be found at `.preliminaryImplementations/test4.html`.

The main points that I took away from this implementation are, The component class should:
* prevent setup and preload functions from being called multiple times
* make it so that appropriate default parameters to draw and setup are passed when called by the p5 library.
* include useful methods to help with nested components 

There is still one big issue that needs to be resolved.  The problem is that the only way to access all the p5 utility
methods, such as `createVector()`, is through the sketch.  This isn't an issue for the object of the component, but if 
any other class is used, it will not have access to those methods.

The solution to this is to make those functions and fields global. All of these functions and constants can be found in 
the prototype of the sketch object. Otherwise the only way to do it is to pass the sketch object to all the classes used 
or to make all those classes inherit from the sketches prototype. All of these solutions being undesirable.

Let's consider how p5 deals with this. It makes all those functions global if an instance of a sketch isn't made and 
setup and draw functions can be found.  The p5 function which does this called `_globalInit` can be found on line 48405.
If you follow this code you can find where (on line 48970) p5 loops through all the keys of the p5 prototype and the 
global sketch object and makes them global.  It uses a private function called `_createFriendlyGlobalFunctionBinder`.

This is dangerous because it makes functions which are instance specific visible globally.  The original p5 code binds 
the global instance to the functions, which would be dangerous and allow any code to call methods on the instance.
Since I can't go through all 431 keys in the p5 prototype, I can instead just unbind the object.  The dangerous 
functions will still be public, but now instead they will just error out (arguably a lesser of two evils).  This solution
is still very imperfect. To demonstrate a common problem, let's consider the `color` function.  It always errors out 
because it tries to access a color mode variable which is sketch specific.

Another design issue is whether all the listeners should be abstract functions.  Since I would expect that the average
child class of the `P5Component` class would only implement a small fraction of all event listeners, it'll be cleaner 
not to force these to be implemented.

### Designing the component itself

There are a few features that I want to add to the particle image sketcher:

+ Smother drawing graphics (as opposed to the instant line appearing)
    + implemented by making it so that the life of one particle is spread over more frames
+ Customisation of particles attraction force
    + Ability to make change the convolution kernel for calculating the attractive force        
    + Ability to make a completely override the forces felt by the particles
    + implemented a force adder function
+ Make it so that the particles can be coloured
+ Allow for customisation of the start point of the particle
    + implemented using a generator argument
+ Allow for custom particle death conditions

