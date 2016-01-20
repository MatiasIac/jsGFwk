var enemy = {
    onInit: function (parameters) {
        this.size = parameters.size;
        this.speed = parameters.speed;
        this.x = parameters.x;
        this.y = parameters.y;
        this.life = this.size * 5;
        this.radius = this.size / 2;
        this.center = {x: this.radius, y: this.radius };
        this.tracer = [{x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)}];
        this.tracerCounter = 0;
        
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
    
    impact: function (damage) {
        for(var i = 0; i < 5; i++) {
            GLOBAL.particlesContainer.cloneObject({x: this.x, y: this.y});
        }
        
        this.life -= damage;
        if (this.life <= 0) {
            for(var i = 0; i < 15; i++) {
                GLOBAL.particlesContainer.cloneObject({x: this.x, y: this.y});
            }
            this.destroy();
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
        
        this.tracerCounter += delta;
        if (this.tracerCounter > 0.1) {
            this.tracerCounter = 0;
            this.tracer.splice(-1, 1);
            this.tracer.unshift({x: this.x + (this.size / 2), y: this.y + (this.size / 2)});
        }
    },
    onDraw: function (context) {
    
        context.beginPath();
        for (var i = 0; i < this.tracer.length; i++) {
            context.strokeStyle = 'rgba(112,52,103,' + (1 / (i+1)) + ')';
            context.lineWidth = this.size - (i * 2);
            context.lineTo(this.tracer[i].x, this.tracer[i].y);
            context.stroke();
        }
        context.closePath();

        context.fillStyle = '#703467';//'#BB1CA2';
        context.strokeStyle = '#703467';
        context.lineWidth = 1;
        context.fillRect(this.x, this.y, this.size, this.size);
        context.strokeRect(this.x, this.y, this.size, this.size);
    }
};