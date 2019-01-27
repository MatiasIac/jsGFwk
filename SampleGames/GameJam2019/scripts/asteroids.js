var asteroid = {

    hit: function () {
        this.life -= 1;
        if (this.life <= 0) {
            this.destroy();
        }
    },

    onInit: function () {
        this.x = (Math.random() * (width - 50)) + 30;
        this.y = -(Math.random() * 50);
        this.speed = (Math.random() * 1.2) + 1;
        this.imageIndex = parseInt(Math.random() * 6);
        this.width = jsGFwk.Sprites.asteroids.spriteBag[this.imageIndex].width;
        this.height = jsGFwk.Sprites.asteroids.spriteBag[this.imageIndex].height;

        this.width = (Math.random() * this.width) + this.width;
        this.height = (Math.random() * this.height) + this.height;
        this.life = 1;//(Math.random() * 2) + 1;
    },
    onUpdate: function (delta) {
        this.y += this.speed;

        if (this.y > height) {
            this.destroy();
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.asteroids.spriteBag[this.imageIndex].image,
            this.x, this.y, this.width, this.height);
    }
};