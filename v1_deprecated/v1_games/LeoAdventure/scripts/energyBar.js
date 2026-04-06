var energyBar = {
    id: 'energyBar',
    visible: true,
    update: function (delta) {        
        this.energyBarSize = (300 * leoEnergy) / 100;
    },
    draw: function (context) {
        context.fillStyle = 'white';
        context.font = '30px zxBold';
        context.textAlign = 'left';
        context.fillText('Leo\'s power', 10, 440);
        context.fillStyle = 'green';
        context.fillRect(10, 450, this.energyBarSize, 10);
    }
};