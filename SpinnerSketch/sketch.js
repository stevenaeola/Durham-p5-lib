//This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
class spinner {
    constructor(n=10, r=100, spd=2, rot=90, thk=10, ws=0.5, hs=0.5, red=0, grn=150, blu=255, rend=false){
        createCanvas(600, 600); //Default: (600, 600)
        this.n = n; //Number of line segments
        this.r = r; //Radius of shape
        this.spd = spd; //Speed of line angle change
        this.rot = rot; //Max rotation angle
        this.thk = thk; //Line thickness
        this.ws = ws; //Width-shift
        this.hs = hs; //Height-shift
        this.red = red; //}
        this.grn = grn; //} RGB values
        this.blu = blu; //}
        this.rend = rend; //Enables WEBGL renderer if truthy

        this.k = 0; //Angle "momentum"
        this.t = 0; //Line angle
        
        //When rend is passed to the constructor as something truthy, like 1, it will enable a WEBGL canvas for drawing 3D objects.
        if(rend){
            createCanvas(600, 600, WEBGL); //Default: (600, 600, WEBGL)
            this.n = n; 
            this.r = r; 
            this.spd = spd; 
            this.rot = rot; 
            this.thk = thk; 
            this.ws = ws;
            this.hs = hs;
            this.red = red;
            this.grn = grn;
            this.blu = blu;
            this.rend = rend;

            this.k = 0;
            this.t = 0;
        }
    }
    
    //Setter functions, for later use in form control
    setN(n){
        this.n = n;
    }
    setRadius(r){
        this.r = r;
    }
    setSpeed(spd){
        this.spd = spd;
    }
    setRotate(rot){
        this.rot = rot;
    }
    setThick(thk){
        this.thk = thk;
    }
    setXpos(ws){
        this.ws = ws;
    }
    setYpos(hs){
        this.hs = hs;
    }
    setRed(red){
        this.red = red;
    }
    setGreen(grn){
        this.grn = grn;
    }
    setBlue(blu){
        this.blu = blu;
    }
    //Setters for attributes that shouldn't really be changed manually
    setK(k){
        this.k = k;
    }
    setT(t){
        this.t = t;
    }
    setRend(rend){
        this.rend = rend;
    }

    //Getter functions
    getN(){
        return this.n;
    }
    getRadius(){
        return this.r;
    }
    getSpeed(){
        return this.spd;
    }
    getRotate(){
        return this.rot;
    }
    getThick(){
        return this.thk;
    }
    getXpos(){
        return this.ws;
    }
    getYpos(){
        return this.hs;
    }
    getRed(){
        return this.red;
    }
    getGreen(){
        return this.grn;
    }
    getBlue(){
        return this.blu;
    }
    //Getters for attributes that shouldn't really be changed manually
    getK(){
        return this.k;
    }
    getT(){
        return this.t;
    }
    getRend(){
        return this.rend;
    }

    draw(g=false) {
        strokeWeight(this.thk); //Line thickness
        stroke(this.red,this.grn,this.blu); //Line colour
        translate(width*this.ws, height*this.hs); //Changes spinner's position on canvas relative to canvas dimensions, by multiplying by shift attributes

        for (var i = 0; i < this.n; i ++){
            //Makes the shape
            var ang = 360/this.n; //Defines interior angle of the shape based on n
            //Calculates position and length of each line
            var l = this.r*sin(radians(ang/2));
            var x = this.r*cos(radians(ang*i));
            var y = this.r*sin(radians(ang*i));
            
            //Draws the lines in correct position and rotation state
            push();
            translate(x, y);
            rotate(PI/2+radians(ang*i+this.k));
            line(-l, 0, l, 0);
            pop();
        }
        //Updates the angle/rotation state for next draw() frame
        this.k=180*sin(radians(this.t));
        if (this.t<this.rot) this.t += this.spd; //Increments the angle until it reaches desired rotation
        else this.t=0; //Resets the angle after one rotation is complete

        translate(-(width*this.ws), -(height*this.hs)); //Changes back the origin for the draw() function so subsequent objects do not inherit it (since translate() is global)

        if(g){
            //Same functionality as above, but drawn onto createGraphics() instead
            //Spinner also moves relative to createGraphics() dimensions, not those of the canvas
            g.background(30,255);
            g.strokeWeight(this.thk);
            g.stroke(this.red,this.grn,this.blu);
            g.translate(g.width*this.ws, g.height*this.hs);

            for (var i = 0; i < this.n; i ++){
                var ang = 360/this.n;
                var l = this.r*g.sin(radians(ang/2));
                var x = this.r*g.cos(radians(ang*i));
                var y = this.r*g.sin(radians(ang*i));
                
                g.push();
                g.translate(x, y);
                g.rotate(PI/2+radians(ang*i+this.k));
                g.line(-l, 0, l, 0);
                g.pop();
            }
        
            this.k=180*g.sin(radians(this.t));
            if (this.t<this.rot) this.t += this.spd;
            else this.t=0;

            g.translate(-(g.width*this.ws), -(g.height*this.hs));
        }
    }
}