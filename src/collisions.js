class Collisions {

    _name = "Collisions";

    static RECTANGLE_COLLISION_MODE = "RECTANGLE";
    static RADIUS_DISTANCE_COLLISION_MODE = "RADIUS_DISTANCE";

    constructor() { }

	_rectangleCollisionChecker(object) {
		if (!object) { return false; }
		if (this.width == undefined || this.height == undefined || this.x == undefined || this.y == undefined) return false;
		if (object.width == undefined || object.height == undefined || object.x == undefined || object.y == undefined) return false;
		if (!this.rotationPoint) { this.rotationPoint = { x: 0, y: 0 }; }
		if (!object.rotationPoint) { object.rotationPoint = { x: 0, y: 0 }; }

		var thisX = this.x - this.rotationPoint.x;
		var thisY = this.y - this.rotationPoint.y;
		
		var otherX = object.x - object.rotationPoint.x;
		var otherY = object.y - object.rotationPoint.y;
		
		if (thisX + this.width < otherX) return false;
        if (thisY + this.height < otherY) return false;
        if (thisX > otherX + object.width) return false;
        if (thisY > otherY + object.height) return false;

        return true;
	}

	_circleCollisionChecker(object) {
		if (!object) return false;
		if (!this.radius || !this.x || !this.y || !this.center) { return false; }
		if (!object.radius || !object.x || !object.y) { return false; }
		
		var dx = (object.x + object.center.x) - (this.x + this.center.x);
        var dy = (object.y + object.center.y) - (this.y + this.center.y);
        var dist = Math.sqrt(dx * dx + dy * dy);

        return (dist < this.radius + object.radius);
	}

    areCollidingBy(a, b, mode) {
		switch (mode) {
			case Collisions.RECTANGLE_COLLISION_MODE:
				return this._rectangleCollisionChecker.call(a, b);
			case Collisions.RADIUS_DISTANCE_COLLISION_MODE:
				return this._circleCollisionChecker.call(a, b);
			default:
                return false;
		}
	}

    onStart() { }

    onObjectCreated(object) {
        object.width = object.width || 1;
        object.height = object.height || 1;
        object.radius = object.radius || 1;
        object.center = object.center || { x: 0, y: 0 };

		object.isRectColliding = this._rectangleCollisionChecker;
		object.isRadColliding = this._circleCollisionChecker;
	}
}

export { Collisions };