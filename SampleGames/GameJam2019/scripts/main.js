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
var fireJuke = null;
var puffJuke = null;
var mExplosionJuke = null;

jsGFwk.Scenes.create({name: "main", 
    gameObjects: [
        starfield,
        cloudsContainer,
        aidcapsule,
        spaceship,
        bulletContainer,
        asteroidContainer,
        particlesContainer,
        aim,
        stats
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

    jsGFwk.ResourceManager.sounds.truster.audio.volume = 0.2;
    jsGFwk.ResourceManager.sounds.truster.audio.loop = true;

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

    jsGFwk.Scenes.scenes.main.enable();
}

jsGFwk.start();