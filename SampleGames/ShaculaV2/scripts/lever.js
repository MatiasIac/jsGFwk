var Lever = {
    onInit: function (parameters) {
        this.parameters = parameters;
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = 17;
        this.height = 12;
        this.currentPosition = parameters.state;
        this.currentObstacleIndex = 0;
        this.otherActions = parameters.otherActions || -1;

        this.wallsToRender = [];

        if (parameters.wall) {
            this.wallsToRender.push(parameters.wall);
        } else {
            this.wallsToRender = parameters.walls;
        }
        
        this.acc = 0;

        if (parameters.state === 1) {
            this.currentObstacleIndex = 3;
        }
    },
    switch: function () {
        if (this.currentPosition > 0) { return; }
        jsGFwk.ResourceManager.sounds.lever.audio.play();
        this.currentPosition++;
        this.parameters.state = this.currentPosition;
        this.onUpdate = this.updateHide;
        if (this.otherActions > -1) {
            Levels[this.otherActions].levers[0].state = 1;
        }
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

        for (var i = 0; i < this.wallsToRender.length; i++) {
            var wall = this.wallsToRender[i];
            ctx.drawImage(jsGFwk.Sprites.obstacle.spriteBag[this.currentObstacleIndex].image, wall.x, wall.y);
        }
    }
};