var enemy = {
    onInit: function (parameters) {
        var self = this;
        this.size = parameters.size;
        this.speed = parameters.speed;
        this.x = parameters.x;
        this.y = parameters.y;
        this.life = parameters.life;
        this.radius = this.size / 2;
        this.center = {x: this.radius, y: this.radius };
        this.tracer = [{x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)},
                      {x: this.x + (this.size / 2), y: this.y + (this.size / 2)}];
        this.tracerCounter = 0;
        this.bulletSize = 2;//(Math.random() * Math.min(GLOBAL.currentLevel, 5)) + Math.min(this.size, 5);
        this.bulletSpeed = 1 + Math.min((0.1 * GLOBAL.currentLevel), 5);
        
        this.color = {
            r: parseInt(Math.random() * 155) + 100,
            g: parseInt(Math.random() * 155) + 100,
            b: parseInt(Math.random() * 155) + 100
        };
        
        this.bulletTimer = new jsGFwk.Timer({
            action: function () {
                GLOBAL.enemyBulletContainer.cloneObject({
                    enemy: { x: self.x, y: self.y },
                    bullet: { size: self.bulletSize, speed: self.bulletSpeed },
                    angle: Math.atan2(player.playerY - self.y, player.playerX - self.x)
                });
            }, tickTime: 2
        });
        
        switch (parameters.type) {
            case 'angleFollower':
                this.update = this.angleFollower;
                break;
            case 'radialFollower':
                this.accumulator = 0;
                this.range = Math.sqrt((parameters.x -= player.playerX) * parameters.x + (parameters.y -= player.playerY) * parameters.y);
                this.update = this.radialFollower;
                this.maxRadius = 130;
                this.radianMovement = this.range > this.maxRadius ? 0.5 : -0.5;
                break
            case 'waveFollower':
                this.accumulator1 = 0;
                this.accumulator2 = 0;
                this.speed2 = parameters.speed2;
                this.range = Math.sqrt((parameters.x -= player.playerX) * parameters.x + (parameters.y -= player.playerY) * parameters.y);
                this.maxRadius = 200;
                this.radianMovement = this.range > this.maxRadius ? 1 : -1;
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
            GLOBAL.points += 5;
            this.destroy();
        }
    },
    waveFollower: function (delta) {
        this.accumulator1 += this.speed;
        this.accumulator2 += this.speed2;
        this.range = (parseInt(this.range) === this.maxRadius ? this.maxRadius : this.range - this.radianMovement);
        this.x = (Math.sin(this.accumulator1) * this.range) + player.playerX;
        this.y = (Math.cos(this.accumulator2) * this.range) + player.playerY;
    },   
    radialFollower: function (delta) {
        this.accumulator += this.speed;
        this.range = (parseInt(this.range) === this.maxRadius ? this.maxRadius : this.range - this.radianMovement);
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
        
        this.bulletTimer.tick(delta);
    },
    onDraw: function (context) {
        context.lineCap = 'round';
        
        context.beginPath();
        for (var i = 0; i < this.tracer.length; i++) {
            context.strokeStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',' + (1 / (i+1)) + ')';
            context.lineWidth = this.size - (i * 2);
            context.lineTo(this.tracer[i].x, this.tracer[i].y);
            context.stroke();
        }
        context.closePath();

        context.fillStyle = 'rgb('+this.color.r+','+this.color.g+','+this.color.b+')';//'#703467';//'#BB1CA2';
        //context.strokeStyle = '#703467';
        //context.lineWidth = 1;
        context.fillRect(this.x, this.y, this.size, this.size);
        //context.strokeRect(this.x, this.y, this.size, this.size);
    }
};