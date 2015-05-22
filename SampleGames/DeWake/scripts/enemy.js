/*globals jsGFwk */
var Enemy = (function () {
    "use strict";
    
    var enemy = function () {
    };
        
	enemy.prototype.x = 0;
    enemy.prototype.y = 0;
    enemy.prototype.targetX = 0;
    enemy.prototype.targetY = 0;
    enemy.prototype.enemySpeed = 50;
    enemy.prototype.width = 30;
    enemy.prototype.height = 30;
    enemy.prototype.isRectColliding = null;
    enemy.prototype.particles = null;
    enemy.prototype.speedTimer = null;
	
    enemy.prototype.shrink = function () {
        var self = this;
        self.width -= 5;
        self.height -= 5;
        self.x -= 2.5;
        self.y -= 2.5;
    };
    
	enemy.prototype.onInit = function (parameters) {
        var self = this;
        
		this.x = parameters.x;
		this.y = parameters.y;
		this.enemySpeed = parameters.speed;
		this.targetX = jsGFwk.getGameObjects().alan.x;
		this.targetY = jsGFwk.getGameObjects().alan.y;
        this.isRectColliding = jsGFwk.Collisions._rectColliding;
        
        this.particles = new cParticleEmitter();
		this.particles.init();
		this.particles.position.y = this.y;
		this.particles.position.x = this.x;
		this.particles.positionRandom.x = 0;
		this.particles.maxParticles = 20;
		this.particles.size = 10;
		this.particles.sizeRandom = 5;
		this.particles.lifeSpan = 0.5;
        
        this.speedTimer = new jsGFwk.Timer({
			action: function () {
                if (self.enemySpeed > 5) {
                    self.enemySpeed -= 5;
                }
			},
            tickTime: 0.5
		});
	};
    
	enemy.prototype.onUpdate = function (delta) {
        var self = this;
        
		this.x += (this.targetX - this.x) / this.enemySpeed;
		this.y += (this.targetY - this.y) / this.enemySpeed;
		
		this.targetX = jsGFwk.getGameObjects().alan.x - 5;
		this.targetY = jsGFwk.getGameObjects().alan.y - 5;
        
        if (self.isRectColliding(jsGFwk.getGameObjects().alan)) {
            jsGFwk.getGameObjects().alan.live -= 1;
            this.particles.active = true;
            this.particles.position.x = this.x;
            this.particles.position.y = this.y;
        } else {
            this.particles.stopParticleEmitter();
        }
        
        this.particles.update(delta);
        this.speedTimer.tick(delta);
	};
    
	enemy.prototype.onDraw = function (ctx) {
        this.particles.renderParticles(ctx);
        ctx.fillStyle = "rgb(" + (255 - this.width) + ", 0, 0)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
	};
    
    return enemy;
    
}());