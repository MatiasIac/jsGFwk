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


    jsGFwk.Scenes.scenes.main.enable();
};

jsGFwk.start();