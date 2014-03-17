var magma = {
	id: "magma",
	zOrder: 9,
	visible: true,
	
	x: -80,
	particles: {},
	
	magmaMovementSpeed: 1.5,
	
	init: function () {	
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