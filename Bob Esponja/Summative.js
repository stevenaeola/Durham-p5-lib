// Original code was written in portuguese so has been translated
//Rate which burgers spawn in single mode
let singlesrate = 17;
//Rate which bad burgers spawn in single mode
let badsinglesrate = 85;
//Rate which burgers spawn in double mode
let doublesrate = 25;
//counter for the score
let score = 0;
//counter for the number of burgers missed
let missed = 0;
//Size of burgers both good and bad
let burgW = 15;
let x = 1300;
let y = 500;
//Size of insides
let lettuceh = 1.5;
let tomatoh = 1.5;
let fillingh = 4;
//Set of burgers
let burgers = [];
//Set of bad burgers
let badburgers = [];
//Set of bubbles
let bubbles = [];
//Burger Speed in X-Direction
let BurgerSpeed = 6;
//Counter for spawn rates
let counter = 0;
//Colour code for regular burgers
let BurgerColour1 = 237;
let BurgerColour2 = 156;
let BurgerColour3 = 68;
//Colour code for gold burgers
let gold1 = 246;
let gold2 = 225;
let gold3 = 40;
//Count to allow easter eggs to unlock
let easteregg = 0;
//Count for easter eggs found
let found = 0;
//Count to stop found filter increase beyond 1 for each egg found
let bubblefilter = 0;
let patrickfilter = 0;
//Boolean expressions for all modes
let singlegame = false;
let doublesgame = false;
let instructions = false;
let doublegameover = false;
let singlegameover = false;
let gamecomplete = false;
//Change of mouse key avatar
let patrick = false;
//Load Background
let img;

function preload() {
	img = loadImage('Background.jpg');
}

function setup() {
	createCanvas(1400, 710);
}

function draw() {
	background(img);
	noStroke();
	//Scene Work

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
	rect(625, 155, 20, 65);
	rect(745, 155, 20, 65);

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
	rect(0, 300, 1400, 500);

	//Street
	fill(169, 167, 166);
	rect(0, 400, 1400, 350);

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


	//End of scene work
	//SpongeBOB
	//Body
	if (patrick === false) {
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
		quad(mouseX + 7.5, mouseY + 57, mouseX + 12.5, mouseY + 57, mouseX + 14, mouseY + 59, mouseX + 6, mouseY + 59);
		//Tie
		fill(255, 26, 0);
		triangle(mouseX + 17, mouseY + 45, mouseX + 23, mouseY + 45, mouseX + 20, mouseY + 50);
		quad(mouseX + 20, mouseY + 48, mouseX + 22, mouseY + 53, mouseX + 20, mouseY + 55, mouseX + 18, mouseY + 53);
		//Legs
		stroke(254, 255, 28);
		strokeWeight(3);
		line(mouseX + 10, mouseY + 58, mouseX + 10, mouseY + 70);
		line(mouseX + 30, mouseY + 58, mouseX + 30, mouseY + 70);
		stroke('White');
		line(mouseX + 10, mouseY + 63, mouseX + 10, mouseY + 71);
		line(mouseX + 30, mouseY + 63, mouseX + 30, mouseY + 71);
		strokeWeight(1);
		stroke('Blue');
		line(mouseX + 8.5, mouseY + 65, mouseX + 11.5, mouseY + 65);
		line(mouseX + 28.5, mouseY + 65, mouseX + 31.5, mouseY + 65);
		stroke('Red');
		line(mouseX + 8.5, mouseY + 67, mouseX + 11.5, mouseY + 67);
		line(mouseX + 28.5, mouseY + 67, mouseX + 31.5, mouseY + 67);
		noStroke();
		fill(0);
		ellipse(mouseX + 8.5, mouseY + 74, 8, 4.5);
		ellipse(mouseX + 32.5, mouseY + 74, 8, 4.5);
		stroke(0);
		fill(183, 124, 28);
		quad(mouseX + 7.5, mouseY + 57, mouseX + 12.5, mouseY + 57, mouseX + 14, mouseY + 59, mouseX + 6, mouseY + 59);
		quad(mouseX + 27.5, mouseY + 57, mouseX + 32.5, mouseY + 57, mouseX + 34, mouseY + 59, mouseX + 26, mouseY + 59);
	}

	if (patrick === true) {
		//Body
		fill(241, 135, 111);
		quad(mouseX, mouseY + 70, mouseX + 50, mouseY + 70, mouseX + 30, mouseY, mouseX + 20, mouseY);
		//Shorts
		fill(174, 214, 32);
		rect(mouseX, mouseY + 70, 20, 15);
		rect(mouseX, mouseY + 70, 50, 10);
		rect(mouseX + 30, mouseY + 70, 20, 15);
		//Legs
		fill(241, 135, 111);
		quad(mouseX + 2, mouseY + 85, mouseX + 18, mouseY + 85, mouseX + 16, mouseY + 95, mouseX + 4, mouseY + 95);
		quad(mouseX + 32, mouseY + 85, mouseX + 48, mouseY + 85, mouseX + 46, mouseY + 95, mouseX + 34, mouseY + 95);
		//Arms
		quad(mouseX + 8, mouseY + 58, mouseX + 10, mouseY + 43, mouseX - 16, mouseY + 45, mouseX - 16, mouseY + 55);
		quad(mouseX + 42, mouseY + 58, mouseX + 40, mouseY + 43, mouseX + 66, mouseY + 45, mouseX + 66, mouseY + 55);
		//Eyes
		fill(255);
		stroke(0);
		ellipse(mouseX + 19, mouseY + 26, 12, 15);
		ellipse(mouseX + 31, mouseY + 26, 12, 15);
		noStroke();
		fill(0);
		ellipse(mouseX + 21, mouseY + 26, 4, 5);
		ellipse(mouseX + 29, mouseY + 26, 4, 5);
		quad(mouseX + 18, mouseY + 15, mouseX + 24, mouseY + 14, mouseX + 22, mouseY + 10, mouseX + 19, mouseY + 12);
		quad(mouseX + 28, mouseY + 15, mouseX + 32, mouseY + 16, mouseX + 32, mouseY + 12, mouseX + 27, mouseY + 12);
		noFill();
		stroke(0);
		strokeWeight(1);
		arc(mouseX + 25, mouseY + 40, 10, 4, 0, PI);


	}

	//Chimney bubbles (EASTER EGG)
	counter += 1;
	//Only unlocked after 1 complete game
	if (easteregg >= 1) {
		if (mouseIsPressed) {
			bubblefilter += 1;
			if (bubblefilter === 1) {
				found += 1;
			}
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
	}

	//GAME MODE

	//Base Screen with options
	if (singlegame === false && doublesgame === false && instructions === false && singlegameover === false && doublegameover === false && gamecomplete === false) {
		noStroke();
		fill('Black');
		textAlign(CENTER);
		textSize(35);
		text('Press I to see the Instructions!', 700, 500);
		fill('Black');
		textAlign(CENTER);
		textSize(35);
		text('Press G to play single player!', 700, 550);
		textAlign(CENTER);
		textSize(35);
		text('Press H to play two player!', 700, 600);
	}

	//Instructions Screen
	if (instructions === true) {
		noStroke();
		fill('Black');
		textAlign(LEFT);
		textSize(20);
		text('SpongeBob has run into a bit of trouble and his Krabby Patties are falling out of the back of his truck.' +
            ' Help him get all 50 of them back!', 150, 475);

		fill('Black');
		textAlign(LEFT);
		textSize(20);
		text('But watch out for the mouldy burgers, pick up one of those and the game is over!', 150, 500);

		fill('Black');
		textAlign(LEFT);
		textSize(15);
		text('Single Player Mode:', 180, 530);

		fill('Black');
		textAlign(LEFT);
		textSize(15);
		text('Using your mouse, control SpongeBob and gather the Krabby Patties by hovering over them before they reach ' +
            'the end!', 180, 550);

		fill('Black');
		textAlign(LEFT);
		textSize(15);
		text('Two Player Mode:', 180, 575);

		fill('Black');
		textAlign(LEFT);
		textSize(15);
		text('As in single player, using your mouse, control SpongeBob. And using the direction keys, control his boat car ' +
            'to gather the Krabby Patties by collecting them before they reach the end!', 180, 600);

		if (easteregg < 1) {
			fill('Black');
			textAlign(LEFT);
			textSize(15);
			text('Gather 50 Krabby Patties to unlock what else Bikini Bottom has to offer.', 180, 620);
		}

		if (easteregg >= 1) {
			fill(246, 225, 40);
			textAlign(LEFT);
			textSize(15.5);
			text('So you\'re back. You collected 50 burgers, well done. Now you can play the harder mode with faster burgers ' +
                'and more nasty burgers. You also have the opportunity to find both easter eggs. Goodluck!', 25, 630);
		}

		fill('Black');
		textAlign(CENTER);
		textSize(17);
		text('Press M to return to the menu.', 700, 670);
	}

	//Single Game Mode
	if (singlegame === true) {
		singlesrate = 17;
		//Burgers spawn
		if (counter % singlesrate === 0) {
			let s = new Burger(0, random(420, 690), burgW, lettuceh, tomatoh);
			burgers.push(s);
		}

		for (let i = 0; i < burgers.length; i++) {
			burgers[i].move();
			burgers[i].show();
		}
		//Badburger spawn
		badsinglesrate = 150;
		if (counter % badsinglesrate === 0) {
			let n = new BadBurger(0, random(420, 690), burgW, fillingh);
			badburgers.push(n);
		}

		for (let i = 0; i < badburgers.length; i++) {
			badburgers[i].move();
			badburgers[i].show();
		}

		fill('Black');
		textAlign(CENTER);
		textSize(16);
		strokeWeight(1);
		stroke('Black');
		text('Press Q to Quit', 1320, 25);
		doublesgame = false;
		instructions = false;
	}


	//Two Player Game Mode
	if (doublesgame === true) {
		doublesrate = 25;
		//Burgers spawn
		if (counter % doublesrate === 0) {
			let s = new Burger(0, random(420, 690), burgW, lettuceh, tomatoh);
			burgers.push(s);
		}

		for (let i = 0; i < burgers.length; i++) {
			burgers[i].move();
			burgers[i].show();
		}
		//Badburgers spawn
		badsinglesrate = 150;

		if (counter % badsinglesrate === 0) {
			let n = new BadBurger(0, random(420, 690), burgW, fillingh);
			badburgers.push(n);
		}

		for (let i = 0; i < badburgers.length; i++) {
			badburgers[i].move();
			badburgers[i].show();
		}

		//Boat drawing for second player (operations to allow to move around the road space)
		noStroke();
		fill(184, 201, 220);
		quad(x, y - 5, x + 100, y + 10, x + 100, y + 25, x + 5, y + 20);
		fill('black');
		quad(x + 5, y + 20, x + 100, y + 20, x + 100, y + 22, x + 7, y + 22);
		ellipse(x + 20, y + 35, 10, 10);
		ellipse(x + 77, y + 31, 10, 10);
		ellipse(x + 85, y + 35, 10, 10);
		fill('red');
		quad(x + 5, y + 22, x + 100, y + 22, x + 100, y + 30, x + 10, y + 30);
		triangle(x + 3, y - 9, x + 3, y - 15, x + 10, y - 12);
		stroke('black');
		strokeWeight(2);
		line(x + 11, y + 3, x + 9, y + 10);
		line(x + 3, y - 5, x + 3, y - 15);
		fill(184, 201, 220);
		ellipse(x + 16, y + 6, 3, 3);
		ellipse(x + 14.5, y + 10, 4, 4);
		strokeWeight(1);

		if (x >= 1300) {
			x = 0;
		}
		if (x <= 0) {
			x = 1300;
		}
		if (y <= 400) {
			y = 400;
		}
		if (y >= 660) {
			y = 660;
		}
		if (keyIsDown(UP_ARROW)) {
			y -= 6;
		}
		if (keyIsDown(DOWN_ARROW)) {
			y += 6;
		}
		if (keyIsDown(LEFT_ARROW)) {
			x -= 5;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			x += 7;
		}

		fill('Black');
		textAlign(CENTER);
		textSize(16);
		strokeWeight(1);
		stroke('Black');
		text('Press Q to Quit', 1320, 25);
		singlegame = false;
		instructions = false;
	}

	if (singlegameover === true) {
		fill('Black');
		textAlign(CENTER);
		textSize(20);
		strokeWeight(1);
		stroke('Black');
		text('SPONGE BOB HAS LOST HIS KRABBY PATTIES! PRESS Q TO RESTART', 700, 500);
		singlegame = false;
		instructions = false;
	}

	if (doublegameover === true) {
		fill('Black');
		textAlign(CENTER);
		textSize(20);
		strokeWeight(1);
		stroke('Black');
		text('SPONGE BOB HAS LOST HIS KRABBY PATTIES! PRESS Q TO RESTART', 700, 500);
		doublesgame = false;
		instructions = false;
	}

	if (score === 5) {
		gamecomplete = true;
	}

	if (gamecomplete === true) {
		easteregg += 1;
		badsinglesrate = 50;
		fill('Black');
		textAlign(CENTER);
		textSize(20);
		strokeWeight(1);
		stroke('Black');
		text('Thanks for helping me find my Krabby Patties! You have unlocked faster Gold Burgers and you can now try to find the easter eggs!', 700, 500);
		fill('Black');
		textAlign(CENTER);
		textSize(15);
		strokeWeight(1);
		stroke('Black');
		text('Press Q to return to menu', 700, 550);
		singlegame = false;
		doublesgame = false;
		instructions = false;
		BurgerColour1 = gold1;
		BurgerColour2 = gold2;
		BurgerColour3 = gold3;
		BurgerSpeed = 12;
	}

	if (easteregg >= 1) {
		fill(246, 225, 40);
		textAlign(RIGHT);
		textSize(20);
		noStroke();
		text('EASTER EGGS FOUND:' + found, 1380, 60);
	}

	//Permanent scoreboard
	fill('Black');
	textAlign(CENTER);
	textSize(20);
	strokeWeight(1);
	stroke('Black');
	text('SCORE ' + score, 700, 30);

	fill('Black');
	textAlign(CENTER);
	textSize(20);
	strokeWeight(1);
	stroke('Black');
	text('MISSED ' + missed, 700, 60);

	fill('Black');
	textAlign(LEFT);
	textSize(9);
	noStroke();
	text('In memory of Stephen Hillenburg', 20, 10);

	if (missed === 5) {
		doublesgame = false;
		singlegame = false;
		singlegameover = true;
		singlesrate = 0;
		doublegameover = true;
		doublesrate = 0;
	}


}

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
}