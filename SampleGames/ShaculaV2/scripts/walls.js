var Walls = {
    onInit: function (parameters) {
        this.x = parameters.x;
        this.y = parameters.y;
        this.width = parameters.width;
        this.height = parameters.height;
        this.isRectColliding = jsGFwk.Collisions._rectColliding;
    },
    onUpdate: function (delta) {
        
    },
    onDraw: function (ctx) {
        var pattern = ctx.createPattern(jsGFwk.Sprites.wall1.image, "repeat");
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = pattern;
        ctx.fill();
    }
};