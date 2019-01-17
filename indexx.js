function setup(){
	createCanvas(windowWidth, windowHeight);
	background(100);
	balls1 = new balls();
	balls1.balls_setup();
}

function draw(){
	balls1.balls_draw();
}
document.addEventListener("DOMContentLoaded", function(){
	var changeNum = document.getElementById("numberOfBalls");
	function changeNumber(event){
		let number = document.getElementById("numberOfBalls").value;
		balls1.setNum(number);
		console.log(number);
	}
	changeNum.addEventListener("input",changeNumber);



	var changegrav = document.getElementById("gravity");
	function changegrav(event){
		let gravi = document.getElementById("gravity").value;
		balls1.setGra(gravi);
		console.log(gravi);
	}
	changegrav.addEventListener("input",changegrav);


	var changeDam = document.getElementById("dampingFactor");
	function changeDam(event){
		let damping = document.getElementById("dampingFactor").value;
		balls1.setDamp(damping);
		console.log(damping);
	}
	changeDam.addEventListener("input",changeDam);


	var changemou = document.getElementById("mouseTouchRadius");
	function changemou(event){
		let mouset = document.getElementById("mouseTouchRadius").value;
		balls1.setMou(mouset);
		console.log(mouset);
	}
	changemou.addEventListener("input",changemou);




	var Fchange = document.getElementById("Fchange");

	Fchange.addEventListener("submit", function(event){event.preventDafult()});
});
