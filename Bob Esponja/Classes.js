class Burger {
    constructor(burgx, burgy, burgW, lettuceh, tomatoh) {
        this.x = burgx;
        this.y = burgy;
        this.w = burgW;
        this.h = lettuceh;
        this.t = tomatoh;
    }

    move() {
        this.x = this.x + BurgerSpeed;
        if (this.x <= mouseX + 70 && mouseX - 10 <= this.x && mouseY - 15 <= this.y && this.y <= mouseY + 95) {
            this.h = 0;
            this.w = 0;
            this.t = 0;
            score += 1;
            this.y = 0;
            this.x = 1400;
        }

        if (doublesgame === true) {
            if (this.x <= x + 90 && x - 5 <= this.x && y - 15 <= this.y && this.y <= y + 50) {
                this.h = 0;
                this.w = 0;
                this.t = 0;
                score += 1;
                this.y = 0;
                this.x = 1400;
            }
        }

        if (this.x === 1392) {
            missed += 1;
        }
    }

    show() {
        stroke(BurgerColour1, BurgerColour2, BurgerColour3);
        strokeWeight(1);
        fill(BurgerColour1, BurgerColour2, BurgerColour3);
        ellipse(this.x, this.y, this.w);
        strokeWeight(this.h);
        stroke(71, 209, 71);
        line(this.x - 5, this.y - 1, this.x + 5, this.y - 1);
        strokeWeight(this.t);
        stroke(204, 0, 0);
        line(this.x - 5, this.y + 1, this.x + 5, this.y + 1);
    }
}

class BadBurger {
    constructor(badburgx, badburgy, badburgW, fillingh) {
        this.x = badburgx;
        this.y = badburgy;
        this.w = badburgW;
        this.h = fillingh;
    }

    move() {
        this.x = this.x + 4;
        if (this.x <= mouseX + 70 && mouseX - 10 <= this.x && mouseY - 15 <= this.y && this.y <= mouseY + 95) {
            singlegameover = true;
            doublegameover = true;
        }

        if (doublesgame === true) {
            if (this.x <= x + 90 && x - 5 <= this.x && y - 15 <= this.y && this.y <= y + 50) {
                doublegameover = true;
            }
        }
    }

    show() {
        stroke(177, 244, 120);
        strokeWeight(1);
        fill(177, 244, 120);
        ellipse(this.x, this.y, this.w);
        strokeWeight(this.h);
        stroke(157, 134, 118);
        line(this.x - 5, this.y, this.x + 5, this.y);
    }
}


class Bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    move() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-0.5, -1);
    }

    show() {
        stroke(225);
        strokeWeight(4);
        noFill();
        ellipse(this.x, this.y, this.r * 2);
    }
}


function keyTyped() {
    if (key === 'g') {
        singlegame = true;
    }
    else if (key === 'i' && singlegame === false && singlegameover === false && doublesgame === false &&
        doublegameover === false) {
        instructions = true;
    }
    else if (key === 'h') {
        doublesgame = true;
        //Starting position for boat
        x = 1300;
        y = 500;
    }
    else if (key === 'q') {
        singlegame = false;
        doublesgame = false;
        doublegameover = false;
        singlegameover = false;
        score = 0;
        missed = 0;
        burgers = [];
        badburgers = [];
        gamecomplete = false;
    }
    else if (key === 'm') {
        instructions = false;
    }

    else if (key === 'p' && easteregg >= 1) {
        patrickfilter += 1;
        if (patrickfilter === 1) {
            found += 1;
        }
        patrick = true;
    }

    else if (key === 's' && easteregg >= 1) {
        patrick = false;
    }
