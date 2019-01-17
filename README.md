Program description

1.Using browser to open HTML file index.html
2.Enter the speed value you want in the input box.(Speed should not be too large, preferably within 10.)
3.Then the ball starts to move, and the baffle will follow the mouse movement to resist the ball.
4.Don't let the ball drop below the game area, otherwise the game will end.

Code description

1.Game class in game.js file
2.index.js called the game class.
3.The game class contains construction,setXSpeed,setYSpeed,draw methods.
4.private variable:
	x,y: Initial position of ball
    xspeed,yspeed: Initial velocity of pellets
    xhand: board's position