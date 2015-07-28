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
        gameConst.timer.context.clearRect(0, 0, 640, 150);
        
        var row = 0;
        for (var i = 0; i < gameConst.lives; i++) {
            gameConst.timer.context.drawImage(jsGFwk.Sprites.live.image,
                ((i * 15) % 150) + 10, 
                (parseInt(i / 10) * 20) + 80, 12, 18);
        }
        
        gameConst.timer.context.font = '40pt oxi';
        
        gameConst.timer.context.textAlign = 'start';
        gameConst.timer.context.fillStyle = 'white';
        gameConst.timer.context.fillText('Par:' + levels[gameConst.currentLevel].parTime, 10, 60);
        
        gameConst.timer.context.fillStyle = 'rgb(255,' + this.timerColor + ',' + this.timerColor + ')';
        gameConst.timer.context.textAlign = 'end';
        gameConst.timer.context.fillText(this.currentTime, 620, 60);
    }
};