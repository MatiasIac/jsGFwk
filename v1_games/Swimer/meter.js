var Meter = {
    id: 'meter',
    visible: true,
    objective: 50,
    current: 0,
    arrowPos: 0,
    chargeSpeed: 0,
    init: function () {
    },
    update: function (delta) {
        this.arrowPos = 300 * (this.objective / 100);

        if (isInPlay) {
            this.current += this.chargeSpeed;
            this.current = Math.min(100, this.current);
        }
    },
    draw: function (ctx) {
        ctx.fillStyle = "white";

        ctx.fillRect(150, 160, Math.min(300 * (this.current / 100), 300), 20);

        ctx.rect(150, 160, 300, 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(145 + this.arrowPos, 150);
        ctx.lineTo(155 + this.arrowPos, 150);
        ctx.lineTo(150 + this.arrowPos, 155);
        ctx.fill();
    }
}