var player = {
	id: "player",
	visible: true,
	x: 15,
	y: 10,
	width: 10,
	height: 50,
	center: {x: 5, y: 25},
			
	velX: 0,
	velY: 0,
	friccion: 0.95,
	velocidad: 20,
	
	update: function (delta) {

		//W
		if (jsGFwk.IO.keyboard._activeKey[87]) { 
			if (this.velY > -this.velocidad) {
				this.velY--;
			}
		}
		
		//S
		if (jsGFwk.IO.keyboard._activeKey[83]) {
			if (this.velY < this.velocidad) {
				this.velY++;
			}
		}
					
		this.velY *= this.friccion;
		this.y += this.velY;
		this.velX *= this.friccion;
		this.x += this.velX;

		if(this.y <= 5){

			this.y = 5;
		}
		if(this.y >= 475 - this.height){
			this.y = 475 - this.height;
		}


	},
	draw: function (context) {
		/*context.save();			
			context.drawImage(jsGFwk.ResourceManager.graphics.nave.image,
				this.areaRecorteX, 0, 40, 32,
				this.x, this.y, this.width, this.height);
		context.restore();*/
		context.fillRect(this.x, this.y, 10, 50);
		context.fill();
	}
};