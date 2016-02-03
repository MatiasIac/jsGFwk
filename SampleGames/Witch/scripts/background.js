var background = {
    id: 'background', visible: true,
    foodBarMaxSize: 50, foodBarSize: 0,
    energyBarMaxSize: 50, energyBarSize: 0,
    init: function () {
    },
    update: function (delta) {
        this.foodBarSize = (this.foodBarMaxSize * GLOBAL.witch.feed) / 100;
        this.energyBarSize = (this.energyBarMaxSize * GLOBAL.witch.energy) / 100;
    },
    draw: function (context) {
        context.drawImage(jsGFwk.Sprites.background.image, 0, 0);
        context.drawImage(jsGFwk.Sprites.caldero.image, 10, jsGFwk.settings.height - 8);
        
        context.font = '12pt zxBold';
        context.fillStyle = 'white';

        context.fillText('Food', 5, 10);
        context.fillText('Energy', 60, 10);
        
        for (var i = 0; i < witch.weapon.length; i++) {
            if (witch.weapon[i].enabled) { 
                context.fillStyle = 'white';
            } else {
                context.fillStyle = 'gray';
            }
            context.fillText(witch.weapon[i].name, 5, (i * 8) + 25);
        }
        
        context.strokeStyle = 'white';
        context.strokeRect(1, (witch.currentWeapon * 8) + 19, 80, 8);
        
        context.fillStyle = 'red';
        context.fillRect(5, 12, this.foodBarSize, 5);
        
        context.fillStyle = 'green';
        context.fillRect(60, 12, this.energyBarSize, 5);
    }
};