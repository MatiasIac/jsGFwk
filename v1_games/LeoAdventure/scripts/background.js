var background = {
    id: 'background',
    visible: true,
    buildingX: 0,
    update: function (delta) {
        this.buildingX -= 1 + globalSpeed;
        this.buildingX = this.buildingX % 640;
        
        this.energyBarSize = (300 * leoEnergy) / 100;
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.colorBackground.image, 0, 0);
        
        context.drawImage(jsGFwk.Sprites.buildings.image, 
                         this.buildingX + 640, jsGFwk.settings.height - 61);
        
        context.drawImage(jsGFwk.Sprites.buildings.image, 
                         this.buildingX, jsGFwk.settings.height - 61);
        
        
        context.fillStyle = 'white';
        context.font = '60px zxBold';
        context.textAlign = 'center';
        context.fillText(points, 320, 40);
    }
};