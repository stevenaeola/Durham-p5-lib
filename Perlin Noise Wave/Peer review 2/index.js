var x, y;
//Default values
var R = 12;//radius of 'big circle'
var r = 3;//radius of 'small circle'
var rho = 3;//dist of pen from centre of small circle
var sp;
var Red = 255;
var Green = 0;
var Blue = 0;
var weight = 4;

function setup() {
	createCanvas(500, 500);
	sp = new Spirograph(R, r, rho);
}

function draw() {
	background(255);
	sp.draw();
	
}

function getvalue(){
	var frm = document.getElementById("getvalues");
	var ans = {};
	for(var i = 0; i < frm.length; i++){
		var item = frm.elements[i];
		ans[item.name] = item.value;
	}
	if(ans["sizeR"] !== ""){
		R = Number(ans["sizeR"]);
	}
	if(ans["sizer"] !== ""){
		r = Number(ans["sizer"]);
	}
	if(ans["sizerho"] !== ""){
		rho = Number(ans["sizerho"]);
	}
	if(ans["weight"] !== ""){
		weight = Number(ans["weight"]);
	}
	if(ans["Red"] !== ""){
		Red = Number(ans["Red"]);
	}
	if(ans["Blue"] !== ""){
		Blue = Number(ans["Blue"]);
	}
	if(ans["Green"] !== ""){
		Green = Number(ans["Green"]);
	}
	sp.weight = weight;
	sp.setr(r);
	sp.setR(R);
	sp.rho = rho;
	sp.setRGB(Red, Green, Blue);
}
