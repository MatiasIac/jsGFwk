var dinero = {
    onInit: function (data) {
        this.x = data.x;
        this.y = data.y;
        this.dinero = data.dinero;
        this.acc = 0;
    },
    onUpdate: function (tick) {
        this.acc += tick;

        if (this.acc >= 0.4) {
            this.destroy();
        }

        this.y--;
    },
    onDraw: function (ctx) {
        ctx.fillStyle = "#E0C941";
        ctx.font = "20pt arial";
        ctx.fillText(this.dinero, this.x, this.y);
    }
}