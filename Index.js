var stardust_project;

/*========================================================================================================================================================*/
/*-------------------------------------------------------------Set up Canvas and Start to add StarDust----------------------------------------------------*/
/*========================================================================================================================================================*/
function setup(){
    //createCanvas(Canvas Size X, Canvas Size Y)
    createCanvas(1455, 850); //add Canvas Size
    stardust_project = new stardust(5000, 64, 255, 255, 0.1, 0.95); //Create Stardust with Parameters
    stardust_project.setup(); //Set up function
    }

/*-------------------------------------------------------------Draw Function to create Stardust-----------------------------------------------------------*/
function draw(){
    background(0, 128); //Background Colour Black
    stardust_project.draw(); //Draw Function
}
/*========================================================================================================================================================*/
/*-------------------------------------------------------------Buttons to show and Hide the User Input box-----------------------------------------------*/
/*========================================================================================================================================================*/
function openClose(btn){   
    if(btn==1){
    document.getElementById("openClose").style.display="none";}
    else{
    document.getElementById("openClose").style.display="block";}
}

    document.addEventListener("DOMContentLoaded", function(){
    var nav = document.getElementById('access_nav'),body = document.body;
/*------------------------------------------------------Button to reset the user input setting as well as the particle locations-------------------------*/
    var stardust_resetPage = document.getElementById("reset");
    function reset(){
        stardust_project.reset();
        document.getElementById("colourR").value = "64";
        document.getElementById("colourG").value = "255";
        document.getElementById("colourB").value = "255";
        document.getElementById("controlRange").value = "0.1";
        document.getElementById("quantity").value = "5000";
        document.getElementById("velocityMultiply").value = "0.5";
    }
/*========================================================================================================================================================*/
/*==========================================================Inputs to update the value user input=========================================================*/
/*========================================================================================================================================================*/
/*---------------------------------------------------------------------------------------*/
    var stardust_ccR = document.getElementById("colourR");
    function changeColourR(event){
    let colourR = document.getElementById("colourR").value;
    stardust_project.setColourR(colourR);
    }
    //Look for Colour Scale Red

    var stardust_ccG = document.getElementById("colourG");
    function changeColourG(event){
    let colourG = document.getElementById("colourG").value;
    stardust_project.setColourG(colourG);
    }
    //Look for Colour Scale Green

    var stardust_ccB = document.getElementById("colourB");
    function changeColourB(event){
    let colourB = document.getElementById("colourB").value;
    stardust_project.setColourB(colourB);
    }
    //Look for Colour Scale Blue
    
    var stardust_cr = document.getElementById("controlRange");
    function changecontrolRange(event){
    let controlRange = document.getElementById("controlRange").value;
    stardust_project.setcontrolRange(controlRange);
    }
    //Look for distance between cursor and particle multiplier constant

    var stardust_q = document.getElementById("quantity");
    function changequantity(event){
    let quantity = document.getElementById("quantity").value;
    stardust_project.setQuantity(quantity);
    }
    //Look for amount of stardust

    var stardust_vm = document.getElementById("velocityMultiply");
    function changevelocityMultiply(event){
    let velocityMultiply = document.getElementById("velocityMultiply").value;
    stardust_project.setVelocityMultiplier(velocityMultiply);
    }
    //Look for Stardust Velocity

    stardust_ccR.addEventListener("change", changeColourR);
    stardust_ccG.addEventListener("change", changeColourG);
    stardust_ccB.addEventListener("change", changeColourB);
    stardust_cr.addEventListener("change", changecontrolRange);
    stardust_q.addEventListener("change", changequantity);
    stardust_vm.addEventListener("change", changevelocityMultiply);

    stardust_resetPage.addEventListener("click", reset);
    //Event Listener for ALL Parameters 
})