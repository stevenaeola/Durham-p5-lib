// Original code was written in portuguese
let burgers = [];
let bubbles = [];
let x = 1300;
let y = 500;
let counter = 0;
var img;
function preload() {
    img = loadImage('Background.jpg');
}

function setup() {
    createCanvas(1400, 700);
}

function draw() {
    background(img);
    noStroke();
    //Sponge Bob House
    //Chimney
    fill(12, 125, 166);
    quad(1300, 185, 1300, 190, 1320, 192, 1320, 183);
    quad(1329, 192, 1320, 192, 1319, 172, 1330, 172);

    //Pineapple
    fill(252, 173, 43);
    ellipse(1250, 300, 150, 350);

    //Frames
    fill(156, 199, 203);
    ellipse(1230, 300, 50, 150);

    //Windows
    ellipse(1220, 190, 20, 30);
    ellipse(1280, 250, 30, 30);
    fill(175, 248, 255);
    ellipse(1219, 190, 14, 21);
    ellipse(1280, 250, 21, 21);

    //Door
    fill(129, 166, 170);
    ellipse(1230, 300, 40, 140);

    //Leaves
    fill(29, 113, 32);
    triangle(1245, 130, 1260, 110, 1225, 80);
    triangle(1230, 140, 1240, 115, 1200, 110);
    fill(1, 147, 7);
    triangle(1240, 140, 1225, 120, 1250, 70);
    triangle(1265, 135, 1280, 120, 1270, 80);
    fill(34, 198, 40);
    triangle(1230, 150, 1210, 80, 1235, 110);
    triangle(1250, 140, 1255, 75, 1270, 120);
    triangle(1275, 145, 1290, 80, 1300, 115);

    //Squidward House
    //Main Body
    fill(44, 70, 106);
    quad(760, 300, 630, 300, 640, 75, 750, 75);

    //To make it appear round
    fill(44, 70, 106);
    ellipse(695, 75, 110, 16);

    //Nose for house
    fill(62, 96, 211);
    quad(715, 220, 675, 220, 690, 155, 700, 155);

    //Windows
    ellipse(715, 165, 25, 25);
    ellipse(675, 165, 25, 25);
    fill(175, 248, 255);
    ellipse(715, 165, 20, 20);
    ellipse(675, 165, 20, 20);

    //Eyebrows
    fill(62, 96, 211);
    rect(650, 142, 85, 10);

    //Door
    fill(153, 102, 0);
    ellipse(695, 300, 50, 140);

    //Handle
    fill(77, 51, 0);
    ellipse(705, 275, 4, 4);

    //Ears
    fill(44, 70, 106);
    rect(625, 155, 20, 65,);
    rect(745, 155, 20, 65,);

    //Patricks House
    //Main Body
    fill(153, 81, 49);
    ellipse(220, 300, 180, 160);

    //Arrow on top
    stroke(230, 145, 11);
    strokeWeight(4);
    line(220, 220, 220, 200);
    line(240, 200, 200, 202);
    line(235, 195, 235, 205);
    line(230, 195, 230, 205);
    line(200, 202, 210, 192);
    line(200, 202, 212, 210);
    noStroke();
    strokeWeight(1);

    //Sand
    fill(237, 238, 204);
    rect(0, 300, windowWidth, 500);

    //Street
    fill(169, 167, 166);
    rect(0, 400, windowWidth, 200);

    //SpongeBob Driveway
    fill(169, 167, 166);
    rect(1220, 300, 50, 100);
    fill(213, 246, 132);
    ellipse(1230, 320, 10, 10);
    ellipse(1234, 360, 14, 10);
    ellipse(1232, 380, 12, 8);
    ellipse(1250, 325, 9, 10);
    ellipse(1255, 365, 12, 15);
    ellipse(1255, 385, 10, 7);
    ellipse(1255, 340, 7, 7);
    ellipse(1234, 340, 11, 10);

    //SquidwardDriveway
    fill(153, 102, 0);
    rect(670, 312, 50, 10);
    rect(670, 334, 50, 10);
    rect(670, 356, 50, 10);
    rect(670, 378, 50, 10);

    //Patrick Driveway
    fill(169, 167, 166);
    rect(200, 300, 50, 100);

    //Boat
    fill(184, 201, 220);
    quad(x, y - 5, x + 100, y + 10, x + 100, y + 25, x + 5, y + 20);
    fill("black");
    quad(x + 5, y + 20, x + 100, y + 20, x + 100, y + 22, x + 7, y + 22);
    ellipse(x + 20, y + 35, 10, 10);
    ellipse(x + 77, y + 31, 10, 10);
    ellipse(x + 85, y + 35, 10, 10);
    fill("red");
    quad(x + 5, y + 22, x + 100, y + 22, x + 100, y + 30, x + 10, y + 30);
    triangle(x+3,y-9,x+3,y-15,x+10,y-12);
    stroke("black");
    strokeWeight(2);
    line(x+11, y+3, x+9, y+10);
    line(x+3,y-5,x+3,y-15);
    fill(184, 201, 220);
    ellipse(x+16, y+6, 3,3);
    ellipse(x+14.5, y+10, 4,4);
    strokeWeight(1);

    if (x >= 1300) {
        x = 0;
    }
    if (x <= 0) {
        x = 1300;
    }
    if (y <= 400) {
        y = 400
    }
    if (y >= 560) {
        y = 560
    }
    if (keyIsDown(UP_ARROW)) {
        y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        y += 5;
    }
    if (keyIsDown(LEFT_ARROW)) {
        x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        x += 5;
    }

    //SpongeBOB
    //Body
    stroke(0);
    fill(254, 255, 28);
    rect(mouseX, mouseY, 40, 50);
    //Mouth
    fill(160, 18, 20);
    arc(mouseX + 20, mouseY + 30, 20, 20, 0, PI);
    //Language
    fill(255, 173, 173);
    arc(mouseX + 20, mouseY + 39, 10, 10, PI, PI + PI);
    //Teeth
    fill(255);
    rect(mouseX + 14, mouseY + 30, 5, 5);
    rect(mouseX + 21, mouseY + 30, 5, 5);
    //Eyes
    fill(255);
    stroke(0);
    ellipse(mouseX + 12, mouseY + 12, 15, 15);
    ellipse(mouseX + 27, mouseY + 12, 15, 15);
    noStroke();
    fill(33, 238, 255);
    ellipse(mouseX + 12, mouseY + 13, 7, 7);
    ellipse(mouseX + 27, mouseY + 13, 7, 7);
    fill(0);
    ellipse(mouseX + 12, mouseY + 13, 4, 4);
    ellipse(mouseX + 27, mouseY + 13, 4, 4);
    //Nose
    fill(255, 255, 113);
    stroke(0);
    ellipse(mouseX + 20, mouseY + 24, 5, 10);
    //Shirt
    fill(255);
    rect(mouseX, mouseY + 45, 40, 5);
    //Trousers
    fill(183, 124, 28);
    rect(mouseX, mouseY + 50, 40, 7);
    //Tie
    fill(255, 26, 0);
    triangle(mouseX + 17, mouseY + 45, mouseX + 23, mouseY + 45, mouseX + 20, mouseY + 50);
    quad(mouseX + 20, mouseY + 48, mouseX + 22, mouseY + 53, mouseX + 20, mouseY + 55, mouseX + 18, mouseY + 53);
    //Chimney bubbles
    counter += 1;
    if (mouseIsPressed) {
        if (counter % 10 === 0) {
            let r = random(1, 5);
            let b = new Bubble(1325, 172, r);
            bubbles.push(b);
        }
    }
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].move();
        bubbles[i].show();
    }
    //Burgers Game
    if (counter % 70 === 0) {
        let burgw = 15;
        let burgh = 10;
        let s = new Burger(0, random(420,580), burgw, burgh);
        burgers.push(s);
    }

    for (let i = 0; i < burgers.length; i++) {
    burgers[i].move();
    burgers[i].show();
}


}

class Burger {
    constructor(burgx, burgy, burgw, burgh) {
        this.x = burgx;
        this.y = burgy;
        this.w = burgw;
        this.h = burgh;
    }

    move() {
        this.x = this.x + 3;
    }

    show() {
        stroke(237, 156, 68);
        strokeWeight(1);
        fill(237, 156, 68);
        ellipse(this.x, this.y, this.w, this.h );
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
