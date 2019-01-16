class WaveSphere{
    constructor(){
        // Initiate data structures, doesn't create the sphere point. Setup() needs to be called for that.

        this.Nmax = 0;
        this.radius = 0;
        this.cX = 0;
        this.cY = 0;

        // Scale the output
        this.outputScale = 1.2;

        // Show FPS at bottom left of canvas 
        this.showFPS = false;

        // Set anti-aliasing
        this.antialias = false;

        // Surface reactivity
        this.M = 50; 

        // Air resistance / surface tension
        this.H = 0.99;

        // Viscosity  
        this.HH = 0.01; 

        // Colour data structures
        this.nearColour = [0, 0, 0];
        this.farColour = [0, 0, 0];

        // Used to store color data
        this.cScale = new Array(3);
        this.cMidpoint = new Array(3);

        // Mouse look sensitivity
        this.mouseSensitivity = 1;

        // Mouse region: Xmin, Xmax, Ymin, Ymax 
        this.mouseRegion = [0, 100, 0, 100];

        // Magnitude of click 
        this.Magnitude = 0.5;

        // Used to scale the mouse/constant spin 
        this.mouseLookBase = 10000;
        this.mouseSF = (1/this.mouseSensitivity)*this.mouseLookBase;
        
        // Mouse activity
        this.mouseIsActive = true;

        // Used to store mouse coordinates, updated every frame, all references to mouse coordinates in this object use this
        this.mX = 0;
        this.mY = 0;

        // Spin mode
        // 0 = No spin
        // 1 = mouse
        // 2 = constant
        this.spinMode = 1;
        this.constSpinX = 100;
        this.constSpinY = 100;

      
    }

    setup(points, radius, x, y, renderObj){
        if(this._isInt(points),this._isInt(radius),this._isInt(x),this._isInt(y)){
            this.Nmax = points;
            
            // Center center of sphere
            this.cX = x;
            this.cY = y;

            this.setRadius(radius);
            
            this._initiatePoints();

            // Default Colour 
            this.setColour(255, 255, 255);

            if(renderObj){
                // Set mouse region to the canvas size
                this.mouseRegion[1] = renderObj.width;
                this.mouseRegion[3] = renderObj.height;
            }else{
                this.mouseRegion[1] = width;
                this.mouseRegion[3] = height;
            }
        }else{
            throw new Error("setup expected 4 int but didn't receive all int");
        }
    }

    _initiatePoints(){
        // Create points
        this.X = new Array(this.Nmax + 1); 
        this.Y = new Array(this.Nmax + 1);
        this.Z = new Array(this.Nmax + 1);
        this.V = new Array(this.Nmax + 1); // Velocity perpendicular to sphere surface
        this.dV = new Array(this.Nmax + 1);

        // Initiate all points
        for ( let N = 0 ; N <= this.Nmax ; N++ ){
            // Initiate points inside a cube
            this.X[N] = this._randomCoord();
            this.Y[N] = this._randomCoord();
            this.Z[N] = this._randomCoord();
            
            // Use this point distribution method for a cool point initiation
            //this.X[N] = N-this.radius;
            //this.Y[N] = N -this.radius;
            //this.Z[N] = N -this.radius;
            
            //Initiate velocity and acceleration to 0
            this.V[N] = 0;
            this.dV[N] = 0;
        }
    }

    /******************* Draw related Methods **************************** */
    draw(renderObj){
        
        // Mouse coords pulled from canvas / p5.renderer and saved locally to object to make life easier when using them
        this._updateMouseCoords(renderObj);
      
        if(renderObj){
            renderObj.strokeWeight(1);
            if(! this.antialias){renderObj.noSmooth();} 
        }else{
            strokeWeight(1);
            if(!this.antialias){noSmooth();}  
        }

        if(this.showFPS){this._drawFPS(renderObj);}
        
        // Work out how much to rotate sphere this frame
        let rotationX = 0;
        let rotationY = 0;
    
        if(this.spinMode==1){
            // Calculate how much mouse should cause sphere to move
            if( this._mouseActive() ){
            
                    rotationX = (this.mX- this.cX) /  this.mouseSF;
                    rotationY = (this.mY- this.cY) /  this.mouseSF;
                
            }else{
                //console.log("not in AR")
                rotationX = 0;
                rotationY = 0;
            }
        }

        if(this.spinMode==2){
            rotationX = this.constSpinX/  this.mouseSF;
            rotationY = this.constSpinY/  this.mouseSF;
        }
    

        // Points are ordered by Z-index
        // For all points starting at the back (smallest Z co-ordinate)
        for (let N = 0 ; N <=  this.Nmax ; N++ ){
            
            this._setColourByDepth(N, renderObj);
    
            // Checks all points in front of this point and draws a line to all close enough points
            let NN = N+1;
            let dZ =  this.Z[NN]- this.Z[N];
    
            // Loop will stop when dZ > R as no following points will be close enough to draw line
            while(NN <=  this.Nmax && dZ < this.R)
            {
                // if: L < R i.e. the points are close enough to draw a line 
                // To speed up runtime there are a few quickfails for the comparision L < R
                
                // Calculate difference in X and Y co-ordinates
                var dX =  this.X[NN] -  this.X[N];
                var dY =  this.Y[NN] -  this.Y[N];
                
                // Quick fail: if dX or dY is too large then distance between 2 points will be too large
                if(Math.abs(dX) < this.R && Math.abs(dY) < this.R){
                    
                    // Calculate the square of the distance between the two points
                    let Lsqr = dX*dX + dY*dY + dZ*dZ;
    
                    // Check if L<R without square rooting, for speed
                    if(Lsqr < this.Rsqr){  
    
                        // Calculate distance between point N and point NN
                        let L = Math.sqrt(Lsqr);
    
                        this._calcPointInteraction(N, NN, L, dX, dY, dZ);
                        this._drawConnectingLine(N, NN, renderObj);
                       
                    }   
                }
    
                //Swap points if N is closer to camera than NN
                if (this.Z[N] > this.Z[NN]){
                    this._swapPoints(N, NN);
                }
    
                // Increment NN and calculate the next dZ ready for next loop
                NN++;
                dZ = this.Z[NN] - this.Z[N];
            }
    
            this._calcPointDynamics(N);
            this._rotateAboutOrigin(N, rotationX, rotationY);
        }
    }

    // Display framerate in bottom left corner
    _drawFPS(renderObj){
        
        if(renderObj){
            var fps = frameRate();
            renderObj.fill(255);
            renderObj.stroke(0);
            renderObj.text("FPS: " + fps.toFixed(2), 10, renderObj.height - 10);
        }else{
            var fps = frameRate();
            fill(255);
            stroke(0);
            text("FPS: " + fps.toFixed(2), 10, height - 10);
        }
    }

    _drawConnectingLine(N, NN, renderObj){
        // Draw line between points
        // Each points next position is calculated then moved from having 0,0 in the center to the top left. 
        var C =  this.outputOverRadius*( this.radius + this.V[N]);
        var CC =  this.outputOverRadius*( this.radius + this.V[NN]);
        
        // Translate each point into the canvas coordinate space
        if(renderObj){
            renderObj.line(this.X[N]* C + this.cX, 
                           this.Y[N]* C + this.cY, 
                           this.X[NN]* CC + this.cX, 
                           this.Y[NN] * CC + this.cY); 
        }else{
            line(this.X[N]* C + this.cX, 
                this.Y[N]* C + this.cY, 
                this.X[NN]* CC + this.cX, 
                this.Y[NN] * CC + this.cY);  
        }
    }

    // Sets the stoke colour by the depth of a point
    _setColourByDepth(N, renderObj){
        if(renderObj){
            renderObj.stroke(this.cMidpoint[0] + this.Z[N] * this.cScale[0], this.cMidpoint[1] + this.Z[N] * this.cScale[1], this.cMidpoint[2] + this.Z[N] * this.cScale[2]);
        }else{
            stroke(this.cMidpoint[0] + this.Z[N] * this.cScale[0], this.cMidpoint[1] + this.Z[N] * this.cScale[1], this.cMidpoint[2] + this.Z[N] * this.cScale[2]);
        }
    }
    
    /* ******************************* Moused functions ****************************/ 
    // Finds closes point to mouse click and sends it flying
    mousePressed(renderObj){
        if(this._mouseActive(renderObj)){
            // Set overly large random distance
            let Lmin_sqr = 4 * this.radius * this.radius; 
            let incidentPoint = 0;
            let Lsqr = 0;
            for ( let N = 0; N <= this.Nmax; N++){
                if (this.Z[N]>0){
                    let dX = this.mX - (this.cX + this.X[N]);
                    let dY = this.mY - (this.cY + this.Y[N]);
                    Lsqr = dX * dX + dY * dY;
                    if (Lsqr < Lmin_sqr){ 
                        incidentPoint = N; 
                        Lmin_sqr = Lsqr; 
                    }
                }
            }
        
            // Sends point in different directions every other click
            if (this.K == 0){  
                this.dV[incidentPoint] = -this.radius * this.Magnitude;
                this.K = 1; 
            }else{  
                this.dV[incidentPoint] = this.radius * this.Magnitude;
                this.K = 0; 
            } 
        }
    }

    _mouseActive(){
        if(this.mouseIsActive){
            // Check if mouse in active region
            return (this.mX > this.mouseRegion[0] && this.mX < this.mouseRegion[1] && this.mY > this.mouseRegion[2] && this.mY < this.mouseRegion[3]);
        }else{
            return false;
        }
    }
    
    _updateMouseCoords(renderObj){
        if(renderObj){
            this.mX = renderObj._pInst.mouseX;
            this.mY = renderObj._pInst.mouseY;
        }else{
            this.mX = mouseX;
            this.mY = mouseY;
        }
    }

    /* ********************************* Collision function *****************************************/
    // Find closest point to arg and send it towards centre
    collision(x,y,z){
        if(this._isInt(x),this._isInt(y),this._isInt(z)){
            // Set overly large random distance
            let Lmin_sqr = 4 * this.radius * this.radius; 
            let incidentPoint = 0;
            let Lsqr = 0;
            for ( let N = 0; N <= this.Nmax; N++){
                if (this.Z[N]>0){
                    let dX =  this.X[N]-x;
                    let dY =  this.Y[N]-y;
                    let dZ = this.Z[N]-z;
                    Lsqr = dX * dX + dY * dY + dZ * dZ;
                    if (Lsqr < Lmin_sqr){ 
                        incidentPoint = N; 
                        Lmin_sqr = Lsqr; 
                    }
                }
            }

            this.dV[incidentPoint] = -this.radius * this.Magnitude;
        }else{
            throw new Error("collision expected 3 int but didn't receive all int");
        }
            

    }

    /* ******************************* Maths used in drawing ********************/
    
    _swapPoints(N, NN){
        let KX =  this.X[N]; 
        let KY =  this.Y[N]; 
        let KZ =  this.Z[N]; 
        let KV =  this.V[N]; 
        let KdV =  this.dV[N];
    
        this.X[N] =  this.X[NN]; 
        this.Y[N] =  this.Y[NN]; 
        this.Z[N] =  this.Z[NN]; 
        this.V[N] =  this.V[NN]; 
        this.dV[N] =  this.dV[NN];
    
        this.X[NN] = KX; 
        this.Y[NN] = KY; 
        this.Z[NN] = KZ; 
        this.V[NN] = KV; 
        this.dV[NN] = KdV; 
    }
    

    // Calculate the interaction 2 connected points have on each other
    _calcPointInteraction(N, NN, L, dX, dY, dZ){
         // precalculate a constant used in each of the equations
         let SF = ((this.R - L)/(2 * L));
                        
         let C = dX * SF;
         this.X[N] =  this.X[N] - C ;
         this.X[NN] =  this.X[NN] + C ;
         
         C =dY * SF;
         this.Y[N] =  this.Y[N] - C ;
         this.Y[NN] =  this.Y[NN] + C ;
    
         C = dZ * SF;
         this.Z[N] =  this.Z[N] - C ;
         this.Z[NN] =  this.Z[NN] + C ;
     
         C = ( this.V[NN] - this.V[N])/this.M;
         this.dV[N] =  this.dV[N] + C;
         this. dV[NN] =  this.dV[NN] - C ;
    }
    
    
    // Calculate how the points interact in the world
    _calcPointDynamics(N){
         // Calculate distance to the origin
         let L = Math.sqrt(this.X[N] * this.X[N] + this.Y[N] * this.Y[N] + this.Z[N] * this.Z[N]);
    
         // Does something position related... I think this draws the point to be on the ideal sphere... maybe
         let SF = 1 + (this.radius-L)/(2*L);
         this.X[N] =(this.X[N]*SF);
         this.Y[N] =(this.Y[N]*SF);
         this.Z[N] =(this.Z[N]*SF);
    
         // Reduces acceleration -- tends to 0
         this.dV[N] = this.dV[N] - (this.V[N] * this.HH); 
             
         // Change velocity
         this.V[N] = this.V[N] + this.dV[N];
             
         // Dull acceleration
         this.dV[N] = this.dV[N] * this.H;
    
    }
    

      // Calculates and sets point after rotating degX,dedY degrees
      _rotateAboutOrigin(N, degX, degY){
         
        let KX = this.X[N] ;
        let KZ = this.Z[N] ; 
        let KY = this.Y[N] ;

        // Matrix transform point by rotating it around the Y-axis
        let cosK =  Math.cos(degX);
        let sinK = Math.sin(degX);
        this.Z[N] = (KZ * cosK) - (KX * sinK);
        this.X[N] = (KZ * sinK) + (KX * cosK);
            

        // Matrix transform point by rotating it around the X-axis
        KZ = this.Z[N];
        cosK =  Math.cos(degY);
        sinK = Math.sin(degY);
        this.Z[N] = (KZ * cosK) - (KY * sinK);
        this.Y[N] = (KZ * sinK) + (KY * cosK);
                
    }
    
    /* ******************************* Misc. private functions ***************************/
    _randomCoord(){
        return this.radius - Math.floor(Math.random() * 2 * this.radius);
    }
    
    _isInt(x){
        return Number.isInteger(x);
    }

    _isFloat(x){
        return !isNaN(x)
    }


    /* *************************** Setters ***************************/
    setColour(r,g,b){
        if(this._isInt(r) && this._isInt(g) && this._isInt(b)){
            this.nearColour[0] = r;
            this.nearColour[1] = g;
            this.nearColour[2] = b;

            this.farColour[0] = r/5;
            this.farColour[1] = g/5;
            this.farColour[2] = b/5;

            for(let i =0; i<3; i++){
                this.cScale[i] = (this.nearColour[i] - this.farColour[i])/(2 * this.radius);
                this.cMidpoint[i] = (this.nearColour[i] + this.farColour[i])/2;
            }
        }else{
            throw new Error("setColour expected 3 int but didn't receive all int");
        }
    }

    setFrontBackColour(rf,gf,bf, rb, gb, bb){
        if(this._isInt(rf) && this._isInt(gf) && this._isInt(bf) && this._isInt(rb) && this._isInt(gb) && this._isInt(bb)){
            this.nearColour[0] = rf;
            this.nearColour[1] = gf;
            this.nearColour[2] = bf;

            this.farColour[0] = rb;
            this.farColour[1] = gb;
            this.farColour[2] = bb;

            for(let i =0; i<3; i++){
                this.cScale[i] = (this.nearColour[i] - this.farColour[i])/(2 * this.radius);
                this. cMidpoint[i] = (this.nearColour[i] + this.farColour[i])/2;
            }
        }else{
            throw new Error("setFrontBackColour expected 6 int but didn't receive all int");
        }
    }

    setRadius(r){
        if(this._isInt(r)){
            this.radius = r;
            this.R = 2 * Math.sqrt((4 * Math.PI * (this.radius * this.radius) / (this.Nmax * 2 * Math.sqrt(3)))) ;
            this.Rsqr  = this.R * this.R + 1;
            this.outputOverRadius = this.outputScale / this.radius;
        }else{
            throw new Error('setRadius expected a float but received a'+typeof(r));
        }
    }

    setClickMagnitude(size){
        if(!this._isFloat(size)){
            throw new Error('setClickMagnitude expected a float but received a'+typeof(size));
        }else{
            this.Magnitude = size;
        }
    }

    setShowFPS(show){
        if(typeof(show) != typeof(true)){
            throw new Error('setShowFPS expected a bool but received a'+typeof(show));
        }else{
        this.showFPS = show;
        } 
    }

    setOutputScale(scale){
        if(!this._isFloat(scale)){
            throw new Error('setOutputScale expected a float but received a'+typeof(scale));
        }else{
            this.outputScale = scale;
            this.outputOverRadius = this.outputScale / this.radius;
        }
    }

    setSurfaceReactivity(m){
        if(!this._isFloat(m)){
            throw new Error(' setSurfaceReactivity expected a float but received a'+typeof(m));
        }else{
            this.M = m;
        }
    }

    setSurfaceTension(k){
        if(!this._isFloat(k)){
            throw new Error(' setSurfaceTension expected a float but received a'+typeof(k));
        }else{
            this.H = k
        }
    }

    setViscosity(k){
        if(!this._isFloat(k)){
            throw new Error('setViscosity expected a float but received a'+typeof(k));
        }else{
            this.HH = k
        }
    }

    setX(k){
        if(!this._isInt(k)){
            throw new Error('setX expected an int but received a'+typeof(k));
        }else{
            this.cX = k;
        }
    }

    setY(k){
        if(!this._isInt(k)){
            throw new Error('setY expected an int but received a'+typeof(k));
        }else{
            this.cY = k;
        }
    }

    setMouseActive(active){
        if(typeof(active) != typeof(true)){
            throw new Error('setMouseActive expected a bool but received a'+typeof(active));
        }else{
            this.mouseIsActive  = active;
        }
    }

    setMouseActiveRegion(region){
        if(Array.isArray(region)){
            if(region.length == 4){
                this.mouseRegion[0]  = region[0];
                this.mouseRegion[1]  = region[1];
                this.mouseRegion[2]  = region[2];
                this.mouseRegion[3]  = region[3];
            }else{
                throw new Error('setMouseActiveRegion expected an array of length 4 but received an array'+region.length);
            }
        }else{
            throw new Error('setMouseActiveRegion expected an array but received a'+typeof(region));
        }
    }

    setMouseSensitivity(x){
        if(!this._isFloat(x)){
            throw new Error('setMouseSensitivity expected a float but received a'+typeof(x));
        }else{
            this.mouseSensitivity = x;
            this.mouseSF = (1/this.mouseSensitivity)*this.mouseLookBase;
        }
    }

    setSpinMode(x){
        if(!this._isInt(x)){
            throw new Error('setSpinMode expected an int but received a'+typeof(x));
        }else{
            if(x<0 || x > 2){
                throw new Error('setSpinMode expected the value 0,1,2 but received '+x);
            }else{
                this.spinMode = x;
            }
        }
    }

    setConsSpinX(x){
        if(!this._isInt(x)){
            throw new Error('setConsSpinX expected an int but received a'+typeof(x));
        }else{
            this.constSpinX = x;
        }
    }

    setConsSpinY(y){
        if(!this._isInt(y)){
            throw new Error('setConsSpinY expected an int but received a'+typeof(y));
        }else{
            this.constSpinY = y;
        } 
    }
    /* *************************** Getters **************************************/
    getNumberOfPoints(){
        return this.Nmax;
    }

    getX(){
        return this.cX;
    }

    getY(){
        return this.cY;
    }

    getRadius(){
        return this.radius;
    }

    getOutputScale(){
        return this.outputScale;
    }

    getSurfaceReactivity(){
        return this.M ;
    }

    getSurfaceTension(){
        return this.H;
    }

    getViscosity(){
        return this.HH;
    }

    getClickMagnitude(){
        return this.Magnitude;
    }
    
    getNearColour(){
        return this.nearColour;
    }

    getFarColour(){
        return this.farColour;
    }

    getMouseActive(){
        return this.mouseIsActive;
    }

    getMouseActiveRegion(){
        return this.mouseRegion;
    }

    getMouseSensitivity(){
        return this.mouseSensitivity;
    }

    getSpinMode(){
        return this.spinMode;
    }

    getConsSpinX(){
        return this.constSpinX;
    }

    getConsSpinY(){
        return this.constSpinY;
    }
}