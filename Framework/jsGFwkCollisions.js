jsGFwk.Collisions = {

	_rectColliding: function (otherObject) {
		if (!otherObject) { return false; }
		if (this.width == undefined || this.height == undefined || this.x == undefined || this.y == undefined) { return false; }
		if (otherObject.width == undefined || otherObject.height == undefined || otherObject.x == undefined || otherObject.y == undefined) { return false; }
		if (!this.rotationPoint) { this.rotationPoint = { x: 0, y: 0 }; }
		if (!otherObject.rotationPoint) { otherObject.rotationPoint = { x: 0, y: 0 }; }

		var thisX = this.x - this.rotationPoint.x;
		var thisY = this.y - this.rotationPoint.y;
		
		var otherX = otherObject.x - otherObject.rotationPoint.x;
		var otherY = otherObject.y - otherObject.rotationPoint.y;
		
		if (thisX + this.width < otherX)
            return false;
        if (thisY + this.height < otherY)
            return false;
        if (thisX > otherX + otherObject.width)
            return false;
        if (thisY > otherY + otherObject.height)
            return false;

        return true;
	},

	_disColliding: function (otherObject) {
		if (!otherObject) { return false; }
		if (!this.radius || !this.x || !this.y || !this.center) { return false; }
		if (!otherObject.radius || !otherObject.x || !otherObject.y) { return false; }
		
		var dx = (otherObject.x + otherObject.center.x) - (this.x + this.center.x);
        var dy = (otherObject.y + otherObject.center.y) - (this.y + this.center.y);
        var dist = Math.sqrt(dx * dx + dy * dy);

        return (dist < this.radius + otherObject.radius);
	},
	
	onStart: function () {
		
	},
	
	onObjectCreated: function (newObject) {
		if (!newObject.width) { newObject.width = 1; }
		if (!newObject.height) { newObject.height = 1; }
		if (!newObject.radius) { newObject.radius = 1; }
		if (!newObject.center) { newObject.center = { x: 0, y: 0 }; }
		newObject.isRectColliding = this._rectColliding;
		newObject.isRadColliding = this._disColliding;
	}
};