var Player = {
    id: 'player',
    visible: true,
    init: function init() {
        this.x = 10;
        this.y = 10;
        this.width = 19;
        this.height = 28;
        this.isVisible = true;
        this.speed = 5;
        this.isBlocked = false;
        
        jsGFwk.Sprites.eater.reset();
        
        this.walkingTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Sprites.eater.next();
			},
            tickTime: 0.2
		});
    },
    handleKeyboard: function handleKeyboard() {
        var movement = { x: 0, y: 0 };
        movement.x = this.x;
        movement.y = this.y;
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.D]) {
            movement.x += this.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.A]) {
            movement.x -= this.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.S]) {
            movement.y += this.speed;
        }
        
        if (jsGFwk.IO.keyboard.getActiveKeys()[jsGFwk.IO.keyboard.key.W]) {
            movement.y -= this.speed;
        }
        
        return movement;
    },
    handlePad: function handlePad(movement) {
        return movement;
    },
    checkMovement: function checkMovement(moveto) {
        if (moveto.x > 0 && moveto.x < gameConst.maxPlayerXReach()) {
            this.x = moveto.x;
        }
            
        if (moveto.y > 0 && moveto.y < gameConst.maxPlayerYReach()) {
            this.y = moveto.y;
        }
    },
    update: function update(delta) {
        if (!this.isBlocked) {
            this.walkingTimer.tick(delta);
            var moveto = this.handleKeyboard();
            moveto = this.handlePad(moveto);
            this.checkMovement(moveto);
        }
    },
    draw: function draw(ctx) {
        this.isVisible && ctx.drawImage(jsGFwk.Sprites.eater.sprite.image, this.x, this.y);
    }
};