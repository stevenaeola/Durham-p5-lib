var g;
var viewFlag = 1;

function setup() {
  if (viewFlag == 1){
  createCanvas(windowWidth, windowHeight)
  }
  else if ( viewFlag == 2){
  createCanvas(windowWidth, windowHeight, WEBGL);
  g = createGraphics(450, 500);
  }
  x = new Control();
  y = new Control();
}


function draw() {
  
changeWave();
  
  if (flag == 1) {
    x.setColours(document.getElementById("colour1").value, document.getElementById("colour2").value);
    x.getSlidervalue(document.getElementById("waveWidth").value);
    x.getFlagValue(flag);
    x.draw(g);
  }

  if (flag == 2) {
    y.setColours(document.getElementById("colour1").value, document.getElementById("colour2").value);
    y.getSlidervalue(document.getElementById("waveWidth").value);
    y.getFlagValue(flag);
    y.draw(g);
  }
}
  
function hide(){
  document.getElementById('hide').style.display ='none';
}
function show(){
  document.getElementById('hide').style.display = 'block';
}

function changeWave(){
    var radios = document.getElementsByName('wave');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
			flag = radios[i].value;
      break;
    }
  }
}

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
