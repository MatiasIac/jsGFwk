var pedido = {
    id: 'pedido',
    visible: true,

    setPedido: function(tipo, tiempo, cantidad) {
        this.tipo = tipo;
        this.tiempo = tiempo;
        this.cantidad = cantidad;
    },

    init: function() {
        this.x = 740;
        this.y = 80;
        this.tipo = -1;
        this.cantidad = 0;
        this.tiempo = 60;
        this.acc = 0;
    },
    update: function(tick) {
        if (this.tipo > -1) {
            this.acc += tick;

            if (this.acc >= 1) {
                this.tiempo--;
                this.acc = 0;
            }

            if (this.tiempo == 10) {
                gaucho.decir("¡Vamos que se acaba\nel tiempo!");
            }

            if (this.tiempo <= 0) {
                gameController.pedidoPerdido();
                this.tipo = -1;
            }
        }
    },
    draw: function(ctx) {
        if (this.tipo > -1) {
            ctx.drawImage(jsGFwk.Sprites.pedidos.spriteBag[this.tipo].image, 620, 20);

            ctx.fillStyle = "black";
            ctx.font = "25pt arial black";
            ctx.fillText("x " + this.cantidad, 700, 70);

            ctx.drawImage(jsGFwk.Sprites.clock.image, 900, 30);
            ctx.fillStyle = "black";
            ctx.font = "10pt arial";
            ctx.fillText(this.tiempo, 910 + (this.tiempo < 10 ? 5 : 0), 60);
        }
    }
};