/// <reference path="Game.ts" />

namespace jsGame {
    export class Scene {

        _fwk: Game;
        _activeScene: string;
        _scenes: Object = { };

        constructor(fwk: Game) {
            this._fwk = fwk;
        }

        add = function (sceneName: string, gameObjects: Array<Object>) {
            this._scenes[sceneName] = gameObjects;
        };

        enable = function (sceneName: string) {
            this.disable(this._activeScene);

            var selectedScene = this._scenes[sceneName];
            if (typeof selectedScene === 'undefined') { return; }

            for (var i = 0; 
                i < selectedScene.length; 
                this._fwk._gameObject.add(selectedScene[i++]),
                    selectedScene[i-1].init(selectedScene[i-1]._parameters)
                );

            this._activeScene = sceneName;
        };

        disable = function (sceneName: string) {
            var selectedScene = this._scenes[sceneName];
            if (typeof selectedScene === 'undefined') { return; }

            for (var i = 0; 
                i < selectedScene.length; 
                this._fwk._gameObject.remove(selectedScene[i++]));

            this._activeScene = undefined;
        };
    }
}