var magma = {
	id: "magma",
	zOrder: 9,
	visible: true,
	
	x: -80,
	width: 50,
	height: 480,
	y: 0,
	particles: {},
	
	magmaMovementSpeed: 1.5,
	
	init: function () {
		this.x = -80;
		this.width = 50;
		this.height = 480;
		this.y = 0;
		this.magmaMovementSpeed = 2.5;
	
		this.particles = new cParticleEmitter();
		this.particles.init();
		this.particles.position.y = 255;
		this.particles.position.x = this.x;
		this.particles.positionRandom.x = 60;
		this.particles.maxParticles = 800;
		this.particles.size = 50;
		this.particles.sizeRandom = 5;
	},
	
	update: function (delta) {
		this.x += this.magmaMovementSpeed;
		this.particles.position.x = this.x;
		this.particles.update(delta);
	},
	
	draw: function (context) { 
		context.save();
			context.globalCompositeOperation = "xor";
			this.particles.renderParticles(context);
		context.restore();
	}
}