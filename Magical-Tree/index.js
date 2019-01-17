//creates varaible which will be tree object
var tree;

//setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  //sets initial radio button to 'no fruit' by defult
  document.getElementById("noFruit").checked = true;
  //creates instance of magical tree
  tree = new clMagicalTree();
}

function draw() {
  tree.draw();

}




//function to generate new tree
function newTree() {
  tree.redraw();
  //calls change fruit function to update the previously selected fruit
  changeFruit();
}

//function called when reset button pressed
function reset() {

  //sets sliders to original defult values
  document.getElementById("ageSlider").value = 70;
  document.getElementById("heightSlider").value = 150;
  document.getElementById("densitySlider").value = 3;
  document.getElementById("noFruit").checked = true;
  //calls functions to grab slider values and update tree
  changeAge();
  changeHeight();
  changeColor();
  changeDensity();
  changeFruit();
  //sets the leaf color to random colors
  tree.setRandomLeafColor(true);
  //calls new tree to be drawn
  newTree();
}

//function to run when the random tree button is called
function randomTree() {

  //sets tree sliders to random values within range
  document.getElementById("colorSlider").value = random(0, 360);
  document.getElementById("ageSlider").value = random(0, 150);
  document.getElementById("heightSlider").value = random(50, 200);
  document.getElementById("densitySlider").value = random(1, 10);
  //calls functions to grab slider values and update tree
  changeAge();
  changeHeight();
  changeColor();
  changeDensity();
  randomFruit();
}
//function which selets random fruit when random button is pressed
function randomFruit() {
  //generates random integer from 0 to 4
  var num = Math.floor(random(0, 5));
  //switch statement that sets random fruit radio button to be selected
  switch (num) {
    case 0:
      document.getElementById("apple").checked = true;
      tree.addFruit("apple");
      break;
    case 1:
      document.getElementById("orange").checked = true;
      tree.addFruit("orange");
      break;
    case 2:
      document.getElementById("lemon").checked = true;
      tree.addFruit("lemon");
      break;
    case 3:
      document.getElementById("plum").checked = true;
      tree.addFruit("plum");
      break;
    case 4:
      document.getElementById("noFruit").checked = true;
      tree.addFruit("no fruit");
      break;
  }
}

//function to change tree leaves colour
function changeColor() {
  var sliderColor = document.getElementById("colorSlider").value;
  tree.setLeafColor(sliderColor);
  newTree();
}

//function called to change age
function changeAge() {
  var sliderAge = document.getElementById("ageSlider").value;
  tree.setTreeAge(sliderAge);
  newTree();
}

//function called to change height
function changeHeight() {
  var sliderHeight = document.getElementById("heightSlider").value;
  tree.setTreeHeight(sliderHeight);
  newTree();
}

//function caled to change density
function changeDensity() {
  var sliderDensity = document.getElementById("densitySlider").value;
  tree.setTreeDensity(sliderDensity);
  newTree();
}

//function called when radiobutton is clicked
function changeFruit() {
  if (document.getElementById("apple").checked) {
    tree.addFruit("apple");
  }
  if (document.getElementById("orange").checked) {
    tree.addFruit("orange");
  }
  if (document.getElementById("lemon").checked) {
    tree.addFruit("lemon");
  }
  if (document.getElementById("plum").checked) {
    tree.addFruit("plum");
  }
  if (document.getElementById("noFruit").checked) {
    tree.addFruit("no fruit");
  }

}
