var p;
var g;

//setup function is run when the program is first opened
function setup(){
    createCanvas(800,800, WEBGL);
    g = createGraphics(800,800);
    //create new instance of class particle
    p = new Particle (mouseX,mouseY);
}

//draw function is called repeatedly throughout
function draw(){
    g.background(32);
    p.draw(g);
    background(0);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(g);
    box(400);
}

//function called when mouse is clicked and released
function mouseClicked(){
    p.addNewParticle();
}

//function called when mouse is clicked and moved
function mouseDragged(){
    p.addNewParticle();
}

//Listener for DOM interaction
document.addEventListener('DOMContentLoaded', function(){
//.getElementByID looks for IDs in index.html
    var r = document.getElementById('colred');
    function changeRed(){
        let red = document.getElementById('colred').value;
        //calls the setRed method in the particle class.
        p.setRed(red);
    }

    var g = document.getElementById('colgreen');
    function changeGreen(){
        let green = document.getElementById('colgreen').value;
        //calls the setGreen method in the particle class.
        p.setGreen(green);
    }

    var b = document.getElementById('colblue');
    function changeBlue(){
        let blue = document.getElementById('colblue').value;
        //calls the setBlue method in the particle class.
        p.setBlue(blue);
    }

    var reset = document.getElementById('reset');
    function restart(){
        //calls the restart method in the particle class.
        p.restart();
    }

    var s = document.getElementById('half');
    function smaller(){
        //calls the smaller method in the particle class.
        p.smaller();
    }

    var l = document.getElementById('double');
    function larger(){
        //calls the larger method in the particle class.
        p.larger();
    }

    //the following lines are called if a specific event happens
    //in this case, either the form controls value changes or it is mouseClicked
    //the functions above are called if any of these things happen
    r.addEventListener('change', changeRed);
    g.addEventListener('change', changeGreen);
    b.addEventListener('change', changeBlue);
    reset.addEventListener('click', restart);
    s.addEventListener('click', smaller);
    l.addEventListener('click', larger);

    //form on html document called colour_form
    var cf = document.getElementById('colour_form');

    cf.addEventListener('submit', function (event){
        //prevents form from acting as it would by default.
        event.preventDefault();});
});
