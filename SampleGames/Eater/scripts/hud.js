var Hud = {
    id: 'hud',
    visible: true,
    init: function init() {
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
    
        jsGFwk.ResourceManager.sounds.music.audio.play();
        
        jsGFwk.Sprites.eater.reset();
        jsGFwk.Sprites.yeti.reset();
        
        gameConst.timer.context.clearRect(0, 0, 640, 150);
        
        this.walkingTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Sprites.eater.next();
                jsGFwk.Sprites.yeti.next();
                self.playerX += 10;
                self.yetiX += 10;
                
                self.playerX %= 640;
                self.yetiX %= 640;
			},
            tickTime: 0.2
		});
        
        this.startShackingTimer = new jsGFwk.Timer({
			action: function () {
                self.isTextShaking = true;
			},
            tickTime: 3.5
		});
        
        this.endShackingTimer = new jsGFwk.Timer({
			action: function () {
                self.isTextShaking = false;
                self.textShakeX = 0;
                self.textShakeY = 0;
			},
            tickTime: 0.2
		});
    },
    update: function update(delta) {
        this.gamePadConnected = jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0] !== undefined;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.ENTER] ||
           (this.gamePadConnected && jsGFwk.Gamepad.pads[jsGFwk.Gamepad.PADTYPE.PAD0].buttons[0].pressed) ||
           (!usingKeyboard)) {
            jsGFwk.Scenes.scenes.cinematic.enable();
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
    draw: function draw(ctx) {
        ctx.drawImage(jsGFwk.Sprites.eater.sprite.image, this.playerX, 300);
        ctx.drawImage(jsGFwk.Sprites.yeti.sprite.image, this.yetiX, 300);
        
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
        
        this.gamePadConnected && ctx.drawImage(jsGFwk.Sprites.joystick.image, 310, 380);
        
        this.scanLineVisible && ctx.drawImage(jsGFwk.ResourceManager.graphics.scanLines.image, 0, 0);
    },
    postRender: function postRender(ctx) {
        gameConst.fx.glTexture.loadContentsOf(jsGFwk.FastAnimation._canvas);
        gameConst.fx.glCanvas.draw(gameConst.fx.glTexture)
            .bulgePinch(gameConst.width / 2, gameConst.height / 2, gameConst.width * 0.75, 0.12)
            .vignette(0.25, 0.74)
            .update();
    }
};