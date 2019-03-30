# Jamie Sim
## Bob Esponja (SpongeBob)

######License:
<Bob Esponja> (c)

<Bob Esponja> is licensed under a
Creative Commons Attribution-ShareAlike 3.0 Unported License.

You should have received a copy of the license along with this
work.  If not, see <http://creativecommons.org/licenses/by-sa/3.0/>.

######Introduction:
The idea for this project was within code found on [Openprocessing](http://www.openprocessing.org), a sketch called Bob
Esponja, which is Portuguese for SpongeBob, based on the nickelodeon animated series. Designed by a user called Caetano,
the sketch was initially of only SpongeBobs house and a sketch of SpongeBob set to follow the mouse relative to it's
x and y co-ordinates. I have taken this example and adapted it in order to make it more usable as the original only 
really had one form of interactivity and didn't make use of the classes system in P5. 

######Methods:
To begin, I wanted to look at extending the original sketch to use the entire screen rather than just a box. To do so, 
I decided to refer to the spongebob television show and attempt to copy the layout of the street and attempt to sketch
the other houses. To do so, just by using basic sketching and draw tools with fairly regular shapes and colours.

I didn't really like the original colour of the background of the image so I wanted to change it to the image used in 
the show. To do so, I imported an image which I found on the internet and then set that to be the background instead of
a block colour. To do so I had to use the PreLoad function.

Now the design had been decided, I could begin working on making this into code which people would actually choose to use,
to do so I began with the presence of bubbles, which are seen much in the series, particularly to represent the presence of gas. 

But this all left me with some quite basic looking code, a boring website which I wouldn't want to visit myself, so I 
thought about what might make this an interesting page and began designing a game. I took inspiration from code on 
[Openprocessing](http://www.openprocessing.org), a sketch called Dodge Catch which, in essence, is a game based on dodging
oncoming obstacles by a user operated point. Except in my sketch it would be about trying to hit the oncoming objects. 

I set up class systems for both positive and negative objects. And with them collision detectors based on the co-ordinates
of the objects which I had designed to be controlled by the user. The "bad burgers" were set up to add an ability to lose
within the game, hit one and game over. Along with this came a "miss" score, if you didn't manage to catch one of the
burgers then you lost a point. This whole game had to however have a switch to begin and end it, so a welcome screen was 
added with basic Key instructions and a separate instructions page for the full game instructions.

This basic layout for the game however allowed me to have much more opportunity to make my code interactive, an example of
which was when I added the level system. Complete the game once and you can advance to a more difficult mode with faster
spawning "bad burgers" and faster moving good burgers, which now become gold with the use of simple boolean operators
to control which level you were within and hence how the objects behaved.

This same idea allowed me to open up a two player setting. Such that at the users request a second control device would 
appear and follow the same rules with different controls. In either single or two player mode however it is possible to
reach the level up. With a slightly edited instructions screen and the opportunity to discover "easter eggs", the game
has another layer.

If the player manages to complete the game, a trigger is set of by setting a value to greater than one. This in turn opens
up the bubbles. So I set up a 'bubbles' class which was set to draw whenever the mouse was clicked and held, causing a stream of bubbles to
appear at the opening of the chimney and begin to flow upwards and left to right with random direction and magnitude. Just to
add some form of additional interaction.

The second easter egg available when the game is complete is to change the mouse avatar. It is possible to toggle between
the spongebob which I slightly edited from the original sketch. To a patrick the star which I drew entirely, matching the 
size of the spongbob character, as to not alter the way the game is played with the collision detectors. By pressing the
P and S keys whilst in game complete mode, the user can toggle between the two. 

