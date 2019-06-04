var corte = {
    onInit: function (data) {
        this.type = data.tipo;
        this.pic = jsGFwk.Sprites.cortes.spriteBag[data.tipo].image;
        this.pos = data.pos;
        this.cook = 0;
        this.rect = {
            x: ((data.pos % 4) * 146) + 110,
            y: ((parseInt(data.pos / 4)) * 110) + 215,
            width: 106, height: 107
        };
    },
    onUpdate: function(tick){
        this.cook+=0.1;
    },
    onDraw: function(ctx) {
        ctx.drawImage(this.pic, this.rect.x, this.rect.y);

        var cookval = 67 * (this.cook / 100);
        ctx.drawImage(jsGFwk.Sprites.energia.image, 
            this.rect.x + 87, (this.rect.y + 20) + (67 - cookval),
            10, cookval);
    }
};