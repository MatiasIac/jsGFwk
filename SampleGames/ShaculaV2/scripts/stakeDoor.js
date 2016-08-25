var StakeDoor = {
    id: 'stakeDoor',
    visible: true,
    isOpen: false,
    init: function () { },
    update: function (delta) { },
    draw: function (ctx) {
        if (!this.isOpen) {
            ctx.drawImage(jsGFwk.Sprites.stakeDoor.image,
                Levels[GLOBAL.currentLevel].stakeDoor.x, Levels[GLOBAL.currentLevel].stakeDoor.y);
        } else {
            ctx.drawImage(jsGFwk.Sprites.openDoor.image,
                Levels[GLOBAL.currentLevel].stakeDoor.x, Levels[GLOBAL.currentLevel].stakeDoor.y);
        }
    }
};