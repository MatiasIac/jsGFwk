var Hud = {
    name: 'hud',
    isVisible: true,
    init: function() {
        var self = this;
        this.playerX = 200;
        this.yetiX = 420;
        this.scanLineVisible = false;
        this.isTextShaking = true;
        this.textShakeX = 0;
        this.textShakeY = 0;
        this.gamePadConnected = false;
        
        usingKeyboard = true;
        
        gameConst.lives = 3;
        gameConst.currentLevel = -1;
    
        resourceManager.SOUNDS.music.audio.play();
        
        sprites.SPRITES_BAG.eater.reset();
        sprites.SPRITES_BAG.yeti.reset();
        
        gameConst.timer.context.clearRect(0, 0, 640, 150);
        
        this.walkingTimer = new jsGFwk.Clock({
			action: function () {
                sprites.SPRITES_BAG.eater.moveNextSprite();
                sprites.SPRITES_BAG.yeti.moveNextSprite();
                self.playerX += 10;
                self.yetiX += 10;
                
                self.playerX %= 640;
                self.yetiX %= 640;
			},
            triggerTime: 0.2
		});
        
        this.startShackingTimer = new jsGFwk.Clock({
			action: function () {
                self.isTextShaking = true;
			},
            triggerTime: 3.5
		});
        
        this.endShackingTimer = new jsGFwk.Clock({
			action: function () {
                self.isTextShaking = false;
                self.textShakeX = 0;
                self.textShakeY = 0;
			},
            triggerTime: 0.2
		});
    },
    update: function(delta) {
        this.gamePadConnected =  false; //jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined;
        
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.ENTER] === true ||
           (this.gamePadConnected && jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].buttons[0].pressed) ||
           (!usingKeyboard)) {
            scenesManager.cinematic.activate();
        }
        
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.ONE] == true) {
            gameConst.currentLevel = 9;
            scenesManager.cinematic.activate();
        }
        
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.TWO] == true) {
            gameConst.currentLevel = 19;
            scenesManager.cinematic.activate();
        }
        
        if (keyboardIO.getActiveKeys()[jsGFwk.KeyboardIO.KEYS.THREE] == true) {
            gameConst.currentLevel = 27;
            scenesManager.cinematic.activate();
        }
        
        this.walkingTimer.tick(delta);
        this.scanLineVisible = !this.scanLineVisible;
        
        if (this.isTextShaking) {
            this.textShakeX = Math.sin(1 + Math.random() * 10 * 2) * 10;
            this.textShakeY = Math.cos(0.8 + Math.random() * 10 * 2) * 10;
            this.endShackingTimer.tick(delta);
        }
        
        this.startShackingTimer.tick(delta);
        usingKeyboard = true;
    },
    draw: function(ctx) {
        ctx.drawImage(sprites.SPRITES_BAG.eater.sprite.image, this.playerX, 300);
        ctx.drawImage(sprites.SPRITES_BAG.yeti.sprite.image, this.yetiX, 300);
        
        ctx.save();
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.textAlign = 'center';
        ctx.font = '40pt gooddog';
        ctx.fillStyle = 'white';
        ctx.fillText('The Hunt', 320 + this.textShakeX, 180 + this.textShakeY);
        ctx.fillText('for', 320 + this.textShakeX, 220 + this.textShakeY);
        ctx.fillText('YongoYongo', 320 + this.textShakeX, 260 + this.textShakeY);
        
        ctx.font = '14pt zxBold';
        
        ctx.fillText('Max level completed ' + gameConst.maxLevelReach + ' of ' + (levels.length - 1), 320, 400);
        ctx.fillText('Press ENTER or TAP or connect a GAMEPAD or CLICK to start', 320, 440);
        
        ctx.restore();
        
        this.gamePadConnected && ctx.drawImage(sprites.joystick.graphic, 310, 380);
        
        this.scanLineVisible && ctx.drawImage(resourceManager.GRAPHICS.scanLines.graphic, 0, 0);
    }
};