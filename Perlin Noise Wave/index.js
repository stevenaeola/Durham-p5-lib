// Define variables required to setup canvas or graphics renderer
var g;  
var flag;
var viewFlag = 1;
var w1;
var w2;

// Setup will load Canvas if 2D radio button is selected or Graphics renderer if 3D radio button is selected
function setup() {
    if (viewFlag == 1){
        createCanvas(windowWidth, windowHeight);
    }
    else if ( viewFlag == 2){
        createCanvas(windowWidth, windowHeight, WEBGL);
        g = createGraphics(450, 500);
    }

    // Create new wave objects, w1 for wave option 1 and w2 for wave option 2
    w1 = new Control();
    w2 = new Control();
}


function draw() {

    // Check if user has changed to different wave option
    changeWave();
  
    // Flag = 1 draws Wave option 1
    if (flag == 1) {
        w1.setColours(document.getElementById('colour1').value, document.getElementById('colour2').value);
        w1.getSlidervalue(document.getElementById('waveWidth').value);
        w1.getFlagValue(flag);
        w1.draw(g);
    }

    // Flag = 2 draws Wave option 2
    if (flag == 2) {
        w2.setColours(document.getElementById('colour1').value, document.getElementById('colour2').value);
        w2.getSlidervalue(document.getElementById('waveWidth').value);
        w2.getFlagValue(flag);
        w2.draw(g);
    }
}

// Hides HTML elements that are not useable in Wave option 2
function hide(){
    document.getElementById('hide').style.display ='none';
}

// Shows HTML elements that are useable in Wave option 1
function show(){
    document.getElementById('hide').style.display = 'block';
}

// Gets radio buttons with name 'wave' and finds which one is selected and gets its value
function changeWave(){
    var radios = document.getElementsByName('wave');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            flag = radios[i].value;
            break;
        }
    }
}

// Gets radio buttons with name 'webgl' and finds which one is selected and gets its value
function changeView(){
    var viewRadios = document.getElementsByName('webgl');
    for (var j = 0, length = viewRadios.length; j < length; j++) {
        if (viewRadios[j].checked) {
            viewFlag = viewRadios[j].value;
            setup();
            break;
        }
    }
  
}
