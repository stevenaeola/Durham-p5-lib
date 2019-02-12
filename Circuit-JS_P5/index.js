let canvas;
let pg_1;
let pg_2;
let pg_3;
let pg_webgl;
let circuit_1;
let circuit_2;
let circuit_3;
let demo_mode;

function setup() {
    canvas = createCanvas(1066, 600);
    canvas.parent("sketch-holder");  // Sets location of canvas on webpage

    pg_1 = createGraphics(500, 600);
    pg_2 = createGraphics(500, 600);
    pg_3 = createGraphics(500, 600);
    pg_webgl = createGraphics(1066, 600, WEBGL);

    circuit_1 = new Circuit();
    circuit_2 = new Circuit();
    circuit_2.pulse(pg_2.width/2, pg_2.height/2);
    circuit_3 = new Circuit();
    circuit_3.pulse(pg_3.width/2, pg_3.height/2);

    circuit_2.setPhotonColour([255, 0, 0]);
    circuit_3.setPhotonColour([0, 255, 0]);

    demo_mode = 1;
}

function draw() {
    if (demo_mode === 1) {
        circuit_1.draw();
    }
    else if (demo_mode === 2) {
        circuit_1.draw(pg_1, mouseX-550);
        circuit_2.draw(pg_2);
        circuit_3.draw(pg_3);
        image(pg_2, 0, 0);
        image(pg_1, 550, 0);
        image(pg_3, 1100, 0);
    }
    else if (demo_mode === 3) {
        circuit_1.draw(pg_1, mouseX-550);
        image(pg_1, 0, 0);
        image(pg_1, 550, 0);
        image(pg_1, 1100, 0);
    }
    else if (demo_mode === 4) {
        background(134, 142, 150);
        pg_webgl.background(134, 142, 150);
        pg_webgl.rotateX(0.015);
        pg_webgl.rotateY(0.005);

        circuit_1.draw(pg_1);
        pg_webgl.texture(pg_1);
        pg_webgl.box(250);
        image(pg_webgl, 0, 0);
    }
}

function mouseClicked() {

    // Ignore clicks that are too high or low

    if (mouseY < 0 || mouseY > height) {
        return;
    }

    // If clicking in demo mode 2 or 3 set clicks relative to graphic

    if (demo_mode === 2 || demo_mode === 3) {
        circuit_1.pulse(mouseX-550, mouseY);
    } else {
        circuit_1.pulse(mouseX, mouseY);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let OHButton = document.getElementById("OneHit");
    function setOneHit() {
        if (circuit_1.getPhotonOneHit()) {
            circuit_1.setPhotonOneHit(false);
            OHButton.style.background = "rgb(231,231,231)";
        } else {
            circuit_1.setPhotonOneHit(true);
            OHButton.style.background = "rgb(0,140,186)";
        }
    }

    let OrbitButton = document.getElementById("Orbit");
    function setOrbit() {
        if (circuit_1.getPhotonOrbit()) {
            circuit_1.setPhotonOrbit(false);
            OrbitButton.style.background = "rgb(231,231,231)";
        } else {
            circuit_1.setPhotonOrbit(true);
            OrbitButton.style.background = "rgb(0,140,186)";
        }
    }

    let ReflectionButton = document.getElementById("Reflection");
    function setReflection() {
        if (circuit_1.getPhotonReflection()) {
            circuit_1.setPhotonReflection(false);
            ReflectionButton.style.background = "rgb(231,231,231)";
        } else {
            circuit_1.setPhotonReflection(true);
            ReflectionButton.style.background = "rgb(0,140,186)";
        }
    }

    let AddPhotonButton = document.getElementById("AddPhoton");
    function addPhoton() {
        if (demo_mode === 1) {
            circuit_1.addPhoton(width / 2, height / 2);
        }
        else {
            circuit_1.addPhoton(pg_1.width / 2, pg_1.height / 2);
        }
    }

    let RemovePhotonButton = document.getElementById("RemovePhoton");
    function removePhoton() {
        circuit_1.removePhoton();
    }

    let DemoDefaultButton = document.getElementById("DemoDefault");
    function setDemoDefault() {
        resizeCanvas(1066, 600);
        demo_mode = 1;
        background(134, 142, 150);
        circuit_1.pulse(width/2, height/2);
        updateDemoButtonStyling(DemoDefaultButton);
    }

    let DemoSplitButton = document.getElementById("DemoSplit");
    function setDemoSplit() {
        resizeCanvas(1600, 600);
        demo_mode = 2;
        background(134, 142, 150);
        updateDemoButtonStyling(DemoSplitButton);
        circuit_1.resetBackground();
    }

    let DemoSplitAltButton = document.getElementById("DemoSplitAlt");
    function setDemoSplitAlt() {
        resizeCanvas(1600, 600);
        demo_mode = 3;
        background(134, 142, 150);
        updateDemoButtonStyling(DemoSplitAltButton);
        circuit_1.resetBackground();
    }

    let DemoCubeButton = document.getElementById("DemoCube");
    function setDemoCube() {
        resizeCanvas(1066, 600);
        demo_mode = 4;
        background(134, 142, 150);
        updateDemoButtonStyling(DemoCubeButton);
        circuit_1.resetBackground();
    }

    function updateDemoButtonStyling (selected_button) {
        const background_colour = "rgb(231,231,231)";
        const selected_colour = "rgb(0,140,186)";
        DemoDefaultButton.style.background = background_colour;
        DemoSplitButton.style.background = background_colour;
        DemoSplitAltButton.style.background = background_colour;
        DemoCubeButton.style.background = background_colour;

        selected_button.style.background = selected_colour;
    }

    let PhotonR = document.getElementById("PhotonR");
    let PhotonG = document.getElementById("PhotonG");
    let PhotonB = document.getElementById("PhotonB");

    function updatePhotonRGB() {
        let PhotonRGB = [int(PhotonR.value), int(PhotonG.value), int(PhotonB.value)];
        circuit_1.setPhotonColour(PhotonRGB);
    }

    let PhotonSpeed = document.getElementById("PhotonSpeed");
    function setPhotonSpeed() {
        circuit_1.setPhotonSpeed(int(PhotonSpeed.value));
    }

    let FadeSpeed = document.getElementById("FadeSpeed");
    function setFadeSpeed() {
        circuit_1.setFadeSpeed(int(FadeSpeed.value));
    }

    let BackgroundR = document.getElementById("BackgroundR");
    let BackgroundG = document.getElementById("BackgroundG");
    let BackgroundB = document.getElementById("BackgroundB");

    function updateBackgroundRGB() {
        let BackgroundRGB = [int(BackgroundR.value), int(BackgroundG.value), int(BackgroundB.value)];
        circuit_1.setBackgroundColour(BackgroundRGB);
    }

    let MinTurnTime = document.getElementById("MinTurn");
    function updateMinTurnTime() {
        try {
            circuit_1.setMinTurnTime(int(MinTurnTime.value));
        }
        catch (e) {
            // Just ignore on error
        }
    }

    OHButton.addEventListener("click", setOneHit);
    OrbitButton.addEventListener("click", setOrbit);
    ReflectionButton.addEventListener("click", setReflection);
    AddPhotonButton.addEventListener("click", addPhoton);
    RemovePhotonButton.addEventListener("click", removePhoton);

    DemoDefaultButton.addEventListener("click", setDemoDefault);
    DemoSplitButton.addEventListener("click", setDemoSplit);
    DemoSplitAltButton.addEventListener("click", setDemoSplitAlt);
    DemoCubeButton.addEventListener("click", setDemoCube);

    PhotonR.oninput = updatePhotonRGB;
    PhotonG.oninput = updatePhotonRGB;
    PhotonB.oninput = updatePhotonRGB;

    PhotonSpeed.oninput = setPhotonSpeed;
    FadeSpeed.oninput = setFadeSpeed;

    BackgroundR.oninput = updateBackgroundRGB;
    BackgroundG.oninput = updateBackgroundRGB;
    BackgroundB.oninput = updateBackgroundRGB;

    MinTurnTime.oninput = updateMinTurnTime;

    updateDemoButtonStyling(DemoDefaultButton);
});