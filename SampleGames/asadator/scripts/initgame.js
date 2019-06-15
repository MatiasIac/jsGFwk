var initgame = {
    id: "initgame",
    visible: true,

    startGame: function () {
        if (this.gameStarted > 2) {
            jsGFwk.IO.mouse.unregisterClick(this.mouseUpId);
            corteContainer.clearAll();
            carbonContainer.clearAll();
            dineroContainer.clearAll();
            jsGFwk.Scenes.scenes.main.enable();
        }
    },

    init: function () {
        var self = this;

        this.gameStarted = 0;
        this.showButton = false;
        
        jsGFwk.Sprites.carboninicio.reset();

        this.carbonTimer = new jsGFwk.Timer({
			action: function () {
                jsGFwk.Sprites.carboninicio.next();
			},
            tickTime: 0.1
        });

        this.gamebuttonTimer = new jsGFwk.Timer({
			action: function () {
                self.showButton = !self.showButton;
			},
            tickTime: 0.3
        });

        this.startGameTimer = new jsGFwk.Timer({
			action: function () {
                self.gameStarted++;
                self.startGame();
			},
            tickTime: 25
        });

        this.mouseUpId = jsGFwk.IO.mouse.registerClick(function(e) {
            jsGFwk.ResourceManager.sounds.music.audio.play();
            self.gameStarted++;
            self.startGame();
        });
    },
    update: function(tick) {
        this.carbonTimer.tick(tick);
        this.gamebuttonTimer.tick(tick);

        if (this.gameStarted) {
            this.startGameTimer.tick(tick);
        }
    },
    draw: function(ctx) {
        if (this.gameStarted === 0) {
            if (this.showButton) {
                ctx.drawImage(jsGFwk.Sprites.startbutton.image, 355, 250);
            }
        
            ctx.fillStyle = "black";
            ctx.font = "20pt arial black";
            ctx.fillText("RECORD: $ " + gameStatus.lastrecord, 10, 40);

            ctx.drawImage(jsGFwk.Sprites.carboninicio.sprite.image, 380, 450);
        } else if (this.gameStarted === 1) {
            ctx.drawImage(jsGFwk.Sprites.splash.image, 0, 0);
        } else {
            ctx.drawImage(jsGFwk.Sprites.splash2.image, 0, 0);
        }
    }
};