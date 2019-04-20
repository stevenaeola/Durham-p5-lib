"use strict";

/**
 * This class creates a p5Component containing the image sketcher.  The image sketcher is a simple physics simulation
 * which allows for an artistic recreation of an input image.
 * For usage examples see:
 * @see reference.html
 */
class ImageSketcher extends P5Component {

    // All the types in in the signature for optionalParameters are also undefined to represent default
    /**
     * Instantiates a new ImageSketcher
     * @param targetImageURL {String} the URL of the target image
     * @param width {Number|undefined} the target width, undefined means to infer from aspect ratio
     * @param height  {Number|undefined} the target height, undefined means to infer from aspect ratio
     * @param optionalParameters {{particleCount: (Number|undefined),
     * stepsPerFrame: (Number|undefined),
     * startStopped: (Boolean|undefined),
     * startPointGenerator: (ParticleGenerator|undefined),
     * particleBehaviours: (ParticleBehaviour[]|undefined),
     * onClickListener: (Function|undefined),
     * dampeningFactor: (Number|undefined),
     * maxSpeed: (Number|undefined),
     * dropRate: (Number|undefined),
     * dropAlpha: (Number|undefined),
     * dropMaxSize: (Number|undefined),
     * drawAlpha: (Number|undefined),
     * drawWeight: (Number|undefined)}}
     * This object contains all the optional parameters for the Particle object (this is so that arguments can be passed
     * in an arbitrary order).  <br>
     *
     * `particleCount` - {Number} The number of particles in the simulation
     * `stepsPerFrame` - {Number} The number of simulation updates per simulation frame.
     * `startStopped` - {Boolean} If the ImageSketcher should start stopped
     * `startPointGenerator` - {ParticleGenerator} The object that generates the starting parameters for the particles
     * `particleBehaviours` - {ParticleBehaviour[]} The list of behaviours that are applied to all the particles
     * `onClickListener` - {Function} This function is called when the component is clicked
     * `defaultVel` - {p5.Vector} The starting velocity of the particle. <br>
     * `dampeningFactor` - {Number} The factor by which the velocity is multiplied by each update. <br>
     * `maxSpeed` - {Number} The maximum speed that the particle can reach. <br>
     * `dropRate` - {Number} The chance that an ink drop will be drawn during any draw call. <br>
     * `dropAlpha` - {Number} The opacity of the ink drops. <br>
     * `dropMaxSize` - {Number} The upper bound of the uniformly distributed. <br>
     * `drawAlpha` - {Number} The opacity of the trace that the particle draws. <br>
     * `drawWeight` - {Number} The width of the trace that the particle draws. <br>
     */
    constructor(targetImageURL, width, height, optionalParameters) {
        super();

        let { // default values
            particleCount = 100,
            stepsPerFrame = 5,
            startStopped = false,
            startPointGenerator = new RandomParticleGenerator(),
            particleBehaviours = [
                // new MaxDistanceTraveledDeath(particle => particle.p5.random(10, 10)),
                new EvolveColorBehaviour(),
                new UpdateLimitDeathBehaviour(particle => particle.p5.random(75, 100)),
                new OutOfBoundsDeathBehaviour(),
                new LinearOutOfBoundsForceBehaviour(),
                new NoiseForceBehaviour(),
                new SimpleAttractiveForceBehaviour(),
            ],
            onClickListener = Function(),

            defaultVel, // a new vector can't be instantiated at this point
            dampeningFactor = 0.99,
            maxSpeed = 3.0,
            dropRate = 0.0008,
            dropAlpha = 150,
            dropMaxSize = 5,
            drawAlpha = 50,
            drawWeight = 1,
        } = optionalParameters || {};

        this.defaultVel = defaultVel;
        this.dampeningFactor = dampeningFactor;
        this.maxSpeed = maxSpeed;
        this.dropRate = dropRate;
        this.drawAlpha = drawAlpha;
        this.drawWeight = drawWeight;
        this.dropAlpha = dropAlpha;
        this.dropMaxSize = dropMaxSize;

        this._targetImageURL = targetImageURL;
        this._width = Math.floor(width) || undefined;
        this._height = Math.floor(height) || undefined;
        // width and height are dealt with when the image is loaded
        // if undefined is passed it will stay undefined instead of going to NaN

        this._particles = [];
        this.stepsPerFrame = stepsPerFrame;
        this.particleCount = particleCount;

        this.particleStartGenerator = startPointGenerator;
        this.particleBehaviours = particleBehaviours;

        this.isStopped = startStopped;
        this._forceClear = false;

        this.onClickListener = onClickListener;

    }

    /**
     * This method is to do any slow setup tasks (computationally intensive or suffering from network latency)
     * For this component the image is loaded.
     * @throws `404 Not found` error if `this.image` is a string an can't be loaded
     */
    preload() {
        if (this._defaultVel === undefined) {
            this._defaultVel = this.createVector(0, 0);
        }
        this._targetImage = this.loadImage(this.targetImageURL);
    }

    /**
     * This method is called to setup the object after everything has been pre-loaded (e.g. deal with loaded images)
     * @param parent {P5Component} the parent object calling the setup.  `undefined` if the component is the root
     */
    setup(parent) {
        this.targetImage = this._targetImage; // calls the setter
        // loading in p5 is a pain because calling loadImage doesn't return an image
        // only the promise of an image

        if (parent === undefined) {
            const canvas = this.createCanvas(this.targetImage.width, this.targetImage.height);
            canvas.mousePressed(this.mousePressed.bind(this));
        }

        this.background(255, 255, 255);
        this.colorMode(this.RGB, 255);

    }

    /**
     * This method draws the image sketcher object on the canvas
     * @param canvas {p5} The canvas to be drawn on
     */
    draw(canvas) {

        if (this._forceClear) {
            canvas.clear();
            this._forceClear = false;

            while (this._particles.length !== 0) {
                this._particles.shift();
            }
        }


        if (!this._isStopped) {
            canvas.push();

            for (let step = 0; step < this.stepsPerFrame; step++) {

                this._particleStartGenerator.update(this);
                for (let i = 0; i < this._particleBehaviours.length; i++) {
                    if (this._particleBehaviours[i].isActive) {
                        this._particleBehaviours[i].update(this);
                    }
                }

                // make sure that the number of particles matches the specified number
                if (this._particles.length < this._particleCount) {
                    const newParticles = this._particleCount - this._particles.length;
                    for (let i = 0; i < newParticles; i++) {
                        this._spawnParticle();
                    }
                } else if (this._particles.length < this._particleCount) {
                    // it is possible for more particles to exist than the target, if the target is changed
                    const particlesToDelete = this._particleCount - this._particles.length;
                    for (let i = 0; i < particlesToDelete; i++) {
                        this._particles.shift(); // remove the first element
                    }
                }

                for (let i = 0; i < this._particleCount; i++) {
                    const particle = this._particles[i];
                    particle.update();
                    particle.paint(canvas);
                    if (!particle.isAlive) {
                        this._particles.splice(i, 1);
                        this._spawnParticle();
                    }
                }
            }
            this.targetImage.updatePixels();
            canvas.pop();
        }
    }

    /**
     * This method is called from within the object when a particle needs to be spawned
     * @private
     */
    _spawnParticle() {

        const startParams = this._particleStartGenerator.spawnParticle(this);
        this._particles.push(new Particle(this, startParams));

    }

    /**
     * This method is called when the component is clicked.  This listener is only called by a parent or if assigned to
     * the canvas when it is created!. (https://github.com/processing/p5.js/issues/1437)
     */
    mousePressed() {
        this._onClickListener(this);
    }

    /**
     * This method makes it so that the next time that the image sketcher updates the canvas will be cleared.  This
     * means that the canvas that it is drawing on is cleared.  The target image remains the same.
     */
    forceClear() {
        this._forceClear = true;
    }

    /**
     * This method makes it so that the image sketcher will clear it's canvas and reload its target image.
     */
    reset() {
        this._forceClear = true;
        this.targetImageURL = this.targetImageURL; // call setter to reset the target image
    }

    /**
     * Returns whether the image sketcher is stopped
     * @return {Boolean} is stopped
     */
    get isStopped() {
        return this._isStopped;
    }

    /**
     * Sets if the image sketcher is stopped or not
     * @param value {Boolean} new is stopped
     */
    set isStopped(value) {
        if (typeof value !== "boolean") {
            throw TypeError("Is stopped must be a boolean");
        } else {
            this._isStopped = value;
        }
    }

    /**
     * Sets the on click listener.  This listener is only called by p5 if it is the root element
     * @param value {Function} the event listener
     */
    set onClickListener(value) {
        this._onClickListener = value;
    }

    /**
     * Returns the number of times that the simulation is updated per frame, this is done to make the simulation run
     * faster
     * @return {Number} the number of steps per frame
     */
    get stepsPerFrame() {
        return this._stepsPerFrame;
    }

    /**
     * Sets the number of times that the simulation is updated per frame
     * @param value {Number}
     */
    set stepsPerFrame(value) {
        if (typeof value !== "number") {
            throw TypeError("Steps per frame must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Steps per frame must be finite");
        } else if (!Number.isInteger(value)) {
            throw Error("Steps per frame must be an integer");
        } else {
            this._stepsPerFrame = value;
        }
    }

    /**
     * Returns the number of particles in the simulation at one time
     * @return {Number} the number of particles
     */
    get particleCount() {
        return this._particleCount;
    }

    /**
     * Sets the number of particles that will coexist in the simulation at any one point
     * @param value {Number} the new particle count
     */
    set particleCount(value) {
        if (typeof value !== "number") {
            throw TypeError("Particle count must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Particle count must be finite");
        } else if (!Number.isInteger(value)) {
            throw Error("Particle count must be an integer");
        } else {
            this._particleCount = value;
        }
    }

    /**
     * Returns the target image, the image that the particles are drawing.
     * @return {p5.Image}
     */
    get targetImage() {
        return this._targetImage;
    }

    /**
     * Sets the target image.  This method also recalculates any dimensions set to auto and rescales the canvas.  The
     * canvas is also cleared.
     * @param value {p5.Image} the new targetImage
     */
    set targetImage(value) {

        if (!(value instanceof p5.Image)) {
            throw TypeError("Target image must be of type p5.Image");
        } else {
            let width = this._width;
            let height = this._height;
            if (width === undefined && height === undefined) { // nothing give, taken from image
                width = this._targetImage.width;
                height = this._targetImage.height;
            } else if (width === undefined) { // height, infer width from aspect ration
                width = Math.floor(value.width / value.height * height);
            } else if (height === undefined) { // width, infer height from aspect ration
                height = Math.floor(value.height / value.width * width);
            } // else values are already good


            this._targetImage = this.createImage(width, height);
            this._targetImage.copy(value, 0, 0, value.width, value.height, 0, 0, this._targetImage.width, this._targetImage.height);
            this._targetImage.loadPixels();
            if(this._parent === undefined){
                this.resizeCanvas(width, height, true);
            }
        }
    }

    /**
     * Returns the URL to the target image.  Notably, if the target image last wasn't set using a URL, this will return
     * the wrong URL.
     * @return {String} the URL
     */
    get targetImageURL() {
        return this._targetImageURL;
    }

    /**
     * This method sets sets the target image from a URL.  This will could result in the resizing of the canvas (see
     * the setter for targetImage).  Most browsers will not allow cross domain requests, meaning that not all URLs will
     * work.
     * @param value {String} new image URL
     */
    set targetImageURL(value) {
        this._targetImageURL = value;
        // this may fail and error out if the image isn't found
        // if value isn't a string at all this will also error out

        const wasStopped = this._isStopped;
        this.isStopped = true;

        const sketcher = this;
        this.loadImage(value, function (image) {
            sketcher.targetImage = image;
            sketcher.isStopped = wasStopped;
        });

    }

    /**
     * Returns the target height of the component.  If it is undefined it will be inferred from the aspect ratio of the
     * image when the image is set.
     * @return {Number | undefined}
     */
    get targetHeight() {
        return this._height;
    }

    /**
     * This validates the width or height
     * @param value {Object} The width/height to be
     * @param text {String} width or height
     * @private
     */
    static _validateWidthHeight(value, text) {
        if (value !== undefined) if (typeof value !== "number") {
            throw TypeError("target " + text + " must be a number or undefined");
        } else if (!Number.isInteger(value)) {
            throw TypeError("target " + text + " must be an integer or undefined");
        } else if (value <= 0) {
            throw Error("target " + text + " must be more than 0 or undefined");
        }
    }

    /**
     * This sets the size of the Image sketcher, specific values can be given, or undefined can be passed to make
     * auto calculate that dimension from the aspect ration
     * @param width {Number | undefined} new width
     * @param height {Number | undefined} new height
     */
    setSize(width, height) {
        this._width = width;
        this._height = height;

        ImageSketcher._validateWidthHeight(width, "width");
        ImageSketcher._validateWidthHeight(height, "height");

        this.targetImage = this.targetImage;
        this.forceClear();
    }

    /**
     * Sets the target height of the component.  If it is undefined it will be inferred from the aspect ratio of the
     * image when the image is set.
     * @param value {Number | undefined}
     */
    set targetHeight(value) {
        ImageSketcher._validateWidthHeight(value, "height");

        this._height = value;
        this.targetImage = this.targetImage;
        this.resizeCanvas(this._width, this._height, true);
        this.forceClear();
    }

    /**
     * Returns the target width of the component.  If it is undefined it will be inferred from the aspect ratio of the
     * image when the image is set.
     * @return {Number | undefined}
     */
    get targetWidth() {
        return this._width;
    }

    /**
     * Sets the target width of the component.  If it is undefined it will be inferred from the aspect ratio of the
     * image when the image is set.
     * @param value {Number | undefined}
     */
    set targetWidth(value) {
        ImageSketcher._validateWidthHeight(width, "width");

        this._width = value;
        this.resizeCanvas(this._width, this._height, true);
        this.targetImage = this.targetImage;
        this.forceClear();
    }

    /**
     * Sets the particle start generator.
     * @see ParticleGenerator
     * @see RandomParticleGenerator
     * @param value the new generator
     */
    set particleStartGenerator(value) {
        if (!(value instanceof ParticleGenerator)) {
            throw TypeError("Particle start generator must be of type ParticleGenerator");
        } else {
            this._particleStartGenerator = value;
        }
    }

    /**
     * Returns the list of particle behaviours that act on all particles unless it is overwritten by the particle
     * generator.
     * @return {ParticleBehaviour[]}
     */
    get particleBehaviours() {
        return this._particleBehaviours;
    }

    /**
     * Sets the default particle behaviours.
     * @param value {ParticleBehaviour[]} new list of behaviours
     */
    set particleBehaviours(value) {
        if (!Array.isArray(value)) {
            throw  TypeError("Particle behaviours must be an array");
        } else if (value.some(behaviour => !(behaviour instanceof ParticleBehaviour))) {
            throw  TypeError("All particle behaviours in the list must be be of type ParticleBehaviour");
        } else {
            this._particleBehaviours = value;
        }
    }

    /**
     * Returns the default start velocity of the particle, it can be overwritten by the particle generator
     * @return {p5.Vector} the start velocity
     */
    get defaultVel() {
        return this._defaultVel;
    }

    /**
     * Sets the default particle start velocity, it can be overwritten by the particle generator
     * @param value {p5.Vector} the new defaultVelocity
     */
    set defaultVel(value) {
        if (value !== undefined && !(value instanceof p5.Vector)) {
            throw TypeError("Default velocity must be of type p5.Vector");
        } else {
            this._defaultVel = value;
        }
    }

    /**
     * Returns the default dampening factor.  The dampening factor is a factor by which the speed of the particle is
     * multiplied at each update. It can be overwritten by the particle generator
     * @return {Number} the dampening factor
     */
    get dampeningFactor() {
        return this._dampeningFactor;
    }

    /**
     * Sets the default dampening factor, it can be overwritten by the particle generator.
     * @param value {Number} the new dampening factor
     */
    set dampeningFactor(value) {
        if (typeof value !== "number") {
            throw TypeError("Dampening factor must be a number");
        } else if (!Number.isFinite(value)) {
            throw TypeError("Dampening factor must be finite");
        } else if (value < 0) {
            throw TypeError("Dampening factor must be positive");
        } else {
            this._dampeningFactor = value;
        }
    }

    /**
     * Returns the max speed of the particles in the simulation, It can be overwritten by the particle generator.
     * @return {Number} the max speed
     */
    get maxSpeed() {
        return this._maxSpeed;
    }

    /**
     * Sets the max speed of the particles in the simulation, it can be overwritten by the particle generator.
     * @param value {Number} the new default max speed
     */
    set maxSpeed(value) {
        if (typeof value !== "number") {
            throw TypeError("Max speed must be a number");
        } else if (!Number.isFinite(value)) {
            throw TypeError("Max speed must be finite");
        } else if (value < 0) {
            throw TypeError("Max speed must be positive or 0");
        } else {
            this._maxSpeed = value;
        }
    }

    /**
     * Returns the drop rate.  The drop rate is the probability that an ink splodge will be drawn in any update. It can
     * be overwritten by the particle generator.
     * @return {Number} the drop rate
     */
    get dropRate() {
        return this._dropRate;
    }

    /**
     * Sets the drop rate.  The drop rate is the probability that an ink splodge will be drawn in any update. It can
     * be overwritten by the particle generator.
     * @param value {Number} the new drop rate
     */
    set dropRate(value) {
        if (typeof value !== "number") {
            throw TypeError("Drop rate must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Drop rate must be finite");
        } else if (value < 0 || value > 1) {
            throw Error("Drop rate between 0 and 1 (inc.)");
        } else {
            this._dropRate = value;
        }
    }

    /**
     * Returns the draw opacity. It can be overwritten by the particle generator.
     * @return {Number} the draw opacity
     */
    get drawAlpha() {
        return this._drawAlpha;
    }

    /**
     * Sets the drop opacity (between 0 to 255 inc.). It can be overwritten by the particle generator.
     * @param value {Number} the new drop rate
     */
    set drawAlpha(value) {
        if (typeof value !== "number") {
            throw TypeError("Draw alpha must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Draw alpha must be finite");
        } else if (value > 255 || value < 0) {
            throw Error("Draw alpha must be between 0 and 255 inclusively");
        } else {
            this._drawAlpha = value;
        }
    }

    /**
     * Return the width of the line left by the particle. It can be overwritten by the particle generator.
     * @return {Number} the width
     */
    get drawWeight() {
        return this._drawWeight;
    }

    /**
     * Sets the width of the line left by the particle. It can be overwritten by the particle generator.
     * @param value {Number} the new width
     */
    set drawWeight(value) {
        if (typeof value !== "number") {
            throw TypeError("Draw weight must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Draw weight must be finite");
        } else if (value < 0) {
            throw Error("Draw weight must be positive");
        } else {
            this._drawWeight = value;
        }
    }

    /**
     * Returns the drop opacity. It can be overwritten by the particle generator.
     * @return {number} the draw opacity
     */
    get dropAlpha() {
        return this._dropAlpha;
    }

    /**
     * Sets the drop opacity (between 0 and 255 inc.) . It can be overwritten by the particle generator.
     * @param value {Number} the new drop opacity
     */
    set dropAlpha(value) {
        if (typeof value !== "number") {
            throw TypeError("Drop alpha must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Drop alpha must be finite");
        } else if (value > 255 || value < 0) {
            throw Error("Drop alpha must be between 0 and 255 inclusively");
        } else {
            this._dropAlpha = value;
        }
    }

    /**
     * Returns the max drop size. It can be overwritten by the particle generator.
     * @return {Number} the max drop size
     */
    get dropMaxSize() {
        return this._dropMaxSize;
    }

    /**
     * Sets the maximum drop size. It can be overwritten by the particle generator.
     * @param value {Number} the new max drop size
     */
    set dropMaxSize(value) {
        if (typeof value !== "number") {
            throw TypeError("Draw weight must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Draw weight must be finite");
        } else if (value < 0) {
            throw Error("Draw weight must be positive");
        } else {
            this._dropMaxSize = value;
        }
    }

    /**
     * This method returns the a color object which represents the color at the specified location the the image.
     * @param img {p5.Image} the image
     * @param x {Number} the x coordinate of the pixel
     * @param y {Number} the y coordinate of the pixel
     * @return {p5.Color} The color
     */
    getColor(img, x, y) {
        const index = (y * img.width + x) * 4;
        return this.color(...img.pixels.slice(index, index + 4));
    }

    /**
     * This function sets the color of the image at the specified location
     * @param img {p5.Image} the image
     * @param x {Number} the x coordinate of the pixel
     * @param y {Number} the y coordinate of the pixel
     * @param color {p5.Color}
     */
    static setColor(img, x, y, color) {
        const index = (y * img.width + x) * 4;
        for (let i = 0; i < 4; i++) {
            img.pixels[index + i] = color.levels[i];
            // it is safe to use `levels` (over `red`,`green`... since this will be RGB)
        }
    }

}