const hueTableHeader = "<tr><th>Hue Mode</th><th>Minimum Hue</th><th>Maximum Hue</th><th>Preview</th></tr>";
const huePreviewPixelSize = 30;

var hueModes = [[0, 255]];

var helper = new NoiseTurbulanceHelper(hueModes);

// Update the hue table. If resetHTML is true, it will regenerate the HTML
// inside the table. If false, it will change the previewIndex colours only.
// If previewIndex is -1, it will update all preview colours.
function updateHueTable(hueModes, resetHTML=false, previewIndex=-1) {
	if (resetHTML) {
		$("#hueTable").html(hueTableHeader);
		
		for (let i = 0; i < hueModes.length; i++) {
			$("#hueTable").append("<tr>");
			$("#hueTable").append("<td>" + i + "</td>");
			$("#hueTable").append("<td><input class=\"hue\" id=\"" + i + "\" is=\"min\" type=\"range\" max=\"255\" value=\"" + hueModes[i][0] + "\"></input></td>");
			$("#hueTable").append("<td><input class=\"hue\" id=\"" + i + "\" is=\"max\" type=\"range\" max=\"255\" value=\"" + hueModes[i][1] + "\"></input></td>");
			$("#hueTable").append("<td><div id=\"preview-" + i + "-0\" style=\"width:" + huePreviewPixelSize + "px;height:" + huePreviewPixelSize + "px;background-color:hsl(" + hueModes[i][0] + ",100%,50%);\"></div></td>");
			$("#hueTable").append("<td><div id=\"preview-" + i + "-1\" style=\"width:" + huePreviewPixelSize + "px;height:" + huePreviewPixelSize + "px;background-color:hsl(" + hueModes[i][1] + ",100%,50%);\"></div></td>");
			$("#hueTable").append("</tr>");
		}
		
		$("#hueTable").append("<button id=\"add\" type=\"button\" onclick=\"addHueMode();\">Add Mode</button>");
		$("#hueTable").append("<button id=\"remove\" type=\"button\" onclick=\"removeHueMode();\">Remove Last Mode</button>");
	}
	else {
		var start = 0;
		var end = hueModes.length;
		
		if (previewIndex > -1) {
			start = previewIndex;
			end = previewIndex + 1;
		}
		
		for (i = start; i < end; i++) {
			$("#preview-" + i + "-0").css("background-color", "hsl(" + hueModes[i][0] + ",100%,50%)");
			$("#preview-" + i + "-1").css("background-color", "hsl(" + hueModes[i][1] + ",100%,50%)");
		}
	}
}

// Add a hue mode to the list of hue modes.
function addHueMode() {
	hueModes.push([0,255]);
	updateHueTable(hueModes, true);
	setHueSliderChangeEvents();
}

// Remove the last hue mode added to the list of hue modes.
function removeHueMode() {
	var wasOnLast = helper.getHueIndex() == hueModes.length - 1;
	if (hueModes.length > 1) {
		hueModes.splice(hueModes.length - 1);
		updateHueTable(hueModes, true);
		setHueSliderChangeEvents();
		
		if (wasOnLast)
			helper.changeHue(hueModes.length - 1);
	}
}

// Set the input.hue element's change event.
function setHueSliderChangeEvents() {
	
	// Get when any of the hue values change, and update their previews.
	$("input.hue").change(function(){
		var inputID = Number($(this).attr("id"));
		var isMax = Number($(this).attr("is") == "max");
		
		// Update the hueModes array.
		hueModes[inputID][isMax] = Number($(this).val());
		
		// Check to see if the minimum hue has overtaken the maximum hue.
		// If so, make them the same.
		if (hueModes[inputID][0] > hueModes[inputID][1]) {
			hueModes[inputID][0] = hueModes[inputID][1]
			$("input.hue#" + inputID).val(hueModes[inputID][0]);
		}
		
		updateHueTable(hueModes, false, inputID);
		
		helper.setHueModes(hueModes);
		helper.changeHue(inputID);
	});
}

// Reset inputs to their default values.
function resetValues() {
	$("input#numParticlesPerFrame").val(10);
	helper.setNumParticlesPerFrame(10);
	
	$("input#particleLifeSpan").val(90);
	helper.setParticleLifeSpan(90);
	
	$("input#particleDecay").val(0.75);
	helper.setParticleDecay(0.75);
	
	$("input#particleSizeScalar").val(1);
	helper.setParticleSizeScalar(1);
	
	$("input#particleVelScalar").val(1);
	helper.setParticleVelScalar(1);
	
	$("input#particleMinSizeRatio").val(0.05);
	helper.setParticleMinSizeRatio(0.05);
	
	$("input#particleMaxSizeRatio").val(0.5);
	helper.setParticleMaxSizeRatio(0.5);
}

$(function(){

	updateHueTable(hueModes, true);
	setHueSliderChangeEvents();
	
	resetValues();
	
	$("button#clear").click(function(){
		helper.clear();
	});
	
	$("button#reset").click(function(){
		resetValues();
	});
	
	// Set the number of particles per frame.
	$("input#numParticlesPerFrame").change(function(){
		var numParticlesPerFrame = $("input#numParticlesPerFrame").val();
		helper.setNumParticlesPerFrame(Number(numParticlesPerFrame));
	});
	
	// Set the particle's life span.
	$("input#particleLifeSpan").change(function(){
		var particleLifeSpan = $("input#particleLifeSpan").val();
		helper.setParticleLifeSpan(Number(particleLifeSpan));
	});
	
	// Set the particle's decay.
	$("input#particleDecay").change(function(){
		var particleDecay = $("input#particleDecay").val();
		helper.setParticleDecay(Number(particleDecay));
	});
	
	// Set the particle's size scalar.
	$("input#particleSizeScalar").change(function(){
		var particleSizeScalar = $("input#particleSizeScalar").val();
		helper.setParticleSizeScalar(Number(particleSizeScalar));
	});
	
	// Set the particle's velocity scalar.
	$("input#particleVelScalar").change(function(){
		var particleVelScalar = $("input#particleVelScalar").val();
		helper.setParticleVelScalar(Number(particleVelScalar));
	});
	
	// Set the particle's minimum size ratio.
	$("input#particleMinSizeRatio").change(function(){
		var particleMinSizeRatio = $("input#particleMinSizeRatio").val();
		helper.setParticleMinSizeRatio(Number(particleMinSizeRatio));
	});
	
	// Set the particle's maximum size ratio.
	$("input#particleMaxSizeRatio").change(function(){
		var particleMaxSizeRatio = $("input#particleMaxSizeRatio").val();
		helper.setParticleMaxSizeRatio(Number(particleMaxSizeRatio));
	});
	
});

function setup() {
	helper.setup(750, 750);
}

function draw() {
	helper.draw();
}

function keyPressed() {
	helper.keyPressed();
}