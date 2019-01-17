//Global Variables############################################################################
var galaxy1;



var Width ;
var Height = 600;
var Colour = 0;
//setup########################################################################################
function setup(){
	//createCanvas(windowWidth,windowHeight);
	createCanvas(Width||windowWidth,Height);
	galaxy1 = new galaxy();
	//galaxy1 = new galaxy();
	galaxy1.galaxy_setup();
}
//draw########################################################################################
function draw(){

	galaxy1.galaxy_draw(Colour);
}
//DOM########################################################################################
document.addEventListener("DOMContentLoaded", function(){

//Control Button###########################################################################	
	var nav = document.getElementById('access_cl'),
    body = document.body;

	nav.addEventListener('click', function(e) {
    	body.className = body.className? '' : 'with_panel';
    	e.preventDefault();
	});

//Control galaxy size############################################################################
	var galaxy_gwidth = document.getElementById("gwidth");
	function changeGwidth(event){
		let gwidth = document.getElementById("gwidth").value;
		Width = gwidth;
		console.log(Width);
		galaxy1.Reset();
	}
	var galaxy_glength = document.getElementById("glength");
	function changeGlength(event){
		let glength = document.getElementById("glength").value;
		Height = glength;
		console.log(Height)
		galaxy1.Reset();

	}


//Control galaxy process######################################################################
	var galaxy_stop = document.getElementById("stop");
    function stop(){
    	galaxy1.Stop();
    }
    var galaxy_run = document.getElementById("run");
    function run(){
    	galaxy1.Run();
    }
    var galaxy_reset = document.getElementById("reset");
    function reset(){
    	console.log("reset");
    	Colour = 0;
    	galaxy1.Reset();
    	document.getElementById("magnetism").value = "";
    	document.getElementById("radius").value = "";
    	document.getElementById("gensoku").value = "";
    	document.getElementById("colour").value = "";
    	document.getElementById("num").value = "";
    	document.getElementById("bright").value = "";

    }

//Control galaxy mode################################################################
    var galaxy_pressdrawOff = document.getElementById("pressdrawOff");
    function pressdrawOff(){
    	galaxy1.setPressdrawOff();
    }
    var galaxy_pressdrawOn = document.getElementById("pressdrawOn");
    function pressdrawOn(){
    	galaxy1.setPressdrawOn();
    }

//Control galaxy element###########################################################
	var galaxy_magnetism = document.getElementById("magnetism");
	function changeMagnetism(event){
		let magnetism = document.getElementById("magnetism").value;
		galaxy1.setMagnetism(magnetism);
	}
	var galaxy_radius = document.getElementById("radius");
	function changeRadius(event){
		let radius = document.getElementById("radius").value;
		galaxy1.setRadius(radius);
	}
	var galaxy_gensoku = document.getElementById("gensoku");
	function changeGensoku(event){
		let gensoku = document.getElementById("gensoku").value;
		galaxy1.setGensoku(gensoku);
	}
	var galaxy_colorIn = document.getElementById("colour");
	function changeColorIn(event){
		let colorIn = document.getElementById("colour").value;
		Colour = colorIn;
		galaxy1.Reset();

	}
	var galaxy_num = document.getElementById("num");
	function changeNum(event){
		let num = document.getElementById("num").value;
		galaxy1.setNum(num);
	}
	var galaxy_bright = document.getElementById("bright");
	function changeBright(event){
		let bright = document.getElementById("bright").value;
		galaxy1.setBright(bright);


	}
//listener for the change of the input field#############################################
	galaxy_gwidth.addEventListener("change", changeGwidth);
	galaxy_glength.addEventListener("change", changeGlength);
	galaxy_stop.addEventListener("click", stop);
	galaxy_run.addEventListener("click", run);
	galaxy_reset.addEventListener("click", reset);
	galaxy_pressdrawOn.addEventListener("click", pressdrawOn);
	galaxy_pressdrawOff.addEventListener("click", pressdrawOff);

	galaxy_magnetism.addEventListener("change", changeMagnetism);
	galaxy_radius.addEventListener("change", changeRadius);
	galaxy_gensoku.addEventListener("change", changeGensoku);
	galaxy_colorIn.addEventListener("change", changeColorIn);
	galaxy_num.addEventListener("change", changeNum);
	galaxy_bright.addEventListener("change", changeBright);
//prevent default form function
	var changeForm = document.getElementById("changeForm");

	changeForm.addEventListener("submit", function(event){event.preventDafult()});


});