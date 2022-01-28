var gaucho = {
    id: 'gaucho',
    visible: true,
    isBlinking: false,

    decir: function(texto) {
        this.texto = texto.split('\n');
    },

    init: function () {
        var self = this;
        this.texto = "";
        jsGFwk.Sprites.gaucho.reset();
        
        this.blinkTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Sprites.gaucho.next();
                self.isBlinking = true;
			},
            tickTime: 2.5
        });
        
        this.blink2Timer = new jsGFwk.Timer({
			action: function () {
                self.isBlinking = false;
                jsGFwk.Sprites.gaucho.next();
			},
            tickTime: 0.2
		});
    },
    update: function(tick) {
        if (this.isBlinking) {
            this.blink2Timer.tick(tick);
        } else {
            this.blinkTimer.tick(tick);
        }
    },
    draw: function(ctx) {
        ctx.drawImage(jsGFwk.Sprites.gaucho.sprite.image, 650, 200)
        ctx.drawImage(jsGFwk.Sprites.dialog.image, 600, 10);

        ctx.fillStyle = "black";
        ctx.font = "18pt arial black";

        for (var i = 0; i < this.texto.length; i++) {
            ctx.fillText(this.texto[i], 610, 120 + (i * 30));
        }
        
    }
};