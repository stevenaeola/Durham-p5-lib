class Particle {
  constructor(x, y, size, theta, drag, color, force, sizeScalar) {
    this.alive = true;
    this.size = size;
    this.theta = theta || random(TWO_PI);
    this.drag = drag;
    this.color = color;
    this.location = createVector(x || 0.0, y || 0.0);
    this.velocity = createVector(0.0, 0.0);
    this.force = force
    this.sizeScalar = sizeScalar
    }

	getalive () {
	  	return this.alive
	}

	getsize () {
	  	return this.size
	}

	getwander () {
	  	return this.wander
	}

	gettheta () {
	  	return this.theta
	}

	getdrag () {
	  	return this.drag
	}

	getcolor () {
	  	return this.color
	}

	getlocation () {
	  	return this.location
	}

	getlocationX () {
	  	return this.location.x
	}

	getlocationY () {
		return this.location.y
	}

	getvelocity () {
	  	return this.velocity
	}

	getvelocityX () {
	  	return this.velocity.x
	}

	getvelocityY () {
	  	return this.velocity.y
	}

	getforce () {
		return this.force
	}

	getsizeScalar () {
		return this.sizeScalar
	}

	setalive (newAlive) {
	  	this.alive = newAlive
	}

	setsize (newSize) {
	  	this.size = newSize
	}

	setwander (newWander) {
	  	this.wander = newWander
	}

	settheta (newTheta) {
	  	this.theta = newTheta
	}

	setdrag (newDrag) {
	  	this.drag = newDrag
	}

	setcolor (newColor) {
	  	this.color = newColor
	}

	setlocation (newLocation) {
	  	this.location = newLocation
	}

	setvelocity (newVelocity) {
	  	this.velocity = newVelocity
	}

	setvelocityX (newVelocity) {
	  	this.velocity.x = newVelocity
	}

	setvelocityY (newVelocity) {
	  	this.velocity.y = newVelocity
	}

	setLocationX (newLocation) {
	  	this.location.x = newLocation
	}

	setLocationY (newLocation) {
	  	this.location.y = newLocation
	}

	setforce(newForce) {
		this.force = newForce
	}

	setsizeScalar (newSizeScalar) {
		this.sizeScalarv = newSizeScalar
	}

  	move() {
  	this.getlocation().add(this.getvelocity());
    this.getvelocity().mult(this.getdrag());
    this.settheta(this.gettheta() * 2);
    this.setvelocityX(this.getvelocityX() + sin( this.gettheta() ) * 0.1);
    this.setvelocityY(this.getvelocityY() + cos( this.gettheta() ) * 0.1);
    this.setsize(this.getsize() * this.getsizeScalar());
		}


  	draw(obj) {
  		if (obj === undefined) {
		  	fill( this.getcolor() );
		  	noStroke();
		  	this.drawTheShape();
		  	for (var i = particles.length - 1; i >= 0; i--) {
		        var particle = particles[i];
		    }
		  	if ( this.getalive() ) {
		          this.move();
		        } else {
		          pool.push( particles.splice( i, 1 )[0] );
		        }

		} else {
			fill( obj.this.getcolor() );
		  	noStroke();
		  	obj.this.drawTheShape();
		  	for (var i = particles.length - 1; i >= 0; i--) {
		        var particle = particles[i];
		    }
		  	if ( obj.this.getalive() ) {
		          obj.this.move();
		        } else {
		          pool.push( particles.splice( i, 1 )[0] );
		        }
		}

}
}

class Circle extends Particle {

	drawTheShape () {
		ellipse(this.getlocationX(),this.getlocationY(), this.getsize());
	}
	
}

class Triangle extends Particle {

	drawTheShape () {
		triangle(this.getlocationX() - this.getsize() / 2, this.getlocationY() + this.getsize() / 2, this.getlocationX() + this.getsize() / 2, this.getlocationY() + this.getsize() / 2, this.getlocationX(), this.getlocationY() - this.getsize() / 2)
	}
}



class Potato extends Particle {
	drawTheShape () {
			image(img, this.getlocationX() - this.getsize() / 2, this.getlocationY() - this.getsize() / 2, this.getsize(), this.getsize())
	}
}


class Square extends Particle {
	drawTheShape () {
		rectMode(CENTER)
		rect(this.getlocationX(), this.getlocationY(), this.getsize(), this.getsize())
	}
}



class VerticalLine extends Particle {
	drawTheShape () {
		rectMode(CENTER)
		rect(this.getlocationX(), this.getlocationY(), this.getsize() / 10, this.getsize())	}
}

class HorizontalLine extends Particle {
	drawTheShape () {
		rectMode(CENTER)
		rect(this.getlocationX(), this.getlocationY(), this.getsize(), this.getsize() / 10)	}
	}



