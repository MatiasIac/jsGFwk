var Lever = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = 17;
        this.height = 12;
        this.currentPosition = parameters.state;
        this.currentObstacleIndex = 0;
        this.wall = parameters.wall;
        this.acc = 0;
    },
    switch: function () {
        if (this.currentPosition > 0) { return; }
        this.currentPosition++;
        this.onUpdate = this.updateHide;
    },
    updateHide: function (delta) {
        this.acc += delta;
        if (this.acc > 0.1) {
            this.acc = 0;
            this.currentObstacleIndex++;
            if (this.currentObstacleIndex > 3) {
                this.currentObstacleIndex = 3;
                this.onUpdate = function () { };
            }
        }
    },
    onUpdate: function (delta) {
    },
    onDraw: function (ctx) {
        ctx.drawImage(jsGFwk.Sprites.lever.spriteBag[this.currentPosition].image, this.x, this.y);
        ctx.drawImage(jsGFwk.Sprites.obstacle.spriteBag[this.currentObstacleIndex].image, this.wall.x, this.wall.y);
    }
};