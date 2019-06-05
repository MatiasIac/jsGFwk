var pedido = {
    onInit: function(data) {
        this.x = width;
        this.y = 10;
        this.tipo = data.tipo;
    },
    onUpdate: function(tick) {
        if (this.x <= -20) {
            this.destroy();
        } 
    },
    onDraw: function(ctx) {
        
    }
};