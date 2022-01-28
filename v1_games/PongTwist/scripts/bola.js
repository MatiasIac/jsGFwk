var bola = {
	id: "bola",
	visible: false,
	counter: 0,
	maxBolas: 0,

	init: function () {
	},
		
	update: function (delta) {
	
	this.counter += delta;

	if(this.counter > 3 && this.maxBolas <= 10){
		var rX = 300;
		var rY = parseInt(Math.random() * 450);		
		jsGFwk._gameObjects.pelota.cloneObject({x: rX, y: rY});
		this.counter = 0;
		this.maxBolas++;		
	}
	
	
	},
	draw: function (context) {

	}
};