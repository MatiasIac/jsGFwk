var angryAsteroid = {
    id: "angryAsteroid",
    visible: true,

    radius: 78,
    center: { x: 85, y: 75 },

    reset: function() {
        this.life = 3000;
        this.faceIndex = 0;
    },

    hit: function () {
        this.life -= 1;
    },

    init: function () {
        var self = this;
        this.width = 162;
        this.height = 157;
        this.faceIndex = 0;

        this.life = 3000;

        this.x = (width / 2) - (this.width / 2);
        this.y = -70;

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
        context.drawImage(jsGFwk.Sprites.asteroidBase.image, this.x, this.y);
        context.drawImage(jsGFwk.Sprites.faces.spriteBag[this.faceIndex].image, 
            this.facesPos[this.faceIndex], 10);
    }
}