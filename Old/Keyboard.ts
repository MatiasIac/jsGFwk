/// <reference path="Game.ts" />

namespace jsGame.Constants {
    export enum Keys {
        A = 65,
        S = 83,
        D = 68,
        W = 87
    }
}

namespace jsGame {
    export class Keyboard {

        _fwk: Game;
        _pressedKeys: Array<boolean> = [];

        constructor(fwk: Game) {
            this._fwk = fwk;
        }

        _keyPressed = function (e: any) {
			this._pressedKeys[e.which] = true;
        };

        _keyReleased = function (e: any) {
            delete this._pressedKeys[e.which];
        };

        isPressed = function (key: jsGame.Constants.Keys) : boolean {
            return this._pressedKeys[key] !== undefined;
        };

        _init = function () {
            var self = this;
            
            document.addEventListener("keydown", function (e: any) {
                self._keyPressed.call(self, e);
            }, false);

		    document.addEventListener("keyup", function (e: any) {
                self._keyReleased.call(self, e);
            }, false);

        };

    }
}