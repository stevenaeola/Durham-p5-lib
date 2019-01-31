'use strict';

let kevin;
let pg;
let threeD = true;

window.onload = function(){

    document.getElementById('submit').addEventListener('click',function(){
        setup();
    });
    document.getElementById('tut').addEventListener('click',function(){
        document.getElementById('main').hidden = true;
        document.getElementById('tutorial').hidden = false;
    });
    document.getElementById('ske').addEventListener('click',function(){
        document.getElementById('tutorial').hidden = true;
        document.getElementById('main').hidden = false;
    });
};

function setup(){
    let c = createCanvas(1110,windowHeight,WEBGL);
    c.parent('main');
    threeD = document.getElementById('3d').checked;
    if(threeD){
        pg = createGraphics(500,500,P2D);
        pg.colorMode(HSB, 360, 255, 255);
        pg.background(40, 10, 255);
        pg.smooth(4);
        if(!kevin){
            kevin = new Sketch(500,500,document.getElementById('nh').valueAsNumber,document.getElementById('nv').valueAsNumber,document.getElementById('life').valueAsNumber,document.getElementById('nRanTrees').valueAsNumber,document.getElementById('free').checked,document.getElementById('ran').checked);
        }else{
            kevin.width = 500;
            kevin.height = 500;
            kevin.nh = document.getElementById('nh').valueAsNumber;
            kevin.nv = document.getElementById('nv').valueAsNumber;
            kevin.maxlife = document.getElementById('life').valueAsNumber;
            kevin.nRanTrees = document.getElementById('nRanTrees').valueAsNumber;
            kevin.freeTree = document.getElementById('free').checked;
            kevin.ran = document.getElementById('ran').checked;
            kevin.trees=[];
            kevin.ntrees = 0;
        }
    }else{
        pg = createGraphics(1110,windowHeight,P2D);
        pg.colorMode(HSB, 360, 255, 255);
        pg.background(40, 10, 255);
        pg.smooth(4);
        if(!kevin){
            kevin = new Sketch(width,height,document.getElementById('nh').valueAsNumber,document.getElementById('nv').valueAsNumber,document.getElementById('life').valueAsNumber,document.getElementById('nRanTrees').valueAsNumber,document.getElementById('free').checked,document.getElementById('ran').checked);
        }else{
            kevin.width = width;
            kevin.height = height;
            kevin.nh = document.getElementById('nh').valueAsNumber;
            kevin.nv = document.getElementById('nv').valueAsNumber;
            kevin.maxlife = document.getElementById('life').valueAsNumber;
            kevin.freeTree = document.getElementById('free').checked;
            kevin.nRanTrees = document.getElementById('nRanTrees').valueAsNumber;
            kevin.ran = document.getElementById('ran').checked;
            kevin.trees=[];
            kevin.ntrees = 0;
        }
    }
    kevin.init();
}

function draw(){

    if(document.getElementById('3d').checked){
        document.getElementById('free').disabled = true;
    }else{
        document.getElementById('free').disabled = false;
    }
    if(document.getElementById('free').checked){
        document.getElementById('3d').disabled = true;
    }else{
        document.getElementById('3d').disabled = false;
    }
    
    
    if(threeD){
        kevin.draw(pg);
        background(255);
        texture(pg);
        rotateY(millis()/1000);
        rotateX(millis()/1000);
        box(500);
    }else{
        kevin.draw(pg);
        texture(pg);
        plane(width,height);
    }
}

function mouseReleased(){
    kevin.mouseReleased();
}