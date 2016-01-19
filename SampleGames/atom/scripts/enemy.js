var enemy = {
    onInit: function (parameters) {
        this.size = parameters.size;
        this.speed = parameters.speed;
        this.x = parameters.x;
        this.y = parameters.y;
        this.life = this.size * 20;
        this.radius = this.size / 2;
        this.center = {x: this.radius / 2, y: this.radius / 2 };
        
        switch (parameters.type) {
            case 'angleFollower':
                this.update = this.angleFollower;
                break;
            case 'radialFollower':
                this.accumulator = 0;
                this.range = 600;
                this.update = this.radialFollower;
                break
            case 'waveFollower':
                this.accumulator1 = 0;
                this.accumulator2 = 0;
                this.speed2 = parameters.speed2;
                this.range = 600;
                this.update = this.waveFollower;
                break
        }
    },
    
    impact: function () {
        for(var i = 0; i < 5; i++) {
            GLOBAL.particlesContainer.cloneObject({x: this.x, y: this.y});
        }
    },
    
    waveFollower: function (delta) {
        this.accumulator1 += this.speed;
        this.accumulator2 += this.speed2;
        this.range = Math.max(this.range - 1, 200);
        this.x = (Math.sin(this.accumulator1) * this.range) + player.playerX;
        this.y = (Math.cos(this.accumulator2) * this.range) + player.playerY;
    },
    
    radialFollower: function (delta) {
        this.accumulator += this.speed;
        this.range = Math.max(this.range - 0.5, 180);
        this.x = (Math.sin(this.accumulator) * this.range) + player.playerX;
        this.y = (Math.cos(this.accumulator) * this.range) + player.playerY;
    },
    
    angleFollower: function (delta) {
        var angle = Math.atan2(player.playerY - this.y,
                               player.playerX - this.x);
        this.x += this.speed * Math.cos(angle);
        this.y += this.speed * Math.sin(angle);  
    },
    
    onUpdate: function (delta) {
        this.update(delta);
    },
    onDraw: function (context) {
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.strokeRect(this.x, this.y, this.size, this.size);
    }
};