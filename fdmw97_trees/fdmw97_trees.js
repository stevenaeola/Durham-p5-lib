'use strict';

/**
 * Main class to manage all objects in component
 */
class Sketch{
    /**
     * @constructor
     * @param {number} width - the width of the sketch
     * @param {number} height - the height of the sketch
     * @param {number} [nh=8] - the number of columns of trees to be rendered when freeTree and ran are false 
     * @param {number} [nv=3] - the number of rows of trees to be rendered when freeTree and ran are false 
     * @param {number} [maxlife=15] - the base maximun number of updates of a branch before it splits 
     * @param {number} [nRanTrees=0] - the number of trees to be rendered if ran is true
     * @param {boolean} [freeTree=false] - if true a tree is rendered at the mouse cursor location when the left mouse button is clicked
     * @param {boolean} [ran=false] - if true nRanTrees number of trees are rendered in radnom positions of the sketch 
     */
    constructor(width, height, nh = 8,nv = 3,maxlife = 15,nRanTrees = 0,freeTree = false, ran = false){
        this.nh = nh;
        this.nv = nv;
        this.maxlife = maxlife;
        this.trees = [];
        this.ntrees = 0;
        this.width = width;
        this.height = height;
        this.freeTree = freeTree;
        this.nRanTrees = nRanTrees;
        this.ran = ran;
    }
    /**
     * @returns {number} number of columns of trees rendered when freeTree and ran are false
     * 
     * 
    */
    get nh(){
        return this._nh;
    }
    /**
     * sets nh to input value
     * @param {number} nh - number of columns to be rendered when freeTree and ran are false
     */
    set nh(nh){
        if(!(typeof(nh)=='number'))
            console.log('The number of columns should be a number');
        else if(nh<0)
            console.log('You cannot have a negative number of columns of trees!');
        else
            this._nh = nh;
    }
    /**
     * @returns {number} number of rows of trees rendered when freeTree and ran are false
     * 
     * 
    */
    get nv(){
        return this._nv;
    }
    /**
     * sets nh to input value
     * @param {number} nh - number of rows to be rendered when freeTree and ran are false
     */
    set nv(nv){
        if(!(typeof(nv)=='number'))
            console.log('The number of rows must be a number');
        else if(nv<0)
            console.log('You cannot have a negative number of rows of trees!');
        else
            this._nv = nv;
        
    }
    /**
     * @returns {number} maxlife of branch before it splits
     */
    get maxlife(){
        return this._maxlife;
    }
    /**
     * sets maxlife to input value
     * @param {number} maxlife - maxlife of branch before it splits
     */
    set maxlife(maxlife){
        if(!(typeof(maxlife) == 'number'))
            console.log('The lifespan of a branch must be a number');
        else if(maxlife<1)
            console.log('Branches must have a lifespan of at east 1 cycle!');
        else
            this._maxlife = maxlife;
    }
    /**
     * @returns {number} width of sketch
     */
    get width(){
        return this._width;
    }
    /**
     * sets width to input value
     * @param {number} width - width of sketch
     */
    set width(width){
        if(!(typeof(width) == 'number'))
            console.log('The width of the sketch should be a number');
        else if(width < 1)
            console.log('Sketch must have a width of at least 1');
        else
            this._width = width;
    }
    /**
     * @returns {number} height of the sketch
     */
    get height(){
        return this._height;
    }
    /**
     * sets height to input value
     * @param {number} height - height of sketch
     */
    set height(height){
        if(!(typeof(height) == 'number'))
            console.log('The height of the sketch should be a number');
        else if(height < 1)
            console.log('Sketch must have a height of at least 1');
        else
            this._height = height;
    }
    /**
     * @returns {boolean} whether or not freeTree mode is enabled
     */
    get freeTree(){
        return this._freeTree;
    }
    /**
     * sets freeTree to input value
     * @param {number} freeTree - whether or not freeTree should be enabled
     */
    set freeTree(freeTree){
        this._freeTree = freeTree;
    }
    /**
     * sets the sketches array of trees to equal the input array
     * @param {Array} trees - list of trees
     */
    set trees(trees){
        if(trees instanceof Array)
            this._trees = trees;
        else
            console.log('trees variable must be an Array');
    }
    /**
     * @returns {Array} current list of trees in the sketch
     */
    get trees(){
        return this._trees;
    }
    /**
     * @returns {number} the number of trees currently in the sketch
     */
    get ntrees(){
        return this._ntrees;
    }
    /**
     * sets ntrees equal to the input value
     * @param {number} ntrees - number of trees in sketch
     */
    set ntrees(ntrees){
        if(!(typeof(ntrees) == 'number'))
            console.log('The number of trees must be a number');
        else if(ntrees < 0)
            console.log('There cannot be a negative number of trees!');
        else
            this._ntrees = ntrees;
    }
    /**
     * @returns {number} the number of trees to be rendered if ran is true
     */
    get nRanTrees(){
        return this._nRanTrees;
    }
    /**
     * sets nRanTrees equal to the input value
     * @param {number} nRanTrees - number of trees to be rendered if ran is true
     */
    set nRanTrees(nRanTrees){
        if(!(typeof(nRanTrees) == 'number'))
            console.log('The number of random trees must be a number');
        else if(nRanTrees<0)
            console.log('You cannot have negative trees');
        else
            this._nRanTrees = nRanTrees;
    }
    /**
     * @returns {boolean} whether or not random mode is enabled
     */
    get ran(){
        return this._ran;
    }
    /**
     * sets ran equal to the input value
     * @param {boolean} ran - whether or not random tree mode is enabled or not
     */
    set ran(ran){
        this._ran = ran;
    }
    

    /**
     * populates the sketches list of trees either with a grid of trees if neither freeTree or ran are 
     * true. Otherwise if ran is true a random number of trees are created in random locations
     */
    init() {
        if(!this.freeTree && !this.ran){
            for (let i=0; i<this.nh; i++) {
                for (let j=0; j<this.nv; j++) {
                    this.createTree(i, j);
                }
            }
        }else if(this.ran){
            for(let i = 0;i<this.nRanTrees;i++){
                this.createTree(random(this.width),random(this.height));
            }
        }
    }
    /**
     * renders trees to the main canvas or optional p5.Renderer paramter, by calling the grow method 
     * of each tree and passing the optional p5Renderer parameter
     * @param {p5.Renderer} [g] -  optional p5.Renderer parameter to render to
     */
    draw(g) {
        if(!this.freeTree && !this.ran){
            for (let i=0; i<this.nv*this.nh; i++) {
                this.trees[i].grow(g);
            }
        }else{
            for(let i=0;i<this.trees.length;i++){
                this.trees[i].grow(g);
            }
        }
    }
    /**
     * creates a random tree at the cursors position if freeTree is true
     */   
    mouseReleased() {
        if(this.freeTree){
            this.createTree(mouseX,mouseY);
        }
    }
    /**
     * creates a new tree at the x and y coordinates (i,j)
     * @param {number} i - x coordinate of new tree
     * @param {number} j - y coordinate of new tree
     */
    createTree(i, j) {
        if(!this.freeTree && !this.ran){ 
            let x=.1*this.width+i*int(.9*this.width/this.nh);
            let y=int(.2*this.height+j*int(.8*this.height/this.nv));
            let start=createVector(x, y);
            this.trees[i+j*this.nh]=new Tree(start, start.y/(this.height-130), i+j*this.nh);//
            this.trees[i+j*this.nh].branches[0]=new Branche(start, 15*sqrt(start.y/this.height), 0, 1, i+j*this.nh,this);
        }else{
            let x = i;
            let y = j;
            let start=createVector(x, y);
            this.trees[this.ntrees] = new Tree(start, start.y/(this.height-130), this.ntrees);
            this.trees[this.ntrees].branches[0]=new Branche(start, 15*sqrt(start.y/this.height), 0, 1, this.ntrees,this);
        }
        this.ntrees++;
        
    }
}
/**
 * A tree that manages branches
 */
class Tree {
    /**
	 * @constructor
     * @param {p5.Vector} start - initial position to grow tree from
     * @param {number} coeff - coefficient used to change the saturation of the tree
     * @param {number} index - the index of the tree in the sketches list of trees
     */
    constructor(start, coeff, index) {
        this.branches = [];
        this.start = start;
        this.coeff = coeff;
        this.teinte = random(30);
        this.index = index;
        this.proba1 = random(.8, 1);
        this.proba2 = random(.8, 1);
        this.proba3 = random(.2, .5);
        this.proba4 = random(.2, .5);
        this.deviation = random(.3, .7);
    }
    /**
     * renders tree by updating each branch and then calling its display method with the optional p5.Renderer 
     * paramter
     * @param {p5.Renderer} [g] - optional p5.Renderer parameter to render to 
     */
    grow(g) {
        for (let i = 0; i < this.branches.length; i++) {
            let b = this.branches[i];
            if (b.alive) {
                b.age++;
                b.update();
                b.display(g);
            }
        }
        
    }
}
/**
 * Single branch on a tree
 */
class Branche {
    /**
	 * @constructor
     * @param {p5.Renderer} start - the starting position of the branch 
     * @param {number} stw - the stroke width used to draw the branch
     * @param {number} angle - the angle at which the branch grows
     * @param {number} gen - the rate at which the branch reaches its maxlife
     * @param {number} index - index of the the parent trees branch list containing this branch
     * @param {Sketch} sketch - The parent sketch containing this branch
     */
    constructor(start, stw, angle, gen, index, sketch) {
        this.position = start.copy();
        this.stw = stw;
        this.gen = gen;
        this.age = 0;
        this.angle = angle;
        this.alive = true;
        this.speed = createVector(0, -3);
        this.index = index;
        this.sketch = sketch;
        this.trees = this.sketch.trees;
        this.maxlife = sketch.maxlife * random(.3, .6);
        this.proba1 = this.trees[this.index].proba1;
        this.proba2 = this.trees[this.index].proba2;
        this.proba3 = this.trees[this.index].proba3;
        this.proba4 = this.trees[this.index].proba4;
        this.deviation = random(.2, .7);
    }
    /**
     * updates the branch, checking if it has reached its maxlife and then splitting in some of 4 different 
     * directions or ending the tree if enough branches have spawned. Or if the branch is still alive the 
     * current direction it s growing in changes
     */
    update() {
        if (this.age >= int(this.maxlife / this.gen)) {
            this.alive = false;
            let brs = this.trees[this.index].branches;
            if (this.stw > .1) {
                if (random(1) < this.proba1 / this.gen)
                    brs.push(new Branche(createVector(this.position.x, this.position.y), this.stw * random(.2, 1), this.angle + random(.7, 1.1) * this.deviation, this.gen + .1, this.index,this.sketch));
                if (random(1) < this.proba2 / this.gen)
                    brs.push(new Branche(createVector(this.position.x, this.position.y), this.stw * random(.2, 1), this.angle - random(.7, 1.1) * this.deviation, this.gen + .1, this.index,this.sketch));
                if (random(1) < this.proba3 / this.gen)
                    brs.push(new Branche(createVector(this.position.x, this.position.y), this.stw * random(.5, .8), this.angle + random(.2, 1) * this.deviation, this.gen + .1, this.index,this.sketch));
                if (random(1) < this.proba4 / this.gen)
                    brs.push(new Branche(createVector(this.position.x, this.position.y), this.stw * random(.5, .8), this.angle - random(.2, 1) * this.deviation, this.gen + .1, this.index,this.sketch));
            }
        }
        else {
            this.speed.x += random(-.5, .5);
        }
    }
    /**
     * draws current section of tree to main canvas or optional p5.Renderer component
     * @param {p5.Renderer} g - optional p5.Renderer component to draw trees to 
     */
    display(g) {
        let c = this.trees[this.index].coeff;
        let st = this.trees[this.index].start;
        let x0 = this.position.x;
        let y0 = this.position.y;
        this.position.x += -this.speed.x * cos(this.angle) + this.speed.y * sin(this.angle);
        this.position.y += this.speed.x * sin(this.angle) + this.speed.y * cos(this.angle);
        //shadows
        if(g){
            g.stroke(this.trees[this.index].teinte + this.age + 10 * this.gen, 0, 0, .04);
            g.strokeWeight(map(this.age, 0, this.maxlife, this.stw * 1.3, this.stw * .9));
        }else{
            stroke(this.trees[this.index].teinte + this.age + 10 * this.gen, 0, 0, .04);
            strokeWeight(map(this.age, 0, this.maxlife, this.stw * 1.3, this.stw * .9));
        }
        let dis = .005 * pow(st.y - y0, 1.8);
        if(g){
            g.line(x0 + dis * random(.5, 1.2), 2 * st.y - y0 + dis * random(.5, 1.2), this.position.x + dis * random(.5, 1.2), 2 * st.y - this.position.y + dis * random(.5, 1.2));
            g.line(x0 + dis * random(.5, 1.2), 2 * st.y - y0 + dis * random(.5, 1.2), this.position.x + dis * random(.5, 1.2), 2 * st.y - this.position.y + dis * random(.5, 1.2));
        }else{
            line(x0 + dis * random(.5, 1.2), 2 * st.y - y0 + dis * random(.5, 1.2), this.position.x + dis * random(.5, 1.2), 2 * st.y - this.position.y + dis * random(.5, 1.2));
            line(x0 + dis * random(.5, 1.2), 2 * st.y - y0 + dis * random(.5, 1.2), this.position.x + dis * random(.5, 1.2), 2 * st.y - this.position.y + dis * random(.5, 1.2));
        }
        //light accent
        if(g){
            g.strokeWeight(map(this.age, 0, this.maxlife, this.stw, this.stw * .6));
            g.stroke(this.trees[this.index].teinte + this.age + 20 * this.gen, 150 * c, 200 + 20 * this.gen, 15 * c); 
            g.line(x0 + .1 * this.stw, y0, this.position.x + .1 * this.stw, this.position.y);
        }else{
            strokeWeight(map(this.age, 0, this.maxlife, this.stw, this.stw * .6));
            stroke(this.trees[this.index].teinte + this.age + 20 * this.gen, 150 * c, 200 + 20 * this.gen, 15 * c); 
            line(x0 + .1 * this.stw, y0, this.position.x + .1 * this.stw, this.position.y);
        }
        //dark tree
        if(g){
            g.stroke(this.trees[this.index].teinte + this.age + 20 * this.gen, 100 * c, 50 + 20 * this.gen, 15 * c); 
            g.strokeWeight(map(this.age, 0, this.maxlife, this.stw, this.stw * .6));
            g.line(x0, y0, this.position.x, this.position.y);
        }else{
            stroke(this.trees[this.index].teinte + this.age + 20 * this.gen, 100 * c, 50 + 20 * this.gen, 15 * c); 
            strokeWeight(map(this.age, 0, this.maxlife, this.stw, this.stw * .6));
            line(x0, y0, this.position.x, this.position.y);
        }
    }
}
