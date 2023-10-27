const gameConst = {
    width: 640,
    height: 480,
    spriteWidth: 19,
    spriteHeight: 28,
    maxPlayerXReach: function() { return this.width - this.spriteWidth },
    maxPlayerYReach: function() { return this.height - this.spriteHeight },
    currentLevel: -1,
    timer: {
        context: document.getElementById('timerCanvas').getContext('2d'),
        canvas: document.getElementById('timerCanvas')
    },
    maxLevelReach: 0
};

const mousePointer = { x: 0, y: 0 };
let usingKeyboard = true;

const game = new jsGFwk.Engine();
const animator = new jsGFwk.Animator2D();
const collisions = new jsGFwk.Collisions();
const resourceManager = new jsGFwk.ResourcesManager();
const sprites = new jsGFwk.Sprites();
const keyboardIO = new jsGFwk.KeyboardIO();
const touchIO = new jsGFwk.TouchIO();
const mouseIO = new jsGFwk.MouseIO();
const webStorage = new jsGFwk.WebStorage();
const myJukebox = new jsGFwk.Jukebox();
const scenesManager = new jsGFwk.ScenesManager();

game.include(animator);
game.include(collisions);
game.include(resourceManager);
game.include(sprites);
game.include(keyboardIO);
game.include(touchIO);
game.include(mouseIO);
game.include(scenesManager);

game.settings.clearColor = "rgb(10, 10, 10)";

jsGFwk.Fonts.buildFont('pixelated', './game/fonts/pixelated.ttf');
jsGFwk.Fonts.buildFont('oxi', './game/fonts/OXYGENE1.ttf');
jsGFwk.Fonts.buildFont('zxBold', './game/fonts/zxBold.ttf');
jsGFwk.Fonts.buildFont('gooddog', './game/fonts/GoodDog.ttf');
jsGFwk.Fonts.buildFont('fff', './game/fonts/FFF_Tusj.ttf');

let music = {};
music[jsGFwk.ResourceManager.SOUND_FORMATS.MP3] = { source: "./game/fx/main.mp3" };
music[jsGFwk.ResourceManager.SOUND_FORMATS.OGG] = { source: "./game/fx/main.ogg" };
resourceManager.addSound({ name: "music", sources: music});

music[jsGFwk.ResourceManager.SOUND_FORMATS.MP3] = { source: "./game/fx/cinematicMusic.mp3" };
music[jsGFwk.ResourceManager.SOUND_FORMATS.OGG] = { source: "./game/fx/cinematicMusic.ogg" };
resourceManager.addSound({ name: "cinematicMusic", sources: music});

music[jsGFwk.ResourceManager.SOUND_FORMATS.MP3] = { source: "./game/fx/pick.mp3" };
music[jsGFwk.ResourceManager.SOUND_FORMATS.OGG] = { source: "./game/fx/pick.ogg" };
resourceManager.addSound({ name: "pickTrack", sources: music});

resourceManager.addGraphic({ name: "main", source: "./game/images/eater.png" });
resourceManager.addGraphic({ name: "scanLines", source: "./game/images/scanlines.png" });

const footsContainer = jsGFwk.Containers.create("footsCloner", Foots);
const hazardsContainer = jsGFwk.Containers.create("hazardsCloner", Hazards);
const dropsContainer = jsGFwk.Containers.create("dropsCloner", Drops);

scenesManager.create("game", [
    Background, 
    Player, 
    LevelController, 
    footsContainer, 
    hazardsContainer, 
    dropsContainer, 
    Timing
]);

scenesManager.create("hud", [Hud]);
scenesManager.create("cinematic", [Cinematic]);
scenesManager.create("ending", [EndScene]);

resourceManager.onResourcesLoadedCompleted = function () {
    let storedValues = webStorage.getFromJson('yongoyongo_stored_game');
    gameConst.maxLevelReach = storedValues !== null ? storedValues.maxLevel : 0;
    
    sprites.createCollection("eater", resourceManager.GRAPHICS.main.image, [
        {left: 92, top: 262, width: 19, height: 28}, 
        {left: 122, top: 262, width: 19, height: 28}
    ]);
    sprites.SPRITES_BAG.eater.loop(true);
    sprites.SPRITES_BAG.eater.reset();

    sprites.createCollection("crocodile", resourceManager.GRAPHICS.main.image, [
        {left: 74, top: 134, width: 33, height: 64}, 
        {left: 113, top: 134, width: 33, height: 64},
        {left: 153, top: 134, width: 33, height: 64}
    ]);
    sprites.SPRITES_BAG.crocodile.loop(true);
    sprites.SPRITES_BAG.crocodile.reset();

    sprites.createCollection("gorilla", resourceManager.GRAPHICS.main.image, [
        {left: 219, top: 141, width: 43, height: 38}, 
        {left: 268, top: 141, width: 43, height: 38},
        {left: 317, top: 141, width: 43, height: 38}
    ]);
    sprites.SPRITES_BAG.gorilla.loop(true);
    sprites.SPRITES_BAG.gorilla.reset();

    sprites.createCollection("drop", resourceManager.GRAPHICS.main.image, [
        {left: 44, top: 358, width: 21, height: 9}, 
        {left: 68, top: 358, width: 21, height: 9}
    ]);
    sprites.SPRITES_BAG.drop.loop(false);
    sprites.SPRITES_BAG.drop.reset();

    sprites.create({ 
        id: "live", 
        graphic: resourceManager.GRAPHICS.main.image, 
        left: 60, top: 262, width: 19, height: 28 
    });
    
    sprites.create({
        id: "mud",
        graphic: resourceManager.GRAPHICS.main.image,
        left: 122, top: 299, width: 19,height: 19
    });
    
    sprites.createCollection("yeti", resourceManager.GRAPHICS.main.image, [
        {left: 279, top: 260, width: 23, height: 30}, 
        {left: 307, top: 260, width: 23, height: 30}
    ]);
    sprites.SPRITES_BAG.yeti.loop(false);
    sprites.SPRITES_BAG.yeti.reset();

    sprites.create({
        id: "foots",
        graphic: resourceManager.GRAPHICS.main.image,
        left: 156, top: 276, width: 13, height: 12
    });

    sprites.create({
        id: "traps",
        graphic: resourceManager.GRAPHICS.main.image,
        left: 174, top: 276, width: 16, height: 12
    });

    sprites.create({
        id: "joystick",
        graphic: resourceManager.GRAPHICS.main.image,
        left: 390, top: 259, width: 32, height: 40
    });
    
    resourceManager.SOUNDS.music.audio.loop = true;
    resourceManager.SOUNDS.music.audio.volume = 0.4;
    resourceManager.SOUNDS.music.audio.play();

    resourceManager.SOUNDS.cinematicMusic.audio.loop = true;
    resourceManager.SOUNDS.cinematicMusic.audio.volume = 0.4;
    
    resourceManager.SOUNDS.pickTrack.audio.loop = false;
    resourceManager.SOUNDS.pickTrack.audio.volume = 0.6;
    
    scenesManager.SCENES.hud.activate();

};

game.start();