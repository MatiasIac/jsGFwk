var enemigo = {
	id: "enemigo",
	visible: true,
	x: 650,
	y: 200,
	width: 50,
	height: 50,

	acumularDeltaDestruido: 0,
	
	init: function () {
		this.updatePuntero = this.updateNormal;
		this.drawPuntero = this.drawNormal;
		this.isDestruido = false;
	},
	
	updateDestruido: function (delta) {
		this.acumularDeltaDestruido += delta;
		
		if (jsGFwk.Sprites.explosion.seeker == 4) {
			this.x = 650;
			this.updatePuntero = this.updateNormal;
			this.drawPuntero = this.drawNormal;
			this.isDestruido = false;
		}
		
		if (this.acumularDeltaDestruido > 0.1) {
			this.acumularDeltaDestruido = 0;
			jsGFwk.Sprites.explosion.next();
		}
	},
	drawDestruido: function (context) {
		context.save();
			context.drawImage(jsGFwk.Sprites.explosion.sprite.image, this.x, this.y);
		context.restore();
	},
	
	updateNormal: function (delta) {
		this.x -= 1.5;
		if (this.x + this.width < 0) {
			this.x = 650;
		}
	},
	drawNormal: function (context) {
		context.save();
			context.fillStyle = "blue";
			context.fillRect(this.x, this.y, this.width, this.height);
		context.restore();
	},
	
	updatePuntero: function () {},
	drawPuntero: function () {},
	
	destruido: function() {
		this.isDestruido = true;
		jsGFwk.Sprites.explosion.reset();
		
		this.updatePuntero = this.updateDestruido;
		this.drawPuntero = this.drawDestruido;
	},
	
	update: function (delta) {
		this.updatePuntero(delta);
	},
	draw: function (context) {
		this.drawPuntero(context);
	}
};