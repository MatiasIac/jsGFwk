jsGFwk.Collisions = {

	_rectColliding: function (otherObject) {
		if (!otherObject) { return false; }
		if (!this.width || !this.height || !this.x || !this.y) { return false; }
		if (!otherObject.width || !otherObject.height || !otherObject.x || !otherObject.y) { return false; }
		
		if (this.x + this.width < otherObject.x)
            return false;
        if (this.y + this.height < otherObject.y)
            return false;
        if (this.x > otherObject.x + otherObject.width)
            return false;
        if (this.y > otherObject.y + otherObject.height)
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