var corte = {
    onInit: function (data) {
        this.acc = 0;
        this.type = data.tipo;
        this.pic = jsGFwk.Sprites.cortes.spriteBag[data.tipo].image;
        this.pos = data.pos;
        this.cook = 18;
        this.rect = {
            x: ((data.pos % 4) * 146) + 110,
            y: ((parseInt(data.pos / 4)) * 110) + 215,
            width: 106, height: 107
        };
    },
    onUpdate: function(tick) {
        this.acc += tick;

        if (this.acc > 0.2) {
            this.cook += ((gameController.potenciaFuego / 1000) - 0.2);
            this.acc = 0;
        }

        if (this.cook < 0) { 
            this.cook = 0;
        }

        //burn
        var cookval = 67 * (this.cook / 100);
        if (cookval > 57) {
            this.rect.width = 106 + (Math.random() * (cookval - 57));
            this.rect.height = 107 + (Math.random() * (cookval - 57));
        } else {
            this.rect.width = 106;
            this.rect.height = 107;
        }
        
        if (cookval >= 67 || cookval <= 0) {
            gameController.quemado(this.pos);
            this.destroy();
        }
    },
    onDraw: function(ctx) {
        ctx.drawImage(this.pic, this.rect.x, this.rect.y, this.rect.width, this.rect.height);

        var cookval = 67 * (this.cook / 100);
        ctx.drawImage(jsGFwk.Sprites.energia.image, 
            0, (67 - cookval), 10, cookval,
            this.rect.x + 87, (this.rect.y + 20) + (67 - cookval), 10, cookval);
    }
};