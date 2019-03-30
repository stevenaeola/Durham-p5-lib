var i = new sineEgg();

function setup() {
	i.setup('sketch-target');
}

function draw() {
	i.draw();
}

document.addEventListener("DOMContentLoaded", function() { // https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready

// Density slider
	var densitySlider = document.getElementById("density-slider");
	var densityOutput = document.getElementById("slider-value");
	densityOutput.innerHTML = i.getDensity(); // Display default

	// Update the value when the slider changes
	densitySlider.oninput = function() {
		densityOutput.innerHTML = this.value;
		i.setDensity(densitySlider.value);
}

// Weight slider
	var weightSlider = document.getElementById("weight-slider");
	var weightOutput = document.getElementById("weight-value");
	weightOutput.innerHTML = i.getWeight(); // Display default

	// Update the value when the slider changes
	weightSlider.oninput = function() {
		weightOutput.innerHTML = this.value;
		i.setWeight(weightSlider.value);
}

// Freq slider
	var freqSlider = document.getElementById("freq-slider");
	var freqOutput = document.getElementById("freq-value");
	freqOutput.innerHTML = i.getFreq(); // Display default

	// Update the value when the slider changes
	freqSlider.oninput = function() {
		freqOutput.innerHTML = this.value;
		i.setFreq(freqSlider.value);
}

// Length slider
	var lengthSlider = document.getElementById("length-slider");
	var lengthOutput = document.getElementById("length-value");
	lengthOutput.innerHTML = i.getLength(); // Display default

	// Update the value when the slider changes
	lengthSlider.oninput = function() {
		lengthOutput.innerHTML = this.value;
		i.setLength(lengthSlider.value);
}

// Colour Picker                                    
	var colorPicker = document.getElementById("colour-picker");

	// Update the value when the user selects a new colour
	colorPicker.onchange = function() {
		i.setStroke("#" + colorPicker.value); // Prepend with "#" because the library outputs into the value field without it
}

// Colour Picker                                    
	var overdriveToggle = document.getElementById("overdriveToggle");

	// Update the value when the user selects a new colour
	overdriveToggle.onchange = function() {
		i.setOverdrive(overdriveToggle.checked);
}

	
                                            

});


