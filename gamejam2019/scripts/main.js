jsGFwk.settings.canvas = "canvas";
jsGFwk.settings.clearColor = "#000000";
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

/*jsGFwk.include("Debugger");
jsGFwk.Debugger.on = true;*/

jsGFwk.ResourceManager.addGraphic({ name: "main", source: "images/sprites.png" });

var width = 300;
var height = 700;

var asteroidContainer = jsGFwk.Container.createContainer('asteroids', asteroid, true);
var bulletContainer = jsGFwk.Container.createContainer('bullets', bullet, true);
var cloudsContainer = jsGFwk.Container.createContainer('clouds', cloud, true);
var particlesContainer = jsGFwk.Container.createContainer('particles', particles, true);
var powerUpContainer = jsGFwk.Container.createContainer('powerups', powerup, true);
var fireJuke = null;
var puffJuke = null;
var mExplosionJuke = null;
var trusterJuker = null;

var spaceshipDie = false;
var endGame = false;

jsGFwk.Scenes.create({name: "hud", 
    gameObjects: [
        starfield,
        angryAsteroid,
        hud
    ]});

jsGFwk.Scenes.create({name: "main", 
    gameObjects: [
        globalController,
        asteroidController,
        starfield,
        earth,
        cloudsContainer,
        aidcapsule,
        spaceship,
        bulletContainer,
        asteroidContainer,
        powerUpContainer,
        angryAsteroid,
        particlesContainer,
        aim,
        stats
    ]});

jsGFwk.Scenes.create({name: "endgame",
    gameObjects: [
        starfield,
        endgame
    ]});

var sound = {};
sound[jsGFwk.ResourceManager.sounds.format.ogg] = { source: "fx/fire.ogg" };
sound[jsGFwk.ResourceManager.sounds.format.mp3] = { source: "fx/fire.mp3" };
jsGFwk.ResourceManager.addSound({ name: "fire", sources: sound});

sound = {};
sound[jsGFwk.ResourceManager.sounds.format.ogg] = { source: "fx/puff.ogg" };
sound[jsGFwk.ResourceManager.sounds.format.mp3] = { source: "fx/puff.mp3" };
jsGFwk.ResourceManager.addSound({ name: "puff", sources: sound});

sound = {};
sound[jsGFwk.ResourceManager.sounds.format.ogg] = { source: "fx/truster.ogg" };
sound[jsGFwk.ResourceManager.sounds.format.mp3] = { source: "fx/truster.mp3" };
jsGFwk.ResourceManager.addSound({ name: "truster", sources: sound});

sound = {};
sound[jsGFwk.ResourceManager.sounds.format.ogg] = { source: "fx/metalicexplosion.ogg" };
sound[jsGFwk.ResourceManager.sounds.format.mp3] = { source: "fx/metalicexplosion.mp3" };
jsGFwk.ResourceManager.addSound({ name: "mexplosion", sources: sound});

jsGFwk.ResourceManager.onResourcesLoadedCompleted = function() {
    jsGFwk.Sprites.createSprite({
        id: 'aid', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 114, top: 102, width: 21, height: 20
    });

    jsGFwk.Sprites.createSprite({
        id: 'lightning', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 21, top: 156, width: 14, height: 18
    });

    jsGFwk.Sprites.createSprite({
        id: 'gas', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 18, top: 184, width: 17, height: 15
    });

    jsGFwk.Sprites.createSprite({
        id: 'yellowBar', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 49, top: 159, width: 72, height: 15
    });

    jsGFwk.Sprites.createSprite({
        id: 'blueBar', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 49, top: 187, width: 72, height: 15
    });

    jsGFwk.Sprites.createSprite({
        id: 'redBar', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 49, top: 213, width: 72, height: 15
    });

    jsGFwk.Sprites.createSprite({
        id: 'ship', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 73, top: 92, width: 29, height: 39
    });

    jsGFwk.Sprites.createSprite({
        id: 'aim', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 15, top: 90, width: 40, height: 41
    });

    jsGFwk.Sprites.createSpriteCollection("truster", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 154, top: 106, width: 15, height: 13},
        {left: 153, top: 129, width: 17, height: 15},
        {left: 152, top: 154, width: 20, height: 18}]);
    jsGFwk.Sprites.truster.loop(true);

    jsGFwk.Sprites.createSpriteCollection("clouds", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 209, top: 121, width: 14, height: 15},
        {left: 252, top: 114, width: 15, height: 12},
        {left: 273, top: 123, width: 12, height: 13},
        {left: 245, top: 149, width: 29, height: 15},
        {left: 243, top: 177, width: 20, height: 14},
        {left: 279, top: 173, width: 12, height: 13},
        {left: 231, top: 203, width: 14, height: 14},
        {left: 268, top: 201, width: 13, height: 12}]);
    jsGFwk.Sprites.clouds.loop(false);

    jsGFwk.Sprites.createSprite({
        id: 'bullet', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 58, top: 80, width: 9, height: 8
    });

    jsGFwk.Sprites.createSpriteCollection("asteroids", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 21, top: 18, width: 21, height: 20},
        {left: 53, top: 11, width: 21, height: 16},
        {left: 87, top: 14, width: 20, height: 18},
        {left: 51, top: 36, width: 16, height: 14},
        {left: 17, top: 55, width: 21, height: 13},
        {left: 67, top: 54, width: 15, height: 14}]);
    jsGFwk.Sprites.asteroids.loop(false);

    jsGFwk.Sprites.createSprite({
        id: 'earth', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 53, top: 370, width: 249, height: 48
    });

    jsGFwk.Sprites.createSprite({
        id: 'cloud1', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 74, top: 312, width: 65, height: 25
    });

    jsGFwk.Sprites.createSprite({
        id: 'cloud2', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 176, top: 309, width: 108, height: 28
    });

    jsGFwk.Sprites.createSprite({
        id: 'title', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 430, top: 284, width: 197, height: 134
    });

    jsGFwk.Sprites.createSprite({
        id: 'main', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 388, top: 0, width: 251, height: 259
    });

    jsGFwk.Sprites.createSprite({
        id: 'asteroidBase', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 668, top: 140, width: 162, height: 157
    });

    jsGFwk.Sprites.createSpriteCollection("faces", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 707, top: 297, width: 58, height: 87},
        {left: 707, top: 389, width: 58, height: 87},
        {left: 768, top: 389, width: 58, height: 87}]);
    jsGFwk.Sprites.faces.loop(false);

    jsGFwk.Sprites.createSpriteCollection("powerups", jsGFwk.ResourceManager.graphics.main.image,
        [{left: 129, top: 14, width: 22, height: 18},
        {left: 129, top: 39, width: 22, height: 18},
        {left: 129, top: 62, width: 22, height: 18}]);
    jsGFwk.Sprites.faces.loop(false);

    jsGFwk.Sprites.createSprite({
        id: 'instructions', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 216, top: 20, width: 100, height: 57
    });

    jsGFwk.Sprites.createSprite({
        id: 'endtitle', graphic: jsGFwk.ResourceManager.graphics.main.image,
        left: 872, top: 11, width: 270, height: 399
    });

    trusterJuker = new jsGFwk.Jukebox({
        volume: 0.2,
        channels: 5,
        source: jsGFwk.ResourceManager.sounds.truster
    });

    puffJuke = new jsGFwk.Jukebox({
        volume: 0.005,
        channels: 5,
        source: jsGFwk.ResourceManager.sounds.puff
    });

    fireJuke = new jsGFwk.Jukebox({
        volume: 0.2,
        channels: 5,
        source: jsGFwk.ResourceManager.sounds.fire 
    });

    mExplosionJuke = new jsGFwk.Jukebox({
        volume: 0.1,
        channels: 5,
        source: jsGFwk.ResourceManager.sounds.mexplosion 
    });

    jsGFwk.Scenes.scenes.hud.enable();
}

jsGFwk.start();

function dropPowerUp(coords) {
    var r = Math.random() * 100;
    if (r > 60) {
        powerUpContainer.cloneObject({ x: coords.x, y: coords.y });
    }
}