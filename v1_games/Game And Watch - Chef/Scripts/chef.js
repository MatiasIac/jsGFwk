var chef = {
	id: "chef",
	visible: true,
	_lastKeyPressed: 0,
	_chefPosition: 0,
	_goUp: false,
	_isCollition: false,
	_chefJumps: 50,
	_delayMovement: 0.1,
	_countDelay: 0,
	
	init: function () {
	},

	update: function (delta) {
		this._countDelay += delta;
		
		if (!this._goUp && !this._isCollition) {
			if ((jsGFwk.IO.keyboard._activeKey[39] && this._chefPosition <= 1 && this._lastKeyPressed != 39) && this._countDelay >= this._delayMovement){
				this._chefPosition++;
				this._lastKeyPressed = 39;
				this._countDelay = 0;
			} else if ((jsGFwk.IO.keyboard._activeKey[37] && this._chefPosition >= 1 && this._lastKeyPressed != 37)  && this._countDelay >= this._delayMovement){
				this._chefPosition--;
				this._lastKeyPressed = 37;
				this._countDelay = 0;
			} else {
				this._lastKeyPressed = 0;
			}
		}
	},

	draw: function (context) {
		
		if (!this._goUp && !this._isCollition) {
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				21 + (this._chefPosition * 34), 210, 34, 40,
				(this._chefJumps * this._chefPosition) + 40, 65, 33,40);
		} else if (this._isCollition) {
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				21 + (this._chefPosition * 34), 170, 34, 40,
				(this._chefJumps * this._chefPosition) + 40, 65, 33,40);
		} else {
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				21 + (this._chefPosition * 34), 250, 34, 40,
				(this._chefJumps * this._chefPosition) + 40, 65, 33,40);
		}
	},
};
