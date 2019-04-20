/*
This code is adapted from "Circuit" by Gabriel, which can be found here:
https://www.openprocessing.org/sketch/398992
Licensed under Creative Commons Attribution ShareAlike.
https://creativecommons.org/licenses/by-sa/3.0
https://creativecommons.org/licenses/GPL/2.0/
*/

class Photon {
    constructor(pos, dir) {
        this.pos = pos;
        this.old = pos;
        this.focus = null;

        this.col = [0, 255, 255];
        this.speed = 8;
        this.radius = 1;
        this.countr = 0;
        this.countl = 0;
        this.countmin = 5;

        this.visible = true;
        this.oneHit = false;
        this.orbit = false;
        this.reflection = false;

        // Calculate velocity of photon

        this.vel = p5.Vector.mult(dir, this.speed);
    }

    update(renderer) {
        let w;
        let h;

        // Set width and height values depending on where photon is being drawn

        if (renderer) {
            w = renderer.width;
            h = renderer.height;
        }
        else {
            w = width;
            h = height;
        }
        ++this.countr;
        ++this.countl;

        // Reverse x component of velocity if hit or past left wall

        if (this.pos.x < this.radius) {
            this.pos.x = this.radius;
            this.vel.x *= -1;
            this.visible = !((this.visible && !this.reflection) || this.oneHit); // Set visibility flag
        } else

        // Reverse x component of velocity if hit or past right wall

        if (this.pos.x > w-this.radius) {
            this.pos.x = w-this.radius;
            this.vel.x *= -1;
            this.visible = !((this.visible && !this.reflection) || this.oneHit); // Set visibility flag
        }

        // Reverse y component of velocity if hit or past top wall

        if (this.pos.y < this.radius) {
            this.pos.y = this.radius;
            this.vel.y *= -1;
            this.visible = !((this.visible && !this.reflection) || this.oneHit); // Set visibility flag
        } else

        // Reverse y component of velocity if hit or past bottom wall

        if (this.pos.y > h-this.radius) {
            this.pos.y = h-this.radius;
            this.vel.y *= -1;
            this.visible = !((this.visible && !this.reflection) || this.oneHit); // Set visibility flag
        }

        let rnd = random(1);

        // Decide whether to change photon direction

        if (this.orbit) {

            // Calculate turn if orbiting mouse

            let t = createVector(this.focus.x, this.focus.y, this.focus.z); // Create vector corresponding to focus(mouse) coordinates
            t.sub(this.pos);
            t.normalize();
            let a0 = p5.Vector.dot(t,this.vel)/this.speed;

            if (rnd < 0.04 && this.countl > this.countmin) {
                this.vel.rotate(-Math.PI/4);
                this.countl = 0;
            } else if (a0 < 0 && rnd < 0.6 && this.countr > this.countmin) {
                this.vel.rotate(Math.PI/4);
                this.countr = 0;
            }

        } else {

            // Calculate turn if not orbiting mouse

            if (rnd < 0.04 && this.countl > this.countmin) {
                this.vel.rotate(Math.PI/4);
                this.countl = 0;
            } else if (rnd < 0.08 && this.countr > this.countmin) {
                this.vel.rotate(-Math.PI/4);
                this.countr = 0;
            }
        }

        this.old = createVector(this.pos.x,this.pos.y,this.pos.z);
        this.pos.add(this.vel);
    }

    draw(renderer) {

        if (!this.visible) return;

        if (renderer) {

            // Draw to renderer

            renderer.stroke(this.col);
            renderer.strokeWeight(this.radius * 2);
            renderer.fill(this.col);
            renderer.line(this.old.x, this.old.y, this.pos.x, this.pos.y);

            renderer.noStroke();
            renderer.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        }
        else {

            // Draw to canvas

            stroke(this.col);
            strokeWeight(this.radius * 2);
            fill(this.col);
            line(this.old.x, this.old.y, this.pos.x, this.pos.y);

            noStroke();
            ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
        }
    }

    resetTurnCount() {
        this.countl = 0;
        this.countr = 0;
    }

    getTurnCount() {
        return [this.countl, this.countr];
    }

    setSpeed(speed) {
        this.vel = p5.Vector.div(this.vel, this.speed);
        this.speed = speed;
        this.vel = p5.Vector.mult(this.vel, this.speed);
    }

    getSpeed() {
        return this.speed;
    }

    setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    getPosition() {
        return this.pos;
    }

    setOldPosition(x, y) {
        this.old.x = x;
        this.old.y = y;
    }

    getOldPosition() {
        return this.old;
    }

    setColour(colour) {
        this.col = colour;
    }

    getColour() {
        return this.col;
    }

    setVisible(visible) {
        this.visible = visible;
    }

    getVisible() {
        return this.visible;
    }

    setOrbit(orbit) {
        this.orbit = orbit;
    }

    getOrbit() {
        return this.orbit;
    }

    setOneHit(one_hit) {
        this.oneHit = one_hit;
    }

    getOneHit() {
        return this.oneHit;
    }

    setReflect(reflect) {
        this.reflection = reflect;
    }

    getReflect() {
        return this.reflection;
    }

    setDirection(direction) {
        this.vel = p5.Vector.mult(direction, this.speed);
    }

    setFocus(focus) {
        this.focus = focus;
    }

    getFocus() {
        return this.focus;
    }

    setMinTurnTime(time) {
        this.countmin = time;
    }

    getMinTurnTime() {
        return this.countmin;
    }
}

class Circuit {
    constructor(photon_number=30) {
        this.photon_number = photon_number;
        this.photon_list = [];

        this.photon_speed = 8;
        this.photon_colour = [0, 255, 255];
        this.photon_orbit = false;
        this.photon_onehit = false;
        this.photon_reflection = false;
        this.photon_min_turn_time = 5;

        this.guide = createVector(mouseX, mouseY);

        this.background_RGB = [0, 0, 0];
        this.fade_speed = 15;
        this.reset_background = true;

        for (let i = 0; i < this.photon_number; ++i) {
            let dir = createVector(1, 0);
            dir.rotate(i * Math.PI/4);

            let t = new Photon(createVector(width/2, height/2), dir);
            t.setFocus(this.guide);

            this.photon_list.push(t);
        }
    }

    draw(renderer, mouse_x=mouseX, mouse_y=mouseY) {
        let background_RGBA = this.background_RGB.slice(0);

        // If reset background flag is set dont include opacity for background

        if (!this.reset_background) {
            background_RGBA.push(this.fade_speed);
        }
        else {
            this.reset_background = false;
        }

        if (renderer) {
            renderer.background(background_RGBA);
        }
        else {
            background(background_RGBA);
        }

        for (let i = 0; i < this.photon_number; ++i) {
            let t = this.photon_list[i];
            t.draw(renderer);
            t.update(renderer);
        }

        this.guide.x = mouse_x;
        this.guide.y = mouse_y;
    }

    pulse(x, y, redraw_background=true) {
        if (isNaN(x) || isNaN(y)) {
            throw Error("Invalid value for x or y");
        }
        this.reset_background = redraw_background; // Clear any lines on background

        for (let i = 0; i < this.photon_number; ++i) {
            let dir = createVector(1, 0);
            dir.rotate(i * Math.PI/4);

            let t = this.photon_list[i];
            t.setPosition(x, y);
            t.setOldPosition(x, y);
            t.setVisible(true);
            t.setDirection(dir);
            t.resetTurnCount();
        }
    }

    resetBackground() {
        this.reset_background = true;
    }

    addPhoton(x, y, direction = "N") {
        if (!(Number.isInteger(x) && Number.isInteger(y))) {
            throw Error("Invalid value for x or y");
        }

        let dir;
        switch(direction) {
        case "N":
            dir = createVector(0, -1);
            break;
        case "NE":
            dir = createVector(1, -1);
            break;
        case "E":
            dir = createVector(1, 0);
            break;
        case "SE":
            dir = createVector(1, 1);
            break;
        case "S":
            dir = createVector(0, 1);
            break;
        case "SW":
            dir = createVector(-1, 1);
            break;
        case "W":
            dir = createVector(-1, 0);
            break;
        case "NW":
            dir = createVector(-1, -1);
            break;
        default:
            throw new Error("Invalid direction " + direction);
        }

        let t = new Photon(createVector(x, y), dir);
        t.setFocus(this.guide);
        t.setSpeed(this.photon_speed);
        t.setColour(this.photon_colour);
        t.setOrbit(this.photon_orbit);
        t.setOneHit(this.photon_onehit);
        t.setReflect(this.photon_reflection);
        t.setMinTurnTime(this.photon_min_turn_time);

        this.photon_list.push(t);
        this.photon_number += 1;
    }

    removePhoton() {

        // Removes the last created photon

        this.photon_list.splice(-1, 1);
        if (this.photon_number > 0) {
            this.photon_number -= 1;
        }
    }

    setPhotonSpeed(speed) {
        if (!(Number.isInteger(speed))) {
            throw Error("Invalid speed " + speed);
        }
        for (let i = 0; i < this.photon_number; ++i) {
            let t = this.photon_list[i];
            t.setSpeed(speed);
        }
        this.photon_speed = speed;
    }

    getPhotonSpeed() {
        return this.photon_speed;
    }

    setFadeSpeed(fade_speed) {
        if (!Number.isInteger(fade_speed) || fade_speed > 255 || fade_speed < 0) {
            throw new Error("Invalid fade speed " + fade_speed);
        }
        this.fade_speed = fade_speed;
    }

    getFadeSpeed() {
        return this.fade_speed;
    }

    setBackgroundColour(background_RGB, reset_background=true) {
        if (!(background_RGB instanceof Array) || background_RGB.length !== 3) {
            throw Error("Invalid value for background_RGB, must be array containing three integers");
        }
        for (let i = 0; i < 3; i++) {
            if (!Number.isInteger(background_RGB[i])) {
                throw Error("Invalid value for background_RGB, must be array containing three integers");
            }
        }
        this.background_RGB = background_RGB;
        this.reset_background = reset_background;
    }

    getBackgroundColour() {
        return this.background_RGB;
    }

    setPhotonColour(photon_RGB) {
        if (!(photon_RGB instanceof Array) || photon_RGB.length !== 3) {
            throw Error("Invalid value for photon_RGB, must be array containing three integers");
        }
        for (let i = 0; i < 3; i++) {
            if (!Number.isInteger(photon_RGB[i])) {
                throw Error("Invalid value for photon_RGB, must be array containing three integers");
            }
        }
        for (let i = 0; i < this.photon_number; ++i) {
            let t = this.photon_list[i];
            t.setColour(photon_RGB);
        }
        this.photon_colour = photon_RGB;
    }

    getPhotonColour() {
        return this.photon_colour;
    }

    setMinTurnTime(time) {
        if (!Number.isInteger(time)) {
            throw Error("Invalid value for time, must be an integer");
        }
        for (let i = 0; i < this.photon_number; i++) {
            this.photon_list[i].setMinTurnTime(time);
        }
        this.photon_min_turn_time = time;
    }

    getMinTurnTime() {
        return this.photon_min_turn_time;
    }

    setPhotonOrbit(photons_orbit) {
        for (let i = 0; i < this.photon_number; ++i) {
            this.photon_list[i].setOrbit(photons_orbit);
        }
        this.photon_orbit = photons_orbit;
    }

    getPhotonOrbit() {
        return this.photon_orbit;
    }

    setPhotonOneHit(photons_one_hit) {
        for (let i = 0; i < this.photon_number; ++i) {
            this.photon_list[i].setOneHit(photons_one_hit);
        }
        this.photon_onehit = photons_one_hit;
    }

    getPhotonOneHit() {
        return this.photon_onehit;
    }

    setPhotonReflection(photon_reflection) {
        for (let i = 0; i < this.photon_number; ++i) {
            this.photon_list[i].setReflect(photon_reflection);
        }
        this.photon_reflection = photon_reflection;
    }

    getPhotonReflection() {
        return this.photon_reflection;
    }

}