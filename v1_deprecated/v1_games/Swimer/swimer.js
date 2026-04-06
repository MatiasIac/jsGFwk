var Swimer = {
    id: 'swimer',
    visible: true,
    x: 80,
    sinShark: 0,
    sharkY: 0,
    init: function () {
        jsGFwk.Sprites.swimer.reset();
    },
    update: function (delta) {
        jsGFwk.Sprites.swimer.next();

        this.sinShark += delta;
        this.sharkY = (Math.sin(this.sinShark * 2) * 15) + 90;

        if (swim) {
            if (Meter.objective >= Meter.current - 2 && Meter.objective <= Meter.current + 2) {
                this.x += 4;
                if (this.x >= 540) {
                    currentScore++;
                    _setHiScore();
                    _resetGame();
                }
            } else {
                this.x++;
                if (this.x > 200) {
                    _setHiScore();
                    currentScore = 0;
                    _resetGame();
                }
            }
        }
    },
    draw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.shark.image, this.x - 60, this.sharkY, 23, 13);
        ctx.drawImage(jsGFwk.Sprites.swimer.sprite.image, this.x, 90);
    }
}