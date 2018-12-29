# Pond
Pond lets you easily generate schools of fish that swim around your screen.
#### Fish Functions
##### fadeColour(colour, frames)
Fades the fish from its initial colour to a specified colour over a given number of frames.
##### fadeAlpha(alpha, frames)
Fades the body of the fish between its initial and a given alpha value over a specified number of frames.
##### fadeSize(sizeMult, frames)
Grows/shrinks the fish by a certain multiplier over a given number of frames.
##### fadeSpeed(speedMult, frames)
Accelerates/decelerates the fish until the speed reaches a specified multiple of the speed initially.

#### Pond Functions
##### fadeColour(colour, frames)
Fades every fish in the pond from its initial colour to a specified colour over a given number of frames.
##### fadeAlpha(alpha, frames)
Fades the body of every fish in the pond between its initial and a given alpha value over a specified number of frames.
##### fadeSize(sizeMult, frames)
Grows/shrinks every fish in the pond by a certain multiplier over a given number of frames.
##### fadeSpeed(speedMult, frames)
Accelerates/decelerates each fish until the speed reaches a specified multiple of the speed initially.
##### trawl(numberToKill)
Removes the specified number of fish from the pond. Removes the fish that are closest to the end of the array. Argument is optional and command will remove all fish by default.

The Pond code is derived from [Michael Pinn's](https://www.openprocessing.org/user/39442) sketch ['Fish Tank'](https://www.openprocessing.org/sketch/162912) on OpenProcessing.org
