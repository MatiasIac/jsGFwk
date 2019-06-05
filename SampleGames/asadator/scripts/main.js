jsGFwk.settings.canvas = "canvas";
jsGFwk.settings.clearColor = "green";
jsGFwk.settings.frameRate = 1000 / 60;

jsGFwk.include("FastAnimation");
jsGFwk.include("Container");
jsGFwk.include("IO");
jsGFwk.include("Collisions");
jsGFwk.include("ResourceManager");
jsGFwk.include("Sprites");
jsGFwk.include("Scenes");
jsGFwk.include("Fonts");
jsGFwk.include("Effects");
jsGFwk.include("Gamepad");

jsGFwk.ResourceManager.addGraphic({ name: "main", source: "images/sprites.png" });

var width = 800;
var height = 600;

var corteContainer = jsGFwk.Container.createContainer('cortes', corte, true);
var carbonContainer = jsGFwk.Container.createContainer('carbobes', carbon, true);

jsGFwk.Scenes.create({name: "main", 
    gameObjects: [
        gameController,
        fojon,
        carbonContainer,
        parrilla,
        corteContainer
    ]});

jsGFwk.ResourceManager.onResourcesLoadedCompleted = function() {

    jsGFwk.Sprites.createSprite({
        id: 'fogon', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 14, top: 146, width: 625, height: 366
    });

    jsGFwk.Sprites.createSprite({
        id: 'parrilla', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 9, top: 527, width: 639, height: 369
    });

    jsGFwk.Sprites.createSpriteCollection("carbon", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 857, top: 158, width: 107, height: 104},
        {left: 857, top: 289, width: 107, height: 115},
        {left: 845, top: 418, width: 150, height: 150}]);
    jsGFwk.Sprites.carbon.loop(false);

    jsGFwk.Sprites.createSpriteCollection("cortes", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 14, top: 14, width: 106, height: 107},
        {left: 140, top: 14, width: 106, height: 107},
        {left: 262, top: 14, width: 106, height: 107},
        {left: 386, top: 14, width: 106, height: 107},
        {left: 510, top: 14, width: 106, height: 107},
        {left: 635, top: 14, width: 106, height: 107}]);
    jsGFwk.Sprites.carbon.loop(false);

    jsGFwk.Sprites.createSpriteCollection("botones", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 713, top: 626, width: 83, height: 82},
        {left: 815, top: 626, width: 83, height: 82},
        {left: 713, top: 728, width: 83, height: 82},
        {left: 815, top: 728, width: 83, height: 82},
        {left: 713, top: 830, width: 83, height: 82},
        {left: 815, top: 830, width: 83, height: 82},
        {left: 909, top: 830, width: 83, height: 82}]);
    jsGFwk.Sprites.carbon.loop(false);

    jsGFwk.Sprites.createSprite({
        id: 'energia', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 783, top: 24, width: 10, height: 67
    });

    jsGFwk.Scenes.scenes.main.enable();
};

jsGFwk.start();