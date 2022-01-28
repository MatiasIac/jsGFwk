var bear = {
    onInit: function (p) {
        var self = this;
        
        multiplier = (Math.random() * leo.shots) + 0.5;
        
        this.x = p.x;
        this.y = p.y;
        this.width = 60 * multiplier;
        this.height = 50 * multiplier;
        this.lineLimit = (640 - ((Math.random() * 200) + 150));
        this.upDownAcc = 0;
        this.upDownMax = 15;
        this.speed = p.speed;
        this.updatePointer = this.moveMiddleLine;
        this.upDownAccumulator = 4.69;
        this.energyMax = 8 * ((this.width * 1) / 100) * multiplier;
        this.energy = this.energyMax;
        
        this.isMachinegunEnabled = false;
        
        this.bulletTimer = new jsGFwk.Timer({
            action: function () {
                bearBulletContainer.cloneObject({
                    angle: Math.atan2(leo.y - self.y, leo.x - self.x),
                    x: self.x,
                    y: self.y
                });
            }, tickTime: 0.1
        });
        
        this.enableMachinegunTimer = new jsGFwk.Timer({
            action: function () {
                self.isMachinegunEnabled = true;
            }, tickTime: 1.3
        });
        
        this.disableMachinegunTimer = new jsGFwk.Timer({
            action: function () {
                self.isMachinegunEnabled = false;
            }, tickTime: 0.5
        });
    },
    moveMiddleLine: function (delta) {
        this.x -= this.speed;
        
        if (this.x <= this.lineLimit) {
            this.oldY = this.y;
            this.updatePointer = this.moveUpDown;
        }
    },
    
    moveUpDown: function (delta) {
        if (this.isMachinegunEnabled) {
            this.bulletTimer.tick(delta);
            this.disableMachinegunTimer.tick(delta);
        } else {
            this.enableMachinegunTimer.tick(delta);
        }
        
        this.upDownAccumulator += 0.05;
        this.y = (Math.cos(this.upDownAccumulator) * 50) + this.oldY;
        
        if (this.y - this.oldY >= 49.9) {
            this.upDownAcc++;
        }
        
        if (this.upDownAcc >= this.upDownMax) {
            this.updatePointer = this.moveEndLine;
        }
    },
    
    moveEndLine: function (delta) {
        this.x -= this.speed;
        if (this.x <= -this.width) {
            this.destroy();
        }
    },
    
    updatePointer: function () {},
    
    hit: function () {
        this.energy--;
        if (this.energy <= 0) {
            points += 100;
            killedBears++;
            leoEnergy += 1;
            explosionContainer.cloneObject({ x: this.x, y: this.y });
            explosionJuke.play();
            this.destroy();
        }
    },
    
    onUpdate: function (delta) {
        this.updatePointer(delta);
        this.energyBarSize = (((100 * this.energy) / this.energyMax) * this.width) / 100;
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.bear.sprite.image, this.x, this.y, this.width, this.height);
        
        context.fillStyle = 'green';
        context.fillRect(this.x, this.y - 20, this.energyBarSize, 10);
    }
};