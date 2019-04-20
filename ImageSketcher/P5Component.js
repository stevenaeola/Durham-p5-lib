"use strict";

/**
 * This class is the interface between a reusable component and the p5 library, it also proves utilities for making
 * nested components.
 * This class behaves as **abstract** and cannot be instantiated, only inherited from.
 * [reference.html](/reference.html) for example implementations
 * @abstract
 */
class P5Component {

    /**
     * This constructor instantiates a P5Component, it enforces all the the fact that this is an abstract class, its
     * abstract and final methods.  This constructor also overloads `setup` and `preload` to make sure that they are
     * only called once.
     */
    constructor() {
        this._isSetup = false;
        this._isPreloaded = false;
        this._parent = undefined;

        // this block emulates an abstract class
        if (this.constructor === P5Component) {
            throw new TypeError('Abstract class "p5Component" cannot be instantiated directly.');
        }

        const emulatedMethodModifiers = {
            abstract: [
                {name: "preload", args: 0},
                {name: "setup", args: 1},
                {name: "draw", args: 1}
            ],
            final: [
                {name: "generateSeed"}
            ]
        };

        // this enforces the implementation of the listed methods to make them behave as though they were abstract
        for (let i = 0; i < emulatedMethodModifiers.abstract.length; i++) {
            const method = emulatedMethodModifiers.abstract[i];
            if (this[method.name] === P5Component.prototype[method.name] || typeof this[method.name] !== "function") {
                // if it's not overridden or if name is used for something other than a function
                throw new TypeError("Abstract method '" + method.name + "' must be implemented by " + this.__proto__.name);
            } else if (this[method.name].length !== method.args) {
                // function.length returns the number of arguments a function takes
                throw new TypeError("Abstract method '" + method.name + "' must take " + method.args +
                    " arguments, but takes " + this[method.name].length);
            }
        }
        // this enforces there not to be an override of the listed methods to make them behave as though they were final
        for (let i = 0; i < emulatedMethodModifiers.final.length; i++) {
            const method = emulatedMethodModifiers.final[i];
            if (this[method.name] !== P5Component.prototype[method.name]) {
                throw new TypeError("Final method '" + method.name + "' can not be overridden");
            }
        }

        // the following code makes sure that setup and preload are only called once, and draw will have an appropriate
        // default for the canvas.
        const originalFunctions = {
            preload: this.preload.bind(this),
            setup: this.setup.bind(this),
            draw: this.draw.bind(this)
        }; // these need to be stored to avoid an infinite recursion
        const comp = this; // to remove this ambiguity

        this.preload = function () {
            if (comp._sketch === undefined) {
                throw Error("Preload called on child before the call to initChildPrototype");
            } else if (!comp._isPreloaded) {
                originalFunctions.preload();
                comp._isPreloaded = true;
            }
        };
        this.setup = function (parent) {
            if (comp._sketch === undefined) {
                throw Error("Setup called on child before the call to initChildPrototype");
            } else if (!comp._isPreloaded) {
                throw Error("Setup called on child before the call to preload");
            } else if (!comp._isSetup) {
                originalFunctions.setup(parent);
                comp._isSetup = true;
            }
        };
        this.draw = function (canvas) {
            if (comp._sketch === undefined) {
                throw Error("Draw called on child before the call to initChildPrototype");
            } else if (!comp._isPreloaded) {
                throw Error("Draw called on child before the call to preload");
            } else if (!comp._isSetup) {
                throw Error("Draw called on child before the call to setup");
            } else if (canvas === undefined) {
                canvas = comp; // if no canvas is specified (such as when p5 calls), it should draw on itself
                // this is under the assumption that canvas is only called with no parameters by p5
                // this isn't safe, but in js there is no way to use visibility modifiers to prevent this from happening
            }
            originalFunctions.draw(canvas);
        };

    }

    /**
     * This method is to do any slow setup tasks (computationally intensive or suffering from network latency)
     * This method behaves as **abstract** and must be implemented by a child class.
     * @abstract
     */
    preload() {
        // abstract method stub
    }

    /**
     * This method is called to setup the object after everything has been pre-loaded (e.g. deal with loaded images)
     * This method behaves as **abstract** and must be implemented by a child class.
     * @abstract
     * @param parent {P5Component} the parent object calling the setup.  `undefined` if the component is the root
     */
    setup(parent) {
        // abstract method stub
    }

    /**
     * This method draws the component onto the canvas.
     * If this method is called a canvas must be passed.
     * This method behaves as **abstract** and must be implemented by a child class.
     * @abstract
     * @param canvas {p5} the canvas where the component will be drawn
     * @see p5.redraw
     */
    draw(canvas) {
        // abstract method stub
    }

    /**
     * This method creates a seed which can be used to create p5 sketches containing the component.
     * The seed is a function which adds methods (such as `setup`, `draw` and various listeners) to the p5 sketch object.
     * This method behaves as **final** and cannot be overridden.
     * @return {Function} the seed
     * @final
     */
    generateSeed() {
        const component = this;
        return function (sketch) {
            component._initPrototype(sketch);
            sketch.setup = component.setup;
            sketch.draw = component.draw;
            sketch.preload = component.preload;
            // all of these functions have already been bound to component in the constructor (refer to function.bind)

        };
    }

    /**
     * This method manipulates the objects prototype such that it will inherit from the sketch
     * @param sketch {p5} the sketch to inherit form
     * @private
     */
    _initPrototype(sketch) {
        // This is defiantly abuse of prototypal inheritance.  The main issues I can identify with this other than
        this.__proto__ = P5Component.deepClone(this.__proto__);
        this._sketch = sketch;
        // deep clone the prototype, this is so that the other instances
        // are not affected by adding the sketch to the chain

        let lastPrototype = this; // add sketch to the end of the prototype chain.
        while (lastPrototype.__proto__ !== Object.prototype) {
            lastPrototype = lastPrototype.__proto__;
            if(lastPrototype instanceof p5){
                throw Error("You can't bind one instance of P5Component to multiple p5 sketches.")
            }
        }
        lastPrototype.__proto__ = sketch;
    }

    /**
     * This method is used to instantiate a child component (when a component only exists within another component)
     * It will give the child access to necessary p5 methods.
     * @param child {P5Component} the child to setup
     */
    initChildPrototype(child) {
        if (this._sketch === undefined) {
            throw Error("Uninitialised child called initialised to nested child is illegal");
        } else {
            child._initPrototype(this._sketch);
            child._parent = this;
        }
    }

    /**
     * This function is used for making a clone any object.
     * @param obj {Object} the object to be copied
     * @return {Object} an element wise identically object to the object passed but now completely immutable by the pointer
     * passed
     */
    static deepClone(obj) {
        const clone = {};
        Object.getOwnPropertyNames(obj).forEach(key => {
            const descriptor = Object.getOwnPropertyDescriptor(obj, key);
            if (typeof obj[key] == "object" && obj[key] != null) {
                clone[key] = this.deepClone(obj[key]);
            } else if (descriptor.get !== undefined || descriptor.set !== undefined) { // this is to add the getters and setters
                Object.defineProperty(clone, key, {get: descriptor.get, set: descriptor.set});
            } else {
                clone[key] = obj[key];
            }
        });
        if (obj.__proto__ !== null) {
            Object.setPrototypeOf(clone, P5Component.deepClone(obj.__proto__));
        }
        return clone;
    }

}