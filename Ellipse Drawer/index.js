// CC BY-SA 3.0. See LICENSE.md for more information.
var newSketch = new sketch();

function setup() {
	newSketch.setup(800,500);
}

function draw() {
	newSketch.draw();
}

// functions for changing the properties of newSketch and therefore future ellipses

function brightnessChange() {
	newSketch.brightness = document.getElementById("brightnessSlider").value;
}

function alphaChange() {
	newSketch.alpha = document.getElementById("alphaSlider").value;
}

function saturationChange() {
	newSketch.saturation = document.getElementById("saturationSlider").value;
}

function penSizeChange() {
	newSketch.penSize = document.getElementById("pSize").value;
}

function velFactorChange() {
	newSketch.velFactor = document.getElementById("vFactor").value;
}

function alwaysDrawChange() {
	if (document.getElementById("alwaysDraw").checked == true) {
		newSketch.alwaysDraw = true;
	} else {
		newSketch.alwaysDraw = false;
	}
}

// when one of the sliders or checkboxes are changed, update the relevant values
window.onload = function() {
	document.getElementById("brightnessSlider").addEventListener("change", brightnessChange);
	document.getElementById("alphaSlider").addEventListener("change", alphaChange);
	document.getElementById("saturationSlider").addEventListener("change", saturationChange);
	document.getElementById("pSize").addEventListener("change", penSizeChange);
	document.getElementById("vFactor").addEventListener("change", velFactorChange);
	document.getElementById("alwaysDraw").addEventListener("change", alwaysDrawChange);
};
