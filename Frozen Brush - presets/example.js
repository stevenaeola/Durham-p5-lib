var mainBrush;

function setup() {
    createCanvas(1280, 720);
    background(0);
    mainBrush = new FrozenBrush();
    updateBrush();
    document.getElementById("defaultFrozen").addEventListener("click", presetDefaultFrozen);
    document.getElementById("theMatrix").addEventListener("click", presetTheMatrix);
    document.getElementById("smallFlame").addEventListener("click", presetSmallFlame);
    document.getElementById("suspensionBridge").addEventListener("click", presetSuspensionBridge);
    document.getElementById("chalkboard").addEventListener("click", presetChalkboard);
    document.getElementById("potatoes").addEventListener("click", presetPotatoes);
}

function updateBrush() {
    mainBrush.setBrushColour(document.getElementById("brushColour").value);
    mainBrush.setUseFill(document.getElementById("useFill").checked);
    mainBrush.setDistThresh(document.getElementById("distThresh").value);
    if (document.getElementById("fade").checked) {
        mainBrush.setFadeSpeed(30);
    } else {
        mainBrush.setFadeSpeed(0);
    }
    if (document.getElementById("propagation").checked) {
        mainBrush.setMaxLevel(5);
    } else {
        mainBrush.setMaxLevel(0);
    }
}

function presetDefaultFrozen() {
    document.getElementById("brushColour").value = "#00ffbf";
    document.getElementById("useFill").checked = true;
    document.getElementById("distThresh").value = 75;
    document.getElementById("propagation").checked = true;
    updateBrush();
}

function presetTheMatrix() {
    document.getElementById("brushColour").value = "#00ff00";
    document.getElementById("useFill").checked = false;
    document.getElementById("distThresh").value = 40;
    document.getElementById("propagation").checked = true;
    updateBrush();
}

function presetSmallFlame() {
    document.getElementById("brushColour").value = "#ff7700";
    document.getElementById("useFill").checked = true;
    document.getElementById("distThresh").value = 15;
    document.getElementById("propagation").checked = false;
    updateBrush();
}

function presetSuspensionBridge() {
    document.getElementById("brushColour").value = "#f00000";
    document.getElementById("useFill").checked = false;
    document.getElementById("distThresh").value = 1000;
    document.getElementById("propagation").checked = false;
    updateBrush();
}

function presetChalkboard() {
    document.getElementById("brushColour").value = "#ffffff";
    document.getElementById("useFill").checked = true;
    document.getElementById("distThresh").value = 50;
    document.getElementById("propagation").checked = false;
    updateBrush();
}

function presetPotatoes() {
    document.getElementById("brushColour").value = "#a59968";
    document.getElementById("useFill").checked = true;
    document.getElementById("distThresh").value = 300;
    document.getElementById("propagation").checked = true;
    updateBrush();
}

function draw() {
    mainBrush.draw();
}

function mouseDragged() {
    mainBrush.mouseDragged(mouseX, mouseY);
}