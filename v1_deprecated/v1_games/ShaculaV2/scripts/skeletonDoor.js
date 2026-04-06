var SkeletonDoor = {
    id: 'skeletonDoor',
    visible: true,
    isOpen: false,
    init: function () { },
    update: function (delta) { },
    draw: function (ctx) {
        if (!this.isOpen) {
            ctx.drawImage(jsGFwk.Sprites.skeletonDoor.image,
                Levels[GLOBAL.currentLevel].skeletonDoor.x, Levels[GLOBAL.currentLevel].skeletonDoor.y);
        } else {
            ctx.drawImage(jsGFwk.Sprites.openDoor.image,
                Levels[GLOBAL.currentLevel].skeletonDoor.x, Levels[GLOBAL.currentLevel].skeletonDoor.y);
        }
    }
};