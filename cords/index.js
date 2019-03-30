var message = document.getElementById("message");
var formInput = document.getElementById("form");

var fileContainer = document.getElementById("fileLocation");

var imageInput;
var sampleInput = document.getElementById("sampleInput");
var pegsInput = document.getElementById("pegsInput");
var linesInput = document.getElementById("linesInput");
var weightInput = document.getElementById("weightInput");
var sizeInput = document.getElementById("sizeInput");
var submitInput = document.getElementById("submitInput");

submitInput.addEventListener("click", submit);


var cd;
var imageLocation;

function handleFile(file) {
	if(file.type === "image") {
		imageLocation = file.name;
	}
}

function submit() {
	document.body.style.backgroundColor = "#fff";
	formInput.innerHTML = "";
	message.innerHTML = "Please Wait";

	let args = {
		src: imageLocation || "example2.jpg",
		sampling: sampleInput.value,
		pegs: pegsInput.value,
		lines: linesInput.value,
		weight: weightInput.value,
		diameter: sizeInput.value 
	};

	cd = new CordDrawing(args);

	setTimeout(function() { // delay to give time to load the image in
		message.innerHTML = "This page must be run on  a server or a browser with relaxed a CORS policy (such as Firefox)";

		cd.setup();
		
		if(cd.initialised) {
			message.innerHTML = "";
		}
	}, 2000);
}

function setup() {
	imageInput = createFileInput(handleFile);
	imageInput.parent(fileContainer);
}

function draw() {
	if(cd && cd.initialised) {
		cd.draw();
	}
}