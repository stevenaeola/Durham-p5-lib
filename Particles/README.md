# Programming 18/19 Summative Assignment
<center> rtjm84 </center>

<h2> <b>particles.js</p></h2>
<b> particles.js</b> contains 4 classes: <i> Particles, Star, Smoke</i> and <i> Ash </i>.

<h2> Explanation of Methods and Parameters Used: </h2>
<h3> class Particles: </h3> For each of my Classes I have used a constructor at the top to generate all necessary variables and attributes required for the creation of each particular particle.

<h4> Constructor(): </h4> The Particles constructor takes 4 parameters: <i> stuck, bgcol, txtcol</i> and <i> render </i>.

```javascript

constructor(stuck, bgcol, txtcol, render) {
//Initialising Variables
this.stars = [];
this.smokes = [];
this.ashes = [];

            this.cube = render;

            this.rval = 220;
            this.gval = 220;
            this.bval = 220;

            this.stuck = stuck || false;
            this.bgcol = bgcol || 0;
            this.txtcol = txtcol || 220;

            //Creating Canvas
            if(this.cube) {
              createCanvas(windowWidth, windowHeight, WEBGL);
              this.g = createGraphics(windowWidth, windowHeight);
            } else {
              createCanvas(windowWidth, windowHeight);
            }

            //Creating new stars/smoke/ashes when required
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i] = new Star();
            }
            for (i = 0; i < this.smokes.length; i++) {
                this.smokes[i] = new Smoke();
            }
            for (i = 0; i < this.ashes.length; i++) {
                this.ashes[i] = new Ash();
            }
        }

```

This constructor creates all of the empty lists that will later be required to store the other particles generated and also includes the methods required to make new ones. Furthermore, many variables are initialised such as <b> this.cube </b> which can be used where appropriate with a renderer to print to each face of a cube, the colour variables for the RGB sliders, initially set at (220,220,220), and variables that will later be called to determine the creation of other elements of the script such as <b> stuck, bgcol <b> and <b> textcol </b>.

<b> stuck </b> is a boolean storing whether any particles have stuck to the floor yet, <b> bgcol </b> stores the value of the background colour, and <b> txtcol </b> stores the colour of the text which will fade into view.

This constructor also contains the <b> createCanvas() </b> method for if a p5 renderer is used and also for the case where it is not.

<h4> Getters and Setters: </h4> Particles also contains several getters and setters to allow the necessary variables to be retrieved and set throughout the script. An example of a getter and setter for a variable used in Particles is as below:

``` javascript
//Getters and Setters
    get stuck() {
        return this._stuck;
    }

    set stuck(stuck) {
        this._stuck = stuck;
    }
```

<h4> draw(g) </h4> The Particles class, like all others, has a draw function which is responsible for adding to the canvas. This function takes <b> g </b> as a parameter and therefore allows it to make decisions based on if a renderer is being used. As such, the first decision in this function is to determine the background colour / canvas appearance as seen below:

``` javascript
    if (this.g) {
          g = this.g;
          background(0);
      }
      if (g) {
          g.background(this.bgcol);
      } else {
        fill(this.bgcol,10);
        rect(0,0,windowWidth,windowHeight);
      }
```

The draw function also uses <b> getElementById </b> statements to retrieve several elements from the HTML such as the value of the sliders to set the value of the <b> boldh2 </b> paragraph in the example page. Furthermore, there is an <b> addEventListener </b> to detect the click of a button signalling that the smoke colour should be reset (<b> resetsmoke() </b>). There are also iterations to continuously <b> update() </b> and <b> show() </b> each of the different particles, for example:

``` javascript
    for (var i = 0;i<this.stars.length;i++) {
            this.stars[i].update();
            this.stars[i].show();
            if (this.stars[i].pos.y>windowHeight) {
                this.stars.splice(i,1);
            }
        }
```

<b> draw()</b> is also responsible for actions such as if the mouse is pressed, in which case a new Star is created, as well as actions determined by the value of <b> stuck </b> which, if true, leads to the creation of <b> Ash </b> and <b> Smoke </b>, and effects <b> bgcol </b>.

In the case where a renderer is being used, the <b> draw(g) </b> function is responsible for controlling the rotation and the texture of the cube.

``` javascript
    if(this.g) {
          rotateX(frameCount * 0.005);
          rotateY(frameCount * 0.005);
          texture(this.g);
          if (this.cube) {
            box(windowWidth/3)
          }
        }
```

It is in <b> draw(g) </b> that I also create the name to appear in the smoke if the background colour is light enough. This involves getting the different parts of the name (firstname and surname) and then use the properties of <b> this.fullName </b> to determine the validity of the names inputted. If invalid an error message is sent which then disappears when the mistake is rectified. An example of the verificating property:

``` javascript
    verifyFirst : function (firstName) {
                var reg = new RegExp(/\d+/);
                if (reg.test(firstName)) {
                    this.firstName = '[INVALID]';
                    document.getElementById('warning').innerHTML = 'Names cannot have numbers in';
                }
                else {
                    this.firstName = firstName;
                    return true;
                }
            },
```

The final item in <b> draw(g) </b> is the variable <b> sendtxt </b> which links to a paragraph in the HTML document by the name <b> settxt </b> to output the name that will be displayed:

``` javascript
    var sendtxt = {
            message: '\'Bruce Wayne\'',
            set msg(value) {
                this.message = value;
            }
        };
        if (this.firstName != '') {
            sendtxt.msg = '\'' + this.fullName.firstName + ' ' + this.fullName.surname + '\'';
        }
        document.getElementById('settxt').innerHTML = 'The name that will be displayed is: ' + sendtxt.message;

```

<h3> class Star: </h3>
<h4> constructor() </h4> The star constructor creates 4 variables/attributes of the stars for use within the class. Each star is created with a random size and colour, the position generated is at the mouse and the mouse movements determine the velocity.
<br> <br>

<h4> update() </h4> The update function of the star first updates the position of each star via their current velocity:

``` javascript
    this.pos.x+=this.velocity.x;
    this.pos.y+=this.velocity.y;
```

The update function then also includes several choices depending on the position and velocity of the Star it is acting on. First, so long as the horizontal velocity is not zero, the vertical velocity slowly increases to resemble dispersion. <b> update() </b> then makes sure that Stars bounce off the sides of the containers instead of going off screen, and bounce off the floor if necessary. If none of these actions are required then the Star must be at a low enough point that sticking can occur in which case the stuck variable from Particles is retreived and set so that in the future <b> Smoke() </b> and <b> Ash() </b>. will begin generating. This final else statement appears as follows: <br>

``` javascript
    else {
                    this.velocity.y = 0;
                    this.velocity.x = 0;
                    this.pos.y = height;
                    this.size = random(20, 25);
                    Particles.stuck = true;
                }
```

<br> <h4> show(g) </h4> The show function in <b> Star </b> is responsible for displaying the Star particles and is called in the <b> Particles </b> class. It is setup for an optional p5 renderer so that <b> g </b> can be used as a texture if wanted. This show function is the same for <b> Smoke </b> and <b> Ash </b> with the only exception being that <b> Ash </b> also has an if statement and a random number to make sure that the Ash particles travel a random distance up the screen instead of all disappearing uniformly. <br>

``` javascript
show(g) {
      if (g) {
        g.noStroke();
        g.fill(this.col);
        g.ellipse(this.pos.x,this.pos.y,this.size,this.size);
      } else {
        noStroke();
        fill(this.col);
        ellipse(this.pos.x,this.pos.y,this.size,this.size);
      }
    }
```

<br>
Following this there are also some getters and setters of the same form as seen in the <b> Particles </b> class.

<h3> class Smoke: </h3>
The Smoke class generates smoke particles that slowly float up the screen enlarging as they do so.
<Br>
<h4> constructor(): </h4> The smoke constructor first sets the <b> Particles </b> values for RBG as the values from the HTML sliders, an example of this is: <br>

``` javascript
Particles.rval = document.getElementById('rslide').value;
```

The colour of the smoke is then set to the correct RBG value using the following line:

``` javascript
this.col = color(Particles.rval, Particles.gval, Particles.bval);
```

<br>
The constructor therefore sets the colour of the smoke to the value of the HTML RBG sliders. It then proceeds to create smoke particles at random positions along the bottom of the canvas with a slow velocity and random size. <br> <br>
In the <b> Smoke constructor </b> I have also created the text that will appear though the smoke if the backgronud colour is light enough, this ensure that the smoke does not cover the text and therefore that the name is readable. <br>

``` javascript
if (Particles.bgcol > 50) {

            textSize(120);

            textAlign('center');

            fill(Particles.txtcol);


            text(Particles.fullName.firstName + ' ' +
            Particles.fullName.surname, (windowWidth / 2), 270);

            Particles.txtcol -= 0.1;

        }
```

<br>
As you can see for this I need to regularly access the class <b> Particles </b>. <br> <b> Smoke </b> also has a simple <b> update() </b> function to increase the size of the smoke and make it float upwards. and a <b> show(g) </b> function that is identical to the show function in the <b> Star </b> class.

<h3> class Ash: </h3>
This is the simplest class in <i> particles.js </i> and is responsible for making small red particles that drift up randomly on the screen once smoke is being generated, they then quickly dissapear at random heights. Therefore the <b> constructor() </b> and <b> update() </b> functions are simply:

``` javascript
constructor() {
      this.col = color(220, 20, 60);
      this.pos = new p5.Vector(random(0, windowWidth), windowHeight);
      this.size = 5;
  }

  //Updating the position of the particles
  update() {
      this.pos.y -= 2.7;
      this.size -= 0.25;
  }
```

The <b> show() </b> function is identical to <b> Smoke </b> and <b> Ash </b> except a random integer is used to decide at what point the ash particle is not shown, hence making the ash particles fade out randomly and not uniformly.

<h2> Development of Original </h2> <br>
The original version of the code can be found in <i> original.js </i> or at <u> <a href="https://www.openprocessing.org/sketch/409404"> "Particles" by Airpan at OpenProcessing.org</a> </u> (Creative Commons License Attribution-ShareAlike 3.0), for full licensing details see LICENSE.md.

The original code involved generating particles of random colours when the mouse was clicked, that would have varying velocities depending on the movement of the mouse. The particles would then bounce off the sides of the canvas until disappearing through the bottom. The developments I made to the original code are as follows:
<ul>
<li> When stars/particles were generated in the original code they would bounce off the sides of the canvas but were not limited by the top or the bottom. My first development was to make the particles bounce when they came into contact with the bottom of the canvas. The bounce would result in a decreased height on the rebound. I then made the particles stick to the bottom of the canvas when their velocity was slow enough, at this point they would expand to a random size within a pre-determined range. </li>
<li> The next development was to create smoke particles which would be created once the original particles began sticking to the bottom of the canvas. Initially I did this with a boolean variable that would create star particles that resembled smoke upon every other draw, I later changed this however so that smoke particles were created separately with their own constructor and class. These smoke particles were generated once star particles had begun sticking to the floor, they would have random x-position on the bottom of the canvas, and would then drift upwards with slowly decreasing y-velocity whilst enlarging to represent diffusion. I then later added form slider controls representing RGB colours that can be used to control the colour of the smoke, the default setting is a light grey.</li>
<li> As more smoke particles are generated the initially black background slowly fades into a lighter grey. Once the background is light enough, text inputted with the form controls slowly appears and solidifies through the smoke. This text is a name and inputted through a form for first name and surname, the <i> index.js </i> file detects if any unwanted characters are inputted indicating a false name and prints "[INVALID]" if necessary. This also results in a warning message showing, this disappears again when the text is changed to a valid input. The form also has a reset button to restart the canvas</li>
<li> I have also added particles that I have named ashes, once smoke starts generating, small ashes are created at the bottom of the canvas that float upwards for a short but random distance until disappearing.</li>
<li> A dynamic paragraph outputs the name that will eventually appear in the smoke, this paragraph's text changes with the user's inputs. </li>
<li> There is also a button that uses an event listener to rest the smoke colour back to the default light grey when pressed </li>
<li> Finally, I edited my <b> draw() </b> and <b> show() </b> functions to be compatible with a p5 renderer should the HTML page offer it.</li>
</ul>
<br>

<h2> Explanation of Example </h2> <br>
My example site involves my javascript canvas connected via getters and setters to several form controls on the website. These form controls include text inputs for the user to input names, buttons that can reset the page or reset the smoke colour, and RBG sliders to control the colour of the smoke. These sliders are set by default to a light grey (220,220,220). Getters and Setters then access the values by these form results and use them to alter the particles generated.

There are inputs for a first name and surname, which will create the name outputted through the smoke, and if nothing is inputted then there is a default name in place ("Bruce Wayne"). Furthermore, there are RGB sliders to control the colour of the smoke generated, this can be changed whilst smoke is already being generated. There are also on screen instructions with a reset button below to re-setup the canvas once the particles have stopped generating. The site demonstrates how the javascript could be used with appropriate form controls to create a personalised animation. My component can be added to any HTML page by linking the page to the following external javascript files.

```HTML
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.js"> </script>
<script type="text/javascript" src="particles.js"></script>
<script type="text/javascript" src="index.js"></script>
```

The main class of the component is <b> Particles </b>. To begin executing <b> Particles </b> we then use the following code in <b> index.js</b>:

``` javascript
var x;

//Setup function
function setup(bgcol, txtcol) {
  x = new Particles(bgcol, txtcol);
}

//Draw function
function draw(g) {
    x.draw(g);
}
```
This creates a new instance of Particles using the parameters: <i> bgcol, and txtcol</i>, and then applies the <b> draw() </b> function parameter <b> g </b> which can be used to create a p5 renderer.

 There are several IDs used in the javascript that need to be in the form controls or paragraphs for optimal working. These are:

```javascript
<form id="txtinput">
  <table>
    <tr>
      <td> Please enter your First Name: </td>
      <td><input type="text" id="firstName"> </td>
    </tr>
    <tr>
      <td> Please enter your Surname: </td>
      <td><input type="text" id="surname"></td>
    </tr>
  </table>
  <b> <i> <p id="warning"> </p> </i> </b>

</form>
```

``` javascript
<button value="refresh" onClick="window.location.reload()"> Restart </button>
<button id="resetcol"> Reset Smoke Colour </button>
<center> <h2 id="boldh2"> Change the colour of the smoke below! </h2>
```

``` javascript
<form id="sliderinput">
  <table class="slidertable" style="width:100%">
    <tbody>
      <tr>
        <th> Red </th>
        <th> Green </th>
        <th> Blue </th>
      </tr>
      <tr>
        <td> <center> <input oninput="draw()" onchange="draw()" type="range" id="rslide" name="rslide" min="0" max="255" step ="1" value="220"> </center></td>
        <td> <center> <input oninput="draw()" onchange="draw()" type="range" id="gslide" name="gslide" min="0" max="255" step="1" value="220"> </center> </td>
        <td> <center> <input oninput="draw()" onchange="draw()" type="range" id="bslide" name="bslide" min="0" max="255" step="1" value="220"> </center> </td>
      </tr>
    </tbody>
  </table>
</form>

<p id="settxt"></p>
```
These same IDs should be used in any webpage using my component for optimal performance.
