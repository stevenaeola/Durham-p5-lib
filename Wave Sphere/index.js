var ws = new WaveSphere();
var sphereGraphic;


// This example page used the optional p5.Render argument to the WaveSphere example. See demo.js for direct drawing to the canvas
// NOTE: the optional p5.Render slows down the sketch marginally

function setup(){ 
   
    var c = createCanvas(700, 700);
    c.parent("sketch-container");

    sphereGraphic = createGraphics(700, 700) ;
    ws.setup(100,200, 350, 350, sphereGraphic);
    
    ws.setFrontBackColour(255,255,255, 0,0,150);
    ws.setShowFPS(true);
    
}

function draw(){
    
    // Clear canvas
    sphereGraphic.background(0,0,0) ;
    ws.draw(sphereGraphic);
    image(sphereGraphic, 0, 0);
    
   
}

function mousePressed(){
       ws.mousePressed(sphereGraphic);
      
}

function pageLoaded(){
    // Set page values
    setValue(1, ws.getNumberOfPoints());
    setValue(2, ws.getRadius());
    setValue(3, ws.getOutputScale());
    setValue(4, ws.getSurfaceReactivity());
    setValue(5, ws.getSurfaceTension());
    setValue(6, ws.getViscosity());
    setValue(7, ws.getClickMagnitude())
    setTextInVal(8, ws.getX());
    setTextInVal(9, ws.getY());
    let c = ws.getNearColour()
    setTextInVal(10, c[0]);
    setTextInVal(11, c[1]);
    setTextInVal(12, c[2]);
    c = ws.getFarColour()
    setTextInVal(13, c[0]);
    setTextInVal(14, c[1]);
    setTextInVal(15, c[2]);

    // Add event listeners
    for(var i = 1; i <thingsChanged.length; i++){
        let inputObj = document.getElementById("val-"+i)
        inputObj.hiddenId = i;

        if(inputObj.type=="range"){
            inputObj.addEventListener("input", function(){valueChanged(this.hiddenId)});
        }

        if(inputObj.type=="text"){
            inputObj.addEventListener("change", function(){valueChanged(this.hiddenId)});
        }
    }

}

function valueChanged(id){
    console.log(id);
    if (id<=7){
    updateText(id)}
    let el = document.getElementById("val-"+id)
    thingsChanged[id](el.value);    
}

function setValue(id, value){
    let el = document.getElementById("val-"+id)
    el.value = value;
    updateText(id);
}

function setTextInVal(id, value){
    document.getElementById("val-"+id).value = value;
}

function updateText(id){
    let el = document.getElementById("val-"+id)
    document.getElementById("val-out-"+id).innerHTML = el.value;
}

let thingsChanged = new Array(16);
thingsChanged[1] = function(x){
    var near = ws.getNearColour();
    var far = ws.getFarColour();
    let rf = near[0];
    let gf = near[1];
    let bf = near[2];
    let rb = far[0];
    let gb = far[1];
    let bb = far [2];
    ws.setup(parseInt(x), ws.getRadius(), ws.getX(), ws.getY(), sphereGraphic);
    ws.setFrontBackColour(rf,gf,bf,rb,gb,bb);
}
thingsChanged[2] = function(x){
    ws.setRadius(parseInt(x));
}
thingsChanged[3] = function(x){
    ws.setOutputScale(parseFloat(x));
}
thingsChanged[4] = function(x){
    ws.setSurfaceReactivity(parseFloat(x));
}
thingsChanged[5] = function(x){
    ws.setSurfaceTension(parseFloat(x));
}
thingsChanged[6] = function(x){
    ws.setViscosity(parseFloat(x));
}
thingsChanged[7] = function(x){
    ws.setClickMagnitude(parseFloat(x));
}
thingsChanged[8] = function(x){
    ws.setX(parseInt(x));
}
thingsChanged[9] = function(x){
    ws.setY(parseInt(x));
}

thingsChanged[10] = function(x){
    colourChanged(parseInt(x), 0);
}

thingsChanged[11] = function(x){
    colourChanged(parseInt(x), 1);
}

thingsChanged[12] = function(x){
    colourChanged(parseInt(x), 2);
}

thingsChanged[13] = function(x){
    colourChanged(parseInt(x), 3);
}

thingsChanged[14] = function(x){
    colourChanged(parseInt(x), 4);
}

thingsChanged[15] = function(x){
    colourChanged(parseInt(x), 5);
}


function colourChanged(col, pos){
    var near = ws.getNearColour();
    var far = ws.getFarColour();


    var newColour = Array(6);
    for (var i =0 ;i <6; i++){ 
        newColour[i] = document.getElementById("val-"+(10+i)).value;    
        if(newColour[i]==""){
            if(i<3){
                newColour[i] = parseInt(near[i]);
            }else{
                newColour[i] = parseInt(far[i-3]);
            }
            
        }
        newColour[i] = parseInt(newColour[i]);
        
    }

    if(col > 255){
        col = 255;
    }

    newColour[pos] = col;

    ws.setFrontBackColour(newColour[0],newColour[1],newColour[2],newColour[3],newColour[4],newColour[5]);

}