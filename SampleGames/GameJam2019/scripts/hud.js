var hud = {
    id: "hud",
    visible: true,
    clickId: 0,

    init: function () {
        var self = this;
        this.isTextShaking = true;
        this.textShakeX = 0;
        this.textShakeY = 0;

        this.titleX = (width / 2) - 100;
        this.titleY = 250;

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
        
        this.clickId = jsGFwk.IO.mouse.registerClick(function () {
			jsGFwk.IO.mouse.unregisterClick(self.clickId);
            jsGFwk.Scenes.scenes.main.enable();
		});
    },

    update: function (delta) {
        if (this.isTextShaking) {
            this.textShakeX = Math.sin(1 + Math.random() * 10 * 2) * 10;
            this.textShakeY = Math.cos(0.8 + Math.random() * 10 * 2) * 10;
            this.endShackingTimer.tick(delta);
        }

        this.startShackingTimer.tick(delta);
    },

    draw: function(context) {
        context.drawImage(jsGFwk.Sprites.title.image, this.titleX + this.textShakeX, this.titleY + this.textShakeY);
        context.drawImage(jsGFwk.Sprites.main.image, -20, height - 200);
        context.drawImage(jsGFwk.Sprites.instructions.image, width - 120, height - 70);
    }
}