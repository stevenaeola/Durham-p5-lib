void setup(){
    size(500,500);
}
void draw() {
    background(111,255,247);
    noStroke();

    //abacaxi
    fill(252,173,43);
    ellipse(250,300,150,350);

    //porta
    fill(156,199,203);
    ellipse(230,300,50,150);

    //janelas
    ellipse(220,190,20,30);
    ellipse(280,250,30,30);
    fill(175,248,255);
    ellipse(219,190,14,21);
    ellipse(280,250,21,21);

    //porta
    fill(129,166,170);
    ellipse(230,300,40,140);

    //folhas
    fill(29,113,32);
    triangle(245,130,260,110,225,80);
    triangle(230,140,240,115,200,110);
    fill(1,147,7);
    triangle(240,140,225,120,250,70);
    triangle(265,135,280,120,270,80);
    fill(34,198,40);
    triangle(230,150,210,80,235,110);
    triangle(250,140,255,75,270,120);
    triangle(275,145,290,80,300,115);

    //areia
    fill(227,234,180);
    rect(0,300,500,200);

    //BOB
    //corpo
    stroke(0);
    fill(254,255,28);
    rect(mouseX,mouseY,40,50);
    //boca
    fill(160,18,20);
    arc(mouseX+20,mouseY+30,20,20,0,PI);
    //língua
    fill(255,173,173);
    arc(mouseX+20,mouseY+39,10,10,PI,PI+PI);
    //dentes
    fill(255);
    rect(mouseX+14,mouseY+30,5,5);
    rect(mouseX+21,mouseY+30,5,5);
    //olhos
    fill(255);
    stroke(0);
    ellipse(mouseX+12,mouseY+12,15,15);
    ellipse(mouseX+27,mouseY+12,15,15);
    noStroke();
    fill(33,238,255);
    ellipse(mouseX+12,mouseY+13,7,7);
    ellipse(mouseX+27,mouseY+13,7,7);
    fill(0);
    ellipse(mouseX+12,mouseY+13,4,4);
    ellipse(mouseX+27,mouseY+13,4,4);
    //nariz
    fill(255,255,113);
    stroke(0);
    ellipse(mouseX+20,mouseY+24,5,10);
    //camisa
    fill(255);
    rect(mouseX,mouseY+45,40,5);
    //calça
    fill(183,124,28);
    rect(mouseX,mouseY+50,40,7);
    //gravata
    fill(255,26,0);
    triangle(mouseX+17,mouseY+45,mouseX+23,mouseY+45,mouseX+20,mouseY+50);
    quad(mouseX+20,mouseY+48,mouseX+22,mouseY+53,mouseX+20,mouseY+55,mouseX+18,mouseY+53);
}