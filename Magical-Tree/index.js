var a;
var resetButton;
var colorSlider;
var ageSlider;
var heightSlider;
var densitySlider
var colorLable;
var fruitRadio;
var defultButton;
var randButton;


function setup() {
  resetButton = createButton('New Tree');
  resetButton.position(20, 10);
  colorSlider = createSlider(0, 360, 150);
  colorSlider.position(20, 30);
  ageSlider = createSlider(0, 150, 70);
  ageSlider.position(20, 50);
  heightSlider = createSlider(50, 200, 150);
  heightSlider.position(20, 70);
  densitySlider = createSlider(1, 10, 3);
  densitySlider.position(20, 90);
  fruitRadio = createRadio();
  fruitRadio.position(20, 110);
  fruitRadio.option('apple');
  fruitRadio.option('orange');
  fruitRadio.option('lemon');
  fruitRadio.option('plum');
  fruitRadio.option('no fruit');
  fruitRadio.value('no fruit');
  randButton = createButton("Randomize Tree");
  randButton.position(20, 135)
  defultButton = createButton("Reset Tree");
  defultButton.position(20, 160);
  a = new clMagicalTree();
  resetButton.mousePressed(newTree);
  randButton.mousePressed(randomTree);
  defultButton.mousePressed(reset);
  
}

function draw() {
  fruitRadio.changed(addFruit);
  colorSlider.changed(newTree);
  ageSlider.changed(newTree);
  heightSlider.changed(newTree);
  densitySlider.changed(newTree);
  a.setLeafColor(colorSlider.value());
  a.setTreeAge(ageSlider.value());
  a.setTreeHeight(heightSlider.value());
  a.setTreeDensity(densitySlider.value());
  a.draw();
  fill(0);
  text("Leave Colour", colorSlider.x * 2 + colorSlider.width, 40);
  text("Tree Age", ageSlider.x * 2 + ageSlider.width, 60);
  text("Tree Height", heightSlider.x * 2 + heightSlider.width, 80);
  text("Tree Density", densitySlider.x * 2 + densitySlider.width, 100);
  

}

function addFruit() {
  a.addFruit(fruitRadio.value())
}

function newTree() {
  a.redraw();
  addFruit();

}

function reset() {
  fruitRadio.value("no fruit");
  ageSlider.value(70);
  heightSlider.value(150);
  densitySlider.value(3);
  a.redraw();
}

function randomTree() {
  var fruits = ['apple', 'orange', 'plum', 'lemon', 'no fruit']
  var randomItem = fruits[Math.floor(Math.random()*fruits.length)];
  fruitRadio.value(randomItem);
  colorSlider.value(random(360));
  ageSlider.value(random(150));
  heightSlider.value(random(50, 200));
  densitySlider.value(random(1, 10));
  newTree();
}
