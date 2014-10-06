var enemigo = {
	id: "enemigo",
	visible: true,
	x: 650,
	y: 200,
	width: 50,
	height: 50,

	acumularDeltaDestruido: 0,
	
	segment: 1,
	
	init: function () {
		this.updatePuntero = this.updateNormal;
		this.drawPuntero = this.drawNormal;
		this.isDestruido = false;
		
		this.path.setPath(
			{x: -20, y: 200},
			{x: 660, y: 200},
			{x: 320, y: 20},
			{x: 320, y: 400}
		);
	},
	
	updateDestruido: function (delta) {
		this.acumularDeltaDestruido += delta;
		
		if (jsGFwk.Sprites.explosion.seeker == 4) {
			this.segment = 1;
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
		this.segment -= 0.005;
		var point = this.path.getPointAt(this.segment);
		this.x = point.x;
		this.y = point.y;
	
		if (this.segment <= 0) {
			this.segment = 1;
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
		jsGFwk.ResourceManager.sounds.explosion.audio.play();
		
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