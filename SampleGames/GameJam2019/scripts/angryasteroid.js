var angryAsteroid = {
    id: "angryAsteroid",
    visible: true,

    init: function () {
        var self = this;
        this.width = 162;
        this.height = 157;
        this.faceIndex = 0;
        this.facesPos = [(width / 2) - 15, (width / 2) - 50, (width / 2) - 15];

        this.faceSwitcherTimer = new jsGFwk.Timer({
			action: function () {
                self.faceIndex = parseInt(Math.random() * 3);
			},
            tickTime: 2.5
		});
    },

    update: function(delta) {
        this.faceSwitcherTimer.tick(delta);
    },

    draw: function(context) {
        context.drawImage(jsGFwk.Sprites.asteroidBase.image, (width / 2) - (this.width / 2), -70);
        context.drawImage(jsGFwk.Sprites.faces.spriteBag[this.faceIndex].image, 
            this.facesPos[this.faceIndex], 10);
    }
}