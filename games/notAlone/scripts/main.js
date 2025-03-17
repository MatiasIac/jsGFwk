const game = new jsGFwk.Engine();
const animator = new jsGFwk.Animator2D();
const collisions = new jsGFwk.Collisions();
const resourceManager = new jsGFwk.ResourcesManager();
const sprites = new jsGFwk.Sprites();
const keyboardIO = new jsGFwk.KeyboardIO();
const mouseIO = new jsGFwk.MouseIO();
const webStorage = new jsGFwk.WebStorage();
const myJukebox = new jsGFwk.Jukebox();
const scenesManager = new jsGFwk.ScenesManager();

game.include(animator);
game.include(collisions);
game.include(resourceManager);
game.include(sprites);
game.include(keyboardIO);
game.include(mouseIO);
game.include(scenesManager);

resourceManager.addGraphic({ name: "map", source: "./graphics/map.png" });
resourceManager.addGraphic({ name: "tiles", source: "./graphics/tiles.png" });

scenesManager.create("game", [
    backgroundMap,
    character
]);

resourceManager.onResourcesLoadedCompleted = function () {

    sprites.createCollection("mapTiles", resourceManager.GRAPHICS.tiles.image, [
        {left: 0, top: 0, width: 20, height: 20},
        {left: 20, top: 0, width: 20, height: 20},
        {left: 40, top: 0, width: 20, height: 20},
        {left: 60, top: 0, width: 20, height: 20},
        {left: 80, top: 0, width: 20, height: 20}
    ]);

    MAP_MATRIX = mapBuilder.createMap(resourceManager.GRAPHICS.map.image);
    
    scenesManager.SCENES.game.activate();
};