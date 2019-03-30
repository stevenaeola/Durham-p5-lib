"use strict";

//
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1; g = f; b = 0; break;
        case 1: r = q; g = 1; b = 0; break;
        case 2: r = 0; g = 1; b = f; break;
        case 3: r = 0; g = q; b = 1; break;
        case 4: r = f; g = 0; b = 1; break;
        case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
}
//
//The above funciton (everything between the two comment lines) has been taken from stackoverflow user Adam Cole. Link to source webpage https://stackoverflow.com/questions/1484506/random-color-generator

/** Toggles the cookie setting for 3D and then refreshes the page. */
function toggle3DCookies() {
	let cookie = document.cookie;
	if (cookie.includes("3D=true")) {
		document.cookie = "3D=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}
	else {
		document.cookie = "3D=true";
	}
	location.reload();
}

/** Class representing a wave. */
class Wave {
	/**
	*  Create a wave.
	*  @param {PendulumSystem} system - The overall system.
	*  @param {number} index - The identifier for the wave
	*/
	constructor(system, index) {
		/* Argument assignment */
		this._system = system;
		this._index = index;
		
		/* Initial variable assignment */
		this._visible = true;
		this._colour = rainbow(Math.random(), Math.random());
		this._nodes = [];
		
		/* Fills the wave object with node objects */
		let nodeNum = this._index;
		while (nodeNum < this._system.numberOfNodes) {
			this.nodes.push(new Node(this._system, nodeNum));
			nodeNum += this._system.numberOfWaves;
		}

	}
	
	/** Sets the appropriate colour and then draws the wave in its current form */
	draw() {
		if(g) {
			g.stroke(this.colour);
		}
		else {
			stroke(this.colour);
		}
		if (this.visible) {
			for (var i = 0; i < this.nodes.length - 1; i++){
				if(g) {
					g.line(this.nodes[i].position, this.nodes[i].vertical, this.nodes[i + 1].position, this.nodes[i + 1].vertical);
				}
				else{
					line(this.nodes[i].position, this.nodes[i].vertical, this.nodes[i + 1].position, this.nodes[i + 1].vertical);
				}
			}
		}
	}
	
	/** Tells the wave to update the node objects */
	tick() {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].move();
		}
	}
	
	/** Changes the colour or visibility of the wave */
	clicked() {
		/* Determines if the wave can and has been selected */
		if (this._system.selected == false) {
			for (var i = 0; i < this.nodes.length - 2; i++) {
				let clickedOnNode = false;
				if (g) {
					if (dist(mouseX, mouseY, this.nodes[i].position, this.nodes[i].vertical) < 10) {
						clickedOnNode = true;
					}
				}
				else {
					if (dist(mouseX - (this._system.size / 2), mouseY - (this._system.size / 2), this.nodes[i].position, this.nodes[i].vertical) < 10) {
						clickedOnNode = true;
					}
				}
				if (clickedOnNode) {
					/* Changes the colour or the visibility of the wave depending on the type of mouse click */
					this._system.selected = true;
					if (mouseButton == "left") {
						this.colour = rainbow(Math.random(), Math.random());
					}
					else if (mouseButton == "right") {
						this.visible = !this.visible;
					}
				}
			}
		}	
	}
	
	/**
	*  Get the system.
	*  @return {PendulumSystem} The Pendulum System
	*/
	get system() {
		return this._system;
	}
	/**
	*  Set the system value
	*/
	set system(value) {
		this._system = value;
	}
	
	/**
	*  Get the index value.
	*  @return {number} The wave index.
	*/
	get index() {
		return this._index;
	}
	/**
	*  Set the index value
	*/
	set index(value) {
		this._index = value;
	}
	
	/**
	*  Get the visibility of the wave
	*  @return {boolean} The visibility of the wave
	*/
	get visible() {
		return this._visible;
	}
	/**
	*  Set the visibility of the wave
	*/
	set visible(value) {
		this._visible = value;
	}
	
	/**
	*  Get the colour
	*  @return {string} The wave colour
	*/
	get colour() {
		return this._colour;
	}
	/**
	*  Set the colour
	*/
	set colour(value) {
		this._colour = value;
	}
	
	/**
	*  Get the nodes
	*  @return {Node[]} Nodes for the wave
	*/
	get nodes() {
		return this._nodes;
	}
	/**
	*  Set the nodes
	*/
	set nodes(value) {
		this._nodes = value;
	}

	

}

/** Class representing a node point */
class Node {
	/**
	*  Create a node
	*  @param {PendulumSystem} system - The overall system
	*  @param {number} index - The identifer for the node
	*/
	constructor(system, index) {
		/* Argument assignment */
		this._system = system;
		this._index = index;
		this._vertical = this._system.size * ((this.index + 1)/(this._system.numberOfNodes + 1));
		
		/* Initial variable assignment */
		this._position = 0;
		this._offset = 0;
		
	}
	
	/** Updates the position of the node object */
	move() {
		/* Update coordinates */
		this.offset += (this.index + 1) * this._system.currentSpeed / 10000;
		this.position = this._system.size/2 + 0.8 * this._system.size/2 * Math.sin(this.offset);
		/* Draw new coordinates */
		if(g) {
			g.stroke(256);
			g.fill(0);
			g.ellipse(this.position, this.vertical, 10);
		}
		else {
			stroke(256);
			ellipse(this.position, this.vertical, 10);
		}

	}

	/**
	*  Get the system
	*  @return {PendulumSystem} The Pendulum System
	*/
	get system() {
		return this._system;
	}
	/**
	*  Set the system
	*/
	set system(value) {
		this._system = value;
	}
	
	/**
	*  Get the node index
	*  @return {number} Node index
	*/
	get index() {
		return this._index;
	}
	/**
	*  Set the node index
	*/
	set index(value) {
		this._index = value;
	}
	
	/**
	*  Get the vertical position
	*  @return {number} The vertical position
	*/
	get vertical() {
		if (g){
			return this._vertical
		}
		else{
			return this._vertical - this.system.size/2;
		}
	}
	/**
	*  Set the vertical position
	*/
	set vertical(value) {
		this._vertical = value;
	}
	
	/**
	*  Get the horizontal position
	*  @return {number} The horizontal position
	*/
	get position() {
		if (g){
			return this._position;
		}
		else{
			return this._position - this._system.size/2;
		}
	}
	/**
	*  Set the horizontal position
	*/
	set position(value) {
		this._position = value;
	}
	
	/**
	*  Get the offest
	*  @return {number} The offset since starting
	*/
	get offset() {
		return this._offset;
	}
	/**
	*  Set the offset
	*/
	set offset(value) {
		this._offset = value;
	}
}

/** Class for the system as a whole */
class PendulumSystem {
    /**
	*  @param {number} numberOfWaves - The number of waves the system will have
	*  @param {number} numberOfNodes - The number of nodes the system will have
	*  @param {number} speedMin - The minimum speed the system can work at
	*  @param {number} speedMax - The maximum speed the system can work at
	*  @param {number} size - The size of the system
	*/
	constructor(numberOfWaves = 3, numberOfNodes = 20, speedMin = 0, speedMax = 100, size = 200) {
		/* Argument assignment */
		this._numberOfWaves = numberOfWaves;
		this._numberOfNodes = numberOfNodes;
		this._speedMin = speedMin;
		this._speedMax = (speedMin * 2 <= speedMax) ? speedMax : speedMin * 2;
		this._size = size;
		
		/* Initial variable assignment and set up */
		this._currentSpeed = 20;
		this._selected = false;
		this.waves = []
		this.resetSystem();
		
		/* HTML setup */
		document.getElementById("ScriptHolder").innerHTML += "<form id='Waves'><input type='text'></form>";
		document.getElementById("ScriptHolder").innerHTML += "<button type='button' onclick='system.changeNumberOfWaves();'>Change number of waves</button>";
		document.getElementById("ScriptHolder").innerHTML += "<form id='Nodes'><input type='text'></form>";
		document.getElementById("ScriptHolder").innerHTML += "<button type='button' onclick='system.changeNumberOfNodes();'>Change number of nodes</button>";
		document.getElementById("ScriptHolder").innerHTML += "<form id='Speed'><input type='text'></form>";
		document.getElementById("ScriptHolder").innerHTML += "<button type='button' onclick='system.changeSpeed();'>Change Speed</button>";
		document.getElementById("ScriptHolder").innerHTML += "<button type='button' onclick='toggle3DCookies();'>Toggle 3D</button>"
		document.getElementById("ScriptHolder").addEventListener("contextmenu", function(e) {e.preventDefault();});
	}
	
	/** Clears the system and then resets it */
	resetSystem() {
		delete(this.waves);
		this.waves = []
		
		for (var i = 0; i < this.numberOfWaves; i++) {
			this.waves.push(new Wave(this, i));
		}
		
	}
	
	/** Tells the system to update the wave objects and then draws them */
	tick() {
		fill(0);
		for (var i = 0; i < this.waves.length; i++) {
			this.waves[i].tick();
			this.waves[i].draw();
		}
	}

	/** Reset the forms after a button has been pressed */
	resetForms() {
		document.getElementById("Waves").reset();
		document.getElementById("Nodes").reset();
		document.getElementById("Speed").reset();
	}
	
	/** Changes the number of waves in the system after fetching the input */
	changeNumberOfWaves() {
		let content = document.getElementById("Waves").elements[0].value;
		if (isNaN(content) == false) {
			content = parseInt(content)
			this.numberOfWaves = content;
		}
		else {
			alert("Not a valid number!");
		}
		this.resetForms();
	}
	
	/** Changes the number of nodes in the system after fetching the input */
	changeNumberOfNodes() {
		let content = document.getElementById("Nodes").elements[0].value;
		if (isNaN(content) == false) {
			content = parseInt(content)
			this.numberOfNodes = content;
		}
		else {
			alert("Not a valid number!");
		}
		this.resetForms();
	}
	
	/** Changes the speed of the system after fetching the input */
	changeSpeed(){
		let content = document.getElementById("Speed").elements[0].value;
		
		if (isNaN(content) == false) {
			let num = parseInt(content);
			this.currentSpeed = num;
		}
		else {
			alert("Not a valid number!");
		}
		this.resetForms();
	}
	
	/** Runs the clicked funciton in each wave object after being clicked */
	clicked() {
		var x = document.cookie;
		if(!g) {
			this.selected = false;
			for (var i = 0; i < this.waves.length; i++) {
				this.waves[i].clicked();
			}
		}
	}
	
	/**
	*  Get the number of waves
	*  @return {number} Number of waves in the system
	*/
	get numberOfWaves() {
		return this._numberOfWaves;
	}
	/**
	*  Set the number of waves
	*/
	set numberOfWaves(value) {
		if (value < this.numberOfNodes / 2) {
				this._numberOfWaves = value;
				this.resetSystem();
			}
		else {
			alert("Not enough nodes for that number of waves");
		}
	}
	
	/**
	*  Get the number of nodes
	*  @return {number} Number of nodes
	*/
	get numberOfNodes() {
		return this._numberOfNodes;
	}
	/**
	*  Set the number of nodes
	*/
	set numberOfNodes(value) {
		if (value >= 2 * this.numberOfWaves) {
				this._numberOfNodes = value;
				this.resetSystem();
			}
		else {
			alert("Too many waves for that number of nodes");
		}
	}
	
	/**
	*  Get the minimum speed
	*  @return {number} Minimum speed
	*/
	get speedMin() {
		return this._speedMin;
	}
	/**
	*  Set the minimum speed
	*/
	set speedMin(value) {
		this._speedMin = value;
	}
	
	/**
	*  Get the maximum speed
	*  @return {number} Maximum speed
	*/
	get speedMax() {
		return this._speedMax;
	}
	/**
	*  Set the maximum speed
	*/
	set speedMax(value) {
		this._speedMax = value;
	}
	
	/**
	*  Get the size of the system
	*  @return {number} The system's size
	*/
	get size() {
		return this._size;
	}
	/**
	*  Set the size of the system
	*/
	set size(value) {
		this._size = value;
	}
	
	/**
	*  Get the current speed
	*  @return {number} The speed of the system
	*/
	get currentSpeed() {
		return this._currentSpeed;
	}
	/**
	*  Set the current speed
	*/
	set currentSpeed(value) {
		if (this.speedMin <= value && value <= this.speedMax) {
				this.currentSpeed = value;
			}
			else {
				if (value < this.speedMin) {
				alert("The speed is too low");
				}
				else {
					alert("The speed is too high");
				}
			}
	}
	
	/**
	*  Get the status of the the search
	*  @return {boolean} The status of the search for a wave at the clicked coordinates
	*/
	get selected() {
		return this._selected;
	}
	/**
	*  Set the status of the search
	*/
	set selected(value) {
		this._selected = value;
	}
	
	/**
	*  Get the waves in the system
	*  @return {Wave[]} All the waves in the system
	*/
	get waves() {
		return this._waves;
	}
	/**
	*  Set the waves in the system
	*/
	set waves(value) {
		this._waves = value;
	}
	
	
}


	
