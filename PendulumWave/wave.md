Class: Wave
===========

Wave(system, index)
-------------------

Class representing a wave.

Constructor
-----------

#### new Wave(system, index)

Create a wave.

##### Parameters:

Name

Type

Description

`system`

[PendulumSystem](PendulumSystem.md)

The overall system.

`index`

number

The identifier for the wave

Source:

*   line 40

### Attributes

#### system

The pendulum system

Source:

*   line 48

#### index

The wave index

Source:

*   line 49

#### visible

The visibility of the wave

Source:

*   line 52

#### colour

The colour of the wave

Source:

*   line 53

#### nodes

Nodes for the wave

Source:

*   line 54


### Methods

#### clicked()

Changes the colour or visibility of the wave

Source:

*   line 93

#### draw()

Sets the appropriate colour and then draws the wave in its current form

Source:

*   line 66

#### tick()

Tells the wave to update the node objects

Source:

*   line 86


### Classes

*   [Node](Node.md)
*   [PendulumSystem](PendulumSystem.md)
*   [Wave](Wave.md)

### Global

*   [toggle3DCookies](global.md)
