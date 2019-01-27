var earth = {
    id: "earth",
    visible: true,

    init: function () {
        this.moveAccumulatorCloud1 = 0;
        this.moveAccumulatorCloud2 = 0;
        this.cloudX1 = 0;
        this.cloudX2 = 0;
    },

    update: function(delta) {
        this.cloudX1 = (Math.sin(this.moveAccumulatorCloud1) * 100) + (width - 200);
        this.moveAccumulatorCloud1 += 0.003;

        this.cloudX2 = (Math.sin(this.moveAccumulatorCloud2) * 100) + (width - 200);
        this.moveAccumulatorCloud2 -= 0.002;
    },

    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.earth.image, 20, height - 48);
        context.drawImage(jsGFwk.Sprites.cloud1.image, this.cloudX1, height - 30);
        context.drawImage(jsGFwk.Sprites.cloud2.image, this.cloudX2, height - 20);
    }
};