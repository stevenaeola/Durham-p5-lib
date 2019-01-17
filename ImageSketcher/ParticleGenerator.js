/**
 * This class encapsulates the particle generator.  In other languages this would be an interface, but emulating
 * abstract classes will have to do.
 */
class ParticleGenerator {

    constructor() {

        // this block emulates an abstract class
        if (this.constructor === ParticleGenerator) {
            throw new TypeError('Abstract class "ParticleGenerator" cannot be instantiated directly.');
        }

        const emulatedMethodModifiers = {
            abstract: [
                {name: "update", args: 1},
                {name: "spawnParticle", args: 1},
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

    }

    /**
     * This method is called once an update and allows the generator to do some none particle specific processing.
     * @param sketcher {ImageSketcher} the sketcher that the generator is generating for
     */
    update(sketcher) {
    }

    /**
     * This method is for spawning particles.  It returns an object containing the properties of the new particle.  The
     * starting properties must include starting position and starting color, and my contain the following : vel,
     * dampeningFactor, maxSpeed, dropRate, dropAlpha, dropMaxSize, drawAlpha, drawWeight.  If these are not specified
     * then the particle will inherit them from the sketcher.
     * @param sketcher {ImageSketcher} the sketcher that the generator is generating for
     * @return {{pos: (!p5.Vector)}, {color: (!p5.Color)}}
     */
    spawnParticle(sketcher) {
        return {pos: undefined, color: undefined};
    }

}

/**
 * This class is the default particle generator.  The position is randomly chosen (from a uniform distribution) and then
 * the start color is set to be the color at that pixel.
 */
class RandomParticleGenerator extends ParticleGenerator {

    /**
     * This method is called once an update and allows the generator to do some none particle specific processing.
     * @param sketcher {ImageSketcher} the sketcher that the generator is generating for
     */
    update(sketcher) {
        super.update(sketcher);
    }

    /**
     * This method is for spawning particles.  It returns an object containing the properties of the new particle.  The
     * starting properties must include starting position and starting color, and my contain the following : vel,
     * dampeningFactor, maxSpeed, dropRate, dropAlpha, dropMaxSize, drawAlpha, drawWeight.  If these are not specified
     * then the particle will inherit them from the sketcher.
     * @param sketcher {ImageSketcher} the sketcher that the generator is generating for
     * @return {{pos: (!p5.Vector)}, {color: (!p5.Color)}}
     */
    spawnParticle(sketcher) {
        const pos = sketcher.createVector(sketcher.random(0, sketcher.targetImage.width),
            sketcher.random(0, sketcher.targetImage.height));
        const color = sketcher.getColor(sketcher.targetImage, Math.floor(pos.x), Math.floor(pos.y));
        return {pos: pos, color: color};
    }
}