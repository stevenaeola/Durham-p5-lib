//Temporary variable used to contain the text string
var txt1;
var txt2;
var txt3;
var txt4;

//Temporary for tests
function setup()
{
    canvas = createCanvas(700, 300);
    txt1 = new PointText(350, 100, 'Hi, I am text', 32, 0.5, 1, 'point', '#ff0044');
    txt2 = new PointText(100, 50, 'Potato', 50, 0.3, 1.5, 'square', '#0099db');
    txt3 = new PointText(300, 200, 'Coding', 150, 0.1, 3, 'triangle', '#fee761');
    txt4 = new PointText(550, 150, 'Prog18', 80, 0.15, 5, 'point', '#f77622');
}

//Temporary for tests
function draw()
{
    background('#193c3e');
    txt1.draw();
    txt2.draw();
    txt3.draw();
    txt4.draw();
}
