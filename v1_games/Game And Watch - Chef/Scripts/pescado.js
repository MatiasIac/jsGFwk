function pescado() {
	var self = this;
	
	this.id = "pescado";
	this.visible = true;
	
	var _column = 0,
		_row = 0,
		_goingTo = 3,
		_fishJumpX = 55,
		_fishJumpY = 29,
		_collition = false;
	
	this.init = function (column, row) {
		_column = column;
		_row = row;
	};

	this.update = function (delta) {
		_collition = false;
		
		_row += _goingTo >= _row ? 1 : -1;
	
		if (_row == _goingTo) {
			_goingTo = 3;
		}
	
		if (_row == 4 && jsGFwk._gameObjects.chef._chefPosition != _column) {
			//You are dead
			_goingTo = 3;
			_row = 0;
			jsGFwk._gameObjects.controlador._vidas--;
			return;
		}
		
		if (_row == 3 && jsGFwk._gameObjects.chef._chefPosition == _column) {
			//Going up
			_goingTo = Math.floor(Math.random() * 2);
			jsGFwk._gameObjects.controlador.puntos++;
			jsGFwk._gameObjects.chef._isCollition = true;
			_collition = true;
		}
	};

	this.draw = function (context) {
		if (!_collition) {
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				32 + (_column * 12), 97 + (_row * 12), 12, 12,
				(_fishJumpX * _column) + _fishJumpX, _fishJumpY * _row, 12, 12);
		}
	};
};