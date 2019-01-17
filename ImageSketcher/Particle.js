"use strict";

/**
 * This class encapsulates the particles in the simulation and their behaviour.
 * At the most basic level the class is only responsible for two behaviours: the basic physics simulation and the
 * drawing of the path that the particle has taken.  All other behaviours of the particle can are added through its
 * updateEvents field.
 */
class Particle {

    /**
     * Instantiates a new particle object
     * @param sketcher {ImageSketcher} This is the ImageSketcher which the particle is a part of
     * @param params {{ pos: (p5.Vector), color: (p5.Color), vel: (p5.Vector), dampeningFactor: (Number), maxSpeed: (Number),
     * dropRate: (Number), dropAlpha: (Number), dropMaxSize: (Number), drawAlpha: (Number), drawWeight: (Number)}}
     * This object contains all the optional parameters for the Particle object (this is so that arguments can be passed
     * in an arbitrary order).  <br>
     *
     * `pos` - {p5.Vector} The starting position of the particle. <br>
     * `color` - {p5.Color} The starting color of the particle. <br>
     * `vel` - {p5.Vector} The starting velocity of the particle. <br>
     * `dampeningFactor` - {Number} The factor by which the velocity is multiplied by each update. <br>
     * `maxSpeed` - {Number} The maximum speed that the particle can reach. <br>
     * `dropRate` - {Number} The chance that an ink drop will be drawn during any draw call. <br>
     * `dropAlpha` - {Number} The opacity of the ink drops. <br>
     * `dropMaxSize` - {Number} The upper bound of the uniformly distributed. <br>
     * `drawAlpha` - {Number} The opacity of the trace that the particle draws. <br>
     * `drawWeight` - {Number} The width of the trace that the particle draws. <br>
     */
    constructor(sketcher, params) {
        let {
            pos, // must be passed
            color, // must be passed
            vel, // undefined means it will be copied from the sketcher in the getters
            dampeningFactor,
            maxSpeed,
            dropRate,
            dropAlpha,
            dropMaxSize,
            drawAlpha,
            drawWeight,
        } = params || {};

        this._sketcher = sketcher;
        // the only thing that the particle generator can't change on an individual basis is the behaviours

        this._img = sketcher.targetImage;
        this._p5 = sketcher.__proto__;
        // this is where all the p5 utilities are
        // this._p5. is shorter than this.sketcher.

        this.isAlive = true;

        this.pos = pos;
        this._lastPos = pos.copy(); // this has no setter
        this.color = color;
        this.color.setAlpha(this.drawAlpha);

        this.vel = vel === undefined ? sketcher.defaultVel.copy() : vel.copy();
        this.force = this._p5.createVector(0, 0);

        this.dampeningFactor = dampeningFactor;
        this.maxSpeed = maxSpeed;

        this.dropRate = dropRate;
        this.dropAlpha = dropAlpha;
        this.dropMaxSize = dropMaxSize;

        this.drawAlpha = drawAlpha;
        this.drawWeight = drawWeight;

    }

    /**
     * This function fates the target image alone a certain line.  It moves the pixels there closer to white.
     * @param x1 the x coordinate of the start point
     * @param y1 the y coordinate of the start point
     * @param x2 the x coordinate of the end point
     * @param y2 the y coordinate of the end point
     * @private
     */
    _fadeLineFromImg(x1, y1, x2, y2) {

        const xOffset = Math.floor(Math.abs(x1 - x2));
        const yOffset = Math.floor(Math.abs(y1 - y2));
        const step = Math.max(yOffset, xOffset);

        for (let i = 0; i < step; i++) {
            const x = Math.floor(x1 + (x2 - x1) * i / step);
            const y = Math.floor(y1 + (y2 - y1) * i / step);
            if (x < 0 || x >= this._sketcher.targetImage.width || y < 0 || y >= this._sketcher.targetImage.height) {
                continue;
            }
            const originColor = this._sketcher.getColor(this.img, x, y);
            const modifiedColor = this._p5.color(
                Math.min(originColor.levels[0] + 50, 255),
                Math.min(originColor.levels[1] + 50, 255),
                Math.min(originColor.levels[2] + 50, 255)
            );
            ImageSketcher.setColor(this.img, x, y, modifiedColor);
        }
    }

    /**
     * This methods paints the path of the particle between the current state and the state it was in before the
     * previous call to update, this could include an ink drop.  This method also fades the target image.
     * @param canvas the canvas that the path will be drawn on
     */
    paint(canvas) {

        canvas.stroke(this.color);
        canvas.strokeWeight(this.drawWeight);

        if (this._sketcher.random(1) < this.dropRate) {
            this.color.setAlpha(this.dropAlpha);
            canvas.stroke(this.color);
            let boldWeight = this._sketcher.random(this.drawWeight, Math.max(this.dropMaxSize, this.drawWeight));
            canvas.strokeWeight(boldWeight);
            this.color.setAlpha(this.drawAlpha);
        }

        canvas.line(this._lastPos.x, this._lastPos.y, this._pos.x, this._pos.y);
        this._fadeLineFromImg(this._lastPos.x, this._lastPos.y, this._pos.x, this._pos.y);

    }

    /**
     * This method facilitates all of the particles behaviours and the simple physics simulation
     */
    update() {

        this._lastPos = this._pos.copy();
        this._force.mult(0);

        for (let i = 0; i < this.sketcher.particleBehaviours.length; i++) {
            if (this.sketcher.particleBehaviours[i].isActive) {
                this.sketcher.particleBehaviours[i].updateParticle(this);
            }
        }

        this._vel.add(this._force); // force should really be replaced with impulse
        this._vel.mult(this.dampeningFactor);

        if (this._vel.mag() > this.maxSpeed) {
            this._vel.mult(this.maxSpeed / this._vel.mag());
        }

        this._pos.add(this._vel);

    }

    /**
     * Returns the sketcher that the particle is part of
     * @return {ImageSketcher} the sketcher
     */
    get sketcher() {
        return this._sketcher;
    }

    /**
     * Returns the image which the particle is targeting.  Is the same as sketcher.targetImage
     * @return {p5.Image} the image
     */
    get img() {
        return this._img;
    }

    /**
     * Returns the p5 prototype which contains all the p5 utility methods
     * @return {p5} the p5 object
     */
    get p5() {
        return this._p5;
    }

    /**
     * Returns if the particle is alive
     * @return {Boolean} is alive
     */
    get isAlive() {
        return this._isAlive;
    }

    /**
     * Sets if the particle is alive
     * @param value {Boolean} the new is alive value
     */
    set isAlive(value) {
        if (typeof value !== "boolean") {
            throw TypeError("Is alive must be a boolean");
        } else {
            this._isAlive = value;
        }
    }

    /**
     * Returns the position of the particle
     * @return {p5.Vector} the position
     */
    get pos() {
        return this._pos;
    }

    /**
     * Sets the position of the particle
     * @param value {p5.Vector} the new position
     */
    set pos(value) {
        if (!(value instanceof p5.Vector)) {
            throw TypeError("Position must be an instance of p5.Vector");
        } else {
            this._pos = value;
        }
    }

    /**
     * Returns the position vector the particle was in before the previous update
     * @return {p5.Vector} the last position
     */
    get lastPos() {
        return this._lastPos;
    }

    /**
     * Returns the velocity vector of the particle
     * @return {p5.Vector} the velocity
     */
    get vel() {
        return this._vel;
    }

    /**
     * Sets the velocity vector of the particle
     * @param value {p5.Vector} the velocity
     */
    set vel(value) {
        if (!(value instanceof p5.Vector)) {
            throw TypeError("Velocity must be an instance of p5.Vector");
        } else {
            this._vel = value;
        }
    }

    /**
     * Returns the force on the particle
     * @return {p5.Vector}
     */
    get force() {
        return this._force;
    }

    /**
     * Sets the force on the particle, this is reset at the beginning of the call to update.
     * @param value {p5.Vector} the new force
     */
    set force(value) {
        if (!(value instanceof p5.Vector)) {
            throw TypeError("Force must be an instance of p5.Vector");
        } else {
            this._force = value;
        }
    }

    /**
     * Returns the color of the particle
     * @return {p5.Color}
     */
    get color() {
        return this._color;
    }

    /**
     * Sets the color of the particle
     * @param value {p5.Color} the new color value
     */
    set color(value) {
        if (!(value instanceof p5.Color)) {
            throw TypeError("Color must be an instance of p5.Color");
        } else {
            this._color = value;
        }
    }

    /**
     * Returns the dampening factor that is acting on the particle, if this is undefined it will return the dampening
     * factor of the sketcher.
     * @return {Number} the dampening factor
     */
    get dampeningFactor() {
        if (this._dampeningFactor === undefined) {
            return this.sketcher.dampeningFactor;
        } else {
            return this._dampeningFactor;
        }
    }

    /**
     * Sets the dampening factor
     * @param value {Number|undefined} the new dampening factor
     */
    set dampeningFactor(value) {
        if (value === undefined) {
            this._dampeningFactor = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Dampening Factor must be a number or undefined");
        } else if (!Number.isFinite(value)) {
            throw Error("Dampening Factor must be finite");
        } else {
            this._dampeningFactor = value;
        }
    }

    /**
     * Returns the max speed of the particle, if this is undefined it will return the max speed of the sketcher.
     * @return {Number} the max speed
     */
    get maxSpeed() {
        if (this._maxSpeed === undefined) {
            return this._sketcher.maxSpeed;
        } else {
            return this._maxSpeed;
        }
    }

    /**
     * Sets the max speed of the particle
     * @param value {Number} the new max speed
     */
    set maxSpeed(value) {
        if (value === undefined) {
            this._maxSpeed = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Max speed must be a number");
        } else if (!Number.is(value)) {
            throw Error("Max speed must be finite");
        } else if (value < 0) {
            throw Error("Max speed must positive");
        } else {
            this._maxSpeed = value;
        }
    }

    /**
     * Returns the drop rate of the particle, if this is undefined it will return the drop rate of the sketcher.
     * @return {Number} the drop rate
     */
    get dropRate() {
        if (this._dropRate === undefined) {
            return this._sketcher.dropRate;
        } else {
            return this._dropRate;
        }
    }

    /**
     * Sets the drop rate
     * @param value {Number} new drop rate
     */
    set dropRate(value) {
        if (value === undefined) {
            this._dropRate = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Drop rate must be a number");
        } else if (!Number.is(value)) {
            throw Error("Drop rate must be finite");
        } else if (value < 0 || value > 1) {
            throw Error("Drop rate must be between 0 and 1 (inclusively)");
        } else {
            this._dropRate = value;
        }
    }

    /**
     * Returns the drop opacity of the particle, if this is undefined it will return the drop opacity of the sketcher.
     * @return {Number} the drop opacity
     */
    get dropAlpha() {
        if (this._dropAlpha === undefined) {
            return this._sketcher.dropAlpha;
        } else {
            return this._dropAlpha;
        }
    }

    /**
     * Sets the opacity if the ink drop
     * @param value {Number}
     */
    set dropAlpha(value) {
        if (value === undefined) {
            this._drawAlpha = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Drop alpha must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Drop alpha must be finite");
        } else if (value < 0 || value > 255) {
            throw Error("Drop alpha must be between 0 and 255 (inclusively)");
        } else {
            this._dropAlpha = value;
        }
    }

    /**
     * Returns the max drop size of the particle, if this is undefined it will return the max drop size of the
     * sketcher.
     * @return {Number} the max drop size
     */
    get dropMaxSize() {
        if (this._dropMaxSize === undefined) {
            return this._sketcher.dropMaxSize;
        } else {
            return this._dropMaxSize;
        }
    }

    /**
     * Sets the max ink drop size
     * @param value {Number} the new max size
     */
    set dropMaxSize(value) {
        if (value === undefined) {
            this._dropMaxSize = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Max drop size must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Max drop size must be finite");
        } else if (value < 0) {
            throw Error("Max drop size must be positive");
        } else {
            this._dropMaxSize = value;
        }
    }

    /**
     * Returns the opacity of the trace left by the particle, if this is undefined it will return the trace opacity of
     * the sketcher
     * @return {Number}
     */
    get drawAlpha() {
        if (this._drawAlpha === undefined) {
            return this._sketcher.drawAlpha;
        } else {
            return this._drawAlpha;
        }
    }

    /**
     * Sets the opacity of the path left by the particle
     * @param value {Number} the new opacity
     */
    set drawAlpha(value) {
        if (value === undefined) {
            this._drawAlpha = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Draw alpha must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Draw alpha must be finite");
        } else if (value < 0 || value > 255) {
            throw Error("Draw alpha must be between 0 and 255 (inclusively)");
        } else {
            this._drawAlpha = value;
        }
    }

    /**
     * Returns the trace width of the particle, if this is undefined it will return the trace width of the sketcher
     * @return {Number}
     */
    get drawWeight() {
        if (this._drawWeight === undefined) {
            return this._sketcher.drawWeight;
        } else {
            return this._drawWeight;
        }
    }

    /**
     * Sets the width of the path left by the particle
     * @param value {Number} the new width
     */
    set drawWeight(value) {
        if (value === undefined) {
            this._drawWeight = undefined;
        } else if (typeof value !== "number") {
            throw TypeError("Draw weight must be a number or undefined");
        } else if (!Number.isFinite(value)) {
            throw Error("Draw weight must be finite");
        } else if (value < 0) {
            throw Error("Draw weight must be positive");
        } else {
            this._drawWeight = value;
        }
    }

}