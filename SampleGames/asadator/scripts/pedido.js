var pedido = {
    id: 'pedido',
    visible: true,

    setPedido: function(tipo, tiempo) {
        this.tipo = tipo;
        this.tiempo = tiempo;
    },

    init: function() {
        this.x = 740;
        this.y = 80;
        this.tipo = -1;
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

            ctx.drawImage(jsGFwk.Sprites.clock.image, 900, 30);
            ctx.fillStyle = "black";
            ctx.font = "10pt arial";
            ctx.fillText(this.tiempo, 910, 60);
        }
    }
};