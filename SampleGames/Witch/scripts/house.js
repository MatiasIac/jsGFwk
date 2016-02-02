var house = {
    onInit: function (params) {
        this.x = params.x;
        this.y = jsGFwk.settings.height - 23;
        this.width = 22;
        this.height = 23;
        this.hasBaby = true;
    },
    onUpdate: function (delta) {
        if (jsGFwk.Collisions.areCollidingBy(this, witch, 
            jsGFwk.Collisions.collidingModes.RECTANGLE) && this.hasBaby) {
            this.hasBaby = false;
            witch.payload++;
            jsGFwk.ResourceManager.sounds.llanto.audio.play();
        }
    },
    onDraw: function (context) {
        context.drawImage(jsGFwk.Sprites.casa.image, this.x, this.y);
        if (this.hasBaby) {
            context.drawImage(jsGFwk.Sprites.baby.image, this.x + 10, this.y + 15);
        }
    }
};