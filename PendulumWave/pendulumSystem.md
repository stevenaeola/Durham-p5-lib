Class: PendulumSystem
=====================

PendulumSystem(numberOfWaves, numberOfNodes, speedMin, speedMax, size)
----------------------------------------------------------------------

Class for the system as a whole

Constructor
-----------

#### new PendulumSystem(numberOfWaves, numberOfNodes, speedMin, speedMax, size)

##### Parameters:

Name

Type

Default

Description

`numberOfWaves`

number

3

The number of waves the system will have

`numberOfNodes`

number

20

The number of nodes the system will have

`speedMin`

number

0

The minimum speed the system can work at

`speedMax`

number

100

The maximum speed the system can work at

`size`

number

200

The size of the system

Source:

*   line 315

### Attributes

#### numberOfWaves

The number of waves in the system

Source:

*   line 325

#### numberOfNodes

The number of nodes in the system

Source:

*   line 326

#### speedMin

The minimum speed

Source:

*   line 327

#### speedMax

The maximum speed

Source:

*   line 328

#### size

The size of the system (and hence the display and the elements needed for the display)

Source:

*   line 329

#### currentSpeed

Set the current speed

Source:

*   line 332

#### selected

The status of the the search that runs after a click event

Source:

*   line 333

#### waves

The waves in the system

Source:

*   line 334

### Methods

#### changeNumberOfNodes()

Changes the number of nodes in the system after fetching the input

Source:

*   line 389

#### changeNumberOfWaves()

Changes the number of waves in the system after fetching the input

Source:

*   line 376

#### changeSpeed()

Changes the speed of the system after fetching the input

Source:

*   line 402

#### clicked()

Runs the clicked funciton in each wave object after being clicked

Source:

*   line 416

#### resetForms()

Reset the forms after a button has been pressed

Source:

*   line 369

#### resetSystem()

Clears the system and then resets it

Source:

*   line 349

#### tick()

Tells the system to update the wave objects and then draws them

Source:

*   line 360

### Classes

*   [Node](Node.md)
*   [PendulumSystem](PendulumSystem.md)
*   [Wave](Wave.md)

### Global

*   [toggle3DCookies](global.md)
