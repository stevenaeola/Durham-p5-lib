function setup() {
  createCanvas(windowWidth, windowHeight - 200);
  x = new Control();
  y = new Control();
}


function draw() {
  var radios = document.getElementsByName('wave');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
			flag = radios[i].value;
      break;
    }
  }
  
  if (flag == 1) {
    x.setColours(document.getElementById("colour1").value, document.getElementById("colour2").value);
    x.getSlidervalue(document.getElementById("waveWidth").value);
    x.getFlagValue(flag);
    x.draw();
  }

  if (flag == 2) {
    y.setColours(document.getElementById("colour1").value, document.getElementById("colour2").value);
    y.getSlidervalue(document.getElementById("waveWidth").value);
    y.getFlagValue(flag);
    y.draw();
  }

}
