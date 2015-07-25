var Timing = {
    id: 'timing',
    visible: true,
    init: function init() {
        this.currentTime = 0;
        this.timerColor = 255;
    },
    update: function update(delta) {
        var percentCover = (this.currentTime * 100) / levels[gameConst.currentLevel].parTime;
        this.timerColor = 255 - parseInt((255 * percentCover) / 100);
    },
    draw: function draw(ctx) {
        ctx.font = '40pt oxi';
        
        ctx.fillStyle = 'white';
        ctx.fillText('Par:' + levels[gameConst.currentLevel].parTime, 30, 75);
        
        ctx.fillStyle = 'rgb(255,' + this.timerColor + ',' + this.timerColor + ')';
        ctx.textAlign = 'end';
        ctx.fillText(this.currentTime, 620, 75);
    }
};