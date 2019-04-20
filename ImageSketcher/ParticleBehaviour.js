/**
 * This class is the abstraction for the different custom behaviours that can be added to the particles in the simulation
 * This class behaves as **abstract** and cannot be instantiated, only inherited from.
 */
class ParticleBehaviour {
    /**
     * Instantiates a new ParticleBehaviour, ensures that all the abstract methods are implemented and makes sure that
     * the constructor is being called from within the constructor or another class (super class).
     * @param startActive {Boolean} if the behaviour is active
     */
    constructor(startActive = true) {
        // this block emulates an abstract class
        if (this.constructor === ParticleBehaviour) {
            throw new TypeError('Abstract class "ParticleBehaviour" cannot be instantiated directly.');
        }

        const emulatedMethodModifiers = {
            abstract: [
                {name: "update", args: 1},
                {name: "updateParticle", args: 1},
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

        this._isActive = startActive;

    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {
    }

    /**
     * Returns if the behaviour is active
     * @return {Boolean}
     */
    get isActive() {
        return this._isActive;
    }

    /**
     * Sets if the behaviour is active
     * @param value {Boolean} new active boolean
     */
    set isActive(value) {
        if (typeof value !== "boolean") {
            throw TypeError("Is active must be a booleans");
        } else {
            this._isActive = value;
        }
    }
}

/**
 * This particle behaviour adds a force to which attracts the particle towards the ares of the image near it with the
 * same color
 */
class SimpleAttractiveForceBehaviour extends ParticleBehaviour {

    /**
     * Instantiates a new object of SimpleAttractiveForceBehaviour
     * @param kernelSize {Number|Array<Number>} The area near which the particle will be attracted to
     * @param forceFactor {Number} The factor for the force that the particle will feel
     * @param willAverage {Boolean} If the force will be the average of all the pixels that exert a force on it
     */
    constructor(kernelSize = 5, forceFactor = 1.0, willAverage = false) {
        super(true);

        this.kernelSize = kernelSize; // calls setter and validates
        this.forceFactor = forceFactor;
        this.willAverage = willAverage;
    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {

        let total = particle.p5.createVector(0, 0);
        let pixels = 0;

        const halfWidth = this._kernelWidth / 2;
        const halfHeight = this._kernelHeight / 2;
        for (let i = 0; i <= this._kernelWidth; i++) {

            for (let j = 0; j <= this._kernelHeight; j++) {
                const x = Math.floor(particle.pos.x + i - halfWidth);
                const y = Math.floor(particle.pos.y + j - halfHeight);

                if (x < particle.img.width && x >= 0 && y < particle.img.height && y >= 0) {
                    const c = particle.sketcher.getColor(particle.img, x, y);
                    const dif = particle.p5.color(
                        Math.abs(c.levels[0] - particle.color.levels[0]),
                        Math.abs(c.levels[1] - particle.color.levels[1]),
                        Math.abs(c.levels[2] - particle.color.levels[2])
                    );
                    const b = 1 - particle.p5.brightness(dif) / 255;
                    const v = particle.p5.createVector(i - halfWidth, j - halfHeight);
                    total.add(v.normalize().mult(b));

                    pixels += 1;
                }

            }
        }
        if (this._willAverage && pixels !== 0) {
            particle.force.add(total.mult(this._forceFactor / pixels));
        } else {
            particle.force.add(total.mult(this._forceFactor));
        }
    }

    /**
     * Returns the force factor
     * @return {Number} the force factor
     */
    get forceFactor() {
        return this._forceFactor;
    }

    /**
     * Sets the force factor
     * @param value {Number} the new force factor
     */
    set forceFactor(value) {
        if (typeof value !== "number") {
            throw TypeError("Force factor must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Force factor must be finite");
        } else {
            this._forceFactor = value;
        }
    }

    /**
     * Returns will average
     * @return {Boolean} will average
     */
    get willAverage() {
        return this._willAverage;
    }

    /**
     * Sets if the force will be averaged
     * @param value {Boolean} new will average
     */
    set willAverage(value) {
        if (typeof value !== "boolean") {
            throw TypeError("Will average must be a boolean");
        } else {
            this._willAverage = value;
        }
    }

    /**
     * Returns the width and height
     * @return {Number[]} an array with the width and height as the two elements.
     */
    get kernelSize() {
        return [this._kernelWidth, this._kernelHeight];
    }

    /**
     * Sets the size of the kernel
     * @param value {Number|Number[]} the square kernel size or an array with the width and height
     */
    set kernelSize(value) {
        if (typeof value === "number") {
            this.kernelWidth = value;
            this.kernelHeight = value;
        } else if (Array.isArray(value) && value.length === 2) {
            [this.kernelWidth, this.kernelHeight] = value; // calls the two sub setters
        } else {
            throw TypeError("Kernel size must be either a number or an Array of length 2");
        }
    }

    /**
     * Returns the kernel width
     * @return {Number} the kernel width
     */
    get kernelWidth() {
        return this._kernelWidth;
    }

    /**
     * Sets the kernel width
     * @param value {Number} the new kernel width (an integer)
     */
    set kernelWidth(value) {
        if (typeof value !== "number") {
            throw TypeError("Kernel width must be a number");
        } else if (!Number.isInteger(value) || !Number.isFinite(value)) {
            throw TypeError("Kernel width must be an integer");
        } else {
            this._kernelWidth = value;
        }
    }

    /**
     * Returns the kernel height
     * @return {Number} the kernel height
     */
    get kernelHeight() {
        return this._kernelHeight;
    }

    /**
     * Sets the kernel height
     * @param value {Number} the new kernel height (integer)
     */
    set kernelHeight(value) {
        if (typeof value !== "number") {
            throw TypeError("Kernel height must be a number");
        } else if (!Number.isInteger(value) || !Number.isFinite(value)) {
            throw TypeError("Kernel height must be an integer");
        } else {
            this._kernelHeight = value;
        }
    }
}

/**
 * This particle behaviour is used for adding noise forces to the particle.
 */
class NoiseForceBehaviour extends ParticleBehaviour {
    /**
     * Instantiates a new object of NoiseForceBehaviour
     * @param noiseScale {Number} The factor for the location in noise space
     * @param noiseInfluence {Number} The factor on the size of the force that the particle feels
     * @param timeFactor {Number} The factor is how fast noise evolves through time
     * @param noiseTimeOffset {Number} The offset to the noise, used to make each instance of ImageSketcher unique
     */
    constructor(noiseScale = .001, noiseInfluence = 0.05, timeFactor = 0.01, noiseTimeOffset = Math.random()) {
        super(true);

        this.noiseScale = noiseScale; // calls setter and validates
        this.noiseInfluence = noiseInfluence;
        this.timeFactor = timeFactor;

        if (typeof noiseTimeOffset !== "number") {
            throw TypeError("Noise time offset must be a number");
        } else if (!Number.isFinite(noiseTimeOffset)) {
            throw TypeError("Noise time offset must be finite");
        } else {
            this._noiseTimeOffset = noiseTimeOffset;
        }

        this._updateCount = 0;

    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
        this._updateCount += 1;
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {
        const n = particle.p5.noise(
            particle.pos.x * this._noiseScale,
            particle.pos.y * this._noiseScale,
            (this._noiseTimeOffset + this._updateCount) * this._timeFactor
        ) * 10 * particle.p5.TWO_PI;
        // multiplied by an arbitrary large factor to make more likely that the range of 0 to 2pi is covered
        particle.force.add(p5.Vector.fromAngle(n, this._noiseInfluence));
    }

    /**
     * Returns the noise scale
     * @return {Number} the noise scale
     */
    get noiseScale() {
        return this._noiseScale;
    }

    /**
     * Sets the noise scale
     * @param value {Number} the new noise scale
     */
    set noiseScale(value) {
        if (typeof value !== "number") {
            throw TypeError("Noise scale must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Noise scale must be finite");
        } else {
            this._noiseScale = value;
        }
    }

    /**
     * Returns the noise influence
     * @return {Number} the noiseInfluence
     */
    get noiseInfluence() {
        return this._noiseInfluence;
    }

    /**
     * Sets the new noise influence
     * @param value {Number} the new for noise influence
     */
    set noiseInfluence(value) {
        if (typeof value !== "number") {
            throw TypeError("Noise influence must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Noise influence must be finite");
        } else {
            this._noiseInfluence = value;
        }
    }

    /**
     * Returns the time factor
     * @return {Number} the time factor
     */
    get timeFactor() {
        return this._timeFactor;
    }

    /**
     * Sets the time factor
     * @param value {Number} the new time factor
     */
    set timeFactor(value) {
        if (typeof value !== "number") {
            throw TypeError("Time factor must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Time factor must be finite");
        } else {
            this._timeFactor = value;
        }
    }

}

/**
 *This particle behaviour makes it so that a particle dies after a certain amount of update calls
 */
class UpdateLimitDeathBehaviour extends ParticleBehaviour {

    /**
     * Instantiates a new object of UpdateLimitDeathBehaviour
     * @param maxLife {Number|Function} The number of updates or a function which returns the number of updates
     */
    constructor(maxLife = 100) {
        super(true);

        this._updatesLived = new Map();
        this._max = new Map();
        this.maxLife = maxLife; // calls setter and validates

    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
        if (this._updatesLived.size > sketcher.particleCount * 2) {
            // particles that die from other behaviours won't be removed
            // so from time to time the dictionaries should be purged to prevent a memory leak
            for (const particle of this._updatesLived.keys()) {
                if (!particle.isAlive) {
                    this._updatesLived.delete(particle);
                    this._max.delete(particle);
                }
            }
        }
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {

        if (this._updatesLived.get(particle) === undefined) {
            this._updatesLived.set(particle, 1);

            if (typeof this._maxLife === "function") {
                const updates = this._maxLife(particle);
                if (typeof updates !== "number") {
                    throw TypeError("The max updates function must return a number");
                } else if (!Number.isFinite(updates)) {
                    throw TypeError("The max updates function must return a finite number");
                } else {
                    this._max.set(particle, updates);
                }

            } else {
                this._max.set(particle, this._maxLife);
            }

        } else {
            this._updatesLived.set(particle, this._updatesLived.get(particle) + 1);
        }

        if (this._updatesLived.get(particle) >= this._max.get(particle)) {
            this._updatesLived.delete(particle);
            this._max.delete(particle);

            particle.isAlive = false;
        }
    }

    /**
     * Returns max life
     * @return {Number|Function} max life, the number or a function which maps a particle to it
     */
    get maxLife() {
        return this._maxLife;
    }

    /**
     * Sets max life
     * @param value {Number|Function} the new value of max life
     */
    set maxLife(value) {
        if (typeof value !== "function" && typeof value !== "number") {
            throw TypeError("MaxLife must either be a number or a function which returns a number");
        } else {
            this._maxLife = value;
        }
    }
}

/**
 * This particle behaviour adds a force on the particle when the particle is close to the edge of the image.  The force
 * is interpolated linearly, meaning that at the bounds it is zero and then at the edge it is boundForceFactor.
 */
class LinearOutOfBoundsForceBehaviour extends ParticleBehaviour {

    /**
     * Instantiates a new object of LinearOutOfBoundsForceBehaviour
     * @param bounds {Number|{top: Number, left: (Number), bottom: (Number), right: (Number)}} the number distance from the edges or an object with the keys 'top', 'right',
     * 'bottom' and or 'left'
     * @param forceFactor {Number} The magnitude of the max force on the particle
     */
    constructor(bounds = 20, forceFactor = 0.25) {
        super(true);

        this.bounds = bounds;
        this._forceFactor = forceFactor;

    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {

        const boundForce = particle.p5.createVector(0, 0);
        if (particle.pos.x < this._left) {
            boundForce.x += (this._left - particle.pos.x) / this._left;
        }
        if (particle.pos.x > particle.img.width - this._right) {
            boundForce.x += (particle.pos.x - particle.img.width) / this._right;
        }
        if (particle.pos.y < this._bottom) {
            boundForce.y += (this._bottom - particle.pos.y) / this._bottom;
        }
        if (particle.pos.y > particle.img.height - this._top) {
            boundForce.y += (particle.pos.y - particle.img.height) / this._top;
        }
        particle.force.add(boundForce.mult(this._forceFactor));

    }

    /**
     * Sets the distances from which the force will be applied.
     * @param value {Number|{top: Number, left: (Number), bottom: (Number), right: (Number)}} the number distance from the edges or an object with the keys 'top', 'right',
     * 'bottom' and or 'left'
     */
    set bounds(value) {
        this._top = 0;
        this._right = 0;
        this._bottom = 0;
        this._left = 0;
        if (typeof value === "number" && Number.isFinite(value)) {
            this._top = value;
            this._right = value;
            this._bottom = value;
            this._left = value;
        } else if (typeof value === "number") {
            throw TypeError("Bounds must be a finite number");
        } else if (typeof value === "object" &&
            ("top" in value || "right" in value || "bottom" in value || "left" in value)) {
            this._top = value.top || 0;
            this._right = value.right || 0;
            this._bottom = value.bottom || 0;
            this._left = value.left || 0;
        } else {
            throw TypeError("Bounds must either be a number or an object containing the keys 'top', 'right'," +
                " 'bottom' or 'left'");
        }
    }

    /**
     * Returns all the bounds in an array in the order top, right, bottom, left
     * @return {{top: Number, left: (Number), bottom: (Number), right: (Number)}} the bounds
     */
    get bounds() {
        return {top: this._top, right: this._right, bottom: this._bottom, left: this._left};
    }

    /**
     * Returns the force factor
     * @return {Number} the force factor
     */
    get forceFactor() {
        return this._forceFactor;
    }

    /**
     * Sets the force factor
     * @param value {Number} the new force factor
     */
    set forceFactor(value) {
        if (typeof value !== "number") {
            throw TypeError("Force factor must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Force factor must be finite");
        } else {
            this._forceFactor = value;
        }
    }

    /**
     * Returns the top bound
     * @return {Number} top bound
     */
    get top() {
        return this._top;
    }

    /**
     * Sets the top bound
     * @param value the new bound
     */
    set top(value) {
        if (typeof value !== "number") {
            throw TypeError("The top bound must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("The top bound must be finite");
        } else {
            this._top = value;
        }
    }

    /**
     * Returns the right bound
     * @return {Number} right bound
     */
    get right() {
        return this._right;
    }

    /**
     * Sets the right bound
     * @param value the new bound
     */
    set right(value) {
        if (typeof value !== "number") {
            throw TypeError("The right bound must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("The right bound must be finite");
        } else {
            this._right = value;
        }
    }

    /**
     * Returns the bottom bound
     * @return {Number} bottom bound
     */
    get bottom() {
        return this._bottom;
    }

    /**
     * Sets the bottom bound
     * @param value the new bound
     */
    set bottom(value) {
        if (typeof value !== "number") {
            throw TypeError("The bottom bound must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("The bottom bound must be finite");
        } else {
            this._bottom = value;
        }
    }

    /**
     * Returns the left bound
     * @return {Number} left bound
     */
    get left() {
        return this._left;
    }

    /**
     * Sets the left bound
     * @param value the new bound
     */
    set left(value) {
        if (typeof value !== "number") {
            throw TypeError("The left bound must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("The left bound must be finite");
        } else {
            this._left = value;
        }
    }
}

/**
 *This particle behaviour makes it so that a particle dies after it has traveled a certain distance.
 */
class MaxDistanceTraveledDeath extends ParticleBehaviour {
    /**
     * Instantiates a new object of MaxDistanceTraveledDeath
     * @param maxDistance {Number|Function}  The distance number or a function which returns the distance
     */
    constructor(maxDistance = 50) {
        super(false);

        this._distanceTraveled = new Map();
        this._max = new Map();

        this.maxDistance = maxDistance;

    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
        if (this._distanceTraveled.size > sketcher.particleCount * 2) {
            // particles that die from other behaviours won't be removed
            // so from time to time the dictionaries should be purged to prevent a memory leak
            for (const particle of this._distanceTraveled.keys()) {
                if (!particle.isAlive) {
                    this._distanceTraveled.delete(particle);
                    this._max.delete(particle);
                }
            }
        }
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {
        const distance = particle.vel.copy().mag();
        if (this._distanceTraveled.get(particle) === undefined) {
            this._distanceTraveled.set(particle, distance);

            if (typeof this._maxDistance === "function") {
                const distance = this._maxDistance(particle);
                if (typeof distance !== "number") {
                    throw TypeError("The max distance function must return a number");
                } else if (!Number.isFinite(distance)) {
                    throw TypeError("The max distance function must return a finite number");
                } else {
                    this._max.set(particle, distance);
                }
            } else {
                this._max.set(particle, this._maxDistance);
            }

        } else {
            this._distanceTraveled.set(particle, this._distanceTraveled.get(particle) + distance);
        }

        if (this._distanceTraveled.get(particle) >= this._max.get(particle)) {
            this._distanceTraveled.delete(particle);
            this._max.delete(particle);

            particle.isAlive = false;
        }
    }

    /**
     * Returns the max distance number or function
     * @return {Number|Function} max number or function
     */
    get maxDistance() {
        return this._maxDistance;
    }

    /**
     * Sets the max number or function
     * @param value {Number|Function} the maximum distance or a function which returns the maximum distance
     */
    set maxDistance(value) {
        if (typeof value !== "function" && typeof value !== "number") {
            throw TypeError("maxDistance must either be a number or a function which returns a number");
        } else {
            this._maxDistance = value;
        }
    }
}

/**
 * This particle behaviour makes it so that the particle adopts the color of the pixels in the surrounding area.  The
 * change is exponential by the change rate factor and in the area specified by kernel size.
 */
class EvolveColorBehaviour extends ParticleBehaviour {

    /**
     * Instantiates a new object of EvolveColorBehaviour
     * @param changeRate {Number} the exponential change factor of how fast a particle's color should change
     * @param kernelSize {Number|Number[]} the square size of the area of affect or an array of length 2 containing the
     * width and height
     */
    constructor(changeRate = 0.005, kernelSize = 3) {
        super(false);

        this.kernelSize = kernelSize; // validated in setters
        this.changeRate = changeRate; // validated in setters

    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {
        let totals = {r: 0, g: 0, b: 0, count: 0};
        const halfWidth = this._kernelWidth / 2;
        const halfHeight = this._kernelHeight / 2;

        for (let i = 0; i <= this._kernelWidth; i++) {
            for (let j = 0; j <= this._kernelHeight; j++) {
                const x = Math.floor(particle.pos.x + i - halfWidth);
                const y = Math.floor(particle.pos.y + j - halfHeight);

                if (x < particle.img.width && x >= 0 && y < particle.img.height && y >= 0) {
                    const color = particle.sketcher.getColor(particle.img, x, y);
                    totals.r += color.levels[0];
                    totals.g += color.levels[1];
                    totals.b += color.levels[2];
                    totals.count += 1;
                }
            }
        }
        const averageColor = {
            r: totals.r / totals.count,
            g: totals.g / totals.count,
            b: totals.b / totals.count
        };
        if (totals.count !== 0) {
            particle.color = particle.p5.color(
                (1 - this._changeRate) * particle.color.levels[0] + this._changeRate * averageColor.r,
                (1 - this._changeRate) * particle.color.levels[1] + this._changeRate * averageColor.g,
                (1 - this._changeRate) * particle.color.levels[2] + this._changeRate * averageColor.b,
                particle.color.levels[3]
            );
        }
    }

    /**
     * Returns the width and height
     * @return {Number[]} an array with the width and height as the two elements.
     */
    get kernelSize() {
        return [this._kernelWidth, this._kernelHeight];
    }

    /**
     * Sets the size of the kernel
     * @param value {Number|Number[]} the square kernel size or an array with the width and height
     */
    set kernelSize(value) {
        if (typeof value === "number") {
            this.kernelWidth = value;
            this.kernelHeight = value;
        } else if (Array.isArray(value) && value.length === 2) {
            [this.kernelWidth, this.kernelHeight] = value; // calls the two sub setters
        } else {
            throw TypeError("Kernel size must be either a number or an Array of length 2");
        }
    }

    /**
     * Returns the kernel width
     * @return {Number} the kernel width
     */
    get kernelWidth() {
        return this._kernelWidth;
    }

    /**
     * Sets the kernel width
     * @param value {Number} the new kernel width (an integer)
     */
    set kernelWidth(value) {
        if (typeof value !== "number") {
            throw TypeError("Kernel width must be a number");
        } else if (!Number.isInteger(value) || !Number.isFinite(value)) {
            throw TypeError("Kernel width must be an integer");
        } else {
            this._kernelWidth = value;
        }
    }

    /**
     * Returns the kernel height
     * @return {Number} the kernel height
     */
    get kernelHeight() {
        return this._kernelHeight;
    }

    /**
     * Sets the kernel height
     * @param value {Number} the new kernel height (integer)
     */
    set kernelHeight(value) {
        if (typeof value !== "number") {
            throw TypeError("Kernel height must be a number");
        } else if (!Number.isInteger(value) || !Number.isFinite(value)) {
            throw TypeError("Kernel height must be an integer");
        } else {
            this._kernelHeight = value;
        }
    }

    /**
     * Returns the change rate
     * @return {Number} the change rate
     */
    get changeRate() {
        return this._changeRate;
    }

    /**
     * Sets the change rate
     * @param value {Number} the new change rate
     */
    set changeRate(value) {
        if (typeof value !== "number") {
            throw TypeError("Change rate must be a number");
        } else if (!Number.isFinite(value)) {
            throw Error("Change rate must be finite");
        } else if (value < 0 || value > 1) {
            throw Error("Change rate must be in the range from 0 to 1 (inclusive)");
        } else {
            this._changeRate = value;
        }
    }

}

/**
 * This behaviour makes it so that a particle dies when it goes outside of the image
 */
class OutOfBoundsDeathBehaviour extends ParticleBehaviour {
    /**
     * Instantiates a new object of OutOfBoundsDeathBehaviour
     */
    constructor() {
        super(false);
    }

    /**
     * This method is called one per update and is for updating the state of the ParticleBehaviour object
     * This method behaves as **abstract** and must be implemented by a child class.     *
     * @param sketcher {ImageSketcher} The sketcher that the behaviour is part of
     */
    update(sketcher) {
    }

    /**
     * This method is called once per update per particle.  This is where the behaviour object will act on the particle
     * This method behaves as **abstract** and must be implemented by a child class.
     * @param particle {Particle} The particle that the behaviour is acting on
     */
    updateParticle(particle) {
        if (particle.pos.x > particle.sketcher.width ||
            particle.pos.y > particle.sketcher.height ||
            particle.pos.x < 0 ||
            particle.pos.y < 0) {

            particle.isAlive = false;
        }
    }

}
