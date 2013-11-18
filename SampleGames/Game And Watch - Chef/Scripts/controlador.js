var controlador = {
	id: "controlador",
	visible: true,
	puntos: 0,
	_tick: 1,
	_acumulador: 0,
	_pescados: [],
	_vidas: 3,
	_complexJumps: 10,
	
	init: function () {
		for (var i = 0; i < 2; i++) {
			var pes = new pescado();
			pes.init(i, 0);
			this._pescados.push(pes);
		}
	},

	update: function (delta) {
		this._acumulador += delta;
		
		if ((this.puntos % this._complexJumps) == 0 && this.puntos != 0) {
			this._tick -= 0.2;
			this._complexJumps += this._complexJumps;
			
			if (this._pescados.length < 3) {
				var pes = new pescado();
				pes.init(this._pescados.length, 0);
				this._pescados.push(pes);
			}
		}
		
		if (this._acumulador >= this._tick) {
			
			if (jsGFwk._gameObjects.chef._isCollition) {
				jsGFwk._gameObjects.chef._isCollition = false;
				jsGFwk._gameObjects.chef._goUp = true;
				return;
			}
			
			if (jsGFwk._gameObjects.chef._goUp) {
				jsGFwk._gameObjects.chef._goUp = false;
			}
			
			for (var i = 0; i < this._pescados.length; i++) {
				this._pescados[i].update(delta);
			}
			
			this._acumulador = 0;
		}
	},

	draw: function (context) {
		for (var i = 0; i < this._pescados.length; i++) {
			this._pescados[i].draw(context);
		}
		
		for (var i = 0; i < this._vidas; i++) {
			context.drawImage(jsGFwk.ResourceManager.graphics.sprites.image,
				13, 303, 22, 18,
				(30 * i) + 10, 110, 22, 18);
		}
	},
};