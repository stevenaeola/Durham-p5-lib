var s;
var spin;

//p5 setup
function setup() {
    frameRate(60); //Default: 60 - higher framerates increase speed, so fixing it seemed appropriate.
    s = new spinner(10,70,2,90,10,0.5,0.5,0,150,255,1);
    spin = createGraphics(300,300);
  }


//p5 draw() call
function draw() {
    background(20,255); //Background colour - redrawn every frame to "erase" previous lines and create the illusion of motion. Included in root draw() instead of spinner.draw() to enable multiple spinners on the same canvas - otherwise, the last spinner's background would paint over all previous spinners. Default: (20,255) (Dark grey, full opacity)
    s.draw(spin);

    //This code generates the rotating box with the spinner as a texture
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(spin);
    box(300);
}

//Form control functionality
document.addEventListener("DOMContentLoaded", function(){
    //These functions take values in corresponding forms on HTML page and update the relevant parameters of the spinner dynamically
    var cn = document.getElementById("n");
    function changeN(event){
        let n = document.getElementById("n").value;
	    s.setN(Number(n));
    };
    var cr = document.getElementById("r");
    function changeRadius(event){
	    let r = document.getElementById("r").value;
	    s.setRadius(Number(r));
    };
    var cs = document.getElementById("spd");
    function changeSpeed(event){
        let spd = document.getElementById("spd").value;
        s.setSpeed(Number(spd));
    };
    var crt = document.getElementById("rot");
    function changeRotate(event){
	    let rot = document.getElementById("rot").value;
	    s.setRotate(Number(rot));
    };
    var ct = document.getElementById("thk");
    function changeThick(event){
	    let thk = document.getElementById("thk").value;
	    s.setThick(Number(thk));
    };
    var cx = document.getElementById("ws");
    function changeXpos(event){
	    let ws = document.getElementById("ws").value;
	    s.setXpos(Number(ws));
    };
    var cy = document.getElementById("hs");
    function changeYpos(event){
	    let hs = document.getElementById("hs").value;
	    s.setYpos(Number(hs));
    };
    var crd = document.getElementById("red");
    function changeRed(event){
	    let red = document.getElementById("red").value;
	    s.setRed(Number(red));
    };
    var cg = document.getElementById("grn");
    function changeGreen(event){
	    let grn = document.getElementById("grn").value;
	    s.setGreen(Number(grn));
    };
    var cb = document.getElementById("blu");
    function changeBlue(event){
	    let blu = document.getElementById("blu").value;
	    s.setBlue(Number(blu));
    };
    
    cn.addEventListener("input", changeN);
    cr.addEventListener("input", changeRadius);
    cs.addEventListener("input", changeSpeed);
    crt.addEventListener("input", changeRotate);
    ct.addEventListener("input", changeThick);
    cx.addEventListener("input", changeXpos);
    cy.addEventListener("input", changeYpos);
    crd.addEventListener("input", changeRed);
    cg.addEventListener("input", changeGreen);
    cb.addEventListener("input", changeBlue);
});