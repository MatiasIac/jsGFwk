jsGFwk.settings.canvas = "canvas";
jsGFwk.settings.clearColor = "white";
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

var width = 950;
var height = 600;

var corteContainer = jsGFwk.Container.createContainer('cortes', corte, true);
var carbonContainer = jsGFwk.Container.createContainer('carbobes', carbon, true);
var dineroContainer = jsGFwk.Container.createContainer('dineros', dinero, true);

jsGFwk.Scenes.create({name: "start", 
    gameObjects: [
        initgame
    ]});

jsGFwk.Scenes.create({name: "main", 
    gameObjects: [
        fojon,
        gameController,
        carbonContainer,
        parrilla,
        gaucho,
        pedido,
        corteContainer,
        dineroContainer
    ]});

var gameStatus = {
    lastrecord: 0
};

function setRecord(dinero) {
    if (dinero > gameStatus.lastrecord) {
        gameStatus.lastrecord = dinero;
        jsGFwk.Storage.setData({name: 'asadator_stored_game', data: gameStatus});
    }
}

jsGFwk.ResourceManager.onResourcesLoadedCompleted = function() {

    var storedValues = jsGFwk.Storage.getFromJson('asadator_stored_game');
    gameStatus = storedValues || gameStatus;

    jsGFwk.Sprites.createSprite({
        id: 'splash', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 3103, top: 138, width: 950, height: 600
    });

    jsGFwk.Sprites.createSprite({
        id: 'splash2', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 4319, top: 138, width: 950, height: 600
    });

    jsGFwk.Sprites.createSprite({
        id: 'startbutton', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 3990, top: 836, width: 249, height: 62
    });

    jsGFwk.Sprites.createSprite({
        id: 'clock', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 1679, top: 837, width: 41, height: 46
    });

    jsGFwk.Sprites.createSprite({
        id: 'background', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 1901, top: 350, width: 950, height: 600
    });

    jsGFwk.Sprites.createSprite({
        id: 'fogon', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 14, top: 146, width: 625, height: 366
    });

    jsGFwk.Sprites.createSprite({
        id: 'parrilla', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 9, top: 527, width: 639, height: 369
    });

    jsGFwk.Sprites.createSprite({
        id: 'dialog', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 1887, top: 38, width: 346, height: 251
    });

    jsGFwk.Sprites.createSpriteCollection("vidas", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 1554, top: 891, width: 13, height: 11},
        {left: 1569, top: 891, width: 13, height: 11}]);
    jsGFwk.Sprites.vidas.loop(false);

    jsGFwk.Sprites.createSpriteCollection("gaucho", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 1033, top: 38, width: 354, height: 571},
        {left: 1413, top: 37, width: 354, height: 571}]);
    jsGFwk.Sprites.gaucho.loop(true);

    jsGFwk.Sprites.createSpriteCollection("carboninicio", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 3208, top: 803, width: 194, height: 134},
        {left: 3462, top: 803, width: 194, height: 134},
        {left: 3704, top: 803, width: 194, height: 134}]);
    jsGFwk.Sprites.carboninicio.loop(true);

    jsGFwk.Sprites.createSpriteCollection("carbon", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 857, top: 158, width: 107, height: 104},
        {left: 857, top: 289, width: 107, height: 115},
        {left: 845, top: 418, width: 150, height: 150}]);
    jsGFwk.Sprites.carbon.loop(false);

    jsGFwk.Sprites.createSpriteCollection("pedidos", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 1104, top: 732, width: 79, height: 73},
        {left: 1211, top: 732, width: 79, height: 73},
        {left: 1347, top: 732, width: 79, height: 73},
        {left: 1475, top: 732, width: 79, height: 73},
        {left: 1606, top: 732, width: 79, height: 73},
        {left: 1724, top: 732, width: 79, height: 73}]);
    jsGFwk.Sprites.pedidos.loop(false);

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
        left: 808, top: 24, width: 10, height: 67
    });

    jsGFwk.Scenes.scenes.start.enable();
};

jsGFwk.start();